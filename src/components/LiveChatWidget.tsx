import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Send,
  ShieldAlert,
  ExternalLink,
  Minimize2,
  Trash2,
  CheckCheck
} from 'lucide-react';
import { ChatMessage } from '../types';
import { ATTORNEY_PROFILE } from '../data/legalData';
import { useMitzyPhoto } from '../hooks/useMitzyPhoto';

interface LiveChatWidgetProps {
  onOpenBooking: () => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'assistant',
    text: 'Estimado/a consultante, bienvenido al Despacho MG Abogados & Consultores · Tierras & Bienes Raíces. Soy el asistente legal del equipo de la Licda. Mitzy I. García (Exfiscal del Ministerio Público de Panamá).',
    timestamp: 'Justo ahora'
  },
  {
    id: 'msg-2',
    sender: 'assistant',
    text: '¿En qué materia o asunto jurídico podemos orientarle hoy? Puede escribir su consulta o elegir una de las opciones rápidas:',
    timestamp: 'Justo ahora',
    quickReplies: [
      'Agendar cita presencial o virtual',
      'Urgencia penal o citación fiscal',
      'Compraventa de finca o apartamento',
      'Ubicación y horarios de atención'
    ]
  }
];

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({ onOpenBooking }) => {
  const mitzyPhoto = useMitzyPhoto();
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const stored = sessionStorage.getItem('mg_live_chat');
      return stored ? JSON.parse(stored) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  // Persist in session
  useEffect(() => {
    try {
      sessionStorage.setItem('mg_live_chat', JSON.stringify(messages));
    } catch {}
  }, [messages]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasUnread(false);
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputVal.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    if (!textToSend) setInputVal('');

    // Simulate typing and response
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateSmartLegalReply(text);
      setIsTyping(false);
      setMessages((prev) => [...prev, reply]);
    }, 1100);
  };

  const generateSmartLegalReply = (userQuery: string): ChatMessage => {
    const q = userQuery.toLowerCase();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Urgent Criminal scenario
    if (
      q.includes('urgenc') ||
      q.includes('penal') ||
      q.includes('fiscal') ||
      q.includes('aprehen') ||
      q.includes('deten') ||
      q.includes('polic') ||
      q.includes('carcel') ||
      q.includes('audiencia')
    ) {
      return {
        id: 'reply-' + Date.now(),
        sender: 'attorney',
        text: 'Para asuntos penales, la Licda. Mitzy I. García cuenta con 10 años de experiencia en el Ministerio Público investigando causas y actuando como fiscal. Las primeras horas son críticas ante el Juez de Garantías. Si se trata de una aprehensión o audiencia urgente, por favor comuníquese de inmediato a nuestra línea directa de urgencias penales (+507 6980-1122) o use WhatsApp directo.',
        timestamp: time,
        actionLink: {
          label: 'Llamar a Urgencias: +507 6980-1122',
          urlOrAction: 'tel:+50769801122'
        },
        quickReplies: ['Agendar cita penal', 'WhatsApp directo']
      };
    }

    // Tierras & Bienes Raíces scenario
    if (
      q.includes('tierra') ||
      q.includes('tierras') ||
      q.includes('anati') ||
      q.includes('posesorio') ||
      q.includes('posesion') ||
      q.includes('lindero') ||
      q.includes('finca') ||
      q.includes('bienes') ||
      q.includes('raices') ||
      q.includes('apartamento') ||
      q.includes('casa') ||
      q.includes('compra') ||
      q.includes('propiedad') ||
      q.includes('terreno') ||
      q.includes('titulo') ||
      q.includes('registro')
    ) {
      return {
        id: 'reply-' + Date.now(),
        sender: 'attorney',
        text: 'En el área de Tierras y Bienes Raíces, brindamos asesoría jurídica integral: trámites de titulación y adjudicación ante la ANATI, regularización de derechos posesorios, debida diligencia en el Registro Público de Panamá, auditoría de fincas y redacción blindada de contratos de compraventa. ¿Desea agendar una consulta sobre tierras o bienes inmuebles?',
        timestamp: time,
        quickReplies: ['Agendar cita de Tierras / Bienes Raíces', 'Trámites de titulación ANATI']
      };
    }

    // Booking appointment scenario
    if (
      q.includes('agendar') ||
      q.includes('cita') ||
      q.includes('horario') ||
      q.includes('costo') ||
      q.includes('precio') ||
      q.includes('consulta') ||
      q.includes('virtual') ||
      q.includes('presencial')
    ) {
      return {
        id: 'reply-' + Date.now(),
        sender: 'assistant',
        text: 'Puede agendar su cita de 60 minutos directamente en nuestro sistema interactivo. Atendemos tanto en modalidad Presencial (en Torre Financial Park, Ciudad de Panamá) como Virtual por Google Meet/Zoom para clientes en el interior o en el extranjero.',
        timestamp: time,
        quickReplies: ['Ir al sistema de reservas', 'Escribir por WhatsApp']
      };
    }

    // Location & Hours
    if (q.includes('ubicacion') || q.includes('donde') || q.includes('direccion') || q.includes('oficina')) {
      return {
        id: 'reply-' + Date.now(),
        sender: 'assistant',
        text: 'Nuestras oficinas están ubicadas en Torre Financial Park, Piso 18, Costa del Este / Calle 50, Ciudad de Panamá. Nuestro horario de oficina es de Lunes a Viernes de 8:00 AM a 5:30 PM (con atención penal de urgencia las 24 horas).',
        timestamp: time,
        quickReplies: ['Ver en Google Maps', 'Agendar cita']
      };
    }

    // Default fallback response
    return {
      id: 'reply-' + Date.now(),
      sender: 'assistant',
      text: 'Gracias por su mensaje. Hemos tomado nota de su consulta para la Licda. Mitzy I. García. Para brindarle una asesoría técnica y confidencial con análisis de su caso, le recomendamos agendar una cita o escribirnos directamente a nuestro WhatsApp oficial.',
      timestamp: time,
      quickReplies: ['Agendar cita legal', 'Contactar por WhatsApp', 'Ver áreas de práctica']
    };
  };

  const handleQuickReplyClick = (reply: string) => {
    const r = reply.toLowerCase();
    if (r.includes('agendar') || r.includes('reserva') || r.includes('cita')) {
      onOpenBooking();
      const el = document.getElementById('reservas');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (r.includes('whatsapp')) {
      const link = document.createElement('a');
      link.href = 'https://wa.me/50762348890';
      link.target = '_blank';
      link.rel = 'noreferrer';
      link.click();
      return;
    }
    if (r.includes('maps') || r.includes('ubicación') || r.includes('ubicacion')) {
      const link = document.createElement('a');
      link.href = 'https://maps.google.com/?q=Torre+Financial+Park+Costa+del+Este+Panama';
      link.target = '_blank';
      link.rel = 'noreferrer';
      link.click();
      return;
    }
    if (r.includes('áreas') || r.includes('areas') || r.includes('práctica') || r.includes('practica')) {
      const el = document.getElementById('servicios');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    handleSendMessage(reply);
  };

  const handleClearChat = () => {
    setShowClearConfirm(true);
  };

  const handleConfirmReset = () => {
    setMessages(INITIAL_MESSAGES);
    sessionStorage.removeItem('mg_live_chat');
    setShowClearConfirm(false);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={handleToggle}
            className="group relative bg-gradient-to-r from-[#0D1B2A] to-[#1B263B] hover:from-[#152238] hover:to-[#22304a] text-white p-4 rounded-full shadow-2xl border-2 border-[#C5A880] flex items-center gap-3 transition-all hover:scale-105 cursor-pointer"
            aria-label="Abrir Chat en Vivo"
          >
            <div className="relative">
              <MessageSquare className="w-6 h-6 text-[#E0C097]" />
              {hasUnread && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#0D1B2A] animate-pulse" />
              )}
            </div>

            <div className="hidden sm:flex flex-col text-left pr-1">
              <span className="text-xs font-bold text-white tracking-wide">
                Chat en Vivo
              </span>
              <span className="text-[10px] text-[#C5A880] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Despacho MG en línea
              </span>
            </div>
          </button>
        )}
      </div>

      {/* Chat Window Container */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[94vw] sm:w-96 max-h-[600px] h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-300 flex flex-col overflow-hidden text-slate-800 animate-in fade-in slide-in-from-bottom-6 duration-200">
          
          {/* Header */}
          <div className="bg-[#0D1B2A] text-white p-4 border-b border-slate-800 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <img
                    src={mitzyPhoto}
                    alt={ATTORNEY_PROFILE.name}
                    className="w-10 h-10 rounded-full object-cover object-top border-2 border-[#C5A880] shadow"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#0D1B2A] rounded-full" />
                </div>
                <div>
                  <div className="font-bold text-sm text-white flex items-center gap-1.5">
                    <span>MG Abogados &amp; Consultores</span>
                  </div>
                  <div className="text-[11px] text-[#C5A880] flex items-center gap-1">
                    <span>Licda. Mitzy I. García</span>
                    <span>·</span>
                    <span className="text-emerald-400 font-medium">En Línea</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-slate-400">
                <button
                  onClick={handleClearChat}
                  className="p-1 hover:text-white rounded transition-colors"
                  title="Reiniciar chat"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:text-white rounded transition-colors"
                  title="Minimizar"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {showClearConfirm && (
              <div className="mt-2.5 p-2 bg-slate-800/90 rounded-lg border border-slate-700 text-xs flex items-center justify-between">
                <span className="text-[11px] text-slate-200">¿Reiniciar la conversación?</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowClearConfirm(false)}
                    className="px-2 py-0.5 bg-slate-700 hover:bg-slate-600 text-slate-200 text-[10px] rounded cursor-pointer"
                  >
                    No
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmReset}
                    className="px-2 py-0.5 bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold rounded cursor-pointer"
                  >
                    Sí, reiniciar
                  </button>
                </div>
              </div>
            )}

            {/* Quick WhatsApp Handoff Bar */}
            <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
              <span className="text-slate-300">¿Prefiere chatear por WhatsApp?</span>
              <a
                href="https://wa.me/50762348890"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
              >
                <span>Abrir WhatsApp</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#FAF9F6] text-xs">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <img
                      src={ATTORNEY_PROFILE.photo}
                      alt="Licda. Mitzy I. García"
                      className="w-7 h-7 rounded-full object-cover object-top border border-[#C5A880] shrink-0 mt-0.5 shadow-xs"
                    />
                  )}
                  <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[85%]`}>
                    <div
                      className={`w-full rounded-2xl p-3 leading-relaxed shadow-2xs ${
                        isUser
                          ? 'bg-[#0D1B2A] text-white rounded-br-xs'
                          : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                      }`}
                    >
                      {!isUser && (
                        <div className="text-[10px] font-bold text-[#9C7A4A] mb-1 flex items-center gap-1">
                          <span>
                            {msg.sender === 'attorney' ? 'Licda. Mitzy I. García' : 'Asistente Despacho MG'}
                          </span>
                        </div>
                      )}
                      <p className="whitespace-pre-line">{msg.text}</p>

                      {msg.actionLink && (
                        <a
                          href={msg.actionLink.urlOrAction}
                          className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 hover:underline"
                        >
                          <ShieldAlert className="w-3.5 h-3.5" />
                          <span>{msg.actionLink.label}</span>
                        </a>
                      )}
                    </div>

                    <span className="text-[10px] text-slate-400 mt-1 px-1 flex items-center gap-1">
                      {msg.timestamp}
                      {isUser && <CheckCheck className="w-3 h-3 text-slate-400" />}
                    </span>

                    {/* Quick Replies Buttons */}
                    {msg.quickReplies && (
                      <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                        {msg.quickReplies.map((qr, i) => (
                          <button
                            key={i}
                            onClick={() => handleQuickReplyClick(qr)}
                            className="px-2.5 py-1 bg-white hover:bg-amber-50 text-slate-700 hover:text-[#0D1B2A] border border-slate-300 hover:border-[#C5A880] rounded-full text-[11px] font-medium transition-colors cursor-pointer text-left"
                          >
                            {qr}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-500 bg-white p-2.5 rounded-xl border border-slate-200 w-fit">
                <span className="text-[11px]">Escribiendo respuesta...</span>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full animate-bounce [animation-delay:0.4s]" />
                </span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Escriba su consulta jurídica..."
              className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:bg-white"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-2 bg-[#0D1B2A] hover:bg-[#1B263B] disabled:opacity-40 text-[#E0C097] rounded-lg transition-colors cursor-pointer"
              aria-label="Enviar mensaje"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
