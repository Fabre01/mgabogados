import React, { useState } from 'react';
import { X, Scale, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { PracticeAreaId } from '../types';

interface CaseEvaluatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAndBook: (area: PracticeAreaId) => void;
}

export const CaseEvaluatorModal: React.FC<CaseEvaluatorModalProps> = ({
  isOpen,
  onClose,
  onSelectAndBook
}) => {
  const [profile, setProfile] = useState<'persona' | 'inversionista' | 'empresa'>('persona');
  const [category, setCategory] = useState<PracticeAreaId>('penal');
  const [urgency, setUrgency] = useState<'inmediata' | 'semana' | 'preventiva'>('semana');
  const [hasResult, setHasResult] = useState(false);

  if (!isOpen) return null;

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    setHasResult(true);
  };

  const getRecommendation = () => {
    if (category === 'penal') {
      return {
        title: 'Causa Penal en el Sistema Acusatorio de Panamá',
        advice:
          'Dada la naturaleza del proceso penal, la intervención temprana es crucial para la audiencia de imputación o control de garantías. El conocimiento de la Licda. Mitzy I. García (exfiscal) permitirá analizar la solidez de las evidencias y evitar medidas cautelares gravosas.',
        timeRecommended: '60 minutos (Sesión prioritaria)',
        isUrgent: urgency === 'inmediata'
      };
    }
    if (category === 'bienes_raices') {
      return {
        title: 'Tierras, Bienes Raíces & Auditoría Registral',
        advice:
          'En asuntos de tierras e inmuebles, se aconseja no firmar promesa ni adelantar dinero sin auditar el Certificado de Registro Público de la finca, verificar la legalidad de derechos posesorios ante ANATI si aplica, y asegurar las cláusulas de garantía de títulos.',
        timeRecommended: '60 minutos con revisión documental',
        isUrgent: urgency === 'inmediata'
      };
    }
    if (category === 'corporativo') {
      return {
        title: 'Estructuración Societaria o Protección Patrimonial',
        advice:
          'Ideal para constitución de Sociedades Anónimas o Fundaciones de Interés Privado (FIP). Permite planificar el relevo generacional y resguardar bienes inmuebles con absoluta confidencialidad.',
        timeRecommended: '45-60 minutos',
        isUrgent: false
      };
    }
    return {
      title: 'Asunto Civil, Familiar o Migratorio',
      advice:
        'Revisión técnica de los antecedentes para trazar la vía judicial o extrajudicial más rápida y económica.',
      timeRecommended: '45 minutos',
      isUrgent: false
    };
  };

  const rec = getRecommendation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden text-slate-800">
        
        {/* Header */}
        <div className="bg-[#0D1B2A] text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#C5A880]" />
            <h3 className="font-serif-legal font-bold text-lg text-white">
              Orientador Preliminar de Asunto Legal
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {!hasResult ? (
            <form onSubmit={handleEvaluate} className="space-y-5">
              <p className="text-xs text-slate-600">
                Responda tres preguntas para determinar el enfoque jurídico prioritario y el tipo de consulta adecuada.
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                  1. ¿Cuál es su perfil?
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setProfile('persona')}
                    className={`p-2.5 rounded-lg border text-center font-medium ${
                      profile === 'persona'
                        ? 'border-[#0D1B2A] bg-amber-50 font-bold'
                        : 'border-slate-200'
                    }`}
                  >
                    Persona Natural
                  </button>
                  <button
                    type="button"
                    onClick={() => setProfile('inversionista')}
                    className={`p-2.5 rounded-lg border text-center font-medium ${
                      profile === 'inversionista'
                        ? 'border-[#0D1B2A] bg-amber-50 font-bold'
                        : 'border-slate-200'
                    }`}
                  >
                    Inversionista
                  </button>
                  <button
                    type="button"
                    onClick={() => setProfile('empresa')}
                    className={`p-2.5 rounded-lg border text-center font-medium ${
                      profile === 'empresa'
                        ? 'border-[#0D1B2A] bg-amber-50 font-bold'
                        : 'border-slate-200'
                    }`}
                  >
                    Empresa / P.J.
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                  2. ¿En qué materia se enmarca su caso?
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as PracticeAreaId)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#C5A880]"
                >
                  <option value="penal">Derecho Penal (Investigación, citación fiscal, detención)</option>
                  <option value="bienes_raices">Tierras &amp; Bienes Raíces (Titulación ANATI, fincas, posesorios, contratos)</option>
                  <option value="corporativo">Corporativo (Sociedad Anónima, Fundación privada)</option>
                  <option value="civil_sucesiones">Civil &amp; Sucesiones (Herencias, contratos, demandas)</option>
                  <option value="familia">Familia (Divorcio, pensiones, custodia)</option>
                  <option value="migracion">Migración (Visa de inversionista en Panamá)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                  3. ¿Nivel de urgencia temporal?
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setUrgency('inmediata')}
                    className={`p-2.5 rounded-lg border text-center font-medium ${
                      urgency === 'inmediata'
                        ? 'border-rose-600 bg-rose-50 text-rose-800 font-bold'
                        : 'border-slate-200'
                    }`}
                  >
                    🚨 Menos de 24h
                  </button>
                  <button
                    type="button"
                    onClick={() => setUrgency('semana')}
                    className={`p-2.5 rounded-lg border text-center font-medium ${
                      urgency === 'semana'
                        ? 'border-[#0D1B2A] bg-amber-50 font-bold'
                        : 'border-slate-200'
                    }`}
                  >
                    Esta semana
                  </button>
                  <button
                    type="button"
                    onClick={() => setUrgency('preventiva')}
                    className={`p-2.5 rounded-lg border text-center font-medium ${
                      urgency === 'preventiva'
                        ? 'border-[#0D1B2A] bg-amber-50 font-bold'
                        : 'border-slate-200'
                    }`}
                  >
                    Planificación
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#0D1B2A] hover:bg-[#1B263B] text-[#E0C097] text-xs font-bold py-3 rounded-lg shadow transition-colors cursor-pointer"
                >
                  Obtener Diagnóstico y Recomendación
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-5">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-[#9C7A4A] font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  Diagnóstico Preliminar
                </div>
                <h4 className="font-serif-legal font-bold text-lg text-[#0D1B2A]">
                  {rec.title}
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {rec.advice}
                </p>
                <div className="pt-2 border-t border-amber-200/60 text-xs text-slate-600">
                  <strong>Tiempo de análisis recomendado:</strong> {rec.timeRecommended}
                </div>
              </div>

              {rec.isUrgent && (
                <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl text-xs text-rose-900 flex items-start gap-2.5">
                  <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Urgencia Máxima Detectada</span>
                    <span>
                      Si existe una orden de aprehensión o una audiencia inminente, comuníquese directamente a nuestra línea de urgencia: <a href="tel:+50769801122" className="underline font-bold">+507 6980-1122</a>.
                    </span>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectAndBook(category);
                  }}
                  className="w-full bg-gradient-to-r from-[#C5A880] to-[#A88550] hover:from-[#D4AF37] hover:to-[#B6935C] text-[#0D1B2A] text-xs font-bold py-3 px-4 rounded-lg shadow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Agendar Cita en Esta Materia</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setHasResult(false)}
                  className="text-xs text-slate-500 hover:text-slate-700 underline text-center pt-2"
                >
                  Modificar datos de la consulta
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
