/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TEAM_IMAGES } from '../assets/teamImages';

export const OFFICIAL_MITZY_PHOTO = TEAM_IMAGES.mitzy;

const STORAGE_KEY = 'mg_mitzy_custom_photo_v3';

export function getMitzyPhoto(): string {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && saved.startsWith('data:image')) {
        return saved;
      }
    } catch {
      // ignore
    }
  }
  return OFFICIAL_MITZY_PHOTO;
}

export function saveMitzyPhoto(dataUrl: string): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, dataUrl);
      window.dispatchEvent(new Event('mitzy-photo-updated'));
    } catch (err) {
      console.error('Error saving photo to localStorage:', err);
    }
  }
}

export function resetMitzyPhoto(): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new Event('mitzy-photo-updated'));
    } catch (err) {
      console.error('Error resetting photo:', err);
    }
  }
}
