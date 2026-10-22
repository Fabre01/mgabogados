import { LegalArticle, PracticeArea, TeamMember } from '../types';
import { TEAM_IMAGES } from '../assets/teamImages';

export const ATTORNEY_PROFILE = {
  name: 'Licda. Mitzy I. García',
  title: 'Directora & Fundadora | Abogada Litigante',
  credentials: 'Exfiscal del Ministerio Público de Panamá · Especialista en Tierras, Bienes Raíces & Litigación Penal',
  photo: TEAM_IMAGES.mitzy,
  experienceYears: 15,
  publicProsecutorYears: 10,
  bio: [
    'El despacho es dirigido por la Licda. Mitzy I. García, abogada panameña con una sólida trayectoria en el ámbito jurídico. Antes de ejercer de forma independiente, desarrolló su carrera profesional durante aproximadamente diez años en el Ministerio Público de Panamá, institución en la cual participó activamente en la investigación de hechos delictivos y en el desarrollo de procesos judiciales, llegando a desempeñar funciones dentro del sistema de persecución penal incluyendo el ejercicio del cargo de fiscal.',
    'Esta experiencia dentro del sistema de justicia le permitió adquirir un profundo conocimiento del funcionamiento de los procesos judiciales, la valoración de pruebas, la dinámica de las investigaciones penales y el manejo estratégico de los casos dentro de los tribunales.',
    'Posteriormente, inició el ejercicio profesional independiente, dedicándose a la asesoría jurídica y a la representación de clientes en diversas áreas del derecho, desarrollando una práctica enfocada en la litigación, la solución de conflictos y la protección de los intereses de las personas y empresas.',
    'MG Abogados & Consultores tiene como objetivo ofrecer a cada cliente una atención directa, transparente y profesional, analizando cada caso con seriedad y planteando estrategias legales adecuadas a las circunstancias particulares de cada situación, con especial énfasis en la seguridad de sus tierras, patrimonio inmobiliario y defensa penal efectiva.'
  ],
  principles: [
    { title: 'Responsabilidad & Rigor', desc: 'Análisis minucioso de cada expediente con estrategias jurídicas a la medida de la situación.' },
    { title: 'Ética & Confidencialidad', desc: 'Protección absoluta del secreto profesional y lealtad irrestricta a los intereses del cliente.' },
    { title: 'Dominio de los Tribunales', desc: 'Vasto conocimiento práctico del Sistema Penal Acusatorio (SPA) y la dinámica de audiencias.' },
    { title: 'Compromiso con la Justicia', desc: 'Acompañamiento cercano y oportuno a personas naturales y corporaciones.' }
  ],
  officeAddress: 'Torre Financial Park, Piso 18, Costa del Este / Calle 50, Ciudad de Panamá',
  phones: {
    mobile: '+507 6234-8890',
    emergency24: '+507 6980-1122'
  },
  email: 'contacto@mgabogadospanama.com',
  schedule: 'Lunes a Viernes: 8:00 AM – 5:30 PM (Atención Inmediata para Urgencias Penales)'
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'mitzy-garcia',
    name: 'Licda. Mitzy I. García',
    role: 'Socia Directora & Fundadora',
    specialty: 'Tierras, Bienes Raíces, Litigación & Derecho Penal',
    experienceTag: 'Exfiscal del Ministerio Público de Panamá (10 años)',
    image: TEAM_IMAGES.mitzy,
    bio: 'Abogada panameña con sólida trayectoria en el ámbito jurídico. Durante aproximadamente diez años en el Ministerio Público de Panamá participó activamente en la investigación de hechos delictivos y procesos judiciales, ejerciendo funciones dentro de la persecución penal y el cargo de fiscal. Especialista en titulación y saneamiento de tierras, protección registral de fincas, transacciones inmobiliarias y litigación penal estratégica.',
    keyAreas: ['Titulación de Tierras y ANATI', 'Due Diligence Registral', 'Sistema Penal Acusatorio (SPA)', 'Litigio y Audiencias']
  },
  {
    id: 'adelberto-ortega',
    name: 'Lic. Adelberto Ortega Amaya',
    role: 'Abogado Asociado Senior',
    specialty: 'Derecho Penal & Delitos de Alta Complejidad',
    experienceTag: 'Exfiscal de Homicidios del Ministerio Público',
    image: TEAM_IMAGES.adelberto,
    bio: 'Abogado con amplia trayectoria profesional y experiencia como Fiscal de Homicidios del Ministerio Público. Su experiencia en la investigación y litigación de delitos de alta complejidad le ha permitido desarrollar una sólida especialización en Derecho Penal, particularmente en la conducción y análisis de casos relacionados con delitos contra la vida y la integridad personal.',
    keyAreas: ['Delitos contra la Vida y la Integridad', 'Investigación Penal Compleja', 'Defensa Técnica en Audiencias', 'Control de Garantías']
  },
  {
    id: 'adrian-ceballos',
    name: 'Lic. Adrián Ceballos Molina',
    role: 'Abogado Litigante',
    specialty: 'Litigio Penal, Juicio Oral & Estrategia Procesal',
    experienceTag: 'Exfiscal de Homicidios del Ministerio Público',
    image: TEAM_IMAGES.adrian,
    bio: 'Abogado y ex Fiscal de Homicidios del Ministerio Público, con amplia experiencia en materia penal. Su práctica se encuentra especialmente vinculada al litigio penal y al juicio oral, contando con experiencia en la preparación, estructuración y sustentación de estrategias de defensa y representación dentro de procesos penales.',
    keyAreas: ['Fase de Juicio Oral', 'Estrategia de Defensa y Querellas', 'Interrogatorios y Contrainterrogatorios', 'Recursos Procesales']
  },
  {
    id: 'luis-chong',
    name: 'Lic. Luis Antonio Chong Vega',
    role: 'Abogado & Perito Forense',
    specialty: 'Derecho Penal & Análisis Técnico Forense',
    experienceTag: 'Egresado del Ministerio Público y Perito Forense',
    image: TEAM_IMAGES.luis,
    bio: 'Abogado egresado del Ministerio Público y perito forense, cuya experiencia combina el conocimiento jurídico con el análisis técnico y forense. Su formación y trayectoria permiten abordar los asuntos legales desde una perspectiva integral, especialmente en aquellos casos que requieren valoración y análisis de elementos técnicos o probatorios.',
    keyAreas: ['Peritajes Forenses', 'Valoración de Elementos Probatorios', 'Criminalística y Cadena de Custodia', 'Sustentación Técnica Judicial']
  }
];

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: 'penal',
    title: 'Derecho Penal & Litigación',
    tagline: 'Defensa técnica especializada y representación de víctimas en el Sistema Penal Acusatorio',
    shortDesc: 'Representación legal en procesos penales, asesoría jurídica y acompañamiento integral en todas las etapas procesales.',
    fullDesc: 'Respaldada por una década de experiencia directa en el Ministerio Público de Panamá como fiscal, brindamos una defensa penal estratégica o patrocinio a querellantes fundamentada en el conocimiento riguroso de la técnica de investigación y la valoración probatoria judicial.',
    iconName: 'Gavel',
    keyAspects: [
      'Asistencia inmediata en aprehensiones y audiencias de control de garantías',
      'Defensa técnica integral en investigaciones penales complejas',
      'Patrocinio legal a víctimas y constitución de querellas penales',
      'Negociación de acuerdos de pena y métodos alternos de solución de conflictos',
      'Interposición de recursos de apelación, anulación y casación'
    ],
    phases: [
      {
        name: 'Fase de Investigación',
        description: 'Actos de investigación, recolección y aseguramiento de pruebas, audiencias innominadas y formulación de imputación conforme al Código Procesal Penal.'
      },
      {
        name: 'Fase Intermedia',
        description: 'Control de la acusación, exclusión de pruebas ilícitas o impertinentes, acuerdos de pena y fijación definitiva del auto de apertura a juicio oral.'
      },
      {
        name: 'Fase de Juicio Oral',
        description: 'Desahogo probatorio, interrogatorios, contrainterrogatorios y alegatos de clausura ante el Tribunal de Juicio con máxima solvencia argumentativa.'
      }
    ]
  },
  {
    id: 'bienes_raices',
    title: 'Tierras, Bienes Raíces & Derecho Inmobiliario',
    tagline: 'Seguridad jurídica en titulación de tierras, regularización ante ANATI, fincas y transacciones en Panamá',
    shortDesc: 'Titulación de tierras, derechos posesorios, auditoría registral de fincas, contratos de compraventa y litigios de tierras.',
    fullDesc: 'Asesoramos en la regularización y titulación de tierras ante la Autoridad Nacional de Administración de Tierras (ANATI), gestión de derechos posesorios, debida diligencia de fincas ante el Registro Público de Panamá, compraventa inmobiliaria y resolución judicial de conflictos de linderos y tierras en todo el territorio nacional.',
    iconName: 'Building2',
    keyAspects: [
      'Titulación y adjudicación de tierras ante la ANATI en toda la República de Panamá',
      'Regularización y traspaso legal de derechos posesorios en zonas rurales y costeras',
      'Auditoría registral exhaustiva (Due Diligence) de fincas en el Registro Público',
      'Redacción y blindaje de contratos de promesa y compraventa de tierras e inmuebles',
      'Saneamiento de títulos de propiedad, segregaciones y rectificación de medidas',
      'Defensa legal en litigios de tierras, usurpación, conflictos de linderos y desalojos',
      'Constitución y asesoría en Régimen de Propiedad Horizontal (P.H.)'
    ]
  },
  {
    id: 'corporativo',
    title: 'Derecho Corporativo & Comercial',
    tagline: 'Estructuras jurídicas robustas para empresas y protección patrimonial',
    shortDesc: 'Constitución de Sociedades Anónimas panameñas, Fundaciones de Interés Privado y contratos mercantiles.',
    fullDesc: 'Brindamos soporte legal integral a personas jurídicas en Panamá: desde la constitución de sociedades anónimas, gobierno corporativo, redacción de pactos sociales, hasta estructuración de fideicomisos y fundaciones de interés privado.',
    iconName: 'Briefcase',
    keyAspects: [
      'Constitución y mantenimiento de Sociedades Anónimas (S.A.) panameñas',
      'Fundaciones de Interés Privado (FIP) para planificación sucesoria y blindaje patrimonial',
      'Apertura de cuentas bancarias corporativas y cumplimiento regulatorio',
      'Elaboración de contratos de distribución, franquicias y alianzas estratégicas',
      'Disoluciones, fusiones y adquisiciones de negocios'
    ]
  },
  {
    id: 'civil_sucesiones',
    title: 'Derecho Civil & Sucesiones',
    tagline: 'Protección de sus derechos civiles, cumplimiento de contratos y transmisión hereditaria',
    shortDesc: 'Juicios de sucesión testada e intestada, reclamos por daños y perjuicios, y cobranzas judiciales.',
    fullDesc: 'Acompañamos a nuestros clientes en la resolución de desavenencias civiles, redacción de contratos con garantías reales y tramitación célere de sucesiones familiares para la debida adjudicación de bienes.',
    iconName: 'Scale',
    keyAspects: [
      'Procesos sucesorios testados e intestados ante los juzgados de circuito',
      'Acciones reivindicatorias y protección de la posesión',
      'Demandas por incumplimiento contractual y daños y perjuicios',
      'Procesos ejecutivos y recuperación judicial de créditos',
      'Otorgamiento y protocolización de testamentos ante Notaría'
    ]
  },
  {
    id: 'familia',
    title: 'Derecho de Familia',
    tagline: 'Soluciones sensibles con firmeza legal en momentos determinantes',
    shortDesc: 'Procesos de divorcio de mutuo acuerdo o contencioso, pensiones alimenticias y guarda y crianza.',
    fullDesc: 'Atendemos con estricta confidencialidad y trato humano los asuntos familiares, priorizando la mediación previa y la protección superior de los menores cuando sea aplicable.',
    iconName: 'HeartHandshake',
    keyAspects: [
      'Divorcios por mutuo consentimiento y por causales contenciosas',
      'Procesos de fijación, modificación y suspensión de pensión alimenticia',
      'Reglamentación de visitas y procesos de guarda y crianza',
      'Capitulaciones matrimoniales y liquidación de régimen económico conyugal'
    ]
  },
  {
    id: 'migracion',
    title: 'Migración & Visas de Inversión',
    tagline: 'Residencias legales en Panamá por inversión inmobiliaria y actividad económica',
    shortDesc: 'Visas de Inversionista Calificado, Países Amigos y residencias por inversión en bienes raíces.',
    fullDesc: 'Facilitamos a clientes internacionales el establecimiento legal de su residencia en Panamá, coordinando la compraventa inmobiliaria con los trámites migratorios ante el Servicio Nacional de Migración.',
    iconName: 'Globe2',
    keyAspects: [
      'Visa de Inversionista Calificado (Residencia permanente exprés por compra de inmueble)',
      'Subcategoría de Países Amigos por razones laborales o inmobiliarias',
      'Permisos de trabajo y naturalización panameña',
      'Visas de personal ejecutivo bajo regímenes especiales (SEM / EMMA)'
    ]
  }
];

