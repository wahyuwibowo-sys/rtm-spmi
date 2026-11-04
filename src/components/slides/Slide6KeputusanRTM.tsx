/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RTM_DECISIONS, SLIDES } from '../../data/rtmData.ts';
import { CheckSquare2, Factory, BookOpen, Calculator, Calendar, UserCheck, ArrowRight } from 'lucide-react';
import { RTMDecision } from '../../types/rtm.ts';

export const Slide6KeputusanRTM: React.FC = () => {
  const slide = SLIDES[5];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalDecision, setActiveModalDecision] = useState<RTMDecision | null>(null);

  const categories = ['all', 'Bidang Industri', 'Bidang Pembelajaran', 'Bidang Numerasi'];

  const filteredDecisions =
    selectedCategory === 'all'
      ? RTM_DECISIONS
      : RTM_DECISIONS.filter((d) => d.category === selectedCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Bidang Industri':
        return <Factory className="w-4 h-4 text-amber-400" />;
      case 'Bidang Pembelajaran':
        return <BookOpen className="w-4 h-4 text-blue-400" />;
      case 'Bidang Numerasi':
        return <Calculator className="w-4 h-4 text-emerald-400" />;
      default:
        return <CheckSquare2 className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-y-auto">
      {/* Slide Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="text-xs sm:text-sm uppercase tracking-widest text-blue-400 font-bold flex items-center gap-2">
            <span>Slide 06</span>
            <span>·</span>
            <span>Dashboard Penetapan Kebijakan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
            Keputusan RTM (Action Plan Matrix)
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-800 rounded-xl border border-slate-700/80 text-xs sm:text-sm">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat === 'all' ? 'Semua Bidang (6 Keputusan)' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Action Plan Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-auto py-4">
        {filteredDecisions.map((decision, index) => (
          <div
            key={decision.id}
            onClick={() => setActiveModalDecision(decision)}
            className="p-5 sm:p-6 rounded-2xl bg-slate-800/70 border border-slate-700/90 hover:border-blue-400 hover:bg-slate-800/95 transition-all cursor-pointer shadow-xl flex flex-col justify-between group"
          >
            {/* Category & Title */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="flex items-center gap-2 text-xs sm:text-sm font-bold px-2.5 py-1 rounded-lg bg-slate-900/70 border border-slate-700/70">
                  {getCategoryIcon(decision.category)}
                  <span className="text-slate-200">{decision.category}</span>
                </span>
                <span className="text-xs font-mono text-slate-400 font-bold">
                  #0{index + 1}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-black text-white group-hover:text-blue-300 transition-colors leading-snug">
                {decision.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-normal">
                {decision.strategicObjective}
              </p>
            </div>

            {/* Target & Governance Info */}
            <div className="mt-4 pt-3.5 border-t border-slate-700/70 space-y-2.5 text-xs sm:text-sm">
              <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-xs text-blue-400 font-bold uppercase tracking-wider block">
                  Target KPI / Capaian:
                </span>
                <span className="text-slate-100 font-bold text-xs sm:text-sm leading-tight block mt-1">
                  {decision.targetKPI}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300 pt-1 font-medium">
                <div className="flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-semibold text-slate-200">{decision.pic}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-200 font-mono font-bold shrink-0">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{decision.timeline}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Dialog / Modal when a decision card is clicked */}
      {activeModalDecision && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                {getCategoryIcon(activeModalDecision.category)}
                <div>
                  <span className="text-xs sm:text-sm text-blue-400 font-bold uppercase tracking-wider block">
                    {activeModalDecision.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {activeModalDecision.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveModalDecision(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 space-y-1">
                <span className="text-slate-400 font-bold text-xs">Tujuan Strategis:</span>
                <p className="text-slate-100 leading-relaxed font-normal">{activeModalDecision.strategicObjective}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-950/50 border border-blue-800/50 space-y-1">
                <span className="text-blue-300 font-bold text-xs">Target KPI:</span>
                <p className="text-white font-extrabold leading-relaxed text-sm sm:text-base">{activeModalDecision.targetKPI}</p>
              </div>

              <div className="space-y-2">
                <span className="text-slate-300 font-extrabold text-xs sm:text-sm uppercase tracking-wider block">
                  Tahapan Rencana Aksi Konkret:
                </span>
                <ul className="space-y-2">
                  {activeModalDecision.implementationSteps.map((step, sIdx) => (
                    <li key={sIdx} className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-200 flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-blue-900/70 text-blue-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        {sIdx + 1}
                      </span>
                      <span className="leading-relaxed font-medium">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs sm:text-sm text-slate-400">
                <span>Penanggung Jawab (PIC): <strong className="text-slate-100 font-bold">{activeModalDecision.pic}</strong></span>
                <span>Waktu: <strong className="text-slate-100 font-bold">{activeModalDecision.timeline}</strong></span>
              </div>
            </div>

            <button
              onClick={() => setActiveModalDecision(null)}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-colors shadow-lg"
            >
              Tutup Rincian
            </button>
          </div>
        </div>
      )}

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
        <span className="hidden sm:inline text-xs text-slate-400 font-mono">Slide 06 / 08</span>
      </div>
    </div>
  );
};
