/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { METRIC_INDICATORS, SLIDES } from '../../data/rtmData.ts';
import { AlertTriangle, TrendingDown, CheckCircle2, ChevronRight, Info } from 'lucide-react';

interface GaugeChartProps {
  value: number;
  min?: number;
  max?: number;
  label: string;
  unit: string;
  prevValue: number;
  delta: number;
}

const KPIGaugeChart: React.FC<GaugeChartProps> = ({
  value,
  min = 0,
  max = 100,
  label,
  unit,
  prevValue,
  delta,
}) => {
  // Normalize value between 0 and 1
  const clampedValue = Math.min(Math.max(value, min), max);
  const normalized = (clampedValue - min) / (max - min);

  // 180-degree semi circle from -180 deg to 0 deg
  // In SVG coordinates, center = (120, 100), radius = 80
  const cx = 120;
  const cy = 100;
  const radius = 75;
  const strokeWidth = 14;

  // Rotation angle for needle (-90deg to +90deg or 180deg sweep)
  const angle = -180 + normalized * 180;

  // Arc path generator helper
  const polarToCartesian = (centerX: number, centerY: number, r: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 180) * Math.PI) / 180.0;
    return {
      x: centerX + r * Math.cos(angleInRadians),
      y: centerY + r * Math.sin(angleInRadians),
    };
  };

  const describeArc = (x: number, y: number, r: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, r, endAngle);
    const end = polarToCartesian(x, y, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return ['M', start.x, start.y, 'A', r, r, 0, largeArcFlag, 0, end.x, end.y].join(' ');
  };

  // Thresholds on 0-100 scale:
  // Kurang: 0-60 (0deg to 108deg)
  // Cukup: 60-70 (108deg to 126deg)
  // Baik: 70-85 (126deg to 153deg)
  // Amat Baik: 85-100 (153deg to 180deg)
  const arcKurang = describeArc(cx, cy, radius, 0, 108);
  const arcCukup = describeArc(cx, cy, radius, 108, 126);
  const arcBaik = describeArc(cx, cy, radius, 126, 153);
  const arcAmatBaik = describeArc(cx, cy, radius, 153, 180);

  return (
    <div className="relative flex flex-col items-center">
      <svg viewBox="0 0 240 135" className="w-full max-w-[220px] overflow-visible">
        {/* Background track */}
        <path
          d={describeArc(cx, cy, radius, 0, 180)}
          fill="none"
          stroke="#1e293b"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Zone 1: Kurang (<60) */}
        <path
          d={arcKurang}
          fill="none"
          stroke="#ef4444"
          strokeWidth={strokeWidth}
          opacity="0.8"
        />

        {/* Zone 2: Cukup (60-70) */}
        <path
          d={arcCukup}
          fill="none"
          stroke="#f59e0b"
          strokeWidth={strokeWidth}
          opacity="0.85"
        />

        {/* Zone 3: Baik (70-85) */}
        <path
          d={arcBaik}
          fill="none"
          stroke="#10b981"
          strokeWidth={strokeWidth}
          opacity="0.9"
        />

        {/* Zone 4: Amat Baik (85-100) */}
        <path
          d={arcAmatBaik}
          fill="none"
          stroke="#3b82f6"
          strokeWidth={strokeWidth}
          opacity="0.9"
        />

        {/* Needle */}
        <g transform={`rotate(${angle + 90}, ${cx}, ${cy})`}>
          <line
            x1={cx}
            y1={cy}
            x2={cx}
            y2={cy - radius + 10}
            stroke="#f8fafc"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle cx={cx} cy={cy} r="6" fill="#38bdf8" />
          <circle cx={cx} cy={cy} r="3" fill="#0f172a" />
        </g>

        {/* Scale labels */}
        <text x="32" y="118" fill="#64748b" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="monospace">
          0
        </text>
        <text x="120" y="42" fill="#64748b" fontSize="9" fontWeight="600" textAnchor="middle">
          Baik (70)
        </text>
        <text x="208" y="118" fill="#64748b" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="monospace">
          100
        </text>
      </svg>

      {/* Numerical readout */}
      <div className="mt-1 text-center space-y-0.5">
        <div className="flex items-baseline justify-center gap-1 font-mono-numbers">
          <span className="text-3xl font-extrabold text-white tracking-tight">
            {value.toString().replace('.', ',')}
          </span>
          <span className="text-sm font-semibold text-slate-400">{unit}</span>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs">
          <span className="text-slate-400">Tahun Lalu: <strong className="text-slate-200 font-mono-numbers">{prevValue.toString().replace('.', ',')}</strong></span>
          <span className="text-slate-500">·</span>
          <span className="text-rose-400 font-semibold flex items-center gap-0.5 font-mono-numbers">
            <TrendingDown className="w-3 h-3" />
            <span>{delta.toString().replace('.', ',')}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export const Slide2RingkasanCapaian: React.FC = () => {
  const slide = SLIDES[1];

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-y-auto">
      {/* Slide Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="text-xs sm:text-sm uppercase tracking-widest text-blue-400 font-bold flex items-center gap-2">
            <span>Slide 02</span>
            <span>·</span>
            <span>Evaluasi Capaian Rapor Mutu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
            Ringkasan Capaian Mutu 2026
          </h2>
        </div>

        <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-amber-500/15 border border-amber-500/35 text-amber-200 text-xs sm:text-sm font-bold shadow-sm">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <span>Status: Kategori Baik, namun Perlu Perhatian Penurunan</span>
        </div>
      </div>

      {/* 3 KPI Cards with KPI Gauge Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto py-5">
        {METRIC_INDICATORS.map((metric) => (
          <div
            key={metric.id}
            className="flex flex-col justify-between p-6 rounded-2xl bg-slate-800/70 border border-slate-700/90 hover:border-slate-500 transition-all shadow-xl"
          >
            {/* Card Header */}
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-xs sm:text-sm font-bold text-blue-400 uppercase tracking-wider block">
                    Indikator {metric.id === 'link-and-match' ? '01' : metric.id === 'selaras-dunia-kerja' ? '02' : '03'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1 leading-snug">
                    {metric.name}
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shrink-0">
                  Baik
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
                {metric.context}
              </p>
            </div>

            {/* Gauge Chart Visual */}
            <div className="my-4 pt-2">
              <KPIGaugeChart
                value={metric.value2026}
                prevValue={metric.value2025}
                delta={metric.delta}
                label={metric.name}
                unit={metric.unit}
              />
            </div>

            {/* Sub-components / Key Factors */}
            <div className="pt-3 border-t border-slate-700/60 space-y-2 text-xs sm:text-sm">
              <span className="text-slate-300 font-bold block">Fokus Penilaian:</span>
              <ul className="space-y-1.5 text-slate-300">
                {metric.subFactors.slice(0, 2).map((factor, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                    <span className="font-medium leading-snug">{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Strategic Callout & Presenter Notes */}
      <div className="space-y-3 pt-2">
        {/* Key Takeaway Callout */}
        <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800/50 flex items-start gap-3.5 text-xs sm:text-sm shadow-md">
          <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-extrabold text-amber-300 text-sm sm:text-base">Catatan Kritis RTM:</span>
            <p className="text-amber-100/90 leading-relaxed font-normal">
              Meskipun ketiga indikator masih berada di rentang predikat "Baik" (&gt;70 poin), seluruhnya tercatat mengalami <strong>tren penurunan (Link &amp; Match -2,21, Selaras DUDI -0,34, Numerasi -2,22%)</strong>. Evaluasi mendalam diperlukan agar penurunan tidak berlanjut pada rapor tahun berikutnya.
            </p>
          </div>
        </div>

        {/* Bottom Presenter Note */}
        <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 text-slate-300">
            <span className="font-bold text-blue-400 uppercase tracking-wide text-xs sm:text-sm">
              Catatan Presenter:
            </span>
            <span className="italic text-slate-200 font-medium">
              "{slide.presenterNote}"
            </span>
          </div>
          <span className="hidden sm:inline text-xs text-slate-400 font-mono">Slide 02 / 08</span>
        </div>
      </div>
    </div>
  );
};
