import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  MapPin,
  Check,
  User,
  Mail,
  Phone,
  FileText,
  ShieldCheck,
  Download,
  Share2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Appointment, ConsultationModality, PracticeAreaId } from '../types';
import { PRACTICE_AREAS, TIME_SLOTS, TEAM_MEMBERS } from '../data/legalData';
import { Logo } from './Logo';
import { getMitzyPhoto } from '../utils/photoManager';
import {
  generateAppointmentCode,
  downloadICSFile,
  generateGoogleCalendarUrl,
  generateWhatsAppConfirmationUrl
} from '../utils/calendar';

interface BookingSystemProps {
  initialArea?: PracticeAreaId;
  initialAttorney?: string;
  onAppointmentCreated?: (appointment: Appointment) => void;
  onOpenLookupModal?: () => void;
}

export const BookingSystem: React.FC<BookingSystemProps> = ({
  initialArea = 'penal',
  initialAttorney,
  onAppointmentCreated,
  onOpenLookupModal
}) => {
  // Form step: 1 = Service & Mode, 2 = Date & Slot, 3 = Client Info, 4 = Success
  const [step, setStep] = useState<number>(1);

  // Form State
  const [selectedArea, setSelectedArea] = useState<PracticeAreaId>(initialArea);
  const [selectedAttorney, setSelectedAttorney] = useState<string>(
    initialAttorney || 'Licda. Mitzy I. García'
  );
  const [modality, setModality] = useState<ConsultationModality>('presencial');
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    // Default to tomorrow or next weekday
    const d = new Date();
    d.setDate(d.getDate() + 1);
    // If Sunday, move to Monday
    if (d.getDay() === 0) d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [selectedSlot, setSelectedSlot] = useState<string>('10:30 AM');

  // Personal Info
  const [fullName, setFullName] = useState('');
  const [idDocument, setIdDocument] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(true);

  // Completed Appointment
  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Calendar navigation state for date selection
  const [calendarMonthOffset, setCalendarMonthOffset] = useState(0);

  // Helper to generate selectable calendar days
  const today = new Date();
  const currentMonthDate = new Date(today.getFullYear(), today.getMonth() + calendarMonthOffset, 1);
  const daysInMonth = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), 1).getDay();

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const handleDateSelect = (dayNum: number) => {
    const year = currentMonthDate.getFullYear();
    const month = String(currentMonthDate.getMonth() + 1).padStart(2, '0');
    const day = String(dayNum).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    // Check if past
    const checkDate = new Date(year, currentMonthDate.getMonth(), dayNum);
    const todayReset = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (checkDate < todayReset) return; // past date

    // Check if Sunday (0)
    if (checkDate.getDay() === 0) {
      setErrorMsg('Los domingos el despacho atiende únicamente urgencias penales vía telefónica (+507 6980-1122).');
      return;
    }

    setErrorMsg('');
    setSelectedDate(dateStr);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || !email.trim() || !phone.trim() || !idDocument.trim()) {
      setErrorMsg('Por favor complete todos los campos obligatorios (*).');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setErrorMsg('Por favor ingrese un correo electrónico válido.');
      return;
    }

    const newAppointment: Appointment = {
      id: 'apt-' + Date.now(),
      code: generateAppointmentCode(),
      fullName: fullName.trim(),
      idDocument: idDocument.trim(),
      email: email.trim(),
      phone: phone.trim(),
      practiceArea: selectedArea,
      modality,
      date: selectedDate,
      timeSlot: selectedSlot,
      notes: notes.trim(),
      status: 'confirmada',
      createdAt: new Date().toISOString(),
      attorney: selectedAttorney
    };

    // Save to localStorage
    try {
      const stored = localStorage.getItem('mg_appointments');
      const list: Appointment[] = stored ? JSON.parse(stored) : [];
      list.unshift(newAppointment);
      localStorage.setItem('mg_appointments', JSON.stringify(list));
    } catch (err) {
      console.error('Storage error', err);
    }

    setCreatedAppointment(newAppointment);
    setStep(4);
    if (onAppointmentCreated) {
      onAppointmentCreated(newAppointment);
    }
  };

  const handleReset = () => {
    setStep(1);
    setFullName('');
    setIdDocument('');
    setEmail('');
    setPhone('');
    setNotes('');
    setCreatedAppointment(null);
    setErrorMsg('');
  };

  return (
    <section id="reservas" className="py-20 lg:py-28 bg-[#0D1B2A] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest text-[#E0C097] font-bold mb-2">
            Atención Personalizada
          </div>
          <h2 className="font-serif-legal text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Sistema de Reserva de Citas Jurídicas
          </h2>
          <div className="w-20 h-1 bg-[#C5A880] mx-auto mt-3 mb-4 rounded-full" />
          <p className="text-white/90 text-sm sm:text-base">
            Seleccione la materia legal, elija entre modalidad presencial en nuestras oficinas o videollamada virtual, y confirme su fecha directamente con la agenda de la Licda. Mitzy I. García.
          </p>

          <div className="mt-4 flex items-center justify-center gap-4 text-xs">
            <button
              type="button"
              onClick={onOpenLookupModal}
              className="text-[#E0C097] hover:text-white font-semibold underline underline-offset-4 cursor-pointer transition-colors"
            >
              ¿Ya tiene una reserva? Consultar o reprogramar su cita aquí
            </button>
          </div>
        </div>

        {/* Stepper Card */}
        <div className="bg-[#112236] rounded-2xl shadow-2xl border border-slate-700/80 overflow-hidden">

          {/* Progress Header */}
          <div className="bg-[#0A1420] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-700/80">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#C5A880] text-[#0D1B2A] font-bold flex items-center justify-center text-sm">
                {step === 4 ? <Check className="w-4 h-4" /> : step}
              </span>
              <div>
                <div className="text-xs uppercase tracking-wider text-[#C5A880] font-semibold">
                  Paso {step} de 3
                </div>
                <div className="text-sm font-medium text-white">
                  {step === 1 && 'Selección de Materia y Modalidad'}
                  {step === 2 && 'Fecha y Horario Disponible'}
                  {step === 3 && 'Información del Consultante'}
                  {step === 4 && '¡Cita Confirmada con Éxito!'}
                </div>
              </div>
            </div>

            {step < 4 && (
              <div className="flex items-center gap-2 text-xs text-white/70">
                <span className={step >= 1 ? 'text-[#E0C097] font-semibold' : ''}>1. Materia</span>
                <span>›</span>
                <span className={step >= 2 ? 'text-[#E0C097] font-semibold' : ''}>2. Fecha</span>
                <span>›</span>
                <span className={step >= 3 ? 'text-[#E0C097] font-semibold' : ''}>3. Datos</span>
              </div>
            )}
          </div>

          {/* Step 1: Area & Modality */}
          {step === 1 && (
            <div className="p-6 sm:p-10 space-y-8">
              <div>
                <label className="block text-sm font-bold text-white uppercase tracking-wide mb-3">
                  1. Seleccione el Área o Asunto Legal *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {PRACTICE_AREAS.map((area) => (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => setSelectedArea(area.id)}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedArea === area.id
                          ? 'border-[#C5A880] bg-[#162C46] ring-2 ring-[#C5A880]/60'
                          : 'border-slate-700 hover:border-[#C5A880]/50 bg-[#0A1420]'
                      }`}
                    >
                      <div className="font-serif-legal font-bold text-sm text-white flex items-center justify-between">
                        <span>{area.title}</span>
                        {selectedArea === area.id && (
                          <Check className="w-4 h-4 text-[#E0C097]" />
                        )}
                      </div>
                      <p className="text-xs text-white/80 mt-1 line-clamp-2">
                        {area.shortDesc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Attorney Selection with Photos */}
              <div>
                <label className="block text-sm font-bold text-white uppercase tracking-wide mb-3">
                  2. Seleccione el Abogado/a de su Preferencia *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {TEAM_MEMBERS.map((attorney) => {
                    const isSelected = selectedAttorney === attorney.name;
                    const attorneyImg = attorney.id === 'mitzy-garcia' ? getMitzyPhoto() : attorney.image;
                    return (
                      <div
                        key={attorney.id}
                        onClick={() => setSelectedAttorney(attorney.name)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                          isSelected
                            ? 'border-[#C5A880] bg-[#162C46] ring-2 ring-[#C5A880]/60 shadow-sm'
                            : 'border-slate-700 hover:border-[#C5A880]/50 bg-[#0A1420]'
                        }`}
                      >
                        <img
                          src={attorneyImg}
                          alt={attorney.name}
                          className="w-12 h-14 object-cover object-top rounded-lg border border-[#C5A880]/40 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-white truncate">
                            {attorney.name}
                          </div>
                          <div className="text-[10px] text-[#E0C097] font-semibold truncate">
                            {attorney.role}
                          </div>
                          <div className="text-[9px] text-white/75 truncate">
                            {attorney.experienceTag}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Modality Selection */}
              <div>
                <label className="block text-sm font-bold text-white uppercase tracking-wide mb-3">
                  3. Elija la Modalidad de Atención *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div
                    onClick={() => setModality('presencial')}
                    className={`p-5 rounded-xl border cursor-pointer transition-all flex items-start gap-4 ${
                      modality === 'presencial'
                        ? 'border-[#C5A880] bg-[#162C46] ring-2 ring-[#C5A880]/60'
                        : 'border-slate-700 hover:border-[#C5A880]/50 bg-[#0A1420]'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#0D1B2A] border border-[#C5A880]/40 text-[#E0C097] flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white flex items-center gap-2">
                        Presencial en Despacho (Panamá)
                        {modality === 'presencial' && <Check className="w-4 h-4 text-[#E0C097]" />}
                      </div>
                      <p className="text-xs text-white/80 mt-1">
                        Torre Financial Park, Costa del Este / Calle 50. Sala de conferencias privada y confidencial.
                      </p>
                    </div>
                  </div>

                  <div
                    onClick={() => setModality('virtual')}
                    className={`p-5 rounded-xl border cursor-pointer transition-all flex items-start gap-4 ${
                      modality === 'virtual'
                        ? 'border-[#C5A880] bg-[#162C46] ring-2 ring-[#C5A880]/60'
                        : 'border-slate-700 hover:border-[#C5A880]/50 bg-[#0A1420]'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#0D1B2A] border border-[#C5A880]/40 text-[#E0C097] flex items-center justify-center shrink-0">
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white flex items-center gap-2">
                        Videollamada en Vivo (Zoom / Meet)
                        {modality === 'virtual' && <Check className="w-4 h-4 text-[#E0C097]" />}
                      </div>
                      <p className="text-xs text-white/80 mt-1">
                        Ideal para clientes en el interior del país, extranjeros o inversionistas que residen fuera de Panamá.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Next Step Button */}
              <div className="pt-4 flex justify-end border-t border-slate-700/70">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-gradient-to-r from-[#C5A880] to-[#A88550] hover:from-[#D4AF37] hover:to-[#B6935C] text-[#0D1B2A] font-bold text-sm px-8 py-3 rounded-lg shadow transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Continuar a Fecha y Hora</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Date & Slot Picker */}
          {step === 2 && (
            <div className="p-6 sm:p-10 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Custom Month Calendar */}
                <div className="lg:col-span-7 bg-[#0A1420] p-6 rounded-xl border border-slate-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif-legal font-bold text-base text-white">
                      {monthNames[currentMonthDate.getMonth()]} {currentMonthDate.getFullYear()}
                    </h3>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setCalendarMonthOffset((prev) => Math.max(0, prev - 1))}
                        disabled={calendarMonthOffset === 0}
                        className="p-1.5 rounded hover:bg-[#162C46] disabled:opacity-30 disabled:cursor-not-allowed text-white cursor-pointer"
                        aria-label="Mes anterior"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setCalendarMonthOffset((prev) => prev + 1)}
                        className="p-1.5 rounded hover:bg-[#162C46] text-white cursor-pointer"
                        aria-label="Siguiente mes"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Day Names */}
                  <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-white/75 mb-2">
                    <span>Dom</span>
                    <span>Lun</span>
                    <span>Mar</span>
                    <span>Mié</span>
                    <span>Jue</span>
                    <span>Vie</span>
                    <span>Sáb</span>
                  </div>

                  {/* Days Grid */}
                  <div className="grid grid-cols-7 gap-1 text-xs">
                    {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                      <div key={`empty-${i}`} className="p-2" />
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const dayNum = i + 1;
                      const cellDate = new Date(
                        currentMonthDate.getFullYear(),
                        currentMonthDate.getMonth(),
                        dayNum
                      );
                      const isSunday = cellDate.getDay() === 0;
                      const isPast =
                        cellDate <
                        new Date(today.getFullYear(), today.getMonth(), today.getDate());

                      const year = currentMonthDate.getFullYear();
                      const month = String(currentMonthDate.getMonth() + 1).padStart(2, '0');
                      const day = String(dayNum).padStart(2, '0');
                      const dateStr = `${year}-${month}-${day}`;
                      const isSelected = selectedDate === dateStr;

                      return (
                        <button
                          key={dayNum}
                          type="button"
                          disabled={isPast || isSunday}
                          onClick={() => handleDateSelect(dayNum)}
                          className={`h-10 rounded-lg flex items-center justify-center font-medium transition-all ${
                            isSelected
                              ? 'bg-[#C5A880] text-[#0D1B2A] font-bold shadow-md'
                              : isPast || isSunday
                              ? 'text-slate-600 cursor-not-allowed'
                              : 'hover:bg-[#162C46] text-white bg-[#112236] border border-slate-700/80 cursor-pointer'
                          }`}
                        >
                          {dayNum}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-4 text-[11px] text-white/80 flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded bg-[#C5A880]" /> Seleccionado
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded bg-[#112236] border border-slate-600" /> Disponible
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded bg-slate-700" /> No laborable
                    </span>
                  </div>
                </div>

                {/* Time Slot Picker */}
                <div className="lg:col-span-5 space-y-4">
                  <div>
                    <h3 className="font-serif-legal font-bold text-base text-white mb-1">
                      Horarios Disponibles
                    </h3>
                    <p className="text-xs text-white/80">
                      Fecha: <span className="font-semibold text-white">{selectedDate}</span> (Sesión de 60 minutos)
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {TIME_SLOTS.map((slot) => {
                      const isSelected = selectedSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#C5A880] bg-[#162C46] text-[#E0C097] shadow-sm ring-1 ring-[#C5A880]/60'
                              : 'border-slate-700 hover:border-[#C5A880]/50 bg-[#0A1420] text-white'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5 text-[#E0C097]" />
                          <span>{slot}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Attorney Box */}
                  <div className="bg-[#0A1420] p-4 rounded-xl border border-[#C5A880]/40 text-xs text-white flex items-center gap-3">
                    <img
                      src={
                        (selectedAttorney.includes('Mitzy') ? getMitzyPhoto() : TEAM_MEMBERS.find((t) => t.name === selectedAttorney)?.image) ||
                        getMitzyPhoto()
                      }
                      alt={selectedAttorney}
                      className="w-12 h-14 object-cover object-top rounded-lg border border-[#C5A880] shrink-0 shadow-xs"
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] text-white/70 uppercase tracking-wider block">
                        Abogado/a asignado para su cita:
                      </span>
                      <strong className="text-white block text-xs truncate">
                        {selectedAttorney}
                      </strong>
                      <span className="text-[11px] text-[#E0C097] font-semibold block truncate">
                        {TEAM_MEMBERS.find((t) => t.name === selectedAttorney)?.role || 'Directora'}
                      </span>
                      <p className="text-white/75 text-[10px] mt-0.5 truncate">
                        {TEAM_MEMBERS.find((t) => t.name === selectedAttorney)?.experienceTag ||
                          'Exfiscal del Ministerio Público'}
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {errorMsg && (
                <div className="p-3 bg-amber-950/70 border border-amber-500/40 text-amber-200 text-xs rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-700/70">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 text-xs font-semibold text-white/80 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Volver al paso anterior</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="bg-gradient-to-r from-[#C5A880] to-[#A88550] hover:from-[#D4AF37] hover:to-[#B6935C] text-[#0D1B2A] font-bold text-sm px-8 py-3 rounded-lg shadow transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Continuar a Datos del Cliente</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Client Form */}
          {step === 3 && (
            <form onSubmit={handleSubmitBooking} className="p-6 sm:p-10 space-y-6">

              {/* Summary Pill Bar */}
              <div className="p-4 bg-[#0A1420] rounded-xl border border-slate-700 text-xs text-white flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-[#E0C097]" />
                  <span>
                    <strong>Fecha:</strong> {selectedDate} a las {selectedSlot}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#E0C097]" />
                  <span>
                    <strong>Modalidad:</strong> {modality === 'presencial' ? 'Presencial en Panamá' : 'Videollamada en Vivo'}
                  </span>
                </div>
                <div className="text-white/90">
                  <strong>Materia:</strong> {PRACTICE_AREAS.find((a) => a.id === selectedArea)?.title}
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-wide mb-1.5">
                    Nombre y Apellido Completo *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#E0C097] absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ej. Roberto Alemán Sánchez"
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#0A1420] text-white placeholder-slate-400 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-wide mb-1.5">
                    Cédula de Identidad o Pasaporte *
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 text-[#E0C097] absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={idDocument}
                      onChange={(e) => setIdDocument(e.target.value)}
                      placeholder="Ej. 8-745-1290 o Pasaporte"
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#0A1420] text-white placeholder-slate-400 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-wide mb-1.5">
                    Correo Electrónico *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#E0C097] absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nombre@correo.com"
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#0A1420] text-white placeholder-slate-400 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-wide mb-1.5">
                    Teléfono Celular / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#E0C097] absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+507 6234-8890"
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#0A1420] text-white placeholder-slate-400 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white uppercase tracking-wide mb-1.5">
                  Breve Resumen o Antecedentes del Asunto Legal (Confidencial)
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describa brevemente la situación (ej. Titulación ANATI, revisión de promesa de compraventa, contrato o defensa penal)"
                  className="w-full p-3 text-sm bg-[#0A1420] text-white placeholder-slate-400 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent"
                />
              </div>

              <div className="flex items-start gap-2 pt-2">
                <input
                  type="checkbox"
                  id="termsCheck"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-1 accent-[#C5A880] rounded cursor-pointer"
                />
                <label htmlFor="termsCheck" className="text-xs text-white/85 cursor-pointer">
                  Confirmo que los datos proporcionados son verídicos y acepto la política de confidencialidad y tratamiento de datos del Despacho MG Abogados &amp; Consultores · Tierras &amp; Bienes Raíces.
                </label>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-700/70">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 text-xs font-semibold text-white/80 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Modificar Fecha</span>
                </button>
                <button
                  type="submit"
                  disabled={!acceptTerms}
                  className="bg-gradient-to-r from-[#C5A880] to-[#A88550] hover:from-[#D4AF37] hover:to-[#B6935C] disabled:opacity-50 text-[#0D1B2A] font-bold text-sm px-8 py-3.5 rounded-lg shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confirmar &amp; Generar Reserva</span>
                </button>
              </div>
            </form>
          )}

          {/* Step 4: Success & Confirmation Ticket */}
          {step === 4 && createdAppointment && (
            <div className="p-6 sm:p-10 space-y-8 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                <Check className="w-8 h-8" />
              </div>

              <div className="max-w-xl mx-auto">
                <div className="text-xs font-bold uppercase tracking-wider text-[#E0C097] mb-1">
                  Reserva Registrada Exitosamente
                </div>
                <h3 className="font-serif-legal text-2xl sm:text-3xl font-bold text-white">
                  ¡Cita Confirmada con {createdAppointment.attorney || 'Licda. Mitzy I. García'}!
                </h3>
                <p className="text-sm text-white/85 mt-2">
                  Hemos generado su expediente provisional y agendado la fecha seleccionada en el despacho.
                </p>
              </div>

              {/* Receipt Ticket Card */}
              <div className="max-w-lg mx-auto bg-[#0A1420] border-2 border-dashed border-[#C5A880] rounded-2xl p-6 text-left shadow-sm relative overflow-hidden">
                {/* Subtle watermark seal */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-48 h-48 opacity-10 pointer-events-none">
                  <Logo size="xl" rounded="2xl" className="w-full h-full" />
                </div>

                <div className="flex items-center justify-between border-b border-slate-700 pb-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white border border-[#C5A880]/50 p-1 flex items-center justify-center shrink-0 shadow-xs overflow-hidden">
                      <Logo size="sm" rounded="lg" className="w-full h-full" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-white/70 block">Expediente de Cita</span>
                      <span className="font-mono text-lg font-bold text-[#E0C097]">
                        {createdAppointment.code}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold block">Estatus</span>
                    <span className="text-xs font-bold text-emerald-300 bg-emerald-950/70 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                      Confirmada
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-white/70 block">Consultante:</span>
                    <strong className="text-white">{createdAppointment.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-white/70 block">Documento:</span>
                    <strong className="text-white">{createdAppointment.idDocument}</strong>
                  </div>
                  <div>
                    <span className="text-white/70 block">Fecha y Hora:</span>
                    <strong className="text-white">{createdAppointment.date} · {createdAppointment.timeSlot}</strong>
                  </div>
                  <div>
                    <span className="text-white/70 block">Modalidad:</span>
                    <strong className="text-white">
                      {createdAppointment.modality === 'presencial' ? 'Presencial (Costa del Este)' : 'Videollamada en Vivo'}
                    </strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-white/70 block">Materia:</span>
                    <strong className="text-white">
                      {PRACTICE_AREAS.find((a) => a.id === createdAppointment.practiceArea)?.title}
                    </strong>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-slate-700/80 flex items-center gap-3">
                    <img
                      src={
                        (createdAppointment.attorney.includes('Mitzy') ? getMitzyPhoto() : TEAM_MEMBERS.find((t) => t.name === createdAppointment.attorney)?.image) ||
                        getMitzyPhoto()
                      }
                      alt={createdAppointment.attorney}
                      className="w-11 h-13 object-cover object-[50%_15%] rounded-lg border border-[#C5A880]/60 shadow-xs"
                    />
                    <div>
                      <span className="text-[10px] text-white/70 uppercase block">Abogado/a Asignado:</span>
                      <strong className="text-white text-xs block">{createdAppointment.attorney}</strong>
                      <span className="text-[10px] text-[#E0C097] font-medium">
                        {TEAM_MEMBERS.find((t) => t.name === createdAppointment.attorney)?.role || 'Especialista'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons for Export & WhatsApp */}
              <div className="max-w-lg mx-auto flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => downloadICSFile(createdAppointment)}
                  className="flex-1 bg-[#0A1420] hover:bg-[#162C46] border border-slate-600 text-white text-xs font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#E0C097]" />
                  <span>Descargar Calendario (.ICS)</span>
                </button>

                <a
                  href={generateGoogleCalendarUrl(createdAppointment)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-[#0A1420] hover:bg-[#162C46] border border-slate-600 text-white text-xs font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-[#E0C097]" />
                  <span>Añadir a Google Calendar</span>
                </a>
              </div>

              <div className="max-w-lg mx-auto">
                <a
                  href={generateWhatsAppConfirmationUrl(createdAppointment)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold py-3.5 px-6 rounded-lg flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Enviar Confirmación por WhatsApp al Despacho</span>
                </a>
              </div>

              <div className="pt-4 border-t border-slate-700/70">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-white/80 hover:text-white underline cursor-pointer"
                >
                  Agendar otra consulta legal
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
