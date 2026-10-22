import React, { useState } from 'react';
import { ATTORNEY_PROFILE } from '../data/legalData';
import { MapPin, Phone, Mail, Clock, ShieldAlert, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Consulta General',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="py-20 lg:py-28 bg-[#0D1B2A] text-white relative overflow-hidden">
      {/* Background subtleties */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-800/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-xs uppercase tracking-widest text-[#E0C097] font-bold mb-2">
            Atención Inmediata &amp; Sedes
          </div>
          <h2 className="font-serif-legal text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Contacto con el Despacho
          </h2>
          <div className="w-20 h-1 bg-[#C5A880] mx-auto mt-3 mb-4 rounded-full" />
          <p className="text-slate-300 text-sm sm:text-base">
            Estamos a su entera disposición en la Ciudad de Panamá. Para consultas urgentes o programación de audiencias, contáctenos directamente.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Office Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Office Address Card */}
            <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-6 backdrop-blur-xs space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0A1420] text-[#E0C097] flex items-center justify-center shrink-0 border border-slate-700">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif-legal font-bold text-base text-white">
                    Sede Principal en Panamá
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {ATTORNEY_PROFILE.officeAddress}
                  </p>
                  <a
                    href="https://maps.google.com/?q=Torre+Financial+Park+Costa+del+Este+Panama"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-2 text-xs font-semibold text-[#E0C097] hover:underline"
                  >
                    Abrir ubicación en Google Maps ›
                  </a>
                </div>
              </div>

              <div className="border-t border-slate-700/70 pt-4 space-y-3 text-xs">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-slate-300">WhatsApp Oficial:</span>
                  <a
                    href={`https://wa.me/${ATTORNEY_PROFILE.phones.mobile.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-emerald-300 hover:underline"
                  >
                    {ATTORNEY_PROFILE.phones.mobile}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span className="text-slate-300">Correo Electrónico:</span>
                  <a href={`mailto:${ATTORNEY_PROFILE.email}`} className="font-semibold text-white hover:underline">
                    {ATTORNEY_PROFILE.email}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span className="text-slate-300">Horario:</span>
                  <span className="font-medium text-slate-200">
                    {ATTORNEY_PROFILE.schedule}
                  </span>
                </div>
              </div>
            </div>

            {/* Criminal Emergency Box */}
            <div className="bg-gradient-to-r from-amber-950/40 via-red-950/30 to-amber-950/40 border border-amber-800/60 rounded-2xl p-6 text-xs text-amber-100">
              <div className="flex items-center gap-2 font-bold text-sm text-amber-300 mb-1">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <span>Línea Exclusiva para Urgencias Penales</span>
              </div>
              <p className="text-slate-300 leading-relaxed mb-3">
                Para casos de aprehensión de flagrancia, allanamientos o diligencias urgentes del Ministerio Público:
              </p>
              <a
                href="tel:+50769801122"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-lg transition-colors text-sm shadow"
              >
                <Phone className="w-4 h-4" />
                <span>Llamar Directo: +507 6980-1122</span>
              </a>
            </div>

          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white text-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-200/80">
              <h3 className="font-serif-legal font-bold text-2xl text-[#0D1B2A] mb-1">
                Envíenos su Consulta
              </h3>
              <p className="text-xs text-slate-600 mb-6">
                Todos los datos suministrados son estrictamente confidenciales y revisados de forma directa por la Licda. Mitzy I. García y su equipo legal.
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif-legal font-bold text-xl text-[#0D1B2A]">
                    Mensaje Recibido con Éxito
                  </h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    Agradecemos su comunicación. Nuestro despacho se pondrá en contacto con usted a la brevedad posible dentro de nuestro horario hábil.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: 'Consulta General', message: '' });
                    }}
                    className="text-xs text-[#9C7A4A] underline font-semibold cursor-pointer"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">
                        Nombre y Apellido *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ej. Carlos Mendoza"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#C5A880] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+507 6000-0000"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#C5A880] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="carlos@ejemplo.com"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#C5A880] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">
                        Asunto de la Consulta
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#C5A880] focus:outline-none"
                      >
                        <option value="Consulta Penal">Derecho Penal / Fiscalía</option>
                        <option value="Bienes Raíces">Bienes Raíces / Fincas</option>
                        <option value="Derecho Corporativo">Sociedades y Fundaciones</option>
                        <option value="Civil o Sucesión">Civil o Sucesiones</option>
                        <option value="Consulta General">Consulta General</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Detalle de su Consulta *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Indique brevemente los antecedentes de su caso para una orientación inicial adecuada..."
                      className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#C5A880] focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#0D1B2A] hover:bg-[#1B263B] text-[#E0C097] font-bold py-3.5 rounded-lg shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Enviar Consulta Confidencial</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
