/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import {
  SCHOOL_INFO,
  METRIC_INDICATORS,
  PRIORITY_PROGRAMS,
  FISHBONE_FINDINGS,
  RTM_DECISIONS,
  TARGET_ROADMAP,
} from '../data/rtmData.ts';
import { SCHOOL_LOGO_DATA_URL } from '../assets/logoBase64.ts';
import { Printer, Download, X, FileText, CheckCircle2, FileDown } from 'lucide-react';
import { exportRtmToPptx } from '../utils/exportPptx.ts';

interface PrintHandoutViewProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrintHandoutView: React.FC<PrintHandoutViewProps> = ({ isOpen, onClose }) => {
  const printableAreaRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    try {
      window.print();
    } catch (err) {
      console.warn('Direct window.print() failed or restricted by iframe:', err);
      handleDownloadHTML();
    }
  };

  const handleDownloadHTML = () => {
    if (!printableAreaRef.current) return;
    const content = printableAreaRef.current.innerHTML;

    const htmlDocument = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Handout RTM SPMI 2026 - ${SCHOOL_INFO.schoolName}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; color: #0f172a; margin: 15mm; font-size: 12px; }
    table { width: 100%; border-collapse: collapse; margin-top: 8px; margin-bottom: 16px; }
    th, td { border: 1px solid #cbd5e1; padding: 6px 10px; text-align: left; }
    th { background-color: #f1f5f9; font-weight: bold; }
    .page-break { page-break-after: always; break-after: page; }
    .print-page-break { page-break-after: always; break-after: page; }
    .header-box { border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
    .section-title { font-size: 14px; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #94a3b8; padding-bottom: 4px; margin-top: 16px; margin-bottom: 8px; }
    .delta-neg { color: #be123c; font-weight: bold; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; text-align: center; }
    .card { border: 1px solid #e2e8f0; background: #f8fafc; padding: 10px; border-radius: 6px; }
    .school-logo { width: 56px !important; height: 64px !important; object-fit: contain !important; display: inline-block !important; }
    @media print { 
      body { margin: 10mm; } 
      .no-print { display: none !important; }
      .print-page-break { page-break-after: always; break-after: page; }
    }
  </style>
</head>
<body class="bg-white">
  ${content}
  <script>
    window.onload = function() { 
      setTimeout(function() { window.print(); }, 400); 
    };
  </script>
</body>
</html>`;

    const blob = new Blob([htmlDocument], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Handout_RTM_SPMI_2026_SMKN1_Sidayu.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const documentContent = (
    <div className="text-slate-900 bg-white p-6 sm:p-10 space-y-8 text-xs leading-relaxed max-w-5xl mx-auto">
      {/* Cover / Header Section */}
      <div className="border-b-2 border-slate-900 pb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={SCHOOL_LOGO_DATA_URL}
            alt="Logo SMKN 1 Sidayu"
            className="w-14 h-16 object-contain shrink-0 school-logo"
            style={{ width: '56px', height: '64px', objectFit: 'contain' }}
          />
          <div>
            <h1 className="text-xl font-extrabold tracking-tight uppercase text-slate-900">
              RAPAT TINJAUAN MANAJEMEN (RTM) SPMI 2026
            </h1>
            <h2 className="text-base font-bold text-slate-700">
              {SCHOOL_INFO.schoolName}
            </h2>
            <p className="text-slate-500 text-[11px] mt-0.5">
              Kepala Sekolah: <strong>{SCHOOL_INFO.principalName}</strong> · NPSN: <strong>{SCHOOL_INFO.npsn || '20500412'}</strong> · {SCHOOL_INFO.meetingCycle}
            </p>
          </div>
        </div>
        <div className="text-right text-[11px] text-slate-500 shrink-0">
          <div className="font-bold text-slate-800">DOKUMEN RESMI SPMI</div>
          <div>Versi Ringkas Eksekutif</div>
          <div className="font-mono text-[10px] text-blue-700">Tanggal: {SCHOOL_INFO.meetingDate}</div>
        </div>
      </div>

      {/* Slide 1 & 2 Summary */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1">
          1 &amp; 2. Ringkasan Capaian Indikator Mutu 2026
        </h3>
        <p className="italic text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-200">
          "Ketiga indikator masih dalam kategori baik, namun mengalami tren penurunan sehingga perlu menjadi prioritas peningkatan."
        </p>
        <table className="w-full border-collapse border border-slate-300 text-left">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-300 text-slate-700">
              <th className="p-2 border-r border-slate-300 font-bold">Indikator Mutu</th>
              <th className="p-2 border-r border-slate-300 font-bold">Tahun Sebelumnya</th>
              <th className="p-2 border-r border-slate-300 font-bold">Tahun 2026</th>
              <th className="p-2 border-r border-slate-300 font-bold">Selisih Penurunan</th>
              <th className="p-2 border-r border-slate-300 font-bold">Kategori</th>
              <th className="p-2 font-bold">Target 2027</th>
            </tr>
          </thead>
          <tbody>
            {METRIC_INDICATORS.map((m) => (
              <tr key={m.id} className="border-b border-slate-200">
                <td className="p-2 border-r border-slate-300 font-semibold">{m.name}</td>
                <td className="p-2 border-r border-slate-300 font-mono">{m.value2025.toString().replace('.', ',')}</td>
                <td className="p-2 border-r border-slate-300 font-mono font-bold text-slate-900">{m.value2026.toString().replace('.', ',')} {m.unit}</td>
                <td className="p-2 border-r border-slate-300 font-mono font-bold text-rose-700">{m.delta.toString().replace('.', ',')}</td>
                <td className="p-2 border-r border-slate-300">Baik (Tren Menurun)</td>
                <td className="p-2 font-mono font-bold text-blue-700">{m.target2027} {m.unit} (+{(m.target2027 - m.value2026).toFixed(2).replace('.', ',')})</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="print-page-break" />

      {/* Slide 4: Evaluasi Program Prioritas */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1">
          3. Evaluasi Program Prioritas (Traffic Light Dashboard)
        </h3>
        <p className="italic text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-200">
          "Program telah terlaksana, namun dampaknya terhadap peningkatan indikator mutu belum sepenuhnya optimal."
        </p>
        <table className="w-full border-collapse border border-slate-300 text-left">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-300 text-slate-700">
              <th className="p-2 border-r border-slate-300 font-bold">No</th>
              <th className="p-2 border-r border-slate-300 font-bold">Nama Program</th>
              <th className="p-2 border-r border-slate-300 font-bold">Status</th>
              <th className="p-2 border-r border-slate-300 font-bold">Target Output</th>
              <th className="p-2 border-r border-slate-300 font-bold">Realisasi Lapangan</th>
              <th className="p-2 font-bold">Analisis Kesenjangan Outcome</th>
            </tr>
          </thead>
          <tbody>
            {PRIORITY_PROGRAMS.map((prog, i) => (
              <tr key={prog.id} className="border-b border-slate-200">
                <td className="p-2 border-r border-slate-300 font-mono">{i + 1}</td>
                <td className="p-2 border-r border-slate-300 font-semibold">{prog.name}</td>
                <td className="p-2 border-r border-slate-300 font-semibold text-emerald-700">🟢 Terlaksana</td>
                <td className="p-2 border-r border-slate-300">{prog.targetQuantity}</td>
                <td className="p-2 border-r border-slate-300">{prog.realizationQuantity}</td>
                <td className="p-2 text-slate-700">{prog.gapAnalysis}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Slide 5: Temuan RTM (Fishbone) */}
      <div className="space-y-3 pt-2">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1">
          4. Temuan Audit RTM (Analisis Sebab-Akibat / Fishbone)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {FISHBONE_FINDINGS.map((f) => (
            <div key={f.id} className="p-3 border border-slate-300 rounded-lg bg-slate-50 space-y-1">
              <div className="font-bold text-slate-900">
                Temuan 0{f.findingNumber} ({f.category}): {f.mainFinding}
              </div>
              <div className="text-slate-700 text-[11px]">
                <strong>Sub-Akar:</strong> {f.rootCauses.join('; ')}
              </div>
              <div className="text-slate-600 text-[10px]">
                <strong>Bukti Faktual:</strong> {f.evidence}
              </div>
              <div className="text-emerald-700 text-[10px] font-semibold pt-0.5">
                <strong>Rekomendasi Tindak Lanjut:</strong> {f.recommendedFix}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="print-page-break" />

      {/* Slide 6: Keputusan RTM & Slide 7: RTL */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1">
          5. Keputusan RTM &amp; Action Plan Matrix
        </h3>
        <table className="w-full border-collapse border border-slate-300 text-left">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-300 text-slate-700">
              <th className="p-2 border-r border-slate-300 font-bold">Bidang</th>
              <th className="p-2 border-r border-slate-300 font-bold">Keputusan &amp; Program Aksi</th>
              <th className="p-2 border-r border-slate-300 font-bold">Target KPI</th>
              <th className="p-2 border-r border-slate-300 font-bold">PIC</th>
              <th className="p-2 font-bold">Waktu</th>
            </tr>
          </thead>
          <tbody>
            {RTM_DECISIONS.map((d) => (
              <tr key={d.id} className="border-b border-slate-200">
                <td className="p-2 border-r border-slate-300 font-semibold">{d.category}</td>
                <td className="p-2 border-r border-slate-300">
                  <div className="font-bold">{d.title}</div>
                  <div className="text-[11px] text-slate-600">{d.strategicObjective}</div>
                </td>
                <td className="p-2 border-r border-slate-300 font-semibold">{d.targetKPI}</td>
                <td className="p-2 border-r border-slate-300">{d.pic}</td>
                <td className="p-2 font-mono">{d.timeline}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Slide 7: Roadmap 2027-2029 */}
        <div className="pt-2 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Roadmap Pengembangan Mutu 2027 - 2029
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {TARGET_ROADMAP.map((r) => (
              <div key={r.year} className="p-3 border border-slate-300 rounded-lg bg-slate-50 space-y-1">
                <div className="font-bold text-slate-900">{r.year} → {r.title}</div>
                <div className="text-slate-600 text-[11px]">{r.focus}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Endorsement Box */}
        <div className="pt-8 border-t border-slate-400 grid grid-cols-3 gap-6 text-center text-xs">
          <div>
            <p className="text-slate-600">Mengetahui,</p>
            <p className="font-semibold text-slate-700">Pengawas SMK</p>
            <div className="h-14" />
            <p className="font-bold text-slate-900">{SCHOOL_INFO.supervisorName || 'SHODIKUN, S.Pd., MM'}</p>
          </div>
          <div>
            <p className="text-slate-600">Disusun Oleh,</p>
            <p className="font-semibold text-slate-700">Ketua TPMPS</p>
            <div className="h-14" />
            <p className="font-bold text-slate-900">Tim TPMPS SMKN 1 Sidayu</p>
          </div>
          <div>
            <p className="text-slate-600">Gresik, {SCHOOL_INFO.meetingDate}</p>
            <p className="font-semibold text-slate-700">Kepala Sekolah</p>
            <div className="h-14" />
            <p className="font-bold text-slate-900">{SCHOOL_INFO.principalName}</p>
            <p className="text-[10px] text-slate-500 font-mono">NIP. {SCHOOL_INFO.principalNip || '19720831 199702 2 004'}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* On-Screen Executive Handout Modal (Triggered by button) */}
      {isOpen && (
        <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-5xl max-h-[92vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-300">
            {/* Modal Header Toolbar */}
            <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between gap-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider">
                    Dokumen Handout RTM SPMI 2026
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Siap dicetak atau disimpan sebagai PDF untuk Kepala Sekolah &amp; Pengawas
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={async () => {
                    try {
                      await exportRtmToPptx();
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                  title="Unduh File Presentasi PowerPoint (.pptx)"
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs transition-all shadow-md flex items-center gap-1.5"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Simpan Slide PPT</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak / Print PDF</span>
                </button>

                <button
                  onClick={handleDownloadHTML}
                  title="Unduh file dokumen HTML siap cetak"
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Unduh Dokumen</span>
                </button>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Printable Document Preview */}
            <div className="flex-1 overflow-y-auto bg-slate-100 p-2 sm:p-6" ref={printableAreaRef}>
              <div className="bg-white rounded-xl shadow-md border border-slate-200">
                {documentContent}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden container specifically for Native @media print when printing directly */}
      <div className="hidden print:block">
        {documentContent}
      </div>
    </>
  );
};
