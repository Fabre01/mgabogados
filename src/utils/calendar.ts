import { Appointment } from '../types';

export function generateAppointmentCode(): string {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().getFullYear();
  return `MG-${year}-${randomDigits}`;
}

export function generateICSContent(apt: Appointment): string {
  // Parse date and timeSlot (e.g., 2026-09-28 and 10:00 AM)
  const [time, period] = apt.timeSlot.split(' ');
  const [hoursStr, minutesStr] = time.split(':');
  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  if (period === 'PM' && hours !== 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }

  const [yearStr, monthStr, dayStr] = apt.date.split('-');
  const dateObj = new Date(parseInt(yearStr, 10), parseInt(monthStr, 10) - 1, parseInt(dayStr, 10), hours, minutes);
  const endDateObj = new Date(dateObj.getTime() + 60 * 60 * 1000); // 1 hour duration

  const formatICSDate = (d: Date) => {
    return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const startStr = formatICSDate(dateObj);
  const endStr = formatICSDate(endDateObj);

  const location =
    apt.modality === 'presencial'
      ? 'Despacho MG Abogados: Torre Financial Park, Costa del Este / Calle 50, Ciudad de Panamá'
      : 'Videollamada en vivo (Enlace se enviará a su correo: Google Meet / Zoom)';

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//MG Abogados y Consultores//Cita Legal//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${apt.code}@mgabogadospanama.com`,
    `DTSTAMP:${formatICSDate(new Date())}`,
    `DTSTART:${startStr}`,
    `DTEND:${endStr}`,
    `SUMMARY:Consulta Legal con Licda. Mitzy I. García [${apt.code}]`,
    `DESCRIPTION:Consulta jurídica con el Despacho MG Abogados & Consultores · Tierras & Bienes Raíces.\\nCódigo: ${apt.code}\\nCliente: ${apt.fullName}\\nMateria: ${apt.practiceArea}\\nModalidad: ${apt.modality === 'presencial' ? 'Presencial' : 'Virtual'}\\nNotas: ${apt.notes}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}

export function downloadICSFile(apt: Appointment) {
  const ics = generateICSContent(apt);
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `Cita-MG-Abogados-${apt.code}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function generateGoogleCalendarUrl(apt: Appointment): string {
  const [time, period] = apt.timeSlot.split(' ');
  const [hoursStr, minutesStr] = time.split(':');
  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  if (period === 'PM' && hours !== 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }

  const [yearStr, monthStr, dayStr] = apt.date.split('-');
  const dateObj = new Date(parseInt(yearStr, 10), parseInt(monthStr, 10) - 1, parseInt(dayStr, 10), hours, minutes);
  const endDateObj = new Date(dateObj.getTime() + 60 * 60 * 1000);

  const formatGCalDate = (d: Date) => {
    return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const title = encodeURIComponent(`Consulta Jurídica - Licda. Mitzy I. García (${apt.code})`);
  const details = encodeURIComponent(
    `Cita en MG Abogados & Consultores · Tierras & Bienes Raíces.\nCódigo: ${apt.code}\nModalidad: ${apt.modality === 'presencial' ? 'Presencial' : 'Virtual'}\nCliente: ${apt.fullName}\nTeléfono: ${apt.phone}\nNotas: ${apt.notes}`
  );
  const location = encodeURIComponent(
    apt.modality === 'presencial'
      ? 'Torre Financial Park, Costa del Este / Calle 50, Ciudad de Panamá'
      : 'Enlace Virtual Google Meet'
  );

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatGCalDate(dateObj)}/${formatGCalDate(endDateObj)}&details=${details}&location=${location}`;
}

export function generateWhatsAppConfirmationUrl(apt: Appointment): string {
  const text = encodeURIComponent(
    `Hola Licda. Mitzy García / Despacho MG Abogados,\nHe registrado la cita con código *${apt.code}* a nombre de *${apt.fullName}* para el día *${apt.date}* a las *${apt.timeSlot}* (${apt.modality === 'presencial' ? 'Presencial' : 'Virtual'}). Deseo confirmar los detalles. ¡Gracias!`
  );
  return `https://wa.me/50762348890?text=${text}`;
}
