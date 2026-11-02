/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  SCHOOL_INFO,
  METRIC_INDICATORS,
  PRIORITY_PROGRAMS,
  FISHBONE_FINDINGS,
  RTM_DECISIONS,
  TARGET_ROADMAP,
} from '../data/rtmData.ts';
import {
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  GitBranch,
  Target,
  FileSpreadsheet,
  Building2,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';

interface ExecutiveDashboardViewProps {
  onSelectSlide: (slideNumber: number) => void;
}

export const ExecutiveDashboardView: React.FC<ExecutiveDashboardViewProps> = ({ onSelectSlide }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'metrics' | 'programs' | 'findings' | 'decisions' | 'photos'>('all');

  return (
    <div className="space-y-6 pb-20">
      {/* Top Overview Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
            <span>Executive Dashboard</span>
            <span>·</span>
            <span>RTM SPMI 2026</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
            {SCHOOL_INFO.schoolName}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Kepala Sekolah: <strong className="text-slate-200">{SCHOOL_INFO.principalName}</strong> · Fokus: Evaluasi Penurunan Mutu &amp; Target 2027
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1 p-1 bg-slate-800/90 rounded-xl border border-slate-700/80 text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Semua Modul
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'metrics' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Capaian &amp; Tren
          </button>
          <button
            onClick={() => setActiveTab('programs')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'programs' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Program Prioritas
          </button>
          <button
            onClick={() => setActiveTab('findings')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'findings' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Fishbone
          </button>
          <button
            onClick={() => setActiveTab('decisions')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'decisions' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Keputusan
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'photos' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Foto Dokumen
          </button>
        </div>
      </div>

      {/* Row 1: 3 KPI Cards & Status */}
      {(activeTab === 'all' || activeTab === 'metrics') && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>1. Ringkasan 3 Indikator Mutu (Slide 2 &amp; 3)</span>
            </h2>
            <button
              onClick={() => onSelectSlide(2)}
              className="text-xs text-blue-400 hover:text-blue-300 font-medium"
            >
              Lihat di Slide 2 →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {METRIC_INDICATORS.map((metric) => (
              <div
                key={metric.id}
                onClick={() => onSelectSlide(3)}
                className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 hover:border-slate-600 cursor-pointer transition-all shadow-md space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{metric.name}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Kategori Baik
                  </span>
                </div>

                <div className="flex items-baseline justify-between pt-1 font-mono-numbers">
                  <div>
                    <span className="text-2xl font-extrabold text-white">
                      {metric.value2026.toString().replace('.', ',')}
                    </span>
                    <span className="text-xs text-slate-400 ml-1">{metric.unit}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-rose-400 font-semibold flex items-center gap-0.5">
                      <TrendingDown className="w-3.5 h-3.5" />
                      <span>{metric.delta.toString().replace('.', ',')}</span>
                    </span>
                    <span className="text-[10px] text-slate-400">vs {metric.value2025.toString().replace('.', ',')}</span>
                  </div>
                </div>

                {/* Target 2027 preview */}
                <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Target 2027:</span>
                  <span className="text-emerald-400 font-semibold font-mono">
                    {metric.target2027} {metric.unit} (+{(metric.target2027 - metric.value2026).toFixed(2).replace('.', ',')})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Row 2: Traffic Light Program Prioritas */}
      {(activeTab === 'all' || activeTab === 'programs') && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>2. Evaluasi 7 Program Prioritas (Traffic Light - Slide 4)</span>
            </h2>
            <button
              onClick={() => onSelectSlide(4)}
              className="text-xs text-blue-400 hover:text-blue-300 font-medium"
            >
              Lihat di Slide 4 →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {PRIORITY_PROGRAMS.map((prog, idx) => (
              <div
                key={prog.id}
                onClick={() => onSelectSlide(4)}
                className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/70 hover:border-slate-600 cursor-pointer transition-colors space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">🟢</span>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40">
                    100%
                  </span>
                </div>
                <h3 className="text-xs font-bold text-white leading-tight">
                  {prog.name}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {prog.impactAssessment}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Row 3: Temuan Fishbone */}
      {(activeTab === 'all' || activeTab === 'findings') && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>3. Temuan RTM &amp; Akar Masalah (Slide 5)</span>
            </h2>
            <button
              onClick={() => onSelectSlide(5)}
              className="text-xs text-blue-400 hover:text-blue-300 font-medium"
            >
              Lihat di Slide 5 →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FISHBONE_FINDINGS.map((finding) => (
              <div
                key={finding.id}
                onClick={() => onSelectSlide(5)}
                className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 hover:border-slate-500 cursor-pointer transition-all space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-400">Temuan 0{finding.findingNumber} ({finding.category})</span>
                  <span className="text-[10px] text-slate-400 font-mono">Ishikawa Bone</span>
                </div>
                <h3 className="text-sm font-bold text-white">
                  {finding.mainFinding}
                </h3>
                <p className="text-xs text-slate-300 italic">
                  "{finding.evidence}"
                </p>
                <div className="pt-2 border-t border-slate-700/60 text-[11px] text-emerald-400">
                  <strong>Tindak Lanjut:</strong> {finding.recommendedFix}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Row 4: Keputusan RTM & Roadmap 2027 */}
      {(activeTab === 'all' || activeTab === 'decisions') && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>4. Keputusan RTM &amp; Roadmap 2027–2029 (Slide 6 &amp; 7)</span>
            </h2>
            <button
              onClick={() => onSelectSlide(6)}
              className="text-xs text-blue-400 hover:text-blue-300 font-medium"
            >
              Lihat di Slide 6 →
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {['Bidang Industri', 'Bidang Pembelajaran', 'Bidang Numerasi'].map((cat) => {
              const decisions = RTM_DECISIONS.filter((d) => d.category === cat);
              return (
                <div key={cat} className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-3">
                  <div className="text-xs font-bold text-blue-400 uppercase tracking-wider border-b border-slate-700 pb-2">
                    {cat}
                  </div>
                  <div className="space-y-2">
                    {decisions.map((d) => (
                      <div key={d.id} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
                        <div className="font-bold text-white text-xs">{d.title}</div>
                        <div className="text-[11px] text-slate-300">{d.targetKPI}</div>
                        <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
                          <span>PIC: {d.pic}</span>
                          <span className="font-mono">{d.timeline}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Roadmap strip */}
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-400" />
              <span>Roadmap Strategis 3 Tahun (2027 - 2029)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              {TARGET_ROADMAP.map((r) => (
                <div key={r.year} className="p-3 rounded-lg bg-slate-900/70 border border-slate-700/60 text-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded font-mono font-bold bg-blue-600 text-white text-[11px]">
                      {r.year}
                    </span>
                    <span className="font-bold text-white text-xs">{r.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-light">{r.focus}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Row 5: Foto Dokumen & Bukti Fisik */}
      {(activeTab === 'all' || activeTab === 'photos') && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>5. Dokumentasi Foto Dokumen SPMI &amp; Bukti Fisik (Slide 8)</span>
            </h2>
            <button
              onClick={() => onSelectSlide(8)}
              className="text-xs text-blue-400 hover:text-blue-300 font-medium"
            >
              Buka Slide Dokumen Foto &amp; Upload →
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white">Galeri Bukti Fisik Dokumen RTM</h3>
              <p className="text-xs text-slate-400 max-w-xl">
                Tersedia tempat upload foto dokumen (lembar RKT/LK-02, daftar hadir sidang, berita acara, SK TPMPS) yang dapat langsung dipresentasikan pada Slide Dokumen Foto.
              </p>
            </div>
            <button
              onClick={() => onSelectSlide(8)}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs whitespace-nowrap shrink-0 shadow-md transition-all flex items-center gap-2"
            >
              <span>Buka Slide 8 (Foto Dokumen)</span>
              <span>→</span>
            </button>
          </div>
        </section>
      )}
    </div>
  );
};
