/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import pptxgen from 'pptxgenjs';
import {
  SCHOOL_INFO,
  METRIC_INDICATORS,
  PRIORITY_PROGRAMS,
  FISHBONE_FINDINGS,
  RTM_DECISIONS,
  TARGET_ROADMAP,
} from '../data/rtmData.ts';
import { SCHOOL_LOGO_DATA_URL } from '../assets/logoBase64.ts';
import { DocumentPhoto } from '../types/documentPhoto.ts';

/**
 * Generates and downloads a complete 16:9 PowerPoint presentation (.pptx)
 * of the RTM SPMI 2026 deck for SMKN 1 Sidayu Gresik.
 */
export async function exportRtmToPptx(documentPhotos?: DocumentPhoto[]): Promise<void> {
  const pres = new pptxgen();

  // Configure presentation layout and metadata
  pres.layout = 'LAYOUT_16x9';
  pres.author = 'SMK Negeri 1 Sidayu Gresik';
  pres.company = 'SMK Negeri 1 Sidayu Gresik';
  pres.revision = '1';
  pres.subject = 'Rapat Tinjauan Manajemen (RTM) SPMI 2026';
  pres.title = 'RTM SPMI 2026 - SMKN 1 Sidayu';

  // Palette constants (hex without #)
  const COLOR_BG_DARK = '0B1120';
  const COLOR_CARD = '1E293B';
  const COLOR_BORDER = '334155';
  const COLOR_TEXT_WHITE = 'FFFFFF';
  const COLOR_TEXT_MUTED = '94A3B8';
  const COLOR_BLUE = '2563EB';
  const COLOR_BLUE_LIGHT = '38BDF8';
  const COLOR_EMERALD = '10B981';
  const COLOR_ROSE = 'F43F5E';
  const COLOR_AMBER = 'F59E0B';

  // ==========================================
  // SLIDE 1: COVER
  // ==========================================
  const slide1 = pres.addSlide();
  slide1.background = { color: COLOR_BG_DARK };

  // School Logo
  try {
    slide1.addImage({
      data: SCHOOL_LOGO_DATA_URL,
      x: 0.8,
      y: 0.6,
      w: 1.0,
      h: 1.25,
    });
  } catch (e) {
    console.warn('Logo embed error in pptx:', e);
  }

  // Header Subtitle
  slide1.addText(
    [
      { text: 'SISTEM PENJAMINAN MUTU INTERNAL  ·  SIKLUS PPEPP\n', options: { fontSize: 13, bold: true, color: COLOR_BLUE_LIGHT } },
      { text: 'SMK NEGERI 1 SIDAYU GRESIK', options: { fontSize: 18, bold: true, color: COLOR_TEXT_WHITE } },
    ],
    { x: 2.0, y: 0.6, w: 9.0, h: 0.9, align: 'left', valign: 'top' }
  );

  // Main Title
  slide1.addText(
    [
      { text: 'RAPAT TINJAUAN MANAJEMEN (RTM)\n', options: { fontSize: 32, bold: true, color: COLOR_TEXT_WHITE } },
      { text: 'SPMI TAHUN 2026\n', options: { fontSize: 30, bold: true, color: COLOR_BLUE_LIGHT } },
      { text: 'Evaluasi Capaian Mutu Vokasi, Analisis Penurunan Indikator, dan Rencana Tindak Lanjut 2027', options: { fontSize: 14, color: COLOR_TEXT_MUTED, italic: true } },
    ],
    { x: 0.8, y: 2.2, w: 11.5, h: 2.0, align: 'left', valign: 'middle' }
  );

  // Leadership & Team Box
  slide1.addShape(pres.ShapeType.roundRect, {
    x: 0.8,
    y: 4.5,
    w: 6.8,
    h: 1.7,
    fill: { color: COLOR_CARD },
    line: { color: COLOR_BORDER, width: 1 },
    rectRadius: 0.15,
  });

  slide1.addText(
    [
      { text: 'PIMPINAN SIDANG & TIM RTM:\n', options: { fontSize: 11, bold: true, color: COLOR_BLUE_LIGHT } },
      { text: `Kepala Sekolah : ${SCHOOL_INFO.principalName} (${SCHOOL_INFO.principalTitle})\n`, options: { fontSize: 12, bold: true, color: COLOR_TEXT_WHITE } },
      { text: `Pengawas SMK    : ${SCHOOL_INFO.supervisorName || 'SHODIKUN, S.Pd., MM'}\n`, options: { fontSize: 12, bold: true, color: COLOR_TEXT_WHITE } },
      { text: `Peserta         : Tim TPMPS & Manajemen SMKN 1 Sidayu Gresik`, options: { fontSize: 11, color: COLOR_TEXT_MUTED } },
    ],
    { x: 1.1, y: 4.65, w: 6.2, h: 1.4, align: 'left', valign: 'top' }
  );

  // Quick KPI Snapshot Cards
  slide1.addShape(pres.ShapeType.roundRect, {
    x: 7.9,
    y: 4.5,
    w: 4.5,
    h: 1.7,
    fill: { color: COLOR_CARD },
    line: { color: COLOR_BORDER, width: 1 },
    rectRadius: 0.15,
  });

  slide1.addText(
    [
      { text: 'RINGKASAN INDIKATOR PRIORITAS:\n', options: { fontSize: 11, bold: true, color: COLOR_AMBER } },
      { text: '• Link & Match: 71,79 (Δ -2,21)\n', options: { fontSize: 12, bold: true, color: COLOR_TEXT_WHITE } },
      { text: '• Pembelajaran DUDI: 77,66 (Δ -0,34)\n', options: { fontSize: 12, bold: true, color: COLOR_TEXT_WHITE } },
      { text: '• Kemampuan Numerasi: 86,67% (Δ -2,22%)\n', options: { fontSize: 12, bold: true, color: COLOR_TEXT_WHITE } },
    ],
    { x: 8.1, y: 4.65, w: 4.1, h: 1.4, align: 'left', valign: 'top' }
  );

  // Footer
  slide1.addText(
    'SMK Negeri 1 Sidayu Gresik · Tanggal Sidang: 17 September 2026 · Target Paparan: 10-15 Menit',
    { x: 0.8, y: 6.6, w: 11.5, h: 0.4, fontSize: 10, color: COLOR_TEXT_MUTED, align: 'center' }
  );

  // ==========================================
  // SLIDE 2: RINGKASAN CAPAIAN MUTU 2026
  // ==========================================
  const slide2 = pres.addSlide();
  slide2.background = { color: COLOR_BG_DARK };

  slide2.addText(
    [
      { text: 'SLIDE 02 · EVALUASI CAPAIAN RAPOR MUTU\n', options: { fontSize: 12, bold: true, color: COLOR_BLUE_LIGHT } },
      { text: 'Ringkasan Capaian Mutu 2026', options: { fontSize: 24, bold: true, color: COLOR_TEXT_WHITE } },
    ],
    { x: 0.8, y: 0.5, w: 8.0, h: 0.8, align: 'left', valign: 'top' }
  );

  // 3 KPI Cards
  const kpiData = [
    {
      title: '01. Link and Match',
      score: '71,79',
      unit: 'Poin Indeks',
      prev: '74,00',
      delta: '-2,21',
      desc: 'Keterlibatan industri dalam kurikulum, magang guru, sertifikasi, dan serapan lulusan.',
    },
    {
      title: '02. Selaras Dunia Kerja',
      score: '77,66',
      unit: 'Poin Indeks',
      prev: '78,00',
      delta: '-0,34',
      desc: 'Implementasi model Project Based Learning (PjBL) nyata & budaya kerja 5R di bengkel.',
    },
    {
      title: '03. Kemampuan Numerasi',
      score: '86,67%',
      unit: 'Pencapaian',
      prev: '88,89%',
      delta: '-2,22%',
      desc: 'Daya nalar matematis kontekstual murid vokasi pada instrumen Asesmen Nasional.',
    },
  ];

  kpiData.forEach((kpi, idx) => {
    const xPos = 0.8 + idx * 3.9;
    slide2.addShape(pres.ShapeType.roundRect, {
      x: xPos,
      y: 1.6,
      w: 3.6,
      h: 3.7,
      fill: { color: COLOR_CARD },
      line: { color: COLOR_BORDER, width: 1 },
      rectRadius: 0.15,
    });

    slide2.addText(
      [
        { text: `${kpi.title}\n`, options: { fontSize: 15, bold: true, color: COLOR_BLUE_LIGHT } },
        { text: 'Predikat: BAIK (Perlu Atensi)\n\n', options: { fontSize: 11, bold: true, color: COLOR_EMERALD } },
        { text: `${kpi.score}\n`, options: { fontSize: 32, bold: true, color: COLOR_TEXT_WHITE } },
        { text: `${kpi.unit}\n\n`, options: { fontSize: 12, color: COLOR_TEXT_MUTED } },
        { text: `Tahun Lalu : ${kpi.prev}\n`, options: { fontSize: 12, color: COLOR_TEXT_WHITE } },
        { text: `Tren Mutu  : ${kpi.delta} (Menurun)\n\n`, options: { fontSize: 12, bold: true, color: COLOR_ROSE } },
        { text: kpi.desc, options: { fontSize: 11, color: COLOR_TEXT_MUTED } },
      ],
      { x: xPos + 0.2, y: 1.8, w: 3.2, h: 3.3, align: 'left', valign: 'top' }
    );
  });

  // Callout Box at Bottom
  slide2.addShape(pres.ShapeType.roundRect, {
    x: 0.8,
    y: 5.6,
    w: 11.5,
    h: 1.2,
    fill: { color: '451A03' },
    line: { color: COLOR_AMBER, width: 1 },
    rectRadius: 0.1,
  });

  slide2.addText(
    [
      { text: 'CATATAN KRITIS SIDANG RTM:\n', options: { fontSize: 11, bold: true, color: COLOR_AMBER } },
      {
        text: 'Meskipun ketiga indikator masih berada pada predikat "Baik" (>70 poin), seluruhnya mengalami tren penurunan faktual (Link & Match -2,21, Selaras DUDI -0,34, Numerasi -2,22%). Diperlukan intervensi terstruktur agar tidak memicu degradasi akreditasi dan Rapor Pendidikan.',
        options: { fontSize: 12, color: COLOR_TEXT_WHITE },
      },
    ],
    { x: 1.1, y: 5.75, w: 11.0, h: 0.9, align: 'left', valign: 'top' }
  );

  // ==========================================
  // SLIDE 3: GRAFIK TREN PENURUNAN MUTU
  // ==========================================
  const slide3 = pres.addSlide();
  slide3.background = { color: COLOR_BG_DARK };

  slide3.addText(
    [
      { text: 'SLIDE 03 · ANALISIS KOMPARASI 2 TAHUN\n', options: { fontSize: 12, bold: true, color: COLOR_BLUE_LIGHT } },
      { text: 'Grafik & Tabel Tren Penurunan Mutu', options: { fontSize: 24, bold: true, color: COLOR_TEXT_WHITE } },
    ],
    { x: 0.8, y: 0.5, w: 10.0, h: 0.8, align: 'left', valign: 'top' }
  );

  // Table Data
  const tableData: pptxgen.TableRow[] = [
    [
      { text: 'Indikator Mutu', options: { bold: true, fill: { color: COLOR_BLUE }, color: COLOR_TEXT_WHITE, fontSize: 12 } },
      { text: 'Tahun Sebelumnya', options: { bold: true, fill: { color: COLOR_BLUE }, color: COLOR_TEXT_WHITE, fontSize: 12, align: 'center' as const } },
      { text: 'Tahun 2026', options: { bold: true, fill: { color: COLOR_BLUE }, color: COLOR_TEXT_WHITE, fontSize: 12, align: 'center' as const } },
      { text: 'Selisih (Δ)', options: { bold: true, fill: { color: COLOR_BLUE }, color: COLOR_TEXT_WHITE, fontSize: 12, align: 'center' as const } },
      { text: 'Status Penurunan', options: { bold: true, fill: { color: COLOR_BLUE }, color: COLOR_TEXT_WHITE, fontSize: 12, align: 'center' as const } },
    ],
    [
      { text: '1. Link and Match (Kemitraan DUDI)', options: { color: COLOR_TEXT_WHITE, fontSize: 12, fill: { color: COLOR_CARD } } },
      { text: '74,00', options: { color: COLOR_TEXT_WHITE, fontSize: 12, align: 'center' as const, fill: { color: COLOR_CARD } } },
      { text: '71,79', options: { bold: true, color: COLOR_TEXT_WHITE, fontSize: 12, align: 'center' as const, fill: { color: COLOR_CARD } } },
      { text: '-2,21', options: { bold: true, color: COLOR_ROSE, fontSize: 12, align: 'center' as const, fill: { color: COLOR_CARD } } },
      { text: 'Turun Signifikan', options: { bold: true, color: COLOR_ROSE, fontSize: 12, align: 'center' as const, fill: { color: COLOR_CARD } } },
    ],
    [
      { text: '2. Pembelajaran Selaras Dunia Kerja', options: { color: COLOR_TEXT_WHITE, fontSize: 12, fill: { color: '141E33' } } },
      { text: '78,00', options: { color: COLOR_TEXT_WHITE, fontSize: 12, align: 'center' as const, fill: { color: '141E33' } } },
      { text: '77,66', options: { bold: true, color: COLOR_TEXT_WHITE, fontSize: 12, align: 'center' as const, fill: { color: '141E33' } } },
      { text: '-0,34', options: { bold: true, color: COLOR_ROSE, fontSize: 12, align: 'center' as const, fill: { color: '141E33' } } },
      { text: 'Turun Tipis', options: { bold: true, color: COLOR_AMBER, fontSize: 12, align: 'center' as const, fill: { color: '141E33' } } },
    ],
    [
      { text: '3. Kemampuan Numerasi Murid', options: { color: COLOR_TEXT_WHITE, fontSize: 12, fill: { color: COLOR_CARD } } },
      { text: '88,89%', options: { color: COLOR_TEXT_WHITE, fontSize: 12, align: 'center' as const, fill: { color: COLOR_CARD } } },
      { text: '86,67%', options: { bold: true, color: COLOR_TEXT_WHITE, fontSize: 12, align: 'center' as const, fill: { color: COLOR_CARD } } },
      { text: '-2,22%', options: { bold: true, color: COLOR_ROSE, fontSize: 12, align: 'center' as const, fill: { color: COLOR_CARD } } },
      { text: 'Turun Signifikan', options: { bold: true, color: COLOR_ROSE, fontSize: 12, align: 'center' as const, fill: { color: COLOR_CARD } } },
    ],
  ];

  slide3.addTable(tableData, {
    x: 0.8,
    y: 1.6,
    w: 11.5,
    colW: [4.2, 1.8, 1.8, 1.8, 1.9],
    border: { pt: 1, color: COLOR_BORDER },
  });

  // Risk Mitigation Note
  slide3.addShape(pres.ShapeType.roundRect, {
    x: 0.8,
    y: 4.3,
    w: 11.5,
    h: 2.3,
    fill: { color: COLOR_CARD },
    line: { color: COLOR_BORDER, width: 1 },
    rectRadius: 0.15,
  });

  slide3.addText(
    [
      { text: 'IMPLIKASI STRATEGIS & MITIGASI RISIKO:\n', options: { fontSize: 13, bold: true, color: COLOR_ROSE } },
      {
        text: '1. Sinyal Peringatan Dini (Early Warning): Penurunan skor pada Rapor Mutu ini bukan kegagalan total, melainkan alarm objektif bahwa mekanisme pendampingan magang dan kurikulum terapan butuh pembaruan berkala.\n\n',
        options: { fontSize: 12, color: COLOR_TEXT_WHITE },
      },
      {
        text: '2. Penguatan Asesmen Numerasi Terapan: Siswa terbiasa menyelesaikan soal mekanis, tetapi kesulitan ketika dihadapkan pada soal penalaran konteks industri (misal: kalkulasi beban, estimasi biaya produksi, toleransi presisi mesin).\n\n',
        options: { fontSize: 12, color: COLOR_TEXT_WHITE },
      },
      {
        text: '3. Komitmen Kepala Sekolah & TPMPS: Menjadikan ketiga indikator ini sebagai fokus utama dalam Rencana Kerja Tahunan (RKT) dan RKAS tahun berikutnya.',
        options: { fontSize: 12, color: COLOR_TEXT_MUTED },
      },
    ],
    { x: 1.1, y: 4.5, w: 10.9, h: 2.0, align: 'left', valign: 'top' }
  );

  // ==========================================
  // SLIDE 4: EVALUASI PROGRAM KERJA PRIORITAS
  // ==========================================
  const slide4 = pres.addSlide();
  slide4.background = { color: COLOR_BG_DARK };

  slide4.addText(
    [
      { text: 'SLIDE 04 · EVALUASI KINERJA PROGRAM 2026\n', options: { fontSize: 12, bold: true, color: COLOR_BLUE_LIGHT } },
      { text: 'Evaluasi 7 Program Kerja Prioritas (Traffic Light)', options: { fontSize: 24, bold: true, color: COLOR_TEXT_WHITE } },
    ],
    { x: 0.8, y: 0.5, w: 10.0, h: 0.8, align: 'left', valign: 'top' }
  );

  const progTableData: pptxgen.TableRow[] = [
    [
      { text: 'No', options: { bold: true, fill: { color: COLOR_BLUE }, color: COLOR_TEXT_WHITE, fontSize: 11, align: 'center' as const } },
      { text: 'Nama Program Kerja', options: { bold: true, fill: { color: COLOR_BLUE }, color: COLOR_TEXT_WHITE, fontSize: 11 } },
      { text: 'Status', options: { bold: true, fill: { color: COLOR_BLUE }, color: COLOR_TEXT_WHITE, fontSize: 11, align: 'center' as const } },
      { text: 'Realisasi Faktual', options: { bold: true, fill: { color: COLOR_BLUE }, color: COLOR_TEXT_WHITE, fontSize: 11 } },
      { text: 'Kesenjangan Outcome (Gap Analysis)', options: { bold: true, fill: { color: COLOR_BLUE }, color: COLOR_TEXT_WHITE, fontSize: 11 } },
    ],
    ...PRIORITY_PROGRAMS.map((p, i) => [
      { text: String(i + 1), options: { color: COLOR_TEXT_WHITE, fontSize: 10, align: 'center' as const, fill: { color: i % 2 === 0 ? COLOR_CARD : '141E33' } } },
      { text: p.name, options: { bold: true, color: COLOR_TEXT_WHITE, fontSize: 10, fill: { color: i % 2 === 0 ? COLOR_CARD : '141E33' } } },
      { text: '🟢 100% Selesai', options: { bold: true, color: COLOR_EMERALD, fontSize: 10, align: 'center' as const, fill: { color: i % 2 === 0 ? COLOR_CARD : '141E33' } } },
      { text: p.realizationQuantity, options: { color: COLOR_TEXT_WHITE, fontSize: 9.5, fill: { color: i % 2 === 0 ? COLOR_CARD : '141E33' } } },
      { text: p.gapAnalysis, options: { color: COLOR_TEXT_MUTED, fontSize: 9.5, fill: { color: i % 2 === 0 ? COLOR_CARD : '141E33' } } },
    ]),
  ];

  slide4.addTable(progTableData, {
    x: 0.8,
    y: 1.5,
    w: 11.5,
    colW: [0.6, 2.8, 1.4, 3.2, 3.5],
    border: { pt: 0.5, color: COLOR_BORDER },
  });

  // Paradox Summary
  slide4.addShape(pres.ShapeType.roundRect, {
    x: 0.8,
    y: 5.6,
    w: 11.5,
    h: 1.2,
    fill: { color: '1E3A8A' },
    line: { color: COLOR_BLUE_LIGHT, width: 1 },
    rectRadius: 0.1,
  });

  slide4.addText(
    [
      { text: 'PARADOKS KESENJANGAN OUTPUT VS OUTCOME:\n', options: { fontSize: 11, bold: true, color: COLOR_BLUE_LIGHT } },
      {
        text: 'Secara administratif, seluruh 7 program prioritas terlaksana 100% (Status Hijau). Namun, capaian mutu siswa tetap menurun karena kualitas keterlibatan industri dan materi numerasi belum tertransformasi secara mendalam ke dalam kebiasaan belajar siswa.',
        options: { fontSize: 12, color: COLOR_TEXT_WHITE },
      },
    ],
    { x: 1.1, y: 5.75, w: 11.0, h: 0.9, align: 'left', valign: 'top' }
  );

  // ==========================================
  // SLIDE 5: TEMUAN RTM (FISHBONE DIAGRAM)
  // ==========================================
  const slide5 = pres.addSlide();
  slide5.background = { color: COLOR_BG_DARK };

  slide5.addText(
    [
      { text: 'SLIDE 05 · ANALISIS AKAR MASALAH (ISHIKAWA)\n', options: { fontSize: 12, bold: true, color: COLOR_BLUE_LIGHT } },
      { text: 'Temuan RTM & Analisis Sebab-Akibat', options: { fontSize: 24, bold: true, color: COLOR_TEXT_WHITE } },
    ],
    { x: 0.8, y: 0.5, w: 10.0, h: 0.8, align: 'left', valign: 'top' }
  );

  // 4 Fishbone Finding Cards
  FISHBONE_FINDINGS.forEach((finding, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const xPos = 0.8 + col * 5.9;
    const yPos = 1.5 + row * 2.5;

    slide5.addShape(pres.ShapeType.roundRect, {
      x: xPos,
      y: yPos,
      w: 5.6,
      h: 2.3,
      fill: { color: COLOR_CARD },
      line: { color: COLOR_BORDER, width: 1 },
      rectRadius: 0.15,
    });

    slide5.addText(
      [
        { text: `TEMUAN 0${finding.findingNumber}: ${finding.category.toUpperCase()}\n`, options: { fontSize: 12, bold: true, color: COLOR_BLUE_LIGHT } },
        { text: `${finding.mainFinding}\n`, options: { fontSize: 13, bold: true, color: COLOR_TEXT_WHITE } },
        { text: `Akar Masalah: ${finding.rootCauses.join('; ')}\n`, options: { fontSize: 11, color: COLOR_ROSE } },
        { text: `Solusi RTM  : ${finding.recommendedFix}`, options: { fontSize: 11, bold: true, color: COLOR_EMERALD } },
      ],
      { x: xPos + 0.25, y: yPos + 0.2, w: 5.1, h: 1.9, align: 'left', valign: 'top' }
    );
  });

  slide5.addText(
    'Fokus Analisis: Mengubah temuan akar masalah di atas menjadi 6 Keputusan Sidang Pleno RTM yang mengikat (Slide 6).',
    { x: 0.8, y: 6.6, w: 11.5, h: 0.4, fontSize: 11, color: COLOR_TEXT_MUTED, align: 'center', italic: true }
  );

  // ==========================================
  // SLIDE 6: KEPUTUSAN SIDANG RTM
  // ==========================================
  const slide6 = pres.addSlide();
  slide6.background = { color: COLOR_BG_DARK };

  slide6.addText(
    [
      { text: 'SLIDE 06 · DASHBOARD PENETAPAN KEBIJAKAN\n', options: { fontSize: 12, bold: true, color: COLOR_BLUE_LIGHT } },
      { text: 'Keputusan Sidang RTM (Action Plan Matrix)', options: { fontSize: 24, bold: true, color: COLOR_TEXT_WHITE } },
    ],
    { x: 0.8, y: 0.5, w: 10.0, h: 0.8, align: 'left', valign: 'top' }
  );

  // 6 Decisions Grid
  RTM_DECISIONS.forEach((dec, idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const xPos = 0.8 + col * 3.9;
    const yPos = 1.5 + row * 2.5;

    slide6.addShape(pres.ShapeType.roundRect, {
      x: xPos,
      y: yPos,
      w: 3.6,
      h: 2.3,
      fill: { color: COLOR_CARD },
      line: { color: COLOR_BORDER, width: 1 },
      rectRadius: 0.15,
    });

    slide6.addText(
      [
        { text: `#0${idx + 1} · ${dec.category}\n`, options: { fontSize: 11, bold: true, color: COLOR_BLUE_LIGHT } },
        { text: `${dec.title}\n`, options: { fontSize: 12, bold: true, color: COLOR_TEXT_WHITE } },
        { text: `Target : ${dec.targetKPI}\n`, options: { fontSize: 10.5, bold: true, color: COLOR_EMERALD } },
        { text: `PIC    : ${dec.pic}\n`, options: { fontSize: 10.5, color: COLOR_TEXT_WHITE } },
        { text: `Waktu  : ${dec.timeline}`, options: { fontSize: 10.5, color: COLOR_TEXT_MUTED } },
      ],
      { x: xPos + 0.2, y: yPos + 0.2, w: 3.2, h: 1.9, align: 'left', valign: 'top' }
    );
  });

  slide6.addText(
    'Seluruh keputusan sidang di atas telah disetujui secara mufakat oleh Kepala Sekolah, Pengawas, dan Tim TPMPS.',
    { x: 0.8, y: 6.6, w: 11.5, h: 0.4, fontSize: 11, color: COLOR_EMERALD, align: 'center', bold: true }
  );

  // ==========================================
  // SLIDE 7: RTL & TARGET MUTU 2027
  // ==========================================
  const slide7 = pres.addSlide();
  slide7.background = { color: COLOR_BG_DARK };

  slide7.addText(
    [
      { text: 'SLIDE 07 · RENCANA TINDAK LANJUT & SASARAN STRATEGIS\n', options: { fontSize: 12, bold: true, color: COLOR_BLUE_LIGHT } },
      { text: 'RTL dan Target Mutu 2027 (Roadmap Mutu)', options: { fontSize: 24, bold: true, color: COLOR_TEXT_WHITE } },
    ],
    { x: 0.8, y: 0.5, w: 10.0, h: 0.8, align: 'left', valign: 'top' }
  );

  // Left: Target 2027 Table
  const targetTable: pptxgen.TableRow[] = [
    [
      { text: 'Indikator Kunci', options: { bold: true, fill: { color: COLOR_BLUE }, color: COLOR_TEXT_WHITE, fontSize: 11 } },
      { text: 'Realisasi 2026', options: { bold: true, fill: { color: COLOR_BLUE }, color: COLOR_TEXT_WHITE, fontSize: 11, align: 'center' as const } },
      { text: 'Target 2027', options: { bold: true, fill: { color: COLOR_BLUE }, color: COLOR_TEXT_WHITE, fontSize: 11, align: 'center' as const } },
      { text: 'Kenaikan', options: { bold: true, fill: { color: COLOR_BLUE }, color: COLOR_TEXT_WHITE, fontSize: 11, align: 'center' as const } },
    ],
    [
      { text: 'Link and Match', options: { color: COLOR_TEXT_WHITE, fontSize: 11, fill: { color: COLOR_CARD } } },
      { text: '71,79', options: { color: COLOR_TEXT_WHITE, fontSize: 11, align: 'center' as const, fill: { color: COLOR_CARD } } },
      { text: '80,00', options: { bold: true, color: COLOR_EMERALD, fontSize: 11, align: 'center' as const, fill: { color: COLOR_CARD } } },
      { text: '+8,21', options: { bold: true, color: COLOR_EMERALD, fontSize: 11, align: 'center' as const, fill: { color: COLOR_CARD } } },
    ],
    [
      { text: 'Pembelajaran Selaras DUDI', options: { color: COLOR_TEXT_WHITE, fontSize: 11, fill: { color: '141E33' } } },
      { text: '77,66', options: { color: COLOR_TEXT_WHITE, fontSize: 11, align: 'center' as const, fill: { color: '141E33' } } },
      { text: '85,00', options: { bold: true, color: COLOR_EMERALD, fontSize: 11, align: 'center' as const, fill: { color: '141E33' } } },
      { text: '+7,34', options: { bold: true, color: COLOR_EMERALD, fontSize: 11, align: 'center' as const, fill: { color: '141E33' } } },
    ],
    [
      { text: 'Kemampuan Numerasi Murid', options: { color: COLOR_TEXT_WHITE, fontSize: 11, fill: { color: COLOR_CARD } } },
      { text: '86,67%', options: { color: COLOR_TEXT_WHITE, fontSize: 11, align: 'center' as const, fill: { color: COLOR_CARD } } },
      { text: '90,00%', options: { bold: true, color: COLOR_EMERALD, fontSize: 11, align: 'center' as const, fill: { color: COLOR_CARD } } },
      { text: '+3,33%', options: { bold: true, color: COLOR_EMERALD, fontSize: 11, align: 'center' as const, fill: { color: COLOR_CARD } } },
    ],
  ];

  slide7.addTable(targetTable, {
    x: 0.8,
    y: 1.5,
    w: 5.6,
    colW: [2.3, 1.1, 1.1, 1.1],
    border: { pt: 0.5, color: COLOR_BORDER },
  });

  // Right: 3-Year Strategic Roadmap
  slide7.addShape(pres.ShapeType.roundRect, {
    x: 6.8,
    y: 1.5,
    w: 5.5,
    h: 3.5,
    fill: { color: COLOR_CARD },
    line: { color: COLOR_BORDER, width: 1 },
    rectRadius: 0.15,
  });

  slide7.addText(
    [
      { text: 'ROADMAP PENGEMBANGAN MUTU 2027–2029:\n', options: { fontSize: 12, bold: true, color: COLOR_BLUE_LIGHT } },
      ...TARGET_ROADMAP.flatMap((step) => [
        { text: `Tahun ${step.year}: ${step.title}\n`, options: { fontSize: 12, bold: true, color: COLOR_TEXT_WHITE } },
        { text: `Fokus: ${step.focus}\n\n`, options: { fontSize: 11, color: COLOR_TEXT_MUTED } },
      ]),
    ],
    { x: 7.0, y: 1.7, w: 5.1, h: 3.1, align: 'left', valign: 'top' }
  );

  // Sign-off Box
  slide7.addShape(pres.ShapeType.roundRect, {
    x: 0.8,
    y: 5.2,
    w: 11.5,
    h: 1.5,
    fill: { color: COLOR_CARD },
    line: { color: COLOR_BORDER, width: 1 },
    rectRadius: 0.15,
  });

  slide7.addText(
    [
      { text: 'LEMBAR PENGESAHAN HASIL RAPAT TINJAUAN MANAJEMEN:\n', options: { fontSize: 11, bold: true, color: COLOR_BLUE_LIGHT } },
      { text: 'Ditetapkan di Sidayu, Gresik · Pada tanggal 17 September 2026\n', options: { fontSize: 11, color: COLOR_TEXT_MUTED } },
      { text: `Kepala Sekolah: ${SCHOOL_INFO.principalName} (NIP. ${SCHOOL_INFO.principalNip})\n`, options: { fontSize: 12, bold: true, color: COLOR_TEXT_WHITE } },
      { text: 'Pengawas Pembina SMK: SHODIKUN, S.Pd., MM · Disahkan untuk masuk RKAS & RKT 2027', options: { fontSize: 11, color: COLOR_EMERALD } },
    ],
    { x: 1.1, y: 5.35, w: 10.9, h: 1.2, align: 'left', valign: 'top' }
  );

  // ==========================================
  // SLIDE 8: DOKUMENTASI FOTO BERKAS & BUKTI FISIK
  // ==========================================
  const slide8 = pres.addSlide();
  slide8.background = { color: COLOR_BG_DARK };

  slide8.addText(
    [
      { text: 'SLIDE 08 · LAMPIRAN EKSEKUTIF\n', options: { fontSize: 12, bold: true, color: COLOR_BLUE_LIGHT } },
      { text: 'Dokumentasi Foto Berkas & Bukti Fisik SPMI', options: { fontSize: 24, bold: true, color: COLOR_TEXT_WHITE } },
    ],
    { x: 0.8, y: 0.5, w: 10.0, h: 0.8, align: 'left', valign: 'top' }
  );

  const photosToInclude = documentPhotos && documentPhotos.length > 0 ? documentPhotos : [];

  if (photosToInclude.length > 0) {
    const mainPhoto = photosToInclude[0];
    slide8.addShape(pres.ShapeType.roundRect, {
      x: 0.8,
      y: 1.5,
      w: 11.5,
      h: 5.0,
      fill: { color: COLOR_CARD },
      line: { color: COLOR_BORDER, width: 1 },
      rectRadius: 0.15,
    });

    slide8.addText(
      [
        { text: `BUKTI FISIK DOKUMEN: ${mainPhoto.title}\n`, options: { fontSize: 14, bold: true, color: COLOR_BLUE_LIGHT } },
        { text: `Kategori: ${mainPhoto.category} · Tanggal: ${mainPhoto.uploadedAt}\n\n`, options: { fontSize: 12, color: COLOR_TEXT_MUTED } },
        { text: `${mainPhoto.description || 'Tersimpan di sistem cloud Firebase Firestore SMKN 1 Sidayu Gresik.'}\n\n`, options: { fontSize: 12, color: COLOR_TEXT_WHITE } },
        { text: `Total berkas foto yang tersimpan dalam sistem: ${photosToInclude.length} foto dokumen.\n`, options: { fontSize: 12, bold: true, color: COLOR_EMERALD } },
        { text: 'Semua foto dokumen dapat dilihat secara interaktif dan beresolusi penuh melalui menu Slide 8 di aplikasi web RTM.', options: { fontSize: 11, italic: true, color: COLOR_TEXT_MUTED } },
      ],
      { x: 1.2, y: 2.0, w: 10.7, h: 4.0, align: 'left', valign: 'top' }
    );
  } else {
    slide8.addShape(pres.ShapeType.roundRect, {
      x: 0.8,
      y: 1.5,
      w: 11.5,
      h: 5.0,
      fill: { color: COLOR_CARD },
      line: { color: COLOR_BORDER, width: 1 },
      rectRadius: 0.15,
    });

    slide8.addText(
      [
        { text: 'LAMPIRAN FOTO DOKUMEN & BUKTI FISIK SPMI\n', options: { fontSize: 16, bold: true, color: COLOR_BLUE_LIGHT } },
        { text: '1. Lembar RKT Hal 21 (Bukti Faktual Penurunan Skor Mutu & Rincian Akar Masalah)\n', options: { fontSize: 13, bold: true, color: COLOR_TEXT_WHITE } },
        { text: '2. Dokumentasi Sarana & Lingkungan Belajar SMKN 1 Sidayu Gresik\n', options: { fontSize: 13, bold: true, color: COLOR_TEXT_WHITE } },
        { text: '3. Berita Acara & Daftar Hadir Sidang RTM 2026\n\n', options: { fontSize: 13, bold: true, color: COLOR_TEXT_WHITE } },
        { text: 'Status Penyimpanan: Tersinkronisasi aman pada Firebase Firestore SMKN 1 Sidayu.', options: { fontSize: 12, color: COLOR_EMERALD } },
      ],
      { x: 1.2, y: 2.2, w: 10.7, h: 3.5, align: 'left', valign: 'top' }
    );
  }

  // Save the PPTX file
  await pres.writeFile({ fileName: 'RTM_SPMI_2026_SMKN_1_SIDAYU.pptx' });
}
