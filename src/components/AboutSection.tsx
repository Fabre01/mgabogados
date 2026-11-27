import React from 'react';
import { ATTORNEY_PROFILE } from '../data/legalData';
import { ShieldCheck, Scale, Landmark, FileText, MapPin } from 'lucide-react';
import { Logo } from './Logo';
import { useMitzyPhoto } from '../hooks/useMitzyPhoto';

interface AboutSectionProps {
  onOpenBooking: () => void;
  onOpenPhotoUploader?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking, onOpenPhotoUploader }) => {
  const mitzyPhoto = useMitzyPhoto();
  return (
    <section id="sobre-nosotros" className="py-20 lg:py-28 bg-white text-slate-800 border-t border-slate-200/80">
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
            Una práctica legal forjada en la primera línea del sistema de justicia panameño, sobresaliendo en titulación de tierras, bienes raíces, contratos y defensa penal estratégica.
          </p>
        </div>

        {/* Two Column In-Depth Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">

          {/* Left: Authority & Credential Spotlight */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50/70 rounded-2xl p-8 shadow-lg border border-[#C5A880]/40 relative overflow-hidden text-slate-800">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A880]/10 rounded-bl-full pointer-events-none" />

              <div className="flex items-center gap-4 mb-6">
                <div className="relative shrink-0">
                  <div
                    onClick={onOpenPhotoUploader}
                    className={`relative overflow-hidden rounded-2xl p-0.5 bg-gradient-to-b from-[#E0C097] via-[#C5A880] to-[#8C6D28] shadow-xl ring-2 ring-[#C5A880]/30 ${
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

              <div className="space-y-4 text-sm text-slate-700 leading-relaxed border-t border-slate-200 pt-5">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#9C7A4A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0D1B2A] block">Titulación de Tierras (ANATI)</strong>
                    <span className="text-slate-600 text-xs">
                      Adjudicaciones, saneamiento de planos, regularización de derechos posesorios y solución de conflictos de linderos.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Landmark className="w-5 h-5 text-[#9C7A4A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0D1B2A] block">Bienes Raíces &amp; Registro Público</strong>
                    <span className="text-slate-600 text-xs">
                      Debida diligencia registral (Due Diligence) de fincas, segregaciones, propiedad horizontal (P.H.) e inversiones seguras.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-[#9C7A4A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0D1B2A] block">Contratos &amp; Blindaje Jurídico</strong>
                    <span className="text-slate-600 text-xs">
                      Redacción, revisión y negociación estratégica de contratos de promesa y compraventa, arrendamientos, garantías y pactos mercantiles.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#9C7A4A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0D1B2A] block">Defensa Penal · 10 Años Exfiscal</strong>
                    <span className="text-slate-600 text-xs">
                      Amplia experiencia en el Ministerio Público investigando delitos y litigando ante los tribunales del Sistema Penal Acusatorio.
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-200 flex items-center justify-between">
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

          {/* Right: The Firm's Mission & Full Story */}
          <div className="lg:col-span-7 space-y-5 text-slate-700 leading-relaxed text-base">
            <h3 className="font-serif-legal text-2xl font-bold text-[#0D1B2A]">
              Liderazgo en Titulación de Tierras, Bienes Raíces, Contratos y Defensa Penal
            </h3>

            {/* 4 Key Focus Highlights for Licda. Mitzy */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-1">
              {[
                { label: 'Titulación de Tierras', sub: 'ANATI y Posesorios' },
                { label: 'Bienes Raíces', sub: 'Registro y Fincas' },
                { label: 'Contratos', sub: 'Blindaje Jurídico' },
                { label: 'Defensa Penal', sub: 'Litigio SPA' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-amber-50/60 border border-[#C5A880]/50 rounded-xl p-3 text-center shadow-2xs"
                >
                  <div className="text-xs font-bold text-[#0D1B2A]">{item.label}</div>
                  <div className="text-[11px] text-[#9C7A4A] font-medium mt-0.5">{item.sub}</div>
                </div>
              ))}
            </div>

            <p className="text-slate-700">
              {ATTORNEY_PROFILE.bio[0]}
            </p>

            <p className="text-slate-700">
              {ATTORNEY_PROFILE.bio[1]}
            </p>

            <p className="text-slate-700">
              {ATTORNEY_PROFILE.bio[2]}
            </p>

            <blockquote className="border-l-4 border-[#C5A880] pl-5 py-3 my-4 bg-slate-50 rounded-r-lg text-[#0D1B2A] italic font-serif-legal text-lg">
              &ldquo;{ATTORNEY_PROFILE.bio[3]}&rdquo;
            </blockquote>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700">
              <Scale className="w-5 h-5 text-[#9C7A4A] shrink-0 mt-0.5" />
              <p>
                El despacho se caracteriza por trabajar bajo principios de responsabilidad, ética profesional, confidencialidad y compromiso con la justicia, brindando acompañamiento legal a personas naturales y empresas en titulación de tierras, transacciones de bienes raíces, elaboración de contratos y defensa penal de primer nivel.
              </p>
            </div>
          </div>

        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ATTORNEY_PROFILE.principles.map((p, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-slate-200 hover:border-[#C5A880] shadow-sm hover:shadow-md transition-all text-slate-800"
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
