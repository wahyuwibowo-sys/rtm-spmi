/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  FileText,
  Play,
  Pause,
  RotateCcw,
  Clock,
} from 'lucide-react';
import { SLIDES } from '../data/rtmData.ts';

interface PresentationControllerProps {
  currentSlide: number;
  totalSlides: number;
  onNextSlide: () => void;
  onPrevSlide: () => void;
  onSelectSlide: (slideNumber: number) => void;
  showNotes: boolean;
  onToggleNotes: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const PresentationController: React.FC<PresentationControllerProps> = ({
  currentSlide,
  totalSlides,
  onNextSlide,
  onPrevSlide,
  onSelectSlide,
  showNotes,
  onToggleNotes,
  isFullscreen,
  onToggleFullscreen,
}) => {
  // Presenter Timer (10 - 15 minutes recommended RTM duration)
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning]);

  // Format timer mm:ss
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Pacing status based on 10-15 minute budget
  // 10 minutes = 600s, 15 minutes = 900s
  const getPacingStyle = () => {
    if (secondsElapsed < 600) {
      return 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60';
    } else if (secondsElapsed <= 900) {
      return 'text-amber-300 bg-amber-950/60 border-amber-800/60';
    } else {
      return 'text-rose-400 bg-rose-950/60 border-rose-800/60';
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        onNextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        onPrevSlide();
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        onToggleFullscreen();
      } else if (e.key.toLowerCase() === 'n') {
        e.preventDefault();
        onToggleNotes();
      } else if (e.key >= '1' && e.key <= '8') {
        onSelectSlide(parseInt(e.key, 10));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNextSlide, onPrevSlide, onToggleFullscreen, onToggleNotes, onSelectSlide]);

  return (
    <div className="no-print fixed bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-5xl w-[94%] sm:w-auto">
      <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl px-3 sm:px-5 py-2.5 flex items-center justify-between sm:justify-center gap-3 sm:gap-6">
        
        {/* Slide Counter & Dots */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="font-mono text-xs font-semibold text-white">0{currentSlide}</span>
            <span className="text-slate-500 text-xs">/</span>
            <span className="font-mono text-xs text-slate-400">0{totalSlides}</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 ml-2 border-l border-slate-700 pl-3">
            {SLIDES.map((s) => (
              <button
                key={s.id}
                onClick={() => onSelectSlide(s.slideNumber)}
                title={`Lompat ke Slide ${s.slideNumber}: ${s.title}`}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  s.slideNumber === currentSlide
                    ? 'w-7 bg-blue-500 rounded-lg'
                    : 'bg-slate-600 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onPrevSlide}
            disabled={currentSlide === 1}
            title="Slide Sebelumnya (Panah Kiri)"
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={onNextSlide}
            disabled={currentSlide === totalSlides}
            title="Slide Berikutnya (Panah Kanan / Spasi)"
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Presenter Timer (Target 10-15 Menit) */}
        <div className="hidden lg:flex items-center gap-2 border-l border-slate-700 pl-3">
          <div
            className={`px-2.5 py-1 rounded-md border text-xs font-mono font-medium flex items-center gap-1.5 ${getPacingStyle()}`}
            title="Durasi Presentasi RTM (Target: 10 - 15 Menit)"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTime(secondsElapsed)}</span>
            <span className="text-[10px] opacity-75">/ 15:00</span>
          </div>

          <button
            onClick={() => setTimerRunning(!timerRunning)}
            title={timerRunning ? 'Jeda Timer' : 'Lanjutkan Timer'}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
          >
            {timerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setSecondsElapsed(0)}
            title="Reset Timer"
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Tools: Presenter Notes & Fullscreen */}
        <div className="flex items-center gap-1.5 border-l border-slate-700 pl-3">
          <button
            onClick={onToggleNotes}
            title="Buka Catatan Presenter (Tombol N)"
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
              showNotes
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Catatan</span>
          </button>

          <button
            onClick={onToggleFullscreen}
            title={isFullscreen ? 'Keluar Layar Penuh (F / Esc)' : 'Mode Layar Penuh (F)'}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </div>
  );
};
