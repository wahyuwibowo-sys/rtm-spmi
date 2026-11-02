/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SLIDES } from '../data/rtmData.ts';
import { SCHOOL_LOGO_DATA_URL } from '../assets/logoBase64.ts';
import { Play, Printer, LayoutGrid, MonitorPlay, Camera } from 'lucide-react';

interface HeaderProps {
  currentSlide: number;
  onSelectSlide: (slideNumber: number) => void;
  viewMode: 'slides' | 'dashboard';
  onToggleViewMode: (mode: 'slides' | 'dashboard') => void;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSlide,
  onSelectSlide,
  viewMode,
  onToggleViewMode,
  onPrint,
}) => {
  return (
    <header className="no-print sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-6 py-3 flex items-center justify-between gap-8 transition-colors">
      {/* Zone 1: Brand Zone with Authentic School Logo */}
      <div className="flex items-center gap-3 shrink-0">
        <a
          href="#cover"
          onClick={(e) => {
            e.preventDefault();
            onToggleViewMode('slides');
            onSelectSlide(1);
          }}
          className="text-base font-bold tracking-tight text-white hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2.5"
        >
          <img
            src="/assets/aistudio/logo_d004d6e9.png"
            alt="Logo SMKN 1 Sidayu"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = SCHOOL_LOGO_DATA_URL;
            }}
            className="w-7 h-8 object-contain"
          />
          <span>SMKN 1 SIDAYU</span>
          <span className="text-slate-500 font-normal text-xs">|</span>
          <span className="text-slate-400 font-normal text-xs">RTM SPMI 2026</span>
        </a>
      </div>

      {/* Zone 2: Clean single-line text navigation links for slides */}
      <nav className="hidden xl:flex items-center gap-1 overflow-x-auto text-xs font-medium text-slate-300">
        {SLIDES.map((slide) => {
          const isActive = viewMode === 'slides' && currentSlide === slide.slideNumber;
          return (
            <button
              key={slide.id}
              onClick={() => {
                onToggleViewMode('slides');
                onSelectSlide(slide.slideNumber);
              }}
              className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold'
                  : 'hover:text-white hover:bg-slate-800/60 text-slate-400'
              }`}
            >
              <span className="font-mono text-[11px] opacity-70">0{slide.slideNumber}</span>
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

      {/* Zone 3: Primary action & view toggle */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={() => {
            onToggleViewMode('slides');
            onSelectSlide(8);
          }}
          title="Buka Slide Foto Dokumen & Upload"
          className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 border ${
            viewMode === 'slides' && currentSlide === 8
              ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
              : 'text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white border-slate-700'
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Foto Dokumen</span>
        </button>

        <div className="p-1 bg-slate-800 rounded-lg flex items-center border border-slate-700/60">
          <button
            onClick={() => onToggleViewMode('slides')}
            title="Mode Presentasi Slide (16:9)"
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              viewMode === 'slides'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MonitorPlay className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Slide Deck</span>
          </button>
          <button
            onClick={() => onToggleViewMode('dashboard')}
            title="Mode Dashboard Eksekutif"
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              viewMode === 'dashboard'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>
        </div>

        <button
          onClick={onPrint}
          title="Cetak atau Simpan PDF Handout 7 Slide"
          className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
        >
          <Printer className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Cetak Handout</span>
        </button>
      </div>
    </header>
  );
};
