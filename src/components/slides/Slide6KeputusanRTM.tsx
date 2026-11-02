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
          <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold flex items-center gap-2">
            <span>Slide 06</span>
            <span>·</span>
            <span>Dashboard Penetapan Kebijakan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Keputusan RTM (Action Plan Matrix)
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-800 rounded-lg border border-slate-700/80 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-auto py-4">
        {filteredDecisions.map((decision, index) => (
          <div
            key={decision.id}
            onClick={() => setActiveModalDecision(decision)}
            className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/80 hover:border-slate-500 hover:bg-slate-800/90 transition-all cursor-pointer shadow-lg flex flex-col justify-between group"
          >
            {/* Category & Title */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-900/60 border border-slate-700/60">
                  {getCategoryIcon(decision.category)}
                  <span className="text-slate-300">{decision.category}</span>
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  #0{index + 1}
                </span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors leading-snug">
                {decision.title}
              </h3>

              <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                {decision.strategicObjective}
              </p>
            </div>

            {/* Target & Governance Info */}
            <div className="mt-4 pt-3 border-t border-slate-700/60 space-y-2 text-xs">
              <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider block">
                  Target KPI / Capaian:
                </span>
                <span className="text-slate-200 font-medium text-[11px] leading-tight block mt-0.5">
                  {decision.targetKPI}
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <div className="flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-slate-500" />
                  <span className="truncate max-w-[130px]">{decision.pic}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-300 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>{decision.timeline}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Dialog / Modal when a decision card is clicked */}
      {activeModalDecision && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                {getCategoryIcon(activeModalDecision.category)}
                <div>
                  <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider block">
                    {activeModalDecision.category}
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {activeModalDecision.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveModalDecision(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 space-y-1">
                <span className="text-slate-400 font-semibold text-[11px]">Tujuan Strategis:</span>
                <p className="text-slate-200 leading-relaxed">{activeModalDecision.strategicObjective}</p>
              </div>

              <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/40 space-y-1">
                <span className="text-blue-300 font-semibold text-[11px]">Target KPI:</span>
                <p className="text-white font-semibold leading-relaxed">{activeModalDecision.targetKPI}</p>
              </div>

              <div className="space-y-2">
                <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider block">
                  Tahapan Rencana Aksi Konkret:
                </span>
                <ul className="space-y-1.5">
                  {activeModalDecision.implementationSteps.map((step, sIdx) => (
                    <li key={sIdx} className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-200 flex items-start gap-2">
                      <span className="w-5 h-5 rounded-md bg-blue-900/60 text-blue-300 font-mono text-[11px] flex items-center justify-center shrink-0">
                        {sIdx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                <span>Penanggung Jawab (PIC): <strong className="text-slate-200">{activeModalDecision.pic}</strong></span>
                <span>Waktu: <strong className="text-slate-200">{activeModalDecision.timeline}</strong></span>
              </div>
            </div>

            <button
              onClick={() => setActiveModalDecision(null)}
              className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors"
            >
              Tutup Rincian
            </button>
          </div>
        </div>
      )}

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
        <span className="hidden sm:inline text-[11px] text-slate-400 font-mono">Slide 06 / 07</span>
      </div>
    </div>
  );
};
