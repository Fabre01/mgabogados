import React, { useState, useEffect } from 'react';
import { X, Search, Calendar, Clock, MapPin, Video, CheckCircle, AlertTriangle, Trash2, Edit3, Download } from 'lucide-react';
import { Appointment } from '../types';
import { INITIAL_APPOINTMENTS, PRACTICE_AREAS, TIME_SLOTS, TEAM_MEMBERS } from '../data/legalData';
import { downloadICSFile } from '../utils/calendar';
import { getMitzyPhoto } from '../utils/photoManager';

interface AppointmentLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppointmentLookupModal: React.FC<AppointmentLookupModalProps> = ({
  isOpen,
  onClose
}) => {
  const [query, setQuery] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [foundAppointment, setFoundAppointment] = useState<Appointment | null>(null);
  const [searched, setSearched] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newDate, setNewDate] = useState('');
  const [newSlot, setNewSlot] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const [isConfirmingCancel, setIsConfirmingCancel] = useState(false);

  // Load appointments from localStorage or seed
  useEffect(() => {
    if (isOpen) {
      try {
        const stored = localStorage.getItem('mg_appointments');
        if (stored) {
          setAppointments(JSON.parse(stored));
        } else {
          localStorage.setItem('mg_appointments', JSON.stringify(INITIAL_APPOINTMENTS));
          setAppointments(INITIAL_APPOINTMENTS);
        }
      } catch (e) {
        setAppointments(INITIAL_APPOINTMENTS);
      }
      setFeedback(null);
      setIsEditing(false);
      setIsConfirmingCancel(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    setFeedback(null);
    setIsEditing(false);
    setIsConfirmingCancel(false);

    const q = query.trim().toLowerCase();
    if (!q) {
      setFoundAppointment(null);
      return;
    }

    const matched = appointments.find(
      (apt) => apt.code.toLowerCase() === q || apt.email.toLowerCase() === q
    );
    setFoundAppointment(matched || null);
  };

  const handleExecuteCancel = () => {
    if (!foundAppointment) return;

    const updated = appointments.map((a) =>
      a.id === foundAppointment.id ? { ...a, status: 'cancelada' as const } : a
    );
    setAppointments(updated);
    setFoundAppointment({ ...foundAppointment, status: 'cancelada' });
    localStorage.setItem('mg_appointments', JSON.stringify(updated));
    setIsConfirmingCancel(false);
    setFeedback('La cita ha sido marcada como cancelada.');
  };

  const handleSaveReschedule = () => {
    if (!foundAppointment || !newDate || !newSlot) return;

    const updated = appointments.map((a) =>
      a.id === foundAppointment.id
        ? {
            ...a,
            date: newDate,
            timeSlot: newSlot,
            status: 'confirmada' as const
          }
        : a
    );
    const updatedApt = {
      ...foundAppointment,
      date: newDate,
      timeSlot: newSlot,
      status: 'confirmada' as const
    };

    setAppointments(updated);
    setFoundAppointment(updatedApt);
    localStorage.setItem('mg_appointments', JSON.stringify(updated));
    setIsEditing(false);
    setFeedback('¡Su cita ha sido reprogramada exitosamente!');
  };

  const areaTitle =
    PRACTICE_AREAS.find((a) => a.id === foundAppointment?.practiceArea)?.title ||
    'Asesoría Jurídica';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden text-slate-800">
        
        {/* Modal Header */}
        <div className="bg-[#0D1B2A] text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-[#C5A880]" />
            <h3 className="font-serif-legal font-bold text-lg text-white">
              Gestionar / Consultar Cita
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
              Ingrese su Código de Cita o Correo Electrónico
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ej. MG-2026-8812 o roberto.aleman@ejemplo.pa"
                className="flex-1 px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
              />
              <button
                type="submit"
                className="bg-[#0D1B2A] hover:bg-[#1B263B] text-[#E0C097] text-xs font-bold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Buscar
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Pruebe con el código demo: <button type="button" onClick={() => { setQuery('MG-2026-8812'); }} className="text-[#9C7A4A] underline font-mono">MG-2026-8812</button>
            </p>
          </form>

          {feedback && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{feedback}</span>
            </div>
          )}

          {/* Result view */}
          {searched && !foundAppointment && (
            <div className="text-center py-6 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-500">
              <AlertTriangle className="w-6 h-6 mx-auto text-amber-500 mb-2" />
              No se encontró ninguna cita con el código o correo ingresado. Por favor verifique los datos.
            </div>
          )}

          {foundAppointment && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[10px] uppercase text-slate-500 block">Código</span>
                  <span className="font-mono font-bold text-base text-[#0D1B2A]">
                    {foundAppointment.code}
                  </span>
                </div>
                <div>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                      foundAppointment.status === 'confirmada'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : foundAppointment.status === 'cancelada'
                        ? 'bg-rose-50 text-rose-800 border-rose-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}
                  >
                    {foundAppointment.status === 'confirmada'
                      ? 'Confirmada'
                      : foundAppointment.status === 'cancelada'
                      ? 'Cancelada'
                      : 'En Revisión'}
                  </span>
                </div>
              </div>

              {!isEditing ? (
                <>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500 block">Cliente:</span>
                      <strong className="text-slate-900">{foundAppointment.fullName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Documento:</span>
                      <strong className="text-slate-900">{foundAppointment.idDocument}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Fecha y Hora:</span>
                      <strong className="text-slate-900">
                        {foundAppointment.date} · {foundAppointment.timeSlot}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Modalidad:</span>
                      <strong className="text-slate-900">
                        {foundAppointment.modality === 'presencial' ? 'Presencial' : 'Virtual'}
                      </strong>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-500 block">Materia:</span>
                      <strong className="text-slate-900">{areaTitle}</strong>
                    </div>
                    {foundAppointment.attorney && (
                      <div className="col-span-2 pt-2 border-t border-slate-200 flex items-center gap-3 bg-white p-2.5 rounded-lg border border-slate-200">
                        <img
                          src={
                            (foundAppointment.attorney.includes('Mitzy') ? getMitzyPhoto() : TEAM_MEMBERS.find((t) => t.name === foundAppointment.attorney)?.image) ||
                            getMitzyPhoto()
                          }
                          alt={foundAppointment.attorney}
                          className="w-10 h-12 object-cover object-top rounded-md border border-slate-300 shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="text-[10px] text-slate-500 uppercase block">Abogado/a Asignado:</span>
                          <strong className="text-slate-900 text-xs block">{foundAppointment.attorney}</strong>
                          <span className="text-[10px] text-[#9C7A4A] font-medium">
                            {TEAM_MEMBERS.find((t) => t.name === foundAppointment.attorney)?.role || 'Especialista'}
                          </span>
                        </div>
                      </div>
                    )}
                    {foundAppointment.notes && (
                      <div className="col-span-2 bg-white p-2.5 rounded border border-slate-200">
                        <span className="text-[11px] text-slate-500 block">Resumen del Asunto:</span>
                        <p className="text-xs text-slate-700 italic">{foundAppointment.notes}</p>
                      </div>
                    )}
                  </div>

                  {foundAppointment.status !== 'cancelada' && (
                    <div className="pt-3 border-t border-slate-200">
                      {isConfirmingCancel ? (
                        <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 space-y-2">
                          <p className="text-xs text-rose-900 font-medium">
                            ¿Confirma que desea cancelar esta cita jurídica? El espacio quedará disponible para otros consultantes.
                          </p>
                          <div className="flex gap-2 justify-end">
                            <button
                              type="button"
                              onClick={() => setIsConfirmingCancel(false)}
                              className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-semibold rounded cursor-pointer"
                            >
                              No, mantener cita
                            </button>
                            <button
                              type="button"
                              onClick={handleExecuteCancel}
                              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded cursor-pointer"
                            >
                              Sí, cancelar cita
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setIsEditing(true);
                              setNewDate(foundAppointment.date);
                              setNewSlot(foundAppointment.timeSlot);
                            }}
                            className="flex-1 py-2 px-3 bg-white hover:bg-slate-100 border border-slate-300 rounded text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                            <span>Reprogramar</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setIsConfirmingCancel(true)}
                            className="py-2 px-3 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 rounded text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Cancelar Cita</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => downloadICSFile(foundAppointment)}
                            className="py-2 px-3 bg-white hover:bg-slate-100 border border-slate-300 rounded text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
                            title="Descargar ICS"
                          >
                            <Download className="w-3.5 h-3.5 text-slate-600" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                /* Reschedule form */
                <div className="space-y-4 bg-white p-4 rounded-lg border border-slate-200">
                  <h4 className="text-xs font-bold uppercase text-[#0D1B2A]">
                    Reprogramar Fecha y Hora
                  </h4>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Nueva Fecha</label>
                    <input
                      type="date"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full text-xs p-2 border border-slate-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Nuevo Horario</label>
                    <select
                      value={newSlot}
                      onChange={(e) => setNewSlot(e.target.value)}
                      className="w-full text-xs p-2 border border-slate-300 rounded"
                    >
                      {TIME_SLOTS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-2 justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveReschedule}
                      className="px-4 py-1.5 bg-[#0D1B2A] text-[#E0C097] text-xs font-bold rounded"
                    >
                      Guardar Cambio
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* WhatsApp Direct Help */}
          <div className="bg-amber-50/80 p-4 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-center justify-between">
            <div>
              <span className="font-bold block">¿Problemas con su cita?</span>
              <span className="text-[11px] text-amber-900">Escríbanos directamente para asistencia inmediata</span>
            </div>
            <a
              href="https://wa.me/50762348890"
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
