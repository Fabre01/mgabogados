import React, { useState, useEffect } from 'react';
import { Calendar, Search, Menu, X, ShieldAlert } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenLookup: () => void;
  onOpenCaseEvaluator: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenLookup,
  onOpenCaseEvaluator,
  activeSection
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Sobre la Titular', href: '#sobre-nosotros' },
    { name: 'Equipo Legal', href: '#equipo' },
    { name: 'Servicios Jurídicos', href: '#servicios' },
    { name: 'Reserva de Citas', href: '#reservas' },
    { name: 'Noticias Legales', href: '#blog' },
    { name: 'Contacto', href: '#contacto' }
  ];

  return (
    <>
      {/* Emergency Top Bar */}
      <div className="bg-[#0A1420] text-amber-100/90 text-xs py-2 px-4 border-b border-amber-900/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-slate-200">Despacho Jurídico en Ciudad de Panamá</span>
            <span className="hidden md:inline text-slate-500">·</span>
            <span className="hidden md:inline text-slate-400">Dirigido por Licda. Mitzy I. García (Exfiscal del Ministerio Público)</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={onOpenLookup}
              className="text-[#E0C097] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Gestionar / Consultar mi Cita</span>
            </button>
            <span className="text-slate-600">|</span>
            <a
              href="tel:+50769801122"
              className="text-amber-300 hover:text-amber-200 font-semibold flex items-center gap-1 transition-colors"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Urgencias Penales: +507 6980-1122</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0D1B2A]/95 backdrop-blur-md shadow-lg border-b border-slate-800/80 py-3'
            : 'bg-[#0D1B2A] border-b border-slate-800/50 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#inicio" className="flex items-center gap-3.5 group text-left">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#C5A880]/60 p-1 shadow-md group-hover:border-[#E0C097] group-hover:scale-105 transition-all flex items-center justify-center shrink-0 overflow-hidden">
                <Logo size="sm" rounded="lg" className="w-full h-full" />
              </div>
              <div>
                <div className="font-brand font-bold text-base sm:text-lg tracking-normal text-white flex items-center gap-1.5 leading-tight">
                  <span className="tracking-wider">MG</span> Abogados
                  <span className="text-[#C5A880] text-xs font-serif-legal font-normal tracking-normal">&amp; Consultores</span>
                </div>
                <div className="text-[10px] tracking-widest text-[#C5A880] uppercase font-semibold mt-0.5">
                  Tierras &amp; Bienes Raíces · Licda. Mitzy I. García
                </div>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-[#E0C097] relative py-1 ${
                    activeSection === link.href.substring(1)
                      ? 'text-[#E0C097]'
                      : 'text-slate-300'
                  }`}
                >
                  {link.name}
                  {activeSection === link.href.substring(1) && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C5A880] rounded-full" />
                  )}
                </a>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={onOpenCaseEvaluator}
                className="text-xs font-medium text-slate-300 hover:text-white px-3 py-2 rounded-md border border-slate-700 hover:border-slate-500 transition-colors"
                title="Evalúe la viabilidad y urgencia de su caso"
              >
                Orientador Legal
              </button>
              <button
                onClick={onOpenBooking}
                className="bg-gradient-to-r from-[#C5A880] to-[#A88550] hover:from-[#D4AF37] hover:to-[#B6935C] text-[#0D1B2A] font-semibold text-sm px-4 py-2.5 rounded-md shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#0D1B2A]" />
                <span>Agendar Cita</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={onOpenBooking}
                className="bg-[#C5A880] text-[#0D1B2A] font-semibold text-xs px-3 py-1.5 rounded"
              >
                Agendar
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-300 hover:text-white p-2"
                aria-label="Abrir menú"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0A1420] border-t border-slate-800 px-4 pt-3 pb-5 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm text-slate-200 hover:text-[#C5A880] border-b border-slate-800/60"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCaseEvaluator();
                }}
                className="w-full text-left py-2 text-sm text-amber-200/90"
              >
                ⚖️ Evaluar mi caso preliminarmente
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLookup();
                }}
                className="w-full text-left py-2 text-sm text-slate-300"
              >
                🔍 Consultar o cancelar cita previa
              </button>
              <a
                href="https://wa.me/50762348890"
                target="_blank"
                rel="noreferrer"
                className="block text-center py-2.5 bg-emerald-700/80 hover:bg-emerald-600 text-white rounded text-sm font-medium mt-2"
              >
                WhatsApp Directo con el Despacho
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
