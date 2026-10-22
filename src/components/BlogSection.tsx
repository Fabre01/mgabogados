import React, { useState } from 'react';
import { LegalArticle, PracticeAreaId } from '../types';
import { INITIAL_ARTICLES } from '../data/legalData';
import {
  BookOpen,
  Search,
  ArrowRight,
  X,
  Printer,
  Scale
} from 'lucide-react';

interface BlogSectionProps {
  onConsultArticleTopic: (category: PracticeAreaId) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onConsultArticleTopic }) => {
  const [articles] = useState<LegalArticle[]>(INITIAL_ARTICLES);
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<LegalArticle | null>(null);

  // Filter logic
  const filteredArticles = articles.filter((art) => {
    const matchesCategory =
      activeCategory === 'todos' || art.category === activeCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = articles.find((a) => a.featured) || articles[0];

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'penal':
        return 'Derecho Penal & SPA';
      case 'bienes_raices':
        return 'Tierras & Bienes Raíces';
      case 'corporativo':
        return 'Derecho Corporativo & FIP';
      case 'legislacion':
        return 'Novedades Legislativas';
      case 'consejos':
        return 'Consejos Prácticos';
      default:
        return 'Artículos Legales';
    }
  };

  return (
    <section id="blog" className="py-20 lg:py-28 bg-white text-slate-800 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="text-xs uppercase tracking-widest text-[#9C7A4A] font-bold mb-2">
            Criterio Jurídico &amp; Actualidad Forense
          </div>
          <h2 className="font-serif-legal text-3xl sm:text-4xl font-bold text-[#0D1B2A] tracking-tight">
            Blog de Noticias Legales &amp; Jurisprudencia
          </h2>
          <div className="w-20 h-1 bg-[#C5A880] mx-auto mt-3 mb-4 rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base">
            Análisis técnicos, guías procesales del Sistema Penal Acusatorio y recomendaciones registrales para proteger sus inversiones en Panamá.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-100">
          
          {/* Category Tabs (Interactive buttons allowed by design constitution) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-xl overflow-x-auto max-w-full">
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'penal', label: 'Derecho Penal' },
              { id: 'bienes_raices', label: 'Bienes Raíces' },
              { id: 'corporativo', label: 'Corporativo & FIP' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#0D1B2A] text-[#E0C097] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar artículo legal..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent"
            />
          </div>
        </div>

        {/* Featured Article Hero (When in 'todos' and no search query) */}
        {activeCategory === 'todos' && !searchQuery && featuredArticle && (
          <div
            onClick={() => setSelectedArticle(featuredArticle)}
            className="mb-12 bg-gradient-to-r from-[#0D1B2A] to-[#1B263B] rounded-2xl p-6 sm:p-10 text-white shadow-xl cursor-pointer hover:shadow-2xl transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A880]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="max-w-3xl space-y-4 relative z-10">
              {/* Clean unboxed metadata with subtle dots */}
              <div className="flex items-center gap-2 text-xs text-[#E0C097]">
                <span className="font-semibold uppercase tracking-wider">
                  {getCategoryLabel(featuredArticle.category)}
                </span>
                <span aria-hidden="true">·</span>
                <span>{featuredArticle.publishedDate}</span>
                <span aria-hidden="true">·</span>
                <span>{featuredArticle.readTime}</span>
              </div>

              <h3 className="font-serif-legal text-2xl sm:text-3xl font-bold group-hover:text-[#E0C097] transition-colors leading-tight">
                {featuredArticle.title}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-2">
                {featuredArticle.summary}
              </p>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="w-6 h-6 rounded-full bg-[#C5A880] text-[#0D1B2A] font-bold text-[10px] flex items-center justify-center">
                    MG
                  </span>
                  <span>Por {featuredArticle.author.name}</span>
                </div>
                <div className="text-xs font-bold text-[#E0C097] group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
                  <span>Leer Artículo Completo</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="bg-[#FAF9F6] border border-slate-200/80 rounded-2xl p-6 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group hover:border-[#C5A880]"
            >
              <div className="space-y-3">
                {/* Unboxed metadata with typographic dot per frontend design constitution */}
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-[#9C7A4A]">
                    {getCategoryLabel(article.category)}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-serif-legal text-lg font-bold text-[#0D1B2A] group-hover:text-[#9C7A4A] transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <span className="text-slate-400">{article.publishedDate}</span>
                <span className="font-bold text-[#0D1B2A] group-hover:text-[#9C7A4A] flex items-center gap-1">
                  <span>Leer</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-500">
            No se encontraron artículos para la búsqueda solicitada.
          </div>
        )}

      </div>

      {/* Full Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden text-slate-800">
            
            {/* Reader Header */}
            <div className="bg-[#0D1B2A] text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#C5A880]" />
                <span className="text-xs uppercase tracking-wider text-[#C5A880] font-semibold">
                  {getCategoryLabel(selectedArticle.category)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="p-1.5 text-slate-300 hover:text-white rounded hover:bg-slate-800 transition-colors"
                  title="Imprimir Artículo"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-1.5 text-slate-300 hover:text-white rounded hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Reader Body */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-6">
              {/* Article Meta */}
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Publicado: {selectedArticle.publishedDate}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedArticle.readTime}</span>
                <span aria-hidden="true">·</span>
                <span>Autor: {selectedArticle.author.name}</span>
              </div>

              <h2 className="font-serif-legal text-2xl sm:text-3xl font-bold text-[#0D1B2A] leading-tight">
                {selectedArticle.title}
              </h2>

              {/* Author Card */}
              <div className="flex items-center gap-3 p-3 bg-amber-50/60 rounded-xl border border-amber-200/50">
                <div className="w-10 h-10 rounded-full bg-[#0D1B2A] text-[#E0C097] flex items-center justify-center font-bold text-sm">
                  MG
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0D1B2A]">{selectedArticle.author.name}</div>
                  <div className="text-[11px] text-slate-600">{selectedArticle.author.title}</div>
                </div>
              </div>

              {/* Intro */}
              <p className="text-base text-slate-700 font-medium leading-relaxed italic border-l-2 border-[#C5A880] pl-4">
                {selectedArticle.content.intro}
              </p>

              {/* Main Sections */}
              <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
                {selectedArticle.content.sections.map((sec, i) => (
                  <div key={i} className="space-y-3">
                    <h3 className="font-serif-legal font-bold text-lg text-[#0D1B2A]">
                      {sec.heading}
                    </h3>
                    {sec.body.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                    {sec.highlight && (
                      <div className="p-4 bg-slate-50 rounded-xl border-l-4 border-[#0D1B2A] text-xs font-semibold text-slate-800">
                        {sec.highlight}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Legal References */}
              {selectedArticle.content.legalReferences && selectedArticle.content.legalReferences.length > 0 && (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="font-bold text-[#0D1B2A] mb-2 flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-[#9C7A4A]" />
                    Fundamentos Jurídicos &amp; Leyes Panameñas Aplicables:
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-600">
                    {selectedArticle.content.legalReferences.map((ref, rIdx) => (
                      <li key={rIdx}>{ref}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Key Takeaway Box */}
              <div className="p-5 bg-amber-50 rounded-xl border border-[#C5A880]/60 text-xs text-amber-950">
                <strong className="block mb-1 text-sm font-serif-legal">Conclusión del Despacho:</strong>
                <p>{selectedArticle.content.takeaway}</p>
              </div>

              {/* Direct Booking CTA */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-600">
                  ¿Tiene un caso o duda específica sobre este tema?
                </div>
                <button
                  onClick={() => {
                    const areaToBook =
                      selectedArticle.category === 'penal' ||
                      selectedArticle.category === 'bienes_raices' ||
                      selectedArticle.category === 'corporativo'
                        ? selectedArticle.category
                        : 'penal';
                    setSelectedArticle(null);
                    onConsultArticleTopic(areaToBook);
                  }}
                  className="bg-[#0D1B2A] hover:bg-[#1B263B] text-[#E0C097] text-xs font-bold py-2.5 px-5 rounded-lg shadow cursor-pointer flex items-center gap-2"
                >
                  <span>Agendar Consulta sobre este Tema</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
