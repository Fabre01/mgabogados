import React, { useState, useRef } from 'react';
import { X, Upload, Check, RefreshCw, AlertCircle, Camera } from 'lucide-react';
import { saveMitzyPhoto, resetMitzyPhoto, getMitzyPhoto, OFFICIAL_MITZY_PHOTO } from '../utils/photoManager';

interface PhotoUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoUploaderModal: React.FC<PhotoUploaderModalProps> = ({ isOpen, onClose }) => {
  const [currentPhoto, setCurrentPhoto] = useState<string>(getMitzyPhoto);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Por favor seleccione un archivo de imagen válido (JPG, JPEG o PNG).');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setError('La imagen no debe superar los 15 MB.');
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setPreview(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleSave = () => {
    if (preview) {
      saveMitzyPhoto(preview);
      setCurrentPhoto(preview);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1200);
    }
  };

  const handleReset = () => {
    resetMitzyPhoto();
    setPreview(null);
    setCurrentPhoto(OFFICIAL_MITZY_PHOTO);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#0D1B2A] text-[#C5A880] flex items-center justify-center shrink-0">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif-legal font-bold text-lg text-[#0D1B2A]">
              Foto Oficial de la Titular
            </h3>
            <p className="text-xs text-slate-500">
              Licda. Mitzy I. García · Mantener rostro 100% original
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 mb-4 leading-relaxed">
          Cargue o arrastre el archivo que acaba de generar (ej. <strong className="text-[#0D1B2A]">Gemini_Generated_Image_of8nu1of8nu1of8n.jpeg</strong> o <strong>Licda. Mitzy Garcia.jpeg</strong>) desde su computadora o dispositivo para aplicarlo en alta resolución en toda la web.
        </p>

        {/* Preview & Drop Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-5 mb-5 relative transition-all ${
            isDragging
              ? 'border-[#C5A880] bg-amber-50/70 scale-[1.01]'
              : 'border-slate-300 bg-slate-50 hover:border-[#C5A880]'
          }`}
        >
          <div className="w-32 h-44 rounded-xl overflow-hidden shadow-lg border-2 border-[#C5A880] relative bg-white flex items-center justify-center">
            <img
              src={preview || currentPhoto}
              alt="Fotografía de Licda. Mitzy"
              className="w-full h-full object-cover object-[50%_15%]"
            />
          </div>

          <div className="mt-4 flex flex-col items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpeg,image/png,image/jpg,image/webp"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-[#0D1B2A] hover:bg-[#1B263B] text-white text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              <Upload className="w-4 h-4 text-[#C5A880]" />
              <span>Seleccionar o Arrastrar Imagen</span>
            </button>
            <span className="text-[11px] text-slate-500 font-medium text-center">
              Arrastre aquí su imagen o haga clic en el botón
            </span>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Success message */}
        {success && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>¡Fotografía guardada con éxito en toda la web!</span>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer py-1.5 px-2"
            title="Restablecer imagen por defecto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restablecer</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="button"
              disabled={!preview}
              onClick={handleSave}
              className={`text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                preview
                  ? 'bg-gradient-to-r from-[#C5A880] to-[#B38A4D] hover:from-[#d4af37] hover:to-[#c5a880] text-[#0D1B2A] shadow-md'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>Aplicar Fotografía</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
