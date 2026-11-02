/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { PresentationController } from './components/PresentationController.tsx';
import { PresenterNotesDrawer } from './components/PresenterNotesDrawer.tsx';
import { PrintHandoutView } from './components/PrintHandoutView.tsx';
import { ExecutiveDashboardView } from './components/ExecutiveDashboardView.tsx';

// Slide Components
import { Slide1Cover } from './components/slides/Slide1Cover.tsx';
import { Slide2RingkasanCapaian } from './components/slides/Slide2RingkasanCapaian.tsx';
import { Slide3GrafikTren } from './components/slides/Slide3GrafikTren.tsx';
import { Slide4EvaluasiProgram } from './components/slides/Slide4EvaluasiProgram.tsx';
import { Slide5TemuanFishbone } from './components/slides/Slide5TemuanFishbone.tsx';
import { Slide6KeputusanRTM } from './components/slides/Slide6KeputusanRTM.tsx';
import { Slide7RTLTarget } from './components/slides/Slide7RTLTarget.tsx';
import { DocumentPhotoSlide } from './components/DocumentPhotoSlide.tsx';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'slides' | 'dashboard'>('slides');
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);

  const totalSlides = 8;

  // Track fullscreen state changes
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const handleToggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.warn('Fullscreen request failed:', err);
    }
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides));
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 1));
  };

  const handleSelectSlide = (slideNum: number) => {
    if (slideNum >= 1 && slideNum <= totalSlides) {
      setCurrentSlide(slideNum);
    }
  };

  const handlePrint = () => {
    setShowPrintModal(true);
  };

  const renderActiveSlide = () => {
    switch (currentSlide) {
      case 1:
        return <Slide1Cover onNext={handleNextSlide} onOpenPhotos={() => handleSelectSlide(8)} />;
      case 2:
        return <Slide2RingkasanCapaian />;
      case 3:
        return <Slide3GrafikTren />;
      case 4:
        return <Slide4EvaluasiProgram />;
      case 5:
        return <Slide5TemuanFishbone />;
      case 6:
        return <Slide6KeputusanRTM />;
      case 7:
        return <Slide7RTLTarget />;
      case 8:
        return <DocumentPhotoSlide />;
      default:
        return <Slide1Cover onNext={handleNextSlide} onOpenPhotos={() => handleSelectSlide(8)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Bar Header */}
      <Header
        currentSlide={currentSlide}
        onSelectSlide={handleSelectSlide}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        onPrint={handlePrint}
      />

      {/* Main Viewport Content */}
      <main className="no-print flex-1 flex flex-col relative w-full overflow-x-hidden">
        {viewMode === 'slides' ? (
          <div className="flex-1 flex items-center justify-center p-3 sm:p-6 lg:p-8 pb-24 md:pb-28">
            {/* 16:9 Presentation Stage Container */}
            <div className="w-full max-w-7xl aspect-[16/10] sm:aspect-[16/9] min-h-[560px] max-h-[860px] flex flex-col transition-all duration-300">
              {renderActiveSlide()}
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">
            <ExecutiveDashboardView onSelectSlide={(s) => {
              setCurrentSlide(s);
              setViewMode('slides');
            }} />
          </div>
        )}
      </main>

      {/* Slide Navigation Controller (Only in slides mode) */}
      {viewMode === 'slides' && (
        <PresentationController
          currentSlide={currentSlide}
          totalSlides={totalSlides}
          onNextSlide={handleNextSlide}
          onPrevSlide={handlePrevSlide}
          onSelectSlide={handleSelectSlide}
          showNotes={showNotes}
          onToggleNotes={() => setShowNotes(!showNotes)}
          isFullscreen={isFullscreen}
          onToggleFullscreen={handleToggleFullscreen}
        />
      )}

      {/* Presenter Notes Drawer (Collapsible) */}
      <PresenterNotesDrawer
        currentSlide={currentSlide}
        isOpen={showNotes}
        onClose={() => setShowNotes(false)}
      />

      {/* Print / PDF Handout Version (Interactive Preview Modal + Native Print) */}
      <PrintHandoutView
        isOpen={showPrintModal}
        onClose={() => setShowPrintModal(false)}
      />
    </div>
  );
}
