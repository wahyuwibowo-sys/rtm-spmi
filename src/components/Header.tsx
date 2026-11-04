/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SLIDES } from '../data/rtmData.ts';
import { SCHOOL_LOGO_DATA_URL } from '../assets/logoBase64.ts';
import { Play, Printer, LayoutGrid, MonitorPlay, Camera, FileDown, Check } from 'lucide-react';
import { exportRtmToPptx } from '../utils/exportPptx.ts';

interface HeaderProps {
  currentSlide: number;
  onSelectSlide: (slideNumber: number) => void;
  viewMode: 'slides' | 'dashboard';
  onToggleViewMode: (mode: 'slides' | 'dashboard') => void;
  onPrint: () => void;
  onExportPpt?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSlide,
  onSelectSlide,
  viewMode,
  onToggleViewMode,
  onPrint,
  onExportPpt,
}) => {
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);

  const handleExportPPT = async () => {
    if (onExportPpt) {
      onExportPpt();
      return;
    }
    try {
      setIsExporting(true);
      await exportRtmToPptx();
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (err) {
      console.error('Gagal export PPT:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <header className="no-print sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between gap-4 transition-colors">
      {/* Zone 1: Brand Zone with Authentic School Logo */}
      <div className="flex items-center gap-3 shrink-0">
        <a
          href="#cover"
          onClick={(e) => {
            e.preventDefault();
            onToggleViewMode('slides');
            onSelectSlide(1);
          }}
          className="text-base sm:text-lg font-bold tracking-tight text-white hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2.5"
        >
          <img
            src="/assets/aistudio/logo_d004d6e9.png"
            alt="Logo SMKN 1 Sidayu"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = SCHOOL_LOGO_DATA_URL;
            }}
            className="w-8 h-9 object-contain"
          />
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className="font-extrabold tracking-wide">SMKN 1 SIDAYU</span>
            <span className="text-slate-400 font-medium text-xs hidden sm:inline">RTM SPMI 2026</span>
          </div>
        </a>
      </div>

      {/* Zone 2: Clean single-line text navigation links for slides */}
      <nav className="hidden xl:flex items-center gap-1.5 overflow-x-auto text-sm font-medium text-slate-300">
        {SLIDES.map((slide) => {
          const isActive = viewMode === 'slides' && currentSlide === slide.slideNumber;
          return (
            <button
              key={slide.id}
              onClick={() => {
                onToggleViewMode('slides');
                onSelectSlide(slide.slideNumber);
              }}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-blue-600/25 text-blue-300 border border-blue-500/40 font-bold'
                  : 'hover:text-white hover:bg-slate-800/80 text-slate-400'
              }`}
            >
              <span className="font-mono text-xs opacity-75">0{slide.slideNumber}</span>
              <span>
                {slide.slideNumber === 1 && 'Cover'}
                {slide.slideNumber === 2 && 'Capaian'}
                {slide.slideNumber === 3 && 'Tren Mutu'}
                {slide.slideNumber === 4 && 'Evaluasi'}
                {slide.slideNumber === 5 && 'Fishbone'}
                {slide.slideNumber === 6 && 'Keputusan'}
                {slide.slideNumber === 7 && 'Target 2027'}
                {slide.slideNumber === 8 && 'Foto Dokumen'}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Zone 3: Primary action & view toggle & PPT Save */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        {/* Tombol Simpan Slide PPT */}
        <button
          onClick={handleExportPPT}
          disabled={isExporting}
          title="Download File Presentasi PowerPoint (.pptx) Lengkap 8 Slide"
          className={`px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shrink-0 shadow-md ${
            exportSuccess
              ? 'bg-emerald-600 text-white border border-emerald-500'
              : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white border border-amber-500/60 shadow-orange-900/30'
          }`}
        >
          {exportSuccess ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>PPT Tersimpan!</span>
            </>
          ) : (
            <>
              <FileDown className="w-4 h-4 text-white animate-bounce" />
              <span>{isExporting ? 'Menyiapkan PPT...' : 'Simpan Slide PPT'}</span>
            </>
          )}
        </button>

        <button
          onClick={() => {
            onToggleViewMode('slides');
            onSelectSlide(8);
          }}
          title="Buka Slide Foto Dokumen & Upload"
          className={`px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 border ${
            viewMode === 'slides' && currentSlide === 8
              ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
              : 'text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white border-slate-700'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span className="hidden md:inline">Foto Dokumen</span>
        </button>

        <div className="p-1 bg-slate-800 rounded-xl flex items-center border border-slate-700/60">
          <button
            onClick={() => onToggleViewMode('slides')}
            title="Mode Presentasi Slide (16:9)"
            className={`px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              viewMode === 'slides'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MonitorPlay className="w-4 h-4" />
            <span className="hidden lg:inline">Slide Deck</span>
          </button>
          <button
            onClick={() => onToggleViewMode('dashboard')}
            title="Mode Dashboard Eksekutif"
            className={`px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              viewMode === 'dashboard'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden lg:inline">Dashboard</span>
          </button>
        </div>

        <button
          onClick={onPrint}
          title="Cetak atau Simpan PDF Handout 7 Slide"
          className="px-3 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
        >
          <Printer className="w-4 h-4" />
          <span className="hidden lg:inline">Cetak Handout</span>
        </button>
      </div>
    </header>
  );
};

