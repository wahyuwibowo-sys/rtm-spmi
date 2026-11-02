/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SLIDES, SCHOOL_INFO } from '../data/rtmData.ts';
import { X, Mic, Users, Clock, Lightbulb } from 'lucide-react';

interface PresenterNotesDrawerProps {
  currentSlide: number;
  isOpen: boolean;
  onClose: () => void;
}

export const PresenterNotesDrawer: React.FC<PresenterNotesDrawerProps> = ({
  currentSlide,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const slide = SLIDES.find((s) => s.slideNumber === currentSlide) || SLIDES[0];

  return (
    <aside className="no-print fixed top-16 right-4 bottom-24 z-40 w-96 max-w-[calc(100vw-2rem)] bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-800/40">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Catatan Presenter</h3>
            <p className="text-[11px] text-slate-400">Slide {slide.slideNumber} · {slide.title}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
        {/* Official Speaker Quote Box */}
        <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/40 space-y-1.5">
          <div className="flex items-center gap-1.5 text-blue-400 font-semibold text-[11px]">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Kutipan Resmi Presentasi</span>
          </div>
          <p className="text-blue-100/90 text-xs italic leading-relaxed">
            "{slide.presenterNote}"
          </p>
        </div>

        {/* Pacing Guide */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700/60">
          <div className="flex items-center gap-2 text-slate-400">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>Alokasi Waktu Slide Ini:</span>
          </div>
          <span className="font-mono font-semibold text-emerald-400">{slide.allocatedMinutes} Menit</span>
        </div>

        {/* Talking Points */}
        <div className="space-y-2">
          <h4 className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
            Poin Bicara Utama (Key Talking Points)
          </h4>
          <ul className="space-y-2">
            {slide.keyTalkingPoints.map((point, idx) => (
              <li
                key={idx}
                className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/40 text-slate-200 leading-relaxed flex items-start gap-2"
              >
                <span className="w-4 h-4 rounded-full bg-blue-900/60 text-blue-300 text-[10px] font-mono flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Audience Target Context */}
        <div className="pt-2 border-t border-slate-800 space-y-1.5">
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
            <Users className="w-3.5 h-3.5" />
            <span>Disampaikan Kepada:</span>
          </div>
          <div className="space-y-1 text-[11px] text-slate-300">
            <p>• {SCHOOL_INFO.principalName} ({SCHOOL_INFO.principalTitle})</p>
            <p>• Tim Penjaminan Mutu Pendidikan Sekolah (TPMPS)</p>
            <p>• Pengawas Pembina Sekolah</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
