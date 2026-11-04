/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PRIORITY_PROGRAMS, SLIDES } from '../../data/rtmData.ts';
import { CheckCircle2, HelpCircle, ArrowRight, Activity, Eye } from 'lucide-react';
import { PriorityProgram } from '../../types/rtm.ts';

export const Slide4EvaluasiProgram: React.FC = () => {
  const slide = SLIDES[3];
  const [selectedProgram, setSelectedProgram] = useState<PriorityProgram>(PRIORITY_PROGRAMS[0]);

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-y-auto">
      {/* Slide Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="text-xs sm:text-sm uppercase tracking-widest text-blue-400 font-bold flex items-center gap-2">
            <span>Slide 04</span>
            <span>·</span>
            <span>Audit Implementasi 2026</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
            Evaluasi Program Prioritas (Traffic Light)
          </h2>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/35 text-emerald-200 text-xs sm:text-sm font-bold shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>7/7 Program Terlaksana (Status 🟢 Hijau)</span>
        </div>
      </div>

      {/* Main Layout: Traffic Light Dashboard Table & Deep-Dive Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto py-4 items-start">
        {/* Left: Traffic Light Table */}
        <div className="lg:col-span-7 bg-slate-800/70 border border-slate-700/90 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-700 pb-2.5">
            <span className="text-xs sm:text-sm font-extrabold text-white uppercase tracking-wider">
              Daftar Program Kerja Prioritas
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Pilih baris untuk rincian analisis
            </span>
          </div>

          <div className="divide-y divide-slate-700/60 text-xs sm:text-sm">
            {PRIORITY_PROGRAMS.map((prog, idx) => {
              const isSelected = selectedProgram.id === prog.id;
              return (
                <div
                  key={prog.id}
                  onClick={() => setSelectedProgram(prog)}
                  className={`py-3 px-3.5 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-blue-600/25 border border-blue-500/50 text-white shadow-md'
                      : 'hover:bg-slate-700/50 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-slate-400 text-xs sm:text-sm font-bold w-5 text-right">
                      {idx + 1}
                    </span>

                    {/* Traffic Light Dot (Green) */}
                    <div className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20 shadow-sm" />
                      <span className="text-lg">🟢</span>
                    </div>

                    <div>
                      <span className="font-bold text-white block text-sm sm:text-base">
                        {prog.name}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        Target: {prog.targetQuantity}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800/70">
                      Terlaksana
                    </span>
                    <Eye className={`w-4 h-4 ${isSelected ? 'text-blue-400' : 'text-slate-500'}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: The Strategic Paradox (Output vs Outcome Gap) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Selected Program Inspect Card */}
          <div className="bg-slate-800/80 border border-slate-700/90 rounded-2xl p-5 shadow-xl space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-700 pb-2.5">
              <span className="text-xs sm:text-sm font-bold text-blue-400 uppercase tracking-wider">
                Detail Evaluasi Kualitatif
              </span>
              <span className="text-xs sm:text-sm font-mono font-black text-emerald-400">100% Selesai</span>
            </div>

            <h3 className="text-base sm:text-lg font-black text-white">
              {selectedProgram.name}
            </h3>

            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-700/60">
                <span className="text-slate-400 block text-xs font-bold uppercase tracking-wider">Realisasi Lapangan:</span>
                <span className="text-slate-100 font-bold text-sm sm:text-base mt-0.5 block">{selectedProgram.realizationQuantity}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-700/60">
                <span className="text-slate-400 block text-xs font-bold uppercase tracking-wider">Penilaian Efektivitas:</span>
                <p className="text-slate-200 leading-relaxed mt-1 font-normal">{selectedProgram.impactAssessment}</p>
              </div>

              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/50">
                <span className="text-amber-300 block text-xs font-bold uppercase tracking-wider">Kesenjangan Outcome:</span>
                <p className="text-amber-100/95 leading-relaxed mt-1 font-normal">{selectedProgram.gapAnalysis}</p>
              </div>
            </div>
          </div>

          {/* Paradox Callout: "Mengapa semua hijau, tapi capaian turun?" */}
          <div className="p-4 sm:p-5 rounded-2xl bg-blue-950/40 border border-blue-900/60 space-y-2 shadow-md">
            <div className="flex items-center gap-2 text-blue-300 font-extrabold text-xs sm:text-sm uppercase tracking-wider">
              <HelpCircle className="w-5 h-5 text-blue-400" />
              <span>Kesenjangan Output vs Outcome</span>
            </div>
            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed font-normal">
              Semua program terlaksana secara administratif (100% output hijau), namun belum memberikan daya ungkit maksimal terhadap mutu riil siswa. Inilah alasan perlunya <strong>Analisis Fishbone pada Slide 5</strong> untuk membongkar akar masalah sistemik.
            </p>
          </div>
        </div>
      </div>

      {/* Presenter Note Banner (Bottom) */}
      <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 text-slate-300">
          <span className="font-bold text-blue-400 uppercase tracking-wide text-xs sm:text-sm">
            Catatan Presenter:
          </span>
          <span className="italic text-slate-200 font-medium">
            "{slide.presenterNote}"
          </span>
        </div>
        <span className="hidden sm:inline text-xs text-slate-400 font-mono">Slide 04 / 08</span>
      </div>
    </div>
  );
};
