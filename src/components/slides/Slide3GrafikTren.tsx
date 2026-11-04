/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { METRIC_INDICATORS, SLIDES } from '../../data/rtmData.ts';
import { TrendingDown, ArrowDownRight, AlertOctagon, Layers, Filter } from 'lucide-react';

export const Slide3GrafikTren: React.FC = () => {
  const slide = SLIDES[2];
  const [selectedIndicatorId, setSelectedIndicatorId] = useState<string>('all');

  // Chart dimensions
  const svgWidth = 600;
  const svgHeight = 280;
  const paddingLeft = 70;
  const paddingRight = 80;
  const paddingTop = 40;
  const paddingBottom = 50;

  const chartWidth = svgWidth - paddingLeft - paddingRight;
  const chartHeight = svgHeight - paddingTop - paddingBottom;

  // Y-Scale: Min 68 to Max 92
  const minY = 68;
  const maxY = 92;

  const getYPos = (val: number) => {
    return paddingTop + chartHeight - ((val - minY) / (maxY - minY)) * chartHeight;
  };

  const xPrev = paddingLeft;
  const xCurr = paddingLeft + chartWidth;

  const filteredMetrics =
    selectedIndicatorId === 'all'
      ? METRIC_INDICATORS
      : METRIC_INDICATORS.filter((m) => m.id === selectedIndicatorId);

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-y-auto">
      {/* Slide Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="text-xs sm:text-sm uppercase tracking-widest text-blue-400 font-bold flex items-center gap-2">
            <span>Slide 03</span>
            <span>·</span>
            <span>Analisis Tren Mutu 2 Tahun</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
            Grafik Tren Penurunan Mutu
          </h2>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 p-1 bg-slate-800 rounded-xl border border-slate-700/80 text-xs sm:text-sm">
            <button
              onClick={() => setSelectedIndicatorId('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                selectedIndicatorId === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Semua (3 Indikator)
            </button>
            {METRIC_INDICATORS.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedIndicatorId(m.id)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors truncate max-w-[150px] ${
                  selectedIndicatorId === m.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {m.id === 'link-and-match' ? 'Link & Match' : m.id === 'selaras-dunia-kerja' ? 'Selaras DUDI' : 'Numerasi'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Line Chart Visual & Calculation Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto py-4 items-center">
        {/* Left: SVG Line Chart (with Red Slope Lines & Drop Labels) */}
        <div className="lg:col-span-7 bg-slate-800/70 border border-slate-700/90 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-200">
              <span className="w-3 h-3 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50" />
              <span>Garis Merah = Tren Penurunan Mutu (Selisih Negatif)</span>
            </div>
            <span className="text-xs sm:text-sm text-slate-400 font-mono font-semibold">Skala: 68 - 92</span>
          </div>

          {/* SVG Line Chart */}
          <div className="w-full overflow-x-auto">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full min-w-[500px] h-auto overflow-visible">
              {/* Grid Lines */}
              {[70, 75, 80, 85, 90].map((gridVal) => {
                const y = getYPos(gridVal);
                return (
                  <g key={gridVal}>
                    <line
                      x1={paddingLeft}
                      y1={y}
                      x2={paddingLeft + chartWidth}
                      y2={y}
                      stroke="#334155"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                    />
                    <text
                      x={paddingLeft - 12}
                      y={y + 4}
                      fill="#64748b"
                      fontSize="11"
                      textAnchor="end"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {gridVal}
                    </text>
                  </g>
                );
              })}

              {/* Vertical Time Axis Guides */}
              <line
                x1={xPrev}
                y1={paddingTop}
                x2={xPrev}
                y2={paddingTop + chartHeight}
                stroke="#475569"
                strokeWidth="1.5"
              />
              <line
                x1={xCurr}
                y1={paddingTop}
                x2={xCurr}
                y2={paddingTop + chartHeight}
                stroke="#475569"
                strokeWidth="1.5"
              />

              {/* X-Axis Labels */}
              <text
                x={xPrev}
                y={paddingTop + chartHeight + 25}
                fill="#94a3b8"
                fontSize="13"
                fontWeight="800"
                textAnchor="middle"
              >
                Tahun Sebelumnya
              </text>
              <text
                x={xPrev}
                y={paddingTop + chartHeight + 42}
                fill="#64748b"
                fontSize="11"
                textAnchor="middle"
              >
                (Baseline 2025)
              </text>

              <text
                x={xCurr}
                y={paddingTop + chartHeight + 25}
                fill="#f8fafc"
                fontSize="13"
                fontWeight="800"
                textAnchor="middle"
              >
                Tahun 2026
              </text>
              <text
                x={xCurr}
                y={paddingTop + chartHeight + 42}
                fill="#38bdf8"
                fontSize="11"
                fontWeight="bold"
                textAnchor="middle"
              >
                (Capaian RTM SPMI)
              </text>

              {/* Data Lines & Points */}
              {filteredMetrics.map((metric) => {
                const y1 = getYPos(metric.value2025);
                const y2 = getYPos(metric.value2026);

                return (
                  <g key={metric.id}>
                    {/* Trend Line (Red Highlighted) */}
                    <line
                      x1={xPrev}
                      y1={y1}
                      x2={xCurr}
                      y2={y2}
                      stroke="#f43f5e"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />

                    {/* Point 1 (Tahun Sebelumnya) */}
                    <circle cx={xPrev} cy={y1} r="7" fill="#1e293b" stroke="#f43f5e" strokeWidth="3" />
                    <text
                      x={xPrev - 12}
                      y={y1 - 10}
                      fill="#f1f5f9"
                      fontSize="13"
                      fontWeight="bold"
                      textAnchor="end"
                      fontFamily="monospace"
                    >
                      {metric.value2025.toString().replace('.', ',')}
                    </text>

                    {/* Point 2 (Tahun 2026) */}
                    <circle cx={xCurr} cy={y2} r="7" fill="#f43f5e" stroke="#fff" strokeWidth="2.5" />
                    <text
                      x={xCurr + 14}
                      y={y2 + 5}
                      fill="#ffffff"
                      fontSize="13"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {metric.value2026.toString().replace('.', ',')}
                    </text>

                    {/* Drop Badge in Middle */}
                    <g transform={`translate(${(xPrev + xCurr) / 2}, ${(y1 + y2) / 2 - 14})`}>
                      <rect
                        x="-34"
                        y="-12"
                        width="68"
                        height="24"
                        rx="8"
                        fill="#881337"
                        stroke="#f43f5e"
                        strokeWidth="1.5"
                      />
                      <text
                        x="0"
                        y="5"
                        fill="#ffe4e6"
                        fontSize="12"
                        fontWeight="bold"
                        textAnchor="middle"
                        fontFamily="monospace"
                      >
                        {metric.delta.toString().replace('.', ',')}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Right: Detailed Calculation Table & Risk Analysis */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-800/70 border border-slate-700/90 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-wider">
                Tabel Perhitungan Selisih Penurunan
              </h3>
              <span className="text-xs text-slate-400 font-medium">Data Dokumen SPMI</span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400">
                    <th className="py-2.5 font-bold">Indikator</th>
                    <th className="py-2.5 text-right font-bold">Sebelumnya</th>
                    <th className="py-2.5 text-right font-bold">2026</th>
                    <th className="py-2.5 text-right font-bold text-rose-400">Selisih</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {METRIC_INDICATORS.map((m) => (
                    <tr
                      key={m.id}
                      onClick={() => setSelectedIndicatorId(m.id)}
                      className={`cursor-pointer hover:bg-slate-700/50 transition-colors ${
                        selectedIndicatorId === m.id ? 'bg-blue-900/30' : ''
                      }`}
                    >
                      <td className="py-3 font-medium pr-2">
                        <div className="font-bold text-white text-sm sm:text-base">{m.name}</div>
                        <div className="text-xs text-slate-400 truncate max-w-[160px]">{m.category}</div>
                      </td>
                      <td className="py-3 text-right font-mono-numbers text-slate-300 font-semibold text-sm sm:text-base">
                        {m.value2025.toString().replace('.', ',')}
                      </td>
                      <td className="py-3 text-right font-mono-numbers font-black text-white text-sm sm:text-base">
                        {m.value2026.toString().replace('.', ',')}
                      </td>
                      <td className="py-3 text-right font-mono-numbers font-black text-rose-400 text-sm sm:text-base">
                        <span className="inline-flex items-center gap-0.5">
                          <ArrowDownRight className="w-4 h-4" />
                          <span>{m.delta.toString().replace('.', ',')}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Rapor Pendidikan Risk Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/40 border border-rose-900/60 space-y-2 shadow-md">
            <div className="flex items-center gap-2 text-rose-300 font-extrabold text-xs sm:text-sm uppercase tracking-wider">
              <AlertOctagon className="w-5 h-5 text-rose-400" />
              <span>Mitigasi Rapor Pendidikan Sekolah</span>
            </div>
            <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed font-normal">
              Penurunan nilai indeks ini adalah <em>early warning signal</em>. Jika tidak segera diambil langkah intervensi terstruktur pada semester ini, nilai agregat pada evaluasi akreditasi dan Rapor Pendidikan tahun depan terancam mengalami degradasi predikat.
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
        <span className="hidden sm:inline text-xs text-slate-400 font-mono">Slide 03 / 08</span>
      </div>
    </div>
  );
};
