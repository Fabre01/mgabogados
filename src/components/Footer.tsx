import React from 'react';
import { ATTORNEY_PROFILE, PRACTICE_AREAS } from '../data/legalData';
import { Logo } from './Logo';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenLookup: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenLookup }) => {
  return (
    <footer className="bg-[#070F18] text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand & Intro */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-white border border-[#C5A880]/60 p-1 flex items-center justify-center shrink-0 shadow-md overflow-hidden">
                <Logo size="sm" rounded="lg" className="w-full h-full" />
              </div>
              <div>
                <span className="font-brand font-bold text-white text-base tracking-normal block">
                  <span className="tracking-wider">MG</span> Abogados &amp; Consultores
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold">
                  Tierras &amp; Bienes Raíces · Licda. Mitzy I. García
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              Despacho jurídico en Panamá enfocado en brindar asesoría legal responsable, estratégica y comprometida con la defensa de los derechos de sus clientes. Especialistas en Tierras, Bienes Raíces, Derecho Penal y Litigación.
            </p>

            <div className="text-[11px] text-slate-500">
              <strong className="text-slate-300 block">Exfiscal del Ministerio Público de Panamá</strong>
              Más de 10 años en investigación de hechos delictivos y procesos judiciales.
            </div>
          </div>

          {/* Quick Nav */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Navegación
            </h4>
            <ul className="space-y-2">
              <li><a href="#inicio" className="hover:text-[#E0C097] transition-colors">Inicio</a></li>
              <li><a href="#sobre-nosotros" className="hover:text-[#E0C097] transition-colors">Sobre la Titular</a></li>
              <li><a href="#servicios" className="hover:text-[#E0C097] transition-colors">Servicios Legales</a></li>
              <li><a href="#reservas" className="hover:text-[#E0C097] transition-colors">Agendar Cita</a></li>
              <li><a href="#blog" className="hover:text-[#E0C097] transition-colors">Blog Jurídico</a></li>
              <li><a href="#contacto" className="hover:text-[#E0C097] transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Practice Areas */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Áreas de Práctica
            </h4>
            <ul className="space-y-2">
              {PRACTICE_AREAS.slice(0, 5).map((area) => (
                <li key={area.id}>
                  <a href="#servicios" className="hover:text-[#E0C097] transition-colors">
                    {area.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Client Portal & Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Atención al Cliente
            </h4>
            <div className="space-y-2">
              <button
                onClick={onOpenBooking}
                className="w-full text-left py-2 px-3 bg-slate-800/80 hover:bg-slate-700/80 rounded text-slate-200 hover:text-white transition-colors block cursor-pointer"
              >
                📅 Reservar Consulta Legal
              </button>
              <button
                onClick={onOpenLookup}
                className="w-full text-left py-2 px-3 bg-slate-800/80 hover:bg-slate-700/80 rounded text-slate-200 hover:text-white transition-colors block cursor-pointer"
              >
                🔍 Consultar o Modificar Cita
              </button>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <div>📍 {ATTORNEY_PROFILE.officeAddress}</div>
              <div>💬 WhatsApp: {ATTORNEY_PROFILE.phones.mobile}</div>
              <div>✉️ {ATTORNEY_PROFILE.email}</div>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer & Ethics notice */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 text-[11px] text-slate-500 space-y-3 leading-relaxed">
          <p>
            <strong>Aviso Legal &amp; Confidencialidad:</strong> El contenido e información publicada en este sitio web tiene carácter estrictamente informativo y divulgativo, y bajo ninguna circunstancia debe interpretarse como asesoramiento legal vinculante ni como la constitución formal de una relación abogado-cliente. Dicha relación sólo se perfeccionará mediante acuerdo expreso de servicios profesionales. Todas las comunicaciones dirigidas al despacho están amparadas por el deber de confidencialidad y el secreto profesional consagrado en la legislación de la República de Panamá.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-2 text-slate-400">
            <div>
              &copy; {new Date().getFullYear()} MG Abogados &amp; Consultores · Tierras &amp; Bienes Raíces · Licda. Mitzy I. García. Todos los derechos reservados.
            </div>
            <div className="text-[11px] text-slate-500">
              Ciudad de Panamá, República de Panamá
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
