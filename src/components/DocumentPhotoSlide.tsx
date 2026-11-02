/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { DocumentPhoto } from '../types/documentPhoto.ts';
import {
  Upload,
  Image as ImageIcon,
  Trash2,
  ZoomIn,
  Plus,
  FileText,
  Calendar,
  CheckCircle,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Cloud,
} from 'lucide-react';
import { collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase.ts';

interface DocumentPhotoSlideProps {
  onBackToPresentation?: () => void;
}

const DEFAULT_DOCUMENTS: DocumentPhoto[] = [
  {
    id: 'doc-1',
    title: 'Lembar RKT Hal 21: Bukti Faktual Penurunan Skor Mutu & Akar Masalah',
    category: 'Dokumen LK-02 / RKT',
    imageUrl: '/assets/aistudio/image_127a9e59.png',
    description: 'Dokumen RKT resmi menunjukkan penurunan Link & Match (-2,21), Pembelajaran (-0,34), dan Numerasi (-2,22%).',
    uploadedAt: '17 September 2026',
  },
  {
    id: 'doc-2',
    title: 'Dokumentasi Lapangan & Sarana SMKN 1 Sidayu',
    category: 'Dokumentasi Rapat RTM',
    imageUrl: '/assets/aistudio/image_127a9e59.png',
    description: 'Sarana olahraga dan lingkungan belajar SMKN 1 Sidayu Gresik tempat pelaksanaan program penjaminan mutu.',
    uploadedAt: '17 September 2026',
  },
];

export const DocumentPhotoSlide: React.FC<DocumentPhotoSlideProps> = ({ onBackToPresentation }) => {
  const [documents, setDocuments] = useState<DocumentPhoto[]>(() => {
    try {
      const saved = localStorage.getItem('rtm_document_photos');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load photos from localStorage', e);
    }
    return DEFAULT_DOCUMENTS;
  });

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [previewZoomModal, setPreviewZoomModal] = useState<boolean>(false);
  const [docToDelete, setDocToDelete] = useState<DocumentPhoto | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isCloudSynced, setIsCloudSynced] = useState<boolean>(true);

  // Upload Form state
  const [uploadTitle, setUploadTitle] = useState<string>('');
  const [uploadCategory, setUploadCategory] = useState<DocumentPhoto['category']>('Dokumen LK-02 / RKT');
  const [uploadDescription, setUploadDescription] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Real-time Firestore sync
  useEffect(() => {
    const collPath = 'documentPhotos';
    const unsub = onSnapshot(
      collection(db, collPath),
      (snapshot) => {
        if (!snapshot.empty) {
          const remoteDocs: DocumentPhoto[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            remoteDocs.push({
              id: docSnap.id,
              title: data.title || 'Foto Dokumen',
              category: data.category || 'Dokumen LK-02 / RKT',
              imageUrl: data.imageUrl,
              description: data.description || '',
              uploadedAt: data.uploadedAt || '',
            });
          });
          setDocuments(remoteDocs);
          try {
            localStorage.setItem('rtm_document_photos', JSON.stringify(remoteDocs));
          } catch (e) {
            console.warn('Storage error', e);
          }
        }
        setIsCloudSynced(true);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, collPath);
        setIsCloudSynced(false);
      }
    );

    return () => unsub();
  }, []);

  const filteredDocs =
    filterCategory === 'all'
      ? documents
      : documents.filter((d) => d.category === filterCategory);

  const currentDoc = filteredDocs[activeIndex] || filteredDocs[0];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setPreviewImage(result);
        if (!uploadTitle) {
          setUploadTitle(file.name.replace(/\.[^/.]+$/, ''));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveUpload = async () => {
    if (!previewImage) return;

    const newDoc: DocumentPhoto = {
      id: `doc-${Date.now()}`,
      title: uploadTitle.trim() || 'Foto Dokumen RTM',
      category: uploadCategory,
      imageUrl: previewImage,
      description: uploadDescription.trim(),
      uploadedAt: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    };

    // Update state & localStorage immediately
    setDocuments((prev) => {
      const updated = [newDoc, ...prev];
      try {
        localStorage.setItem('rtm_document_photos', JSON.stringify(updated));
      } catch (err) {
        console.warn('Failed to save to localStorage', err);
      }
      return updated;
    });
    setActiveIndex(0);
    // Reset form
    setUploadTitle('');
    setUploadDescription('');
    setPreviewImage(null);
    setShowUploadModal(false);

    // Save to Firebase Firestore
    try {
      await setDoc(doc(db, 'documentPhotos', newDoc.id), {
        title: newDoc.title,
        category: newDoc.category,
        imageUrl: newDoc.imageUrl,
        description: newDoc.description || '',
        uploadedAt: newDoc.uploadedAt,
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `documentPhotos/${newDoc.id}`);
    }
  };

  const confirmDelete = async () => {
    if (!docToDelete) return;
    const id = docToDelete.id;

    // Update state & localStorage immediately
    setDocuments((prev) => {
      const updated = prev.filter((d) => d.id !== id);
      try {
        localStorage.setItem('rtm_document_photos', JSON.stringify(updated));
      } catch (e) {
        console.warn('Storage update failed', e);
      }
      return updated;
    });
    setActiveIndex(0);
    setDocToDelete(null);
    setPreviewZoomModal(false);

    // Delete from Firebase Firestore
    try {
      await deleteDoc(doc(db, 'documentPhotos', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `documentPhotos/${id}`);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-y-auto">
      {/* Slide Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold flex items-center gap-2">
            <span>Lampiran Eksekutif</span>
            <span>·</span>
            <span>Slide Dokumen &amp; Bukti Fisik RTM</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1 flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-blue-400" />
            <span>Dokumentasi Foto Dokumen SPMI</span>
          </h2>
        </div>

        {/* Action Controls & Firebase Status */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-950/60 border border-blue-800/50 text-[11px] text-blue-300 font-mono">
            <Cloud className="w-3.5 h-3.5 text-blue-400" />
            <span>Firebase Aktif</span>
          </div>

          <button
            onClick={() => setShowUploadModal(true)}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-blue-600/20 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Unggah Foto Dokumen</span>
          </button>
        </div>
      </div>

      {/* Main Slide Content: Large Featured Viewer & Thumbnail Strip */}
      {filteredDocs.length > 0 && currentDoc ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto py-4 items-center">
          {/* Left: Large Photo Display Stage */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-700/80 shadow-2xl group flex items-center justify-center max-h-[420px]">
              <img
                src={currentDoc.imageUrl}
                alt={currentDoc.title}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[400px] object-contain p-2"
              />

              {/* Top Category Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-blue-600/90 text-white backdrop-blur-md shadow-md">
                  {currentDoc.category}
                </span>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-300 bg-slate-900/80 backdrop-blur-md">
                  {activeIndex + 1} / {filteredDocs.length}
                </span>
              </div>

              {/* Bottom Info Bar Overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold text-white leading-tight">
                    {currentDoc.title}
                  </h3>
                  {currentDoc.description && (
                    <p className="text-xs text-slate-300 line-clamp-1">
                      {currentDoc.description}
                    </p>
                  )}
                  <span className="text-[10px] text-slate-400 block font-mono">
                    Diunggah: {currentDoc.uploadedAt}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setPreviewZoomModal(true)}
                    title="Perbesar Layar Penuh"
                    className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-white transition-colors"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDocToDelete(currentDoc);
                    }}
                    title="Hapus Foto Ini"
                    className="p-2 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-300 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Prev / Next Slide Arrows */}
              {filteredDocs.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : filteredDocs.length - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveIndex((prev) => (prev < filteredDocs.length - 1 ? prev + 1 : 0))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Right: Document List & Thumbnail Gallery */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span>Daftar Bukti Dokumen ({documents.length})</span>
              <button
                onClick={() => setShowUploadModal(true)}
                className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-[11px]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Foto</span>
              </button>
            </div>

            {/* Thumbnail Scrollable Grid */}
            <div className="max-h-[360px] overflow-y-auto space-y-2 pr-1">
              {filteredDocs.map((doc, idx) => {
                const isSelected = idx === activeIndex;
                return (
                  <div
                    key={doc.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`p-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-3 border ${
                      isSelected
                        ? 'bg-blue-600/20 border-blue-500/60 shadow-md'
                        : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={doc.imageUrl}
                        alt={doc.title}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 object-cover rounded-lg bg-slate-950 shrink-0 border border-slate-700"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider truncate">
                            {doc.category}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white truncate mt-0.5">
                          {doc.title}
                        </h4>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">
                          {doc.uploadedAt}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDocToDelete(doc);
                      }}
                      title="Hapus foto ini"
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition-colors shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="my-auto py-12 text-center space-y-3">
          <ImageIcon className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">Belum Ada Foto Dokumen yang Diunggah</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Unggah foto dokumen fisik seperti Lembar RKT, Berita Acara RTM, Daftar Hadir, atau foto sidang RTM untuk disimpan di Firebase dan ditampilkan di slide ini.
          </p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
          >
            Unggah Foto Pertama
          </button>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-blue-400" />
                <h3 className="text-base font-bold text-white">Unggah Foto Dokumen RTM (Tersimpan ke Firebase)</h3>
              </div>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setPreviewImage(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {/* File Dropzone */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Pilih File Foto (PNG, JPG, WebP)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-xl p-4 text-center cursor-pointer transition-colors bg-slate-950/40"
                >
                  {previewImage ? (
                    <div className="space-y-2">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="max-h-40 mx-auto object-contain rounded-lg border border-slate-700"
                      />
                      <span className="text-[11px] text-blue-400 font-semibold block">
                        Klik untuk mengganti foto
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-1.5 py-4">
                      <Upload className="w-8 h-8 text-slate-500 mx-auto" />
                      <p className="text-slate-300 font-medium">Klik untuk memilih foto dokumen</p>
                      <p className="text-[11px] text-slate-500">Mendukung foto berkas fisik, daftar hadir, LK SPMI</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Title Input */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Judul Foto Dokumen
                </label>
                <input
                  type="text"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="Contoh: Bukti Pengesahan RKT 2026 atau Daftar Hadir RTM"
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Category Select */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Kategori Dokumen
                </label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value as DocumentPhoto['category'])}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Dokumen LK-02 / RKT">Dokumen LK-02 / RKT</option>
                  <option value="Daftar Hadir Sidang">Daftar Hadir Sidang</option>
                  <option value="Dokumentasi Rapat RTM">Dokumentasi Rapat RTM</option>
                  <option value="SK Tim TPMPS">SK Tim TPMPS</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Keterangan / Catatan Dokumen (Opsional)
                </label>
                <textarea
                  value={uploadDescription}
                  onChange={(e) => setUploadDescription(e.target.value)}
                  rows={2}
                  placeholder="Keterangan singkat tentang foto dokumen..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setPreviewImage(null);
                }}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-semibold"
              >
                Batal
              </button>
              <button
                onClick={handleSaveUpload}
                disabled={!previewImage}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-xs font-semibold transition-all shadow-md"
              >
                Simpan ke Firebase &amp; Tampilkan di Slide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Zoom Modal */}
      {previewZoomModal && currentDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md animate-in fade-in">
          <div className="relative max-w-5xl max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setPreviewZoomModal(false)}
              className="absolute -top-12 right-0 p-2 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={currentDoc.imageUrl}
              alt={currentDoc.title}
              className="max-h-[82vh] w-auto object-contain rounded-xl shadow-2xl border border-slate-700"
            />
            <div className="mt-2 text-center text-xs text-slate-300">
              <span className="font-bold text-white">{currentDoc.title}</span> · <span>{currentDoc.category}</span>
            </div>
          </div>
        </div>
      )}

      {/* In-App Delete Confirmation Dialog (No window.confirm!) */}
      {docToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center gap-2.5 text-rose-400 font-bold text-sm">
              <Trash2 className="w-5 h-5 shrink-0" />
              <span>Konfirmasi Hapus Foto Dokumen</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Apakah Anda yakin ingin menghapus foto dokumen <strong className="text-white font-semibold">"{docToDelete.title}"</strong>? Foto ini akan langsung dihapus dari Firebase dan galeri dokumen RTM.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800 text-xs">
              <button
                onClick={() => setDocToDelete(null)}
                className="px-3.5 py-2 rounded-xl text-slate-400 hover:text-white font-semibold transition-colors"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold shadow-md transition-all"
              >
                Ya, Hapus Foto
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Presenter Banner */}
      <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="font-semibold text-blue-400 uppercase tracking-wide text-[11px]">
            Dokumentasi Fisik:
          </span>
          <span className="italic text-slate-300">
            Foto fisik bukti dokumen LK02, RKT, daftar hadir, dan pelaksanaan sidang RTM SMKN 1 Sidayu Gresik tersimpan di Firebase Firestore.
          </span>
        </div>
        <span className="hidden sm:inline text-[11px] text-slate-400 font-mono">Lampiran Foto Dokumen</span>
      </div>
    </div>
  );
};
