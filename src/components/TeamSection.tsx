import React, { useState } from 'react';
import { TEAM_MEMBERS } from '../data/legalData';
import { TeamMember, PracticeAreaId } from '../types';
import { Award, ChevronRight, ShieldCheck, Calendar } from 'lucide-react';
import { Logo } from './Logo';
import { useMitzyPhoto } from '../hooks/useMitzyPhoto';

interface TeamSectionProps {
  onBookWithAttorney: (attorneyName: string, defaultArea?: PracticeAreaId) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ onBookWithAttorney }) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const mitzyPhoto = useMitzyPhoto();

  const getSuggestedArea = (memberId: string): PracticeAreaId => {
    switch (memberId) {
      case 'mitzy-garcia':
        return 'bienes_raices';
      case 'adelberto-ortega':
      case 'adrian-ceballos':
      case 'luis-chong':
      default:
        return 'penal';
    }
  };

  return (
    <section id="equipo" className="py-20 lg:py-28 bg-[#FAF9F6] text-slate-800 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-xs uppercase tracking-widest text-[#9C7A4A] font-bold mb-2">
            Cuerpo Jurídico &amp; Litigantes Forenses
          </div>
          <h2 className="font-serif-legal text-3xl sm:text-4xl font-bold text-[#0D1B2A] tracking-tight">
            Nuestro Equipo Legal
          </h2>
          <div className="w-20 h-1 bg-[#C5A880] mx-auto mt-4 mb-6 rounded-full" />
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Abogados litigantes con amplia trayectoria en el Ministerio Público de Panamá, exfiscales de homicidios, peritos forenses y especialistas en litigio penal estratégico y bienes raíces.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-[#C5A880]"
            >
              <div>
                {/* Photo Container */}
                <div
                  onClick={() => setSelectedMember(member)}
                  className="relative aspect-[3/4] overflow-hidden bg-slate-100 cursor-pointer"
                >
                  <img
                    src={member.id === 'mitzy-garcia' ? mitzyPhoto : member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-[50%_15%] group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Corner Authority Badge */}
                  <div className="absolute top-3 left-3 bg-[#0D1B2A]/90 backdrop-blur-xs border border-[#C5A880]/50 text-[#E0C097] text-[10px] font-semibold px-2.5 py-1 rounded-md shadow flex items-center gap-1.5">
                    <Award className="w-3 h-3 text-[#D4AF37]" />
                    <span>Ministerio Público</span>
                  </div>

                  {/* Hover hint */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-1 rounded-md border border-white/20">
                    Ver perfil
                  </div>
                </div>

                {/* Profile Information */}
                <div className="p-6 space-y-3">
                  <div className="space-y-1">
                    <span className="text-[11px] uppercase tracking-wider text-[#9C7A4A] font-bold block">
                      {member.role}
                    </span>
                    <h3 className="font-serif-legal font-bold text-lg text-[#0D1B2A] leading-snug group-hover:text-[#9C7A4A] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {member.experienceTag}
                    </p>
                  </div>

                  {/* Bio extract */}
                  <p className="text-xs text-slate-600 line-clamp-4 leading-relaxed pt-1">
                    {member.bio}
                  </p>

                  {/* Key Areas Tags */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {member.keyAreas.slice(0, 2).map((area, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium border border-slate-200"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 space-y-2">
                <button
                  onClick={() => setSelectedMember(member)}
                  className="w-full py-2 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Ver Perfil Completo</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onBookWithAttorney(member.name, getSuggestedArea(member.id))}
                  className="w-full py-2.5 px-3 bg-[#0D1B2A] hover:bg-[#1B263B] text-[#E0C097] text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Agendar Consulta</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Trust Banner Below Team */}
        <div className="mt-16 bg-[#0D1B2A] text-white rounded-2xl p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-xl bg-white border border-[#C5A880]/60 p-1 flex items-center justify-center shrink-0 shadow-md overflow-hidden">
              <Logo size="sm" rounded="lg" className="w-full h-full" />
            </div>
            <div>
              <h4 className="font-serif-legal font-bold text-lg text-white">
                Defensa Técnica con Experiencia Real en Persecución Penal
              </h4>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                Nuestro despacho integra exfiscales de homicidios, expertos en juicio oral y peritos forenses que conocen a profundidad la dinámica probatoria en los tribunales de Panamá.
              </p>
            </div>
          </div>

          <button
            onClick={() => onBookWithAttorney('Licda. Mitzy I. García', 'penal')}
            className="bg-gradient-to-r from-[#C5A880] to-[#A88550] hover:from-[#D4AF37] hover:to-[#B6935C] text-[#0D1B2A] font-bold text-xs px-6 py-3 rounded-lg shadow-md transition-all shrink-0 cursor-pointer"
          >
            Consultar con el Equipo
          </button>
        </div>

      </div>

      {/* Member Full Profile Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto text-slate-800">
            
            {/* Modal Header */}
            <div className="bg-[#0D1B2A] text-white p-6 relative flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-slate-800">
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded transition-colors"
                aria-label="Cerrar modal"
              >
                ✕
              </button>

              <div className="w-28 h-36 rounded-xl overflow-hidden border-2 border-[#C5A880] shrink-0 shadow-lg bg-slate-800">
                <img
                  src={selectedMember.id === 'mitzy-garcia' ? mitzyPhoto : selectedMember.image}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover object-[50%_15%]"
                />
              </div>

              <div className="space-y-2 text-center sm:text-left">
                <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
                  {selectedMember.role}
                </span>
                <h3 className="font-serif-legal font-bold text-2xl text-white">
                  {selectedMember.name}
                </h3>
                <p className="text-xs text-slate-300">
                  {selectedMember.specialty}
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 border border-slate-700 text-xs text-[#E0C097] font-medium">
                  <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{selectedMember.experienceTag}</span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 text-sm text-slate-700 leading-relaxed">
              <div>
                <h4 className="font-serif-legal font-bold text-base text-[#0D1B2A] mb-2">
                  Trayectoria Profesional
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {selectedMember.bio}
                </p>
              </div>

              <div>
                <h4 className="font-serif-legal font-bold text-base text-[#0D1B2A] mb-3">
                  Áreas de Práctica &amp; Competencias
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedMember.keyAreas.map((area, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#9C7A4A] shrink-0" />
                      <span className="font-medium text-slate-800">{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action in Modal */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    const name = selectedMember.name;
                    const area = getSuggestedArea(selectedMember.id);
                    setSelectedMember(null);
                    onBookWithAttorney(name, area);
                  }}
                  className="flex-1 bg-[#0D1B2A] hover:bg-[#1B263B] text-[#E0C097] font-bold text-xs py-3 px-4 rounded-lg shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Agendar Cita con {selectedMember.name.split(' ')[1]}</span>
                </button>

                <a
                  href={`https://wa.me/50762348890?text=${encodeURIComponent(
                    `Hola, deseo solicitar una consulta jurídica con el abogado/a ${selectedMember.name}.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-4 rounded-lg shadow transition-colors flex items-center justify-center gap-2"
                >
                  <span>Consultar por WhatsApp</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
