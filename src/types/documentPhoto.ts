/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DocumentPhoto {
  id: string;
  title: string;
  category: 'Dokumen LK-02 / RKT' | 'Daftar Hadir Sidang' | 'Dokumentasi Rapat RTM' | 'SK Tim TPMPS' | 'Lainnya';
  imageUrl: string;
  description?: string;
  uploadedAt: string;
}
