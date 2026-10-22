import { useState, useEffect } from 'react';
import { getMitzyPhoto } from '../utils/photoManager';

export function useMitzyPhoto() {
  const [photo, setPhoto] = useState<string>(getMitzyPhoto);

  useEffect(() => {
    const handleUpdate = () => {
      setPhoto(getMitzyPhoto());
    };
    window.addEventListener('mitzy-photo-updated', handleUpdate);
    return () => window.removeEventListener('mitzy-photo-updated', handleUpdate);
  }, []);

  return photo;
}
