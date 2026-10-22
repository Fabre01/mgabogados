import React from 'react';
import { Calendar, Shield, Award, Building, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ATTORNEY_PROFILE, TEAM_MEMBERS } from '../data/legalData';
import { Logo } from './Logo';
import { useMitzyPhoto } from '../hooks/useMitzyPhoto';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenCaseEvaluator: () => void;
  onOpenPhotoUploader?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenCaseEvaluator, onOpenPhotoUploader }) => {
  const mitzyPhoto = useMitzyPhoto();
  return (
    <section id="inicio" className="relative bg-[#0D1B2A] text-white pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
      {/* Background Architectural Watermark & Gradients */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c5a880_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-32 right-0 w-[550px] h-[550px] bg-gradient-to-bl from-[#c5a880]/15 via-[#1b263b]/30 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#0a1420] to-transparent rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Positioning & Actions */}
          <div className="lg:col-span-7 space-y-7 text-left">
            
            {/* Top Credential Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs text-[#E0C097]">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-medium tracking-wide">
                Experiencia Exfiscal · Más de 10 años en el Ministerio Público
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif-legal text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.18]">
              Seguridad Jurídica en{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E0C097] via-[#D4AF37] to-[#B38A4D]">
                Tierras &amp; Bienes Raíces
              </span>{' '}
              y Defensa Penal en Panamá
            </h1>

            {/* Lead Description directly based on user's document */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Despacho jurídico enfocado en brindar asesoría legal responsable, estratégica y comprometida con la defensa de sus derechos y patrimonio. Dirigido por la <strong className="text-white font-semibold">Licda. Mitzy I. García</strong>, abogada panameña con profundo dominio en titulación de tierras ante ANATI, regularización de derechos posesorios, debida diligencia registral de fincas y litigación penal.
            </p>

            {/* Quick Guarantees / Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>Atención directa y transparente</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>Estrategias a la medida de cada caso</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>Titulación de tierras y auditoría de fincas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>Modalidad Presencial y Virtual internacional</span>
              </div>
            </div>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
              <button
                onClick={onOpenBooking}
                className="bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#B38A4D] hover:from-[#d6ba94] hover:to-[#c49a5b] text-[#0D1B2A] font-bold text-base px-7 py-3.5 rounded-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <Calendar className="w-5 h-5 text-[#0D1B2A]" />
                <span>Agendar Consulta Legal</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#servicios"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg border border-slate-700 hover:border-slate-500 bg-slate-900/50 hover:bg-slate-800/80 text-slate-200 font-medium text-sm transition-all"
              >
                Explorar Servicios
              </a>

              <button
                onClick={onOpenCaseEvaluator}
                className="text-xs text-amber-200/80 hover:text-amber-100 underline underline-offset-4 sm:ml-2 text-center"
              >
                ¿Dudas sobre su caso? Evaluar aquí
              </button>
            </div>

            {/* Team Avatars Trust Strip */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-4">
              <a href="#equipo" className="flex -space-x-2.5 overflow-hidden group">
                {TEAM_MEMBERS.map((member) => (
                  <img
                    key={member.id}
                    src={member.id === 'mitzy-garcia' ? mitzyPhoto : member.image}
                    alt={member.name}
                    title={`${member.name} - ${member.role}`}
                    className="inline-block h-11 w-11 rounded-full ring-2 ring-[#C5A880] object-cover object-top shadow-md group-hover:scale-105 transition-transform"
                  />
                ))}
              </a>
              <div className="text-xs">
                <div className="font-semibold text-white flex items-center gap-2">
                  <span>Cuerpo Jurídico de Exfiscales y Litigantes</span>
                  <span className="text-[#D4AF37] font-bold">★★★★★</span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-slate-400 text-[11px]">
                    4 abogados especialistas colegiados en Panamá
                  </span>
                  <a href="#equipo" className="text-[11px] text-[#C5A880] hover:underline font-medium">
                    Conocer al equipo →
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Founder Authority Card & Quick Stats */}
          <div className="lg:col-span-5">
            <div
              className="relative bg-gradient-to-b from-slate-800/90 to-slate-900/95 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm"
            >
              {/* Gold Accent Corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#C5A880]/20 to-transparent rounded-tr-2xl pointer-events-none" />

              {/* Profile Header */}
              <div className="flex items-start gap-4 pb-6 border-b border-slate-700/80">
                <div className="relative shrink-0">
                  <div
                    onClick={onOpenPhotoUploader}
                    className={`relative overflow-hidden rounded-2xl p-0.5 bg-gradient-to-b from-[#E0C097] via-[#C5A880] to-[#8C6D28] shadow-2xl ring-2 ring-[#C5A880]/30 ${
                      onOpenPhotoUploader ? 'cursor-pointer hover:scale-105 transition-transform' : ''
                    }`}
                    title={onOpenPhotoUploader ? 'Gestionar foto oficial' : undefined}
                  >
                    <img
                      src={mitzyPhoto}
                      alt={ATTORNEY_PROFILE.name}
                      className="w-24 h-30 sm:w-28 sm:h-34 object-cover object-[50%_15%] rounded-[14px] brightness-[1.02] contrast-[1.03] shadow-inner"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-white border-2 border-[#C5A880] p-0.5 flex items-center justify-center shadow-lg overflow-hidden">
                    <Logo size="sm" rounded="full" className="w-full h-full" />
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
                    Directora &amp; Socia Fundadora
                  </div>
                  <h3 className="font-serif-legal text-xl font-bold text-white mt-0.5">
                    Licda. Mitzy I. García
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-snug">
                    Abogada Litigante · Exfiscal del Ministerio Público de Panamá
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#C5A880]/15 border border-[#C5A880]/30 text-[10px] text-[#E0C097] font-semibold tracking-wider uppercase">
                    Especialista en Tierras, Bienes Raíces &amp; Litigación Penal
                  </div>
                </div>
              </div>

              {/* Key Trajectory Highlights */}
              <div className="py-5 space-y-3.5 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5 text-[#C5A880]">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">10 Años en Persecución Penal</span>
                    <span className="text-xs text-slate-300">
                      Investigación activa de hechos delictivos y dirección de procesos judiciales en fiscalía.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5 text-[#C5A880]">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Tierras, Titulación &amp; Bienes Raíces</span>
                    <span className="text-xs text-slate-300">
                      Titulación ante ANATI, regularización de derechos posesorios, due diligence de fincas y transacciones seguras en Panamá.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5 text-[#C5A880]">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Práctica de Litigación &amp; Confianza</span>
                    <span className="text-xs text-slate-300">
                      Solución estratégica de conflictos para personas naturales y corporaciones.
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Booking Highlight Box */}
              <div className="bg-[#0A1420]/80 rounded-xl p-4 border border-amber-900/30 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">¿Requiere orientación inmediata?</div>
                  <div className="text-sm font-semibold text-[#E0C097]">
                    Agenda disponible para esta semana
                  </div>
                </div>
                <button
                  onClick={onOpenBooking}
                  className="bg-[#C5A880] hover:bg-[#D4AF37] text-[#0D1B2A] text-xs font-bold px-3.5 py-2 rounded shadow transition-colors cursor-pointer"
                >
                  Ver Horarios
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