export const INITIAL_ARTICLES: LegalArticle[] = [
  {
    id: 'art-01',
    slug: 'fase-investigacion-sistema-penal-acusatorio-panama',
    title: 'Fase de Investigación en el Sistema Penal Acusatorio de Panamá: Derechos Clave y Estrategia Temprana',
    summary: 'Conozca los plazos legales, la trascendencia de la formulación de imputación y las medidas cautelares en la etapa preliminar penal.',
    category: 'penal',
    readTime: '6 min de lectura',
    publishedDate: '18 de Septiembre, 2026',
    author: {
      name: 'Licda. Mitzy I. García',
      title: 'Exfiscal · Directora de MG Abogados & Consultores · Tierras & Bienes Raíces'
    },
    featured: true,
    content: {
      intro: 'La etapa de investigación en el Sistema Penal Acusatorio (SPA) de Panamá es el momento más determinante para el destino de una causa penal. Como exfiscal con una década de labor en el Ministerio Público, he constatado que los errores cometidos en las primeras 48 horas tras una aprehensión o inicio de sumarias son con frecuencia irreversibles.',
      sections: [
        {
          heading: '1. Diferencia entre investigación previa y formalizada',
          body: [
            'En Panamá, el Ministerio Público puede adelantar actos investigativos preliminares de oficio o por denuncia. Sin embargo, no es hasta la Audiencia de Formulación de Imputación ante un Juez de Garantías cuando la persona adquiere formalmente la calidad de imputada.',
            'A partir de este momento empieza a correr el plazo legal de investigación (generalmente de hasta 6 meses, prorrogables o excepcionalmente hasta causas complejas). Toda persona investigada tiene derecho irrenunciable a ser asistida por un defensor técnico desde el primer instante.'
          ],
          highlight: 'Cualquier declaración vertida sin la presencia de un abogado defensor es nula de pleno derecho conforme a las garantías constitucionales panameñas.'
        },
        {
          heading: '2. Medidas Cautelares Personales y el Principio de Excepcionalidad',
          body: [
            'La detención preventiva debe ser la última ratio. El Código Procesal Penal panameño contempla medidas menos lesivas, tales como el reporte periódico ante la autoridad, la prohibición de salida del país, o el arresto domiciliario.',
            'La defensa técnica eficaz debe aportar arraigo laboral, domiciliario y familiar documentado para desvirtuar los riesgos procesales de desatención, peligro de fuga o destrucción de pruebas alegados por el fiscal.'
          ]
        },
        {
          heading: '3. La Recolección Temprana de Pruebas de Descargo',
          body: [
            'Esperar a la fase intermedia para recabar evidencia suele ser un error fatal. Desde la fase de investigación, la defensa puede solicitar actos investigativos a la fiscalía (peritajes, inspecciones oculares, entrevistas) o realizar investigaciones independientes amparadas por el principio de igualdad procesal.'
          ]
        }
      ],
      legalReferences: [
        'Código Procesal Penal de la República de Panamá (Ley 63 de 2008)',
        'Artículos 22, 25 y 32 de la Constitución Política de la República de Panamá',
        'Jurisprudencia del Tribunal Superior de Apelaciones del Primer Distrito Judicial'
      ],
      takeaway: 'Una asesoría penal inmediata y con experiencia real en la dinámica del Ministerio Público equilibra la balanza procesal y asegura el estricto respeto al debido proceso.'
    }
  },
  {
    id: 'art-02',
    slug: 'due-diligence-inmobiliario-compra-propiedades-panama',
    title: 'Guía de Due Diligence Inmobiliario en Panamá: Cómo Verificar una Finca en el Registro Público',
    summary: 'Pasos fundamentales y alertas rojas al comprar casas, apartamentos o terrenos en Panamá para evitar fraudes y gravámenes ocultos.',
    category: 'bienes_raices',
    readTime: '7 min de lectura',
    publishedDate: '10 de Septiembre, 2026',
    author: {
      name: 'Licda. Mitzy I. García',
      title: 'Especialista en Derecho Inmobiliario'
    },
    featured: true,
    content: {
      intro: 'El mercado inmobiliario en Panamá ofrece atractivas oportunidades tanto para residencia como para inversión comercial. No obstante, formalizar un contrato de promesa de compraventa sin una debida diligencia registral y municipal exhaustiva expone al comprador a cuantiosas pérdidas patrimoniales.',
      sections: [
        {
          heading: '1. El Certificado de Registro Público: El ADN de la Finca',
          body: [
            'Antes de entregar cualquier abono o arras, es imperativo obtener y auditar un Certificado de Registro Público actualizado. En este documento se verifica la titularidad legítima, linderos, superficie y el historial de traslados.',
            'Debe prestarse especial atención al asiento de gravámenes: hipotecas bancarias vigentes, embargos judiciales, servidumbres activas o pasivas, o condiciones resolutorias que puedan limitar el dominio.'
          ],
          highlight: 'Nunca firme una promesa de compraventa ni abone dinero basándose únicamente en la palabra del vendedor o un broker sin un certificado registral auditado por su propio abogado.'
        },
        {
          heading: '2. Verificación de Paz y Salvos Obligatorios',
          body: [
            'En Panamá, para transferir un inmueble ante Notario se requieren paz y salvos específicos:',
            '• Paz y Salvo de Inmueble emitido por la DGI (Dirección General de Ingresos).',
            '• Paz y Salvo de la Autoridad de Aseo Urbano y Domiciliario (AAUD).',
            '• En caso de Propiedad Horizontal (P.H.), Paz y Salvo de cuotas de mantenimiento emitido por la administración del edificio.'
          ]
        },
        {
          heading: '3. El Contrato de Promesa de Compraventa y las Cláusulas de Escape',
          body: [
            'Un contrato de promesa bien estructurado debe fijar plazos realistas para el trámite hipotecario si aplica, establecer la custodia de fondos en cuenta fiduciaria (Escrow) y prever cláusulas claras de penalización o resolución si la propiedad no supera la debida diligencia.'
          ]
        }
      ],
      legalReferences: [
        'Código Civil de Panamá (Título de la Compraventa y del Registro Público)',
        'Ley 284 de 2022 sobre el Régimen de Propiedad Horizontal en Panamá',
        'Decreto Ejecutivo 170 de 1993 sobre Impuesto de Transferencia de Bienes Inmuebles (ITBI)'
      ],
      takeaway: 'La inversión inmobiliaria más segura es aquella blindada contractualmente por un despacho que comprende a fondo el derecho registral y notarial panameño.'
    }
  },
  {
    id: 'art-03',
    slug: 'valoracion-pruebas-fase-intermedia-proceso-penal',
    title: 'La Batalla Probatoria en la Fase Intermedia: Objeción de Pruebas Ilícitas y Estrategia',
    summary: 'Cómo se depura la evidencia antes del juicio oral en los juzgados panameños y por qué es el filtro decisivo de cualquier proceso penal.',
    category: 'penal',
    readTime: '5 min de lectura',
    publishedDate: '28 de Agosto, 2026',
    author: {
      name: 'Licda. Mitzy I. García',
      title: 'Exfiscal del Ministerio Público de Panamá'
    },
    featured: false,
    content: {
      intro: 'Muchos consideran que el juicio oral es la parte más importante del proceso penal; sin embargo, en la práctica forense panameña, la Fase Intermedia es donde realmente se gana o se pierde un caso.',
      sections: [
        {
          heading: '1. El Escrito de Acusación y las Objeciones de Forma',
          body: [
            'La fiscalía debe presentar una acusación clara, circunstanciada y precisa. En esta audiencia, la defensa técnica tiene la oportunidad de exigir correcciones por vicios formales o falta de imputación fáctica concreta.'
          ]
        },
        {
          heading: '2. Exclusión de Pruebas Ilícitas e Impertinentes',
          body: [
            'Toda prueba obtenida con violación a garantías fundamentales o que carezca de pertinencia directa con los hechos debe ser objetada con sustento técnico. Si se logra excluir la prueba angular de la fiscalía en fase intermedia, la acusación suele desmoronarse antes de llegar al juicio.'
          ],
          highlight: 'La teoría del fruto del árbol envenenado rige plenamente en el SPA panameño para anular pruebas derivadas de allanamientos o interceptaciones irregulares.'
        }
      ],
      legalReferences: [
        'Artículos 344 a 357 del Código Procesal Penal de Panamá',
        'Convención Americana sobre Derechos Humanos (Pacto de San José)'
      ],
      takeaway: 'El conocimiento íntimo de cómo el Ministerio Público estructura sus acusaciones permite a la defensa anticipar debilidades y blindar la posición del imputado.'
    }
  },
  {
    id: 'art-04',
    slug: 'fundaciones-interes-privado-panama-proteccion-patrimonial',
    title: 'Fundaciones de Interés Privado vs. Sociedades Anónimas: ¿Cuál Elegir en Panamá?',
    summary: 'Análisis comparativo sobre estructura, confidencialidad, régimen fiscal y planificación testamentaria mediante vehículos jurídicos panameños.',
    category: 'corporativo',
    readTime: '6 min de lectura',
    publishedDate: '15 de Agosto, 2026',
    author: {
      name: 'Licda. Mitzy I. García',
      title: 'Directora MG Abogados & Consultores · Tierras & Bienes Raíces'
    },
    featured: false,
    content: {
      intro: 'Panamá es reconocido mundialmente por sus herramientas de planificación patrimonial. Entre ellas, la Fundación de Interés Privado (FIP) regulada por la Ley 25 de 1995 destaca como uno de los instrumentos más sofisticados para proteger activos familiares e inmobiliarios.',
      sections: [
        {
          heading: '1. Diferencias de Propósito',
          body: [
            'Mientras que la Sociedad Anónima (S.A.) está diseñada para actividades comerciales activas y generación de dividendos, la Fundación de Interés Privado no tiene dueños ni accionistas; es un ente autónomo creado para conservar bienes en beneficio de beneficiarios designados.',
            'Esto la convierte en el vehículo ideal para ser propietaria de fincas, apartamentos y carteras de inversión sin tener que abrir un juicio de sucesión al fallecer el fundador.'
          ]
        },
        {
          heading: '2. Inembargabilidad y Blindaje Familiar',
          body: [
            'Los bienes transferidos a una Fundación de Interés Privado constituyen un patrimonio separado de los bienes personales del fundador y de los beneficiarios. Salvo deudas adquiridas por la propia fundación o fraude probado dentro de los 3 años siguientes a la donación, los activos son inembargables.'
          ],
          highlight: 'El Reglamento Privado de la fundación no se inscribe en el Registro Público, manteniendo la absoluta privacidad de los beneficiarios finales.'
        }
      ],
      legalReferences: [
        'Ley 25 de 12 de junio de 1995 sobre Fundaciones de Interés Privado',
        'Ley 32 de 1927 sobre Sociedades Anónimas'
      ],
      takeaway: 'Combinar una Sociedad Anónima para la operación comercial y una Fundación de Interés Privado para la titularidad inmobiliaria es el estándar de oro en protección patrimonial en Panamá.'
    }
  },
  {
    id: 'art-05',
    slug: 'residencia-inversionista-calificado-bienes-raices-panama',
    title: 'Visa de Inversionista Calificado: Residencia Permanente Inmediata por Compra Inmobiliaria',
    summary: 'Requisitos y ventajas de obtener la residencia permanente en Panamá mediante inversión en bienes raíces libre de gravámenes.',
    category: 'bienes_raices',
    readTime: '5 min de lectura',
    publishedDate: '02 de Agosto, 2026',
    author: {
      name: 'Licda. Mitzy I. García',
      title: 'Especialista Inmobiliario & Migratorio'
    },
    featured: false,
    content: {
      intro: 'El programa de Residencia Permanente en calidad de Inversionista Calificado (Decreto Ejecutivo 722 de 2020) es uno de los programas migratorios más ágiles de América Latina, permitiendo obtener la residencia definitiva en un plazo aproximado de 30 días hábiles.',
      sections: [
        {
          heading: '1. Modalidad de Inversión Inmobiliaria',
          body: [
            'El solicitante extranjero puede calificar adquiriendo uno o varios bienes inmuebles en Panamá por un valor mínimo de inversión establecido por la normativa vigente, debidamente inscritos en el Registro Público y libres de gravamen por el monto requerido.',
            'Los fondos deben provenir estrictamente de fuentes externas debidamente bancarizadas.'
          ]
        },
        {
          heading: '2. Beneficios para el Inversionista y su Núcleo Familiar',
          body: [
            'El titular puede incluir en la solicitud a su cónyuge, hijos dependientes hasta los 25 años y padres. Otorga derecho a cédula de identidad panameña (E) y abre la vía a la naturalización tras los plazos constitucionales.'
          ]
        }
      ],
      legalReferences: [
        'Decreto Ejecutivo N° 722 de 15 de octubre de 2020',
        'Decreto Ley N° 3 de 2008 de Migración de Panamá'
      ],
      takeaway: 'En MG Abogados & Consultores gestionamos simultáneamente la adquisición registral de tierras e inmuebles y el expediente migratorio ante el Servicio Nacional de Migración.'
    }
  },
  {
    id: 'art-06',
    slug: 'titulacion-tierras-derechos-posesorios-anati-panama',
    title: 'Titulación de Tierras en Panamá: Procedimiento ante ANATI y Regularización de Derechos Posesorios',
    summary: 'Cómo convertir un derecho posesorio en título de propiedad debidamente inscrito ante el Registro Público y blindarse ante litigios de tierras.',
    category: 'bienes_raices',
    readTime: '8 min de lectura',
    publishedDate: '24 de Septiembre, 2026',
    author: {
      name: 'Licda. Mitzy I. García',
      title: 'Directora MG Abogados & Consultores · Tierras & Bienes Raíces'
    },
    featured: true,
    content: {
      intro: 'En Panamá, una considerable porción de tierras en el interior, playas e islas se encuentra bajo la figura de "Derecho Posesorio". Sin embargo, el derecho posesorio no equivale a propiedad privada. Para contar con plena seguridad jurídica, es indispensable adelantar el trámite de adjudicación y titulación ante la Autoridad Nacional de Administración de Tierras (ANATI).',
      sections: [
        {
          heading: '1. Diferencia entre Título de Propiedad y Derecho Posesorio',
          body: [
            'Un título de propiedad inscrito en el Registro Público otorga dominio pleno, oponible a terceros e inatacable salvo resolución judicial. Por el contrario, el derecho posesorio sólo acredita el uso y ocupación material del terreno, sujeto a oposición de colindantes o reclamos del Estado.',
            'Adquirir tierras sin verificar el expediente posesorio ante ANATI o comprar promesas de cesión sin inspección ocular expone al adquirente a desalojos y conflictos graves.'
          ],
          highlight: 'Nunca desembolse sumas importantes por un derecho posesorio sin una verificación minuciosa del plano aprobado, historial de ocupación y estatus ante la ANATI.'
        },
        {
          heading: '2. Fases del Proceso de Titulación ante ANATI',
          body: [
            'El proceso ordinario de titulación exige:',
            '• Levantamiento topográfico con coordenadas UTM y aprobación de plano ante la Dirección Nacional de Tierras.',
            '• Acreditación fehaciente de la posesión pacífica, ininterrumpida y productiva del terreno.',
            '• Fijación de edictos emplazatorios e inspección ocular pericial en la finca con citación de colindantes.',
            '• Resolución de adjudicación y posterior protocolización en Notaría e inscripción registral definitiva.'
          ]
        },
        {
          heading: '3. Conflictos de Tierras y Medidas de Protección',
          body: [
            'Las disputas limítrofes, invasiones o superposiciones de planos son frecuentes en zonas de alto desarrollo inmobiliario. Un acompañamiento legal técnico desde el inicio permite interponer oposiciones oportunas, juicios de deslinde y amparos posesorios ante los jueces de paz o tribunales civiles.'
          ]
        }
      ],
      legalReferences: [
        'Ley 59 de 2010 que crea la Autoridad Nacional de Administración de Tierras (ANATI)',
        'Código Agrario de la República de Panamá',
        'Código Civil de Panamá (De la Posesión y de la Propiedad)'
      ],
      takeaway: 'La titulación de tierras es la inversión más rentable en seguridad jurídica: transforma una ocupación precaria en un activo bancarizable y protegido legalmente.'
    }
  }
];

