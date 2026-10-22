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
import { PRACTICE_AREAS, TIME_SLOTS, ATTORNEY_PROFILE, TEAM_MEMBERS } from '../data/legalData';
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
    <section id="reservas" className="py-20 lg:py-28 bg-[#F4F3EE] text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest text-[#9C7A4A] font-bold mb-2">
            Atención Personalizada
          </div>
          <h2 className="font-serif-legal text-3xl sm:text-4xl font-bold text-[#0D1B2A] tracking-tight">
            Sistema de Reserva de Citas Jurídicas
          </h2>
          <div className="w-20 h-1 bg-[#C5A880] mx-auto mt-3 mb-4 rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base">
            Seleccione la materia legal, elija entre modalidad presencial en nuestras oficinas o videollamada virtual, y confirme su fecha directamente con la agenda de la Licda. Mitzy I. García.
          </p>

          <div className="mt-4 flex items-center justify-center gap-4 text-xs">
            <button
              onClick={onOpenLookupModal}
              className="text-[#9C7A4A] hover:text-[#0D1B2A] font-semibold underline underline-offset-4 cursor-pointer"
            >
              ¿Ya tiene una reserva? Consultar o reprogramar su cita aquí
            </button>
          </div>
        </div>

        {/* Stepper Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden">
          
          {/* Progress Header */}
          <div className="bg-[#0D1B2A] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#C5A880] text-[#0D1B2A] font-bold flex items-center justify-center text-sm">
                {step === 4 ? <Check className="w-4 h-4" /> : step}
              </span>
              <div>
                <div className="text-xs uppercase tracking-wider text-[#C5A880] font-semibold">
                  Paso {step} de 3
                </div>
                <div className="text-sm font-medium text-slate-200">
                  {step === 1 && 'Selección de Materia y Modalidad'}
                  {step === 2 && 'Fecha y Horario Disponible'}
                  {step === 3 && 'Información del Consultante'}
                  {step === 4 && '¡Cita Confirmada con Éxito!'}
                </div>
              </div>
            </div>

            {step < 4 && (
              <div className="flex items-center gap-2 text-xs text-slate-400">
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
                <label className="block text-sm font-bold text-[#0D1B2A] uppercase tracking-wide mb-3">
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
                          ? 'border-[#0D1B2A] bg-amber-50/50 ring-2 ring-[#C5A880]'
                          : 'border-slate-200 hover:border-slate-400 bg-white'
                      }`}
                    >
                      <div className="font-serif-legal font-bold text-sm text-[#0D1B2A] flex items-center justify-between">
                        <span>{area.title}</span>
                        {selectedArea === area.id && (
                          <Check className="w-4 h-4 text-[#9C7A4A]" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {area.shortDesc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Attorney Selection with Photos */}
              <div>
                <label className="block text-sm font-bold text-[#0D1B2A] uppercase tracking-wide mb-3">
                  2. Seleccione el Abogado/a de su Preferencia *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {TEAM_MEMBERS.map((attorney) => {
                    const isSelected = selectedAttorney === attorney.name;
                    return (
                      <div
                        key={attorney.id}
                        onClick={() => setSelectedAttorney(attorney.name)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                          isSelected
                            ? 'border-[#0D1B2A] bg-amber-50/70 ring-2 ring-[#C5A880] shadow-sm'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <img
                          src={attorney.image}
                          alt={attorney.name}
                          className="w-12 h-14 object-cover object-top rounded-lg border border-slate-300 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-[#0D1B2A] truncate">
                            {attorney.name}
                          </div>
                          <div className="text-[10px] text-[#9C7A4A] font-semibold truncate">
                            {attorney.role}
                          </div>
                          <div className="text-[9px] text-slate-500 truncate">
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
                <label className="block text-sm font-bold text-[#0D1B2A] uppercase tracking-wide mb-3">
                  3. Elija la Modalidad de Atención *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div
                    onClick={() => setModality('presencial')}
                    className={`p-5 rounded-xl border cursor-pointer transition-all flex items-start gap-4 ${
                      modality === 'presencial'
                        ? 'border-[#0D1B2A] bg-amber-50/50 ring-2 ring-[#C5A880]'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#0D1B2A] text-[#E0C097] flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#0D1B2A] flex items-center gap-2">
                        Presencial en Despacho (Panamá)
                        {modality === 'presencial' && <Check className="w-4 h-4 text-[#9C7A4A]" />}
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        Torre Financial Park, Costa del Este / Calle 50. Sala de conferencias privada y confidencial.
                      </p>
                    </div>
                  </div>

                  <div
                    onClick={() => setModality('virtual')}
                    className={`p-5 rounded-xl border cursor-pointer transition-all flex items-start gap-4 ${
                      modality === 'virtual'
                        ? 'border-[#0D1B2A] bg-amber-50/50 ring-2 ring-[#C5A880]'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#0D1B2A] text-[#E0C097] flex items-center justify-center shrink-0">
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#0D1B2A] flex items-center gap-2">
                        Videollamada en Vivo (Zoom / Meet)
                        {modality === 'virtual' && <Check className="w-4 h-4 text-[#9C7A4A]" />}
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        Ideal para clientes en el interior del país, extranjeros o inversionistas que residen fuera de Panamá.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Next Step Button */}
              <div className="pt-4 flex justify-end border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-[#0D1B2A] hover:bg-[#1B263B] text-[#E0C097] font-bold text-sm px-8 py-3 rounded-lg shadow transition-colors flex items-center gap-2 cursor-pointer"
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
                <div className="lg:col-span-7 bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif-legal font-bold text-base text-[#0D1B2A]">
                      {monthNames[currentMonthDate.getMonth()]} {currentMonthDate.getFullYear()}
                    </h3>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setCalendarMonthOffset((prev) => Math.max(0, prev - 1))}
                        disabled={calendarMonthOffset === 0}
                        className="p-1.5 rounded hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700"
                        aria-label="Mes anterior"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setCalendarMonthOffset((prev) => prev + 1)}
                        className="p-1.5 rounded hover:bg-slate-200 text-slate-700"
                        aria-label="Siguiente mes"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Day Names */}
                  <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-500 mb-2">
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
                              ? 'bg-[#0D1B2A] text-[#E0C097] font-bold shadow-md'
                              : isPast || isSunday
                              ? 'text-slate-300 cursor-not-allowed'
                              : 'hover:bg-amber-100 text-slate-700 bg-white border border-slate-100'
                          }`}
                        >
                          {dayNum}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-4 text-[11px] text-slate-500 flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded bg-[#0D1B2A]" /> Seleccionado
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded bg-white border border-slate-300" /> Disponible
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded bg-slate-200" /> No laborable
                    </span>
                  </div>
                </div>

                {/* Time Slot Picker */}
                <div className="lg:col-span-5 space-y-4">
                  <div>
                    <h3 className="font-serif-legal font-bold text-base text-[#0D1B2A] mb-1">
                      Horarios Disponibles
                    </h3>
                    <p className="text-xs text-slate-500">
                      Fecha: <span className="font-semibold text-slate-800">{selectedDate}</span> (Sesión de 60 minutos)
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
                              ? 'border-[#0D1B2A] bg-[#0D1B2A] text-[#E0C097] shadow-sm'
                              : 'border-slate-200 hover:border-slate-400 bg-white text-slate-700'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5 text-[#9C7A4A]" />
                          <span>{slot}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Attorney Box */}
                  <div className="bg-amber-50/80 p-4 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-center gap-3">
                    <img
                      src={
                        (selectedAttorney.includes('Mitzy') ? getMitzyPhoto() : TEAM_MEMBERS.find((t) => t.name === selectedAttorney)?.image) ||
                        getMitzyPhoto()
                      }
                      alt={selectedAttorney}
                      className="w-12 h-14 object-cover object-top rounded-lg border border-[#C5A880] shrink-0 shadow-xs"
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                        Abogado/a asignado para su cita:
                      </span>
                      <strong className="text-slate-900 block text-xs truncate">
                        {selectedAttorney}
                      </strong>
                      <span className="text-[11px] text-[#9C7A4A] font-semibold block truncate">
                        {TEAM_MEMBERS.find((t) => t.name === selectedAttorney)?.role || 'Directora'}
                      </span>
                      <p className="text-slate-600 text-[10px] mt-0.5 truncate">
                        {TEAM_MEMBERS.find((t) => t.name === selectedAttorney)?.experienceTag ||
                          'Exfiscal del Ministerio Público'}
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {errorMsg && (
                <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Volver al paso anterior</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="bg-[#0D1B2A] hover:bg-[#1B263B] text-[#E0C097] font-bold text-sm px-8 py-3 rounded-lg shadow transition-colors flex items-center gap-2 cursor-pointer"
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
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-[#9C7A4A]" />
                  <span>
                    <strong>Fecha:</strong> {selectedDate} a las {selectedSlot}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#9C7A4A]" />
                  <span>
                    <strong>Modalidad:</strong> {modality === 'presencial' ? 'Presencial en Panamá' : 'Videollamada en Vivo'}
                  </span>
                </div>
                <div className="text-slate-600">
                  <strong>Materia:</strong> {PRACTICE_AREAS.find((a) => a.id === selectedArea)?.title}
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Nombre y Apellido Completo *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ej. Roberto Alemán Sánchez"
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Cédula de Identidad o Pasaporte *
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={idDocument}
                      onChange={(e) => setIdDocument(e.target.value)}
                      placeholder="Ej. 8-745-1290 o Pasaporte"
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Correo Electrónico *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nombre@correo.com"
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Teléfono Celular / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+507 6234-8890"
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Breve Resumen o Antecedentes del Asunto Legal (Confidencial)
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describa brevemente la situación (ej. Citación de fiscalía recibida, revisión de promesa de compraventa de finca, sociedad anónima, etc.)"
                  className="w-full p-3 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent"
                />
              </div>

              <div className="flex items-start gap-2 pt-2">
                <input
                  type="checkbox"
                  id="termsCheck"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-1 accent-[#0D1B2A] rounded cursor-pointer"
                />
                <label htmlFor="termsCheck" className="text-xs text-slate-600 cursor-pointer">
                  Confirmo que los datos proporcionados son verídicos y acepto la política de confidencialidad y tratamiento de datos del Despacho MG Abogados &amp; Consultores · Tierras &amp; Bienes Raíces.
                </label>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
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
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                <Check className="w-8 h-8" />
              </div>

              <div className="max-w-xl mx-auto">
                <div className="text-xs font-bold uppercase tracking-wider text-[#9C7A4A] mb-1">
                  Reserva Registrada Exitosamente
                </div>
                <h3 className="font-serif-legal text-2xl sm:text-3xl font-bold text-[#0D1B2A]">
                  ¡Cita Confirmada con {createdAppointment.attorney || 'Licda. Mitzy I. García'}!
                </h3>
                <p className="text-sm text-slate-600 mt-2">
                  Hemos generado su expediente provisional y agendado la fecha seleccionada en el despacho.
                </p>
              </div>

              {/* Receipt Ticket Card */}
              <div className="max-w-lg mx-auto bg-white border-2 border-dashed border-[#C5A880] rounded-2xl p-6 text-left shadow-sm relative overflow-hidden">
                {/* Subtle watermark seal */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-48 h-48 opacity-10 pointer-events-none">
                  <Logo size="xl" rounded="2xl" className="w-full h-full" />
                </div>

                <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white border border-[#C5A880]/50 p-1 flex items-center justify-center shrink-0 shadow-xs overflow-hidden">
                      <Logo size="sm" rounded="lg" className="w-full h-full" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 block">Expediente de Cita</span>
                      <span className="font-mono text-lg font-bold text-[#0D1B2A]">
                        {createdAppointment.code}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-emerald-700 font-semibold block">Estatus</span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Confirmada
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block">Consultante:</span>
                    <strong className="text-slate-900">{createdAppointment.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Documento:</span>
                    <strong className="text-slate-900">{createdAppointment.idDocument}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Fecha y Hora:</span>
                    <strong className="text-slate-900">{createdAppointment.date} · {createdAppointment.timeSlot}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Modalidad:</span>
                    <strong className="text-slate-900">
                      {createdAppointment.modality === 'presencial' ? 'Presencial (Costa del Este)' : 'Videollamada en Vivo'}
                    </strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500 block">Materia:</span>
                    <strong className="text-slate-900">
                      {PRACTICE_AREAS.find((a) => a.id === createdAppointment.practiceArea)?.title}
                    </strong>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-slate-200/80 flex items-center gap-3">
                    <img
                      src={
                        (createdAppointment.attorney.includes('Mitzy') ? getMitzyPhoto() : TEAM_MEMBERS.find((t) => t.name === createdAppointment.attorney)?.image) ||
                        getMitzyPhoto()
                      }
                      alt={createdAppointment.attorney}
                      className="w-11 h-13 object-cover object-[50%_15%] rounded-lg border border-[#C5A880]/60 shadow-xs"
                    />
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Abogado/a Asignado:</span>
                      <strong className="text-slate-900 text-xs block">{createdAppointment.attorney}</strong>
                      <span className="text-[10px] text-[#9C7A4A] font-medium">
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
                  className="flex-1 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#9C7A4A]" />
                  <span>Descargar Calendario (.ICS)</span>
                </button>

                <a
                  href={generateGoogleCalendarUrl(createdAppointment)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-[#9C7A4A]" />
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

              <div className="pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
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
