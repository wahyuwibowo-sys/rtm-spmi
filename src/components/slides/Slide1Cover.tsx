/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SCHOOL_INFO, METRIC_INDICATORS, SLIDES } from '../../data/rtmData.ts';
import { SCHOOL_LOGO_DATA_URL } from '../../assets/logoBase64.ts';
import { ShieldCheck, Award, ArrowRight, Sparkles, Building2, Calendar, Camera } from 'lucide-react';

interface Slide1CoverProps {
  onNext: () => void;
  onOpenPhotos?: () => void;
}

export const Slide1Cover: React.FC<Slide1CoverProps> = ({ onNext, onOpenPhotos }) => {
  const slide = SLIDES[0];

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 border border-slate-800 shadow-2xl">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -mr-40 -mt-40" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none -ml-40 -mb-40" />

      {/* Top Bar inside Slide */}
      <div className="flex flex-wrap items-center justify-between gap-4 z-10 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <img
            src="/assets/aistudio/logo_d004d6e9.png"
            alt="Logo SMKN 1 Sidayu Gresik"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = SCHOOL_LOGO_DATA_URL;
            }}
            className="w-12 h-14 object-contain filter drop-shadow-md"
          />
          <div>
            <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold flex items-center gap-2">
              <span>Sistem Penjaminan Mutu Internal</span>
              <span>·</span>
              <span>Siklus PPEPP</span>
            </div>
            <h2 className="text-sm font-bold text-white tracking-wide">SMK NEGERI 1 SIDAYU GRESIK</h2>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>Tahun Evaluasi: 2026</span>
          <span>·</span>
          <span>Target Paparan: 10–15 Menit</span>
        </div>
      </div>

      {/* Hero Body Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-6 z-10">
        {/* Left: Main Titles & Presenter Metadata */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Dokumen Resmi Penjaminan Mutu Sekolah</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              RAPAT TINJAUAN MANAJEMEN <span className="text-blue-400">(RTM)</span>
              <span className="block text-slate-200 mt-1">SPMI 2026</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-light">
              Evaluasi efektivitas implementasi mutu vokasi, analisis keselarasan DUDI, dan rencana tindak lanjut peningkatan berkelanjutan.
            </p>
          </div>

          {/* Key Audience & Leadership Lockup */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-3 max-w-xl">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Pimpinan Sidang &amp; Tim RTM:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-900/40 border border-blue-700/50 flex items-center justify-center shrink-0 text-blue-400 font-bold">
                  KS
                </div>
                <div>
                  <div className="font-bold text-white">{SCHOOL_INFO.principalName}</div>
                  <div className="text-slate-400 text-[11px]">{SCHOOL_INFO.principalTitle}</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-900/40 border border-emerald-700/50 flex items-center justify-center shrink-0 text-emerald-400 font-bold">
                  PS
                </div>
                <div>
                  <div className="font-bold text-white">{SCHOOL_INFO.supervisorName || 'SHODIKUN, S.Pd., MM'}</div>
                  <div className="text-slate-400 text-[11px]">Pengawas SMK &amp; Tim TPMPS</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onNext}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 group"
            >
              <span>Mulai Paparan Ringkasan Mutu</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {onOpenPhotos && (
              <button
                onClick={onOpenPhotos}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-semibold text-sm transition-all flex items-center gap-2"
              >
                <Camera className="w-4 h-4 text-blue-400" />
                <span>Foto Dokumen RTM</span>
              </button>
            )}

            <span className="text-xs text-slate-400 hidden xl:inline">
              Tekan <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[10px]">Spasi</kbd> untuk lanjut
            </span>
          </div>
        </div>

        {/* Right: Visual Campus Photo & Mini Dashboard Mutu */}
        <div className="lg:col-span-5 space-y-4">
          {/* School Photo Card */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl group">
            <img
              src="/assets/aistudio/image_127a9e59.png"
              alt="SMKN 1 Sidayu"
              referrerPolicy="no-referrer"
              className="w-full h-48 sm:h-56 object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
              <span className="font-semibold flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-400" />
                SMKN 1 Sidayu
              </span>
            </div>
          </div>

          {/* Quick Dashboard Mutu Snapshot */}
          <div className="grid grid-cols-3 gap-2.5">
            {METRIC_INDICATORS.map((metric) => (
              <div
                key={metric.id}
                className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 hover:border-slate-600 transition-colors"
              >
                <div className="text-[11px] text-slate-400 font-medium truncate" title={metric.name}>
                  {metric.id === 'link-and-match' ? 'Link & Match' : metric.id === 'selaras-dunia-kerja' ? 'Selaras DUDI' : 'Numerasi'}
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-lg font-extrabold text-white font-mono-numbers">
                    {metric.value2026.toString().replace('.', ',')}
                  </span>
                  <span className="text-[10px] text-slate-400">{metric.unit}</span>
                </div>
                <div className="mt-0.5 text-[10px] font-mono font-semibold text-rose-400 flex items-center gap-0.5">
                  <span>Δ {metric.delta.toString().replace('.', ',')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Presenter Note Banner (Bottom) */}
      <div className="z-10 mt-2 p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/80 flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="font-semibold text-blue-400 uppercase tracking-wide text-[11px] shrink-0">
            Catatan Presenter:
          </span>
          <span className="text-slate-300 italic">
            "{slide.presenterNote}"
          </span>
        </div>
        <div className="hidden md:flex items-center gap-1 text-[11px] text-slate-400 shrink-0">
          <span>Slide 1 dari 7</span>
        </div>
      </div>
    </div>
  );
};