export const INITIAL_APPOINTMENTS = [
  {
    id: 'apt-01',
    code: 'MG-2026-8812',
    fullName: 'Roberto Alemán S.',
    idDocument: '8-745-1290',
    email: 'roberto.aleman@ejemplo.pa',
    phone: '+507 6554-1122',
    practiceArea: 'bienes_raices' as const,
    modality: 'presencial' as const,
    date: '2026-09-28',
    timeSlot: '10:00 AM',
    notes: 'Revisión de contrato de promesa de compraventa de apartamento en Costa del Este y verificación de gravámenes en el Registro Público.',
    status: 'confirmada' as const,
    createdAt: '2026-09-24T09:30:00Z',
    attorney: 'Licda. Mitzy I. García'
  },
  {
    id: 'apt-02',
    code: 'MG-2026-9041',
    fullName: 'Patricia Vallarino M.',
    idDocument: 'PE-43-981',
    email: 'patricia.vallarino@correo.com',
    phone: '+507 6890-4411',
    practiceArea: 'penal' as const,
    modality: 'virtual' as const,
    date: '2026-09-29',
    timeSlot: '02:30 PM',
    notes: 'Asesoría urgente sobre citación recibida del Ministerio Público en Sección de Atención Primaria para audiencia preliminar.',
    status: 'confirmada' as const,
    createdAt: '2026-09-23T16:15:00Z',
    attorney: 'Licda. Mitzy I. García'
  }
];

export const TIME_SLOTS = [
  '08:30 AM',
  '09:30 AM',
  '10:30 AM',
  '11:30 AM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM'
];
