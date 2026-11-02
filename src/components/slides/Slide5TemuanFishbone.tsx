/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FISHBONE_FINDINGS, SLIDES } from '../../data/rtmData.ts';
import { GitBranch, Building2, CalendarClock, BrainCircuit, Users2, ChevronRight, CheckCircle } from 'lucide-react';
import { FishboneCause } from '../../types/rtm.ts';

export const Slide5TemuanFishbone: React.FC = () => {
  const slide = SLIDES[4];
  const [activeBoneId, setActiveBoneId] = useState<string>('fish-1');

  const activeFinding = FISHBONE_FINDINGS.find((f) => f.id === activeBoneId) || FISHBONE_FINDINGS[0];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Building2':
        return <Building2 className="w-4 h-4" />;
      case 'CalendarClock':
        return <CalendarClock className="w-4 h-4" />;
      case 'BrainCircuit':
        return <BrainCircuit className="w-4 h-4" />;
      default:
        return <Users2 className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-y-auto">
      {/* Slide Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold flex items-center gap-2">
            <span>Slide 05</span>
            <span>·</span>
            <span>Analisis Akar Masalah (Ishikawa)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Temuan RTM (Fishbone Diagram)
          </h2>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold">
          <GitBranch className="w-4 h-4 text-blue-400" />
          <span>4 Temuan Kunci SPMI 2026</span>
        </div>
      </div>

      {/* Main Fishbone Visual & Finding Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto py-4 items-center">
        {/* Left: Interactive Fishbone Diagram (SVG + Interactive Hotspots) */}
        <div className="lg:col-span-7 bg-slate-800/60 border border-slate-700/80 rounded-2xl p-4 sm:p-6 shadow-lg">
          <div className="text-xs text-slate-400 font-medium mb-3 flex items-center justify-between">
            <span>Diagram Sebab-Akibat (Ishikawa / Fishbone)</span>
            <span className="text-[11px] text-blue-400 font-mono">Klik tulang untuk detail</span>
          </div>

          <div className="w-full overflow-x-auto">
            <svg viewBox="0 0 620 320" className="w-full min-w-[540px] h-auto overflow-visible">
              {/* Central Spine */}
              <line
                x1="40"
                y1="160"
                x2="490"
                y2="160"
                stroke="#60a5fa"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Fish Head / Effect Node (Right) */}
              <g transform="translate(490, 110)">
                <path
                  d="M 0 50 L 100 0 L 120 50 L 100 100 Z"
                  fill="#1e293b"
                  stroke="#ef4444"
                  strokeWidth="2.5"
                />
                <foreignObject x="15" y="15" width="95" height="70">
                  <div className="h-full flex flex-col justify-center text-center leading-tight">
                    <span className="text-[10px] font-bold text-rose-400 uppercase tracking-tight">
                      AKIBAT:
                    </span>
                    <span className="text-[10px] font-semibold text-white mt-0.5">
                      Tren Penurunan Indikator Mutu
                    </span>
                  </div>
                </foreignObject>
              </g>

              {/* Rib 1 (Top Left): Kemitraan DUDI -> Temuan 1 */}
              <g
                className="cursor-pointer group"
                onClick={() => setActiveBoneId('fish-1')}
              >
                <line
                  x1="130"
                  y1="160"
                  x2="210"
                  y2="50"
                  stroke={activeBoneId === 'fish-1' ? '#38bdf8' : '#475569'}
                  strokeWidth={activeBoneId === 'fish-1' ? '3.5' : '2'}
                />
                <circle
                  cx="210"
                  cy="50"
                  r="7"
                  fill={activeBoneId === 'fish-1' ? '#38bdf8' : '#334155'}
                  stroke="#fff"
                  strokeWidth="2"
                />
                {/* Text Box Rib 1 */}
                <rect
                  x="70"
                  y="15"
                  width="180"
                  height="34"
                  rx="8"
                  fill={activeBoneId === 'fish-1' ? '#0c4a6e' : '#1e293b'}
                  stroke={activeBoneId === 'fish-1' ? '#38bdf8' : '#475569'}
                  strokeWidth="1.5"
                />
                <text x="80" y="30" fill="#38bdf8" fontSize="10" fontWeight="bold">
                  TEMUAN 1: DUDI
                </text>
                <text x="80" y="42" fill="#e2e8f0" fontSize="9">
                  Keterlibatan DUDI belum merata
                </text>
              </g>

              {/* Rib 2 (Top Right): Jadwal & Sistem -> Temuan 2 */}
              <g
                className="cursor-pointer group"
                onClick={() => setActiveBoneId('fish-2')}
              >
                <line
                  x1="310"
                  y1="160"
                  x2="390"
                  y2="50"
                  stroke={activeBoneId === 'fish-2' ? '#38bdf8' : '#475569'}
                  strokeWidth={activeBoneId === 'fish-2' ? '3.5' : '2'}
                />
                <circle
                  cx="390"
                  cy="50"
                  r="7"
                  fill={activeBoneId === 'fish-2' ? '#38bdf8' : '#334155'}
                  stroke="#fff"
                  strokeWidth="2"
                />
                {/* Text Box Rib 2 */}
                <rect
                  x="280"
                  y="15"
                  width="200"
                  height="34"
                  rx="8"
                  fill={activeBoneId === 'fish-2' ? '#0c4a6e' : '#1e293b'}
                  stroke={activeBoneId === 'fish-2' ? '#38bdf8' : '#475569'}
                  strokeWidth="1.5"
                />
                <text x="290" y="30" fill="#38bdf8" fontSize="10" fontWeight="bold">
                  TEMUAN 2: JADWAL & SISTEM
                </text>
                <text x="290" y="42" fill="#e2e8f0" fontSize="9">
                  Praktisi belum terjadwal sistematis
                </text>
              </g>

              {/* Rib 3 (Bottom Left): Numerasi -> Temuan 3 */}
              <g
                className="cursor-pointer group"
                onClick={() => setActiveBoneId('fish-3')}
              >
                <line
                  x1="130"
                  y1="160"
                  x2="210"
                  y2="270"
                  stroke={activeBoneId === 'fish-3' ? '#38bdf8' : '#475569'}
                  strokeWidth={activeBoneId === 'fish-3' ? '3.5' : '2'}
                />
                <circle
                  cx="210"
                  cy="270"
                  r="7"
                  fill={activeBoneId === 'fish-3' ? '#38bdf8' : '#334155'}
                  stroke="#fff"
                  strokeWidth="2"
                />
                {/* Text Box Rib 3 */}
                <rect
                  x="70"
                  y="270"
                  width="190"
                  height="34"
                  rx="8"
                  fill={activeBoneId === 'fish-3' ? '#0c4a6e' : '#1e293b'}
                  stroke={activeBoneId === 'fish-3' ? '#38bdf8' : '#475569'}
                  strokeWidth="1.5"
                />
                <text x="80" y="285" fill="#38bdf8" fontSize="10" fontWeight="bold">
                  TEMUAN 3: NUMERASI
                </text>
                <text x="80" y="297" fill="#e2e8f0" fontSize="9">
                  Penalaran masih perlu penguatan
                </text>
              </g>

              {/* Rib 4 (Bottom Right): Kolaborasi Guru -> Temuan 4 */}
              <g
                className="cursor-pointer group"
                onClick={() => setActiveBoneId('fish-4')}
              >
                <line
                  x1="310"
                  y1="160"
                  x2="390"
                  y2="270"
                  stroke={activeBoneId === 'fish-4' ? '#38bdf8' : '#475569'}
                  strokeWidth={activeBoneId === 'fish-4' ? '3.5' : '2'}
                />
                <circle
                  cx="390"
                  cy="270"
                  r="7"
                  fill={activeBoneId === 'fish-4' ? '#38bdf8' : '#334155'}
                  stroke="#fff"
                  strokeWidth="2"
                />
                {/* Text Box Rib 4 */}
                <rect
                  x="280"
                  y="270"
                  width="200"
                  height="34"
                  rx="8"
                  fill={activeBoneId === 'fish-4' ? '#0c4a6e' : '#1e293b'}
                  stroke={activeBoneId === 'fish-4' ? '#38bdf8' : '#475569'}
                  strokeWidth="1.5"
                />
                <text x="290" y="285" fill="#38bdf8" fontSize="10" fontWeight="bold">
                  TEMUAN 4: KOLABORASI GURU
                </text>
                <text x="290" y="297" fill="#e2e8f0" fontSize="9">
                  Guru normatif & produktif perlu ditingkatkan
                </text>
              </g>

              {/* Fish Tail (Left) */}
              <polygon points="40,160 10,130 10,190" fill="#334155" />
            </svg>
          </div>

          {/* Quick Selection Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-slate-700/60">
            {FISHBONE_FINDINGS.map((finding) => (
              <button
                key={finding.id}
                onClick={() => setActiveBoneId(finding.id)}
                className={`p-2 rounded-xl text-left transition-all text-xs flex flex-col justify-between ${
                  activeBoneId === finding.id
                    ? 'bg-blue-600/30 border border-blue-400 text-white shadow-md'
                    : 'bg-slate-800/40 border border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-700/40'
                }`}
              >
                <span className="text-[10px] font-bold text-blue-400 font-mono">
                  Temuan 0{finding.findingNumber}
                </span>
                <span className="font-semibold truncate text-[11px] mt-0.5">
                  {finding.category}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Selected Finding Detailed Root Cause & Action Link */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-800/80 border border-slate-700/90 rounded-2xl p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between border-b border-slate-700 pb-2.5">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                {getIcon(activeFinding.iconName)}
                <span>Akar Masalah Temuan 0{activeFinding.findingNumber}</span>
              </span>
              <span className="text-xs font-mono text-slate-400">{activeFinding.category}</span>
            </div>

            <h3 className="text-lg font-bold text-white leading-snug">
              {activeFinding.mainFinding}
            </h3>

            {/* Root Causes List */}
            <div className="space-y-2">
              <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block">
                Sub-Akar Penyebab Teridentifikasi:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {activeFinding.rootCauses.map((cause, idx) => (
                  <li key={idx} className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{cause}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Factual Evidence */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
              <span className="text-slate-400 font-semibold text-[11px] block">Bukti Faktual Audit:</span>
              <p className="text-slate-300 italic leading-relaxed">{activeFinding.evidence}</p>
            </div>

            {/* Link to Decision (Slide 6) */}
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-xs space-y-1">
              <span className="text-emerald-400 font-semibold text-[11px] flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Rekomendasi Tindak Lanjut (Slide 6):</span>
              </span>
              <p className="text-emerald-200/90 font-medium leading-relaxed">
                {activeFinding.recommendedFix}
              </p>
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
        <span className="hidden sm:inline text-[11px] text-slate-400 font-mono">Slide 05 / 07</span>
      </div>
    </div>
  );
};
