/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { METRIC_INDICATORS, TARGET_ROADMAP, SCHOOL_INFO, SLIDES } from '../../data/rtmData.ts';
import { Target, TrendingUp, Compass, Award, CheckCircle2, ChevronRight, PenTool } from 'lucide-react';

export const Slide7RTLTarget: React.FC = () => {
  const slide = SLIDES[6];

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-y-auto">
      {/* Slide Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold flex items-center gap-2">
            <span>Slide 07</span>
            <span>·</span>
            <span>Rencana Tindak Lanjut &amp; Sasaran Strategis</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            RTL dan Target Mutu 2027
          </h2>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold">
          <Target className="w-4 h-4 text-blue-400" />
          <span>Fokus Peningkatan Berbasis Data Faktual</span>
        </div>
      </div>

      {/* Main Grid: Target Progress Bars & 3-Year Strategic Roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto py-4 items-start">
        {/* Left: Progress Bar Target 2027 */}
        <div className="lg:col-span-6 bg-slate-800/60 border border-slate-700/80 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-700 pb-2">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Progress Bar Target Mutu 2027
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Perbandingan Realisasi 2026 vs Sasaran Target 2027
              </p>
            </div>
            <span className="text-[11px] font-mono font-semibold text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Target Kenaikan</span>
            </span>
          </div>

          <div className="space-y-4 pt-1">
            {METRIC_INDICATORS.map((metric) => {
              const currentVal = metric.value2026;
              const targetVal = metric.target2027;
              const targetIncrease = +(targetVal - currentVal).toFixed(2);

              return (
                <div key={metric.id} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/60 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white block text-sm">
                        {metric.name}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {metric.category}
                      </span>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-1 font-mono-numbers">
                        <span className="text-slate-400 font-semibold">{currentVal.toString().replace('.', ',')}</span>
                        <span className="text-slate-500">→</span>
                        <span className="text-emerald-400 font-bold text-sm">{targetVal} {metric.unit}</span>
                      </div>
                      <span className="text-[11px] font-mono font-semibold text-emerald-400">
                        (+{targetIncrease.toString().replace('.', ',')})
                      </span>
                    </div>
                  </div>

                  {/* Dual-layer Visual Progress Bar */}
                  <div className="relative w-full h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                    {/* Target 2027 Marker Track */}
                    <div
                      className="absolute top-0 bottom-0 left-0 bg-blue-900/40 border-r-2 border-emerald-400"
                      style={{ width: `${targetVal}%` }}
                    />
                    {/* Current 2026 Realized Fill */}
                    <div
                      className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full transition-all duration-1000"
                      style={{ width: `${currentVal}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>Realisasi 2026: {currentVal.toString().replace('.', ',')}</span>
                    <span className="text-emerald-400 font-semibold">Target 2027: {targetVal}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: 3-Year Strategic Roadmap (2027 - 2029) */}
        <div className="lg:col-span-6 bg-slate-800/60 border border-slate-700/80 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-700 pb-2">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-4 h-4 text-blue-400" />
                <span>Roadmap Pengembangan Mutu 2027–2029</span>
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Tahapan Strategis Menuju Sekolah Unggul Berbudaya Mutu
              </p>
            </div>
          </div>

          {/* Timeline Nodes */}
          <div className="space-y-3 pt-1">
            {TARGET_ROADMAP.map((step, idx) => (
              <div
                key={step.year}
                className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-700/60 space-y-1.5 hover:border-blue-500/50 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md font-mono text-xs font-extrabold bg-blue-600 text-white shadow-sm">
                      {step.year}
                    </span>
                    <h4 className="text-xs font-bold text-white">
                      {step.title}
                    </h4>
                  </div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                    Tahap 0{idx + 1}
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 font-light leading-relaxed">
                  {step.focus}
                </p>

                <ul className="pt-1 space-y-1 text-[11px] text-slate-400">
                  {step.milestones.slice(0, 2).map((m, mIdx) => (
                    <li key={mIdx} className="flex items-center gap-1.5">
                      <ChevronRight className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate">{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Official Sign-off & Pakta Integritas */}
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="font-bold text-white text-xs">{SCHOOL_INFO.principalName}</div>
                <div className="text-[10px] text-slate-400">Kepala SMK Negeri 1 Sidayu Gresik</div>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Disahkan Dalam RTM 2026</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Presenter Note Banner (Bottom) */}
      <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="font-semibold text-blue-400 uppercase tracking-wide text-[11px]">
            Catatan Presenter:
          </span>
          <span className="italic text-slate-300">
            "{slide.presenterNote}"
          </span>
        </div>
        <span className="hidden sm:inline text-[11px] text-slate-400 font-mono">Slide 07 / 07</span>
      </div>
    </div>
  );
};
