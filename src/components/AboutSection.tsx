import React from 'react';
import { ATTORNEY_PROFILE } from '../data/legalData';
import { ShieldCheck, Scale, Landmark } from 'lucide-react';
import { Logo } from './Logo';
import { useMitzyPhoto } from '../hooks/useMitzyPhoto';

interface AboutSectionProps {
  onOpenBooking: () => void;
  onOpenPhotoUploader?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking, onOpenPhotoUploader }) => {
  const mitzyPhoto = useMitzyPhoto();
  return (
    <section id="sobre-nosotros" className="py-20 lg:py-28 bg-[#FBFBFA] text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-xs uppercase tracking-widest text-[#9C7A4A] font-bold mb-2">
            Trayectoria Profesional &amp; Liderazgo
          </div>
          <h2 className="font-serif-legal text-3xl sm:text-4xl font-bold text-[#0D1B2A] tracking-tight">
            Sobre el Despacho &amp; la Licda. Mitzy I. García
          </h2>
          <div className="w-20 h-1 bg-[#C5A880] mx-auto mt-4 mb-6 rounded-full" />
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Una práctica legal forjada en la primera línea del sistema de justicia panameño, combinando rigor técnico, ética inquebrantable y visión estratégica.
          </p>
        </div>

        {/* Two Column In-Depth Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left: Authority & Credential Spotlight */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-md border border-slate-200/80 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A880]/10 rounded-bl-full pointer-events-none" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="relative shrink-0">
                  <div
                    onClick={onOpenPhotoUploader}
                    className={`relative overflow-hidden rounded-2xl p-0.5 bg-gradient-to-b from-[#E0C097] via-[#C5A880] to-[#8C6D28] shadow-xl ring-2 ring-[#C5A880]/20 ${
                      onOpenPhotoUploader ? 'cursor-pointer hover:scale-105 transition-transform' : ''
                    }`}
                    title={onOpenPhotoUploader ? 'Gestionar foto oficial' : undefined}
                  >
                    <img
                      src={mitzyPhoto}
                      alt={ATTORNEY_PROFILE.name}
                      className="w-22 h-28 object-cover object-[50%_15%] rounded-[14px] brightness-[1.02] contrast-[1.03] shadow-inner"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-[#C5A880] p-0.5 flex items-center justify-center shadow-md overflow-hidden">
                    <Logo size="sm" rounded="full" className="w-full h-full" />
                  </div>
                </div>
                <div>
                  <h3 className="font-serif-legal text-xl font-bold text-[#0D1B2A]">
                    {ATTORNEY_PROFILE.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#9C7A4A] uppercase tracking-wider">
                    Abogada Panameña · Exfiscal
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    MG Abogados &amp; Consultores · Tierras &amp; Bienes Raíces · Colegiada en Panamá
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-5">
                <div className="flex items-start gap-3">
                  <Landmark className="w-5 h-5 text-[#9C7A4A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">10 Años en el Ministerio Público</strong>
                    <span>Participó de manera activa en la investigación de delitos y dirección de causas en el sistema de persecución penal como fiscal.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Scale className="w-5 h-5 text-[#9C7A4A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Dominio Procesal de Tribunales</strong>
                    <span>Profundo conocimiento del funcionamiento judicial, valoración de pruebas y litigación estratégica en audiencias.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#9C7A4A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Tierras, Bienes Raíces &amp; Litigación</strong>
                    <span>Representación de clientes en titulación ante ANATI, regularización de derechos posesorios, debida diligencia de fincas y litigios.</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">¿Desea una consulta directa?</span>
                <button
                  onClick={onOpenBooking}
                  className="text-xs font-bold text-[#0D1B2A] hover:text-[#9C7A4A] underline cursor-pointer"
                >
                  Agendar con Licda. Mitzy
                </button>
              </div>
            </div>
          </div>

          {/* Right: The Firm's Mission & Full Story from User Image */}
          <div className="lg:col-span-7 space-y-5 text-slate-700 leading-relaxed text-base">
            <h3 className="font-serif-legal text-2xl font-bold text-[#0D1B2A]">
              Asesoría jurídica responsable, estratégica y transparente
            </h3>
            
            <p>
              {ATTORNEY_PROFILE.bio[0]}
            </p>

            <p>
              {ATTORNEY_PROFILE.bio[1]}
            </p>

            <p>
              {ATTORNEY_PROFILE.bio[2]}
            </p>

            <blockquote className="border-l-4 border-[#C5A880] pl-5 py-2 my-4 bg-amber-50/50 rounded-r-lg text-slate-800 italic font-serif-legal text-lg">
              &ldquo;{ATTORNEY_PROFILE.bio[3]}&rdquo;
            </blockquote>

            <p className="text-sm text-slate-600">
              El despacho se caracteriza por trabajar bajo principios de responsabilidad, ética profesional, confidencialidad y compromiso con la justicia, brindando acompañamiento legal a personas naturales y empresas que requieren orientación y representación jurídica de primer nivel.
            </p>
          </div>

        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ATTORNEY_PROFILE.principles.map((p, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 rounded-lg bg-[#0D1B2A] text-[#E0C097] flex items-center justify-center font-bold text-sm mb-4">
                0{idx + 1}
              </div>
              <h4 className="font-serif-legal font-bold text-lg text-[#0D1B2A] mb-2">
                {p.title}
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
