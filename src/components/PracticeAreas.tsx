import React, { useState } from 'react';
import { PRACTICE_AREAS } from '../data/legalData';
import { PracticeAreaId } from '../types';
import {
  Gavel,
  Building2,
  Briefcase,
  Scale,
  HeartHandshake,
  Globe2,
  CheckCircle2,
  ArrowRight,
  Shield,
  Layers
} from 'lucide-react';

interface PracticeAreasProps {
  onSelectAreaForBooking: (areaId: PracticeAreaId) => void;
}

export const PracticeAreas: React.FC<PracticeAreasProps> = ({ onSelectAreaForBooking }) => {
  const [activeAreaId, setActiveAreaId] = useState<PracticeAreaId>('penal');

  const activeArea = PRACTICE_AREAS.find((a) => a.id === activeAreaId) || PRACTICE_AREAS[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Gavel':
        return <Gavel className="w-5 h-5" />;
      case 'Building2':
        return <Building2 className="w-5 h-5" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5" />;
      case 'Scale':
        return <Scale className="w-5 h-5" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5" />;
      case 'Globe2':
        return <Globe2 className="w-5 h-5" />;
      default:
        return <Scale className="w-5 h-5" />;
    }
  };

  return (
    <section id="servicios" className="py-20 lg:py-28 bg-white text-slate-800 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="text-xs uppercase tracking-widest text-[#9C7A4A] font-bold mb-2">
            Especialización Jurídica Integral
          </div>
          <h2 className="font-serif-legal text-3xl sm:text-4xl font-bold text-[#0D1B2A] tracking-tight">
            Servicios Legales &amp; Áreas de Práctica
          </h2>
          <div className="w-20 h-1 bg-[#C5A880] mx-auto mt-4 mb-6 rounded-full" />
          <p className="text-slate-600 text-base sm:text-lg">
            Ofrecemos asesoría y representación jurídica rigurosa en diversas áreas del derecho, brindando atención profesional a personas naturales y empresas en Panamá e internacionalmente.
          </p>
        </div>

        {/* Practice Areas Interactive Selector Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-10 p-1.5 bg-slate-100/80 rounded-xl border border-slate-200">
          {PRACTICE_AREAS.map((area) => {
            const isActive = area.id === activeAreaId;
            const tabLabel =
              area.id === 'bienes_raices'
                ? 'Tierras & Bienes Raíces'
                : area.id === 'penal'
                ? 'Derecho Penal'
                : area.id === 'corporativo'
                ? 'Corporativo'
                : area.id === 'civil_sucesiones'
                ? 'Civil & Sucesiones'
                : area.id === 'familia'
                ? 'Familia'
                : 'Migración';

            return (
              <button
                key={area.id}
                onClick={() => setActiveAreaId(area.id)}
                className={`flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center sm:text-left ${
                  isActive
                    ? 'bg-[#0D1B2A] text-[#E0C097] shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <span className={isActive ? 'text-[#D4AF37]' : 'text-slate-500'}>
                  {getIcon(area.iconName)}
                </span>
                <span className="truncate">{tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Active Practice Area Detail Card */}
        <div className="bg-[#FAF9F6] rounded-2xl border border-slate-200/80 p-6 sm:p-10 shadow-sm transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Detail Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#0D1B2A] text-[#E0C097] flex items-center justify-center shadow">
                  {getIcon(activeArea.iconName)}
                </div>
                <div>
                  <h3 className="font-serif-legal text-2xl sm:text-3xl font-bold text-[#0D1B2A]">
                    {activeArea.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-[#9C7A4A]">
                    {activeArea.tagline}
                  </p>
                </div>
              </div>

              <p className="text-slate-700 leading-relaxed text-base">
                {activeArea.fullDesc}
              </p>

              {/* Special highlight for Derecho Penal Phases from the client's brief */}
              {activeArea.phases && (
                <div className="pt-2">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#0D1B2A] mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#9C7A4A]" />
                    Acompañamiento en las Etapas del Proceso Penal:
                  </h4>
                  <div className="space-y-3">
                    {activeArea.phases.map((phase, i) => (
                      <div
                        key={i}
                        className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs hover:border-[#C5A880] transition-colors"
                      >
                        <div className="font-semibold text-sm text-[#0D1B2A] flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-amber-100 text-[#9C7A4A] text-xs flex items-center justify-center font-bold">
                            {i + 1}
                          </span>
                          {phase.name}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1.5 ml-8 leading-relaxed">
                          {phase.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Trigger */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => onSelectAreaForBooking(activeArea.id)}
                  className="bg-[#0D1B2A] hover:bg-[#1B263B] text-[#E0C097] font-semibold text-sm px-6 py-3 rounded-lg shadow transition-colors flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>Agendar Consulta en {activeArea.title.split('&')[0]}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href={`https://wa.me/50762348890?text=${encodeURIComponent(
                    `Hola Licda. Mitzy García, requiero asesoría sobre: ${activeArea.title}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-emerald-800 font-semibold hover:underline flex items-center justify-center gap-1.5 py-2"
                >
                  <span>Consultar por WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right: Key Focus Points Checklist */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-xl border border-slate-200/90 shadow-2xs">
              <h4 className="font-serif-legal font-bold text-lg text-[#0D1B2A] mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#9C7A4A]" />
                Alcance y Competencias
              </h4>
              <div className="space-y-3">
                {activeArea.keyAspects.map((aspect, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#9C7A4A] shrink-0 mt-0.5" />
                    <span>{aspect}</span>
                  </div>
                ))}
              </div>

              {/* Real Estate Specific Note or Criminal Specific Note */}
              <div className="mt-6 pt-5 border-t border-slate-100 bg-amber-50/60 p-4 rounded-lg text-xs text-amber-950">
                <span className="font-bold block mb-1">
                  {activeArea.id === 'penal'
                    ? '¿Su familiar o allegado está aprehendido?'
                    : activeArea.id === 'bienes_raices'
                    ? '¿Trámites de tierras ante ANATI o compra de fincas?'
                    : 'Confidencialidad Garantizada'}
                </span>
                <span>
                  {activeArea.id === 'penal'
                    ? 'Las primeras horas son decisivas para la audiencia de legalización y medidas cautelares. Contáctenos de inmediato.'
                    : activeArea.id === 'bienes_raices'
                    ? 'Verificamos la titularidad legítima, derechos posesorios ante ANATI, planos aprobados y gravámenes en el Registro Público antes de que comprometa sus fondos.'
                    : 'Todos los datos y antecedentes compartidos están protegidos bajo secreto profesional según la ley panameña.'}
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
