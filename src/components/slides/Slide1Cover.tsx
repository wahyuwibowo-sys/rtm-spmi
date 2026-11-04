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
        <div className="flex items-center gap-3.5">
          <img
            src="/assets/aistudio/logo_d004d6e9.png"
            alt="Logo SMKN 1 Sidayu Gresik"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = SCHOOL_LOGO_DATA_URL;
            }}
            className="w-14 h-16 object-contain filter drop-shadow-md"
          />
          <div>
            <div className="text-xs sm:text-sm uppercase tracking-widest text-blue-400 font-bold flex items-center gap-2">
              <span>Sistem Penjaminan Mutu Internal</span>
              <span>·</span>
              <span>Siklus PPEPP</span>
            </div>
            <h2 className="text-base sm:text-xl font-black text-white tracking-wide">SMK NEGERI 1 SIDAYU GRESIK</h2>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-medium">
          <Calendar className="w-4 h-4 text-blue-400" />
          <span>Tahun Evaluasi: <strong>2026</strong></span>
          <span>·</span>
          <span>Target Paparan: <strong>10–15 Menit</strong></span>
        </div>
      </div>

      {/* Hero Body Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-4 z-10">
        {/* Left: Main Titles & Presenter Metadata */}
        <div className="lg:col-span-7 space-y-5">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs sm:text-sm font-bold">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Dokumen Resmi Penjaminan Mutu Sekolah</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-white leading-tight">
              RAPAT TINJAUAN MANAJEMEN <span className="text-blue-400">(RTM)</span>
              <span className="block text-slate-200 mt-1">SPMI 2026</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-xl font-normal leading-relaxed">
              Evaluasi efektivitas implementasi mutu vokasi, analisis keselarasan DUDI, dan rencana tindak lanjut peningkatan berkelanjutan.
            </p>
          </div>

          {/* Key Audience & Leadership Lockup */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/70 border border-slate-700/70 space-y-3 max-w-xl shadow-lg">
            <div className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider">
              Pimpinan Sidang &amp; Tim RTM:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-900/50 border border-blue-700/60 flex items-center justify-center shrink-0 text-blue-300 font-black text-sm">
                  KS
                </div>
                <div>
                  <div className="font-extrabold text-white text-sm sm:text-base">{SCHOOL_INFO.principalName}</div>
                  <div className="text-slate-400 text-xs">{SCHOOL_INFO.principalTitle}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-900/50 border border-emerald-700/60 flex items-center justify-center shrink-0 text-emerald-300 font-black text-sm">
                  PS
                </div>
                <div>
                  <div className="font-extrabold text-white text-sm sm:text-base">{SCHOOL_INFO.supervisorName || 'SHODIKUN, S.Pd., MM'}</div>
                  <div className="text-slate-400 text-xs">Pengawas SMK &amp; Tim TPMPS</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onNext}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2.5 group"
            >
              <span>Mulai Paparan Ringkasan Mutu</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {onOpenPhotos && (
              <button
                onClick={onOpenPhotos}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-bold text-sm sm:text-base transition-all flex items-center gap-2"
              >
                <Camera className="w-4 h-4 text-blue-400" />
                <span>Foto Dokumen RTM</span>
              </button>
            )}

            <span className="text-xs sm:text-sm text-slate-400 hidden xl:inline">
              Tekan <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono text-xs">Spasi</kbd> untuk lanjut
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
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs sm:text-sm text-white">
              <span className="font-extrabold flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-400" />
                SMKN 1 Sidayu
              </span>
            </div>
          </div>

          {/* Quick Dashboard Mutu Snapshot with Larger Fonts */}
          <div className="grid grid-cols-3 gap-2.5">
            {METRIC_INDICATORS.map((metric) => (
              <div
                key={metric.id}
                className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 hover:border-slate-600 transition-colors shadow-md"
              >
                <div className="text-xs sm:text-sm text-slate-300 font-bold truncate" title={metric.name}>
                  {metric.id === 'link-and-match' ? 'Link & Match' : metric.id === 'selaras-dunia-kerja' ? 'Selaras DUDI' : 'Numerasi'}
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-xl sm:text-2xl font-black text-white font-mono-numbers">
                    {metric.value2026.toString().replace('.', ',')}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">{metric.unit}</span>
                </div>
                <div className="mt-0.5 text-xs font-mono font-bold text-rose-400 flex items-center gap-0.5">
                  <span>Δ {metric.delta.toString().replace('.', ',')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Presenter Note Banner (Bottom) */}
      <div className="z-10 mt-2 p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 text-slate-300">
          <span className="font-bold text-blue-400 uppercase tracking-wide text-xs sm:text-sm shrink-0">
            Catatan Presenter:
          </span>
          <span className="text-slate-200 italic font-medium">
            "{slide.presenterNote}"
          </span>
        </div>
        <div className="hidden md:flex items-center gap-1 text-xs text-slate-400 shrink-0 font-mono">
          <span>Slide 1 dari 8</span>
        </div>
      </div>
    </div>
  );
};
