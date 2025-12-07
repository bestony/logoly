export default {
  component: {
    menu: {
      home: 'PornHub',
      verticalPh: 'Vertical PH',
      onlyfans: 'OnlyFans',
      about: 'Sobre nosotros',
      faq: 'FAQ',
      other: 'Más',
      language: 'Idioma',
      lang: {
        en: 'Inglés',
        zhCN: '简体中文',
        'zh-CN': '简体中文',
        es: 'Español',
        fr: 'Francés',
        ja: 'Japonés',
      },
      simpleText: 'Simple Text',
      fedex: 'FedEx',
      mastercard: 'Mastercard',
      bluesnap: 'Bluesnap',
      sega: 'SEGA',
      nintendo: 'Nintendo',
      lego: 'Lego',
      marvel: 'Marvel',
      bravo: 'Bravo',
      amc: 'AMC',
      badge: {
        building: 'en construcción',
      },
    },
    errorBoundary: {
      defaultMessage: 'Ocurrió un error inesperado',
      help: 'Copia la información de depuración y envía un Issue en GitHub para que podamos investigar.',
      copy: 'Copiar información de depuración',
      retry: 'Reintentar',
      githubLink: 'Crear Issue en GitHub',
    },
    footerMenu: {
      heading: 'Cambiar rápido la plantilla de logo',
      note: 'Menú inferior: saltar por sitio o marca',
      categories: {
        websites: 'Sitios',
        brands: 'Marcas',
      },
    },
    siteFooter: {
      copyright: '© {year} Logoly · Mantenido por la comunidad, contribuciones bienvenidas',
      github: 'GitHub',
      x: 'X.com',
      contact: 'Contactar al autor',
    },
    versionDialog: {
      title: 'Información de diagnóstico',
      description: 'Haz clic para copiar la información de depuración',
      close: 'Cerrar',
      copy: 'Copiar',
    },
    languagePrompt: {
      title: '¿Cambiar a un idioma más adecuado?',
      description: 'Detectamos que tu navegador prefiere {locale}. ¿Quieres cambiar?',
      hint: 'Puedes cambiarlo en el menú de idioma arriba a la derecha cuando quieras.',
      switch: 'Cambiar a {locale}',
      stay: 'Mantener idioma actual',
    },
    fontPicker: {
      title: 'Selector de fuentes',
      subtitle: 'Usa tu clave de Google Web Fonts; carga fuentes variables y WOFF2 bajo demanda.',
      search: 'Buscar fuentes',
      searchPlaceholder: 'Escribe el nombre de la familia',
      fontLabel: 'Familia tipográfica',
      variantLabel: 'Variante',
      reload: 'Recargar lista',
      loading: 'Cargando…',
      missingKey:
        'Servicio de fuentes no disponible. Verifica la variable GOOGLE_FONT_KEY en el servidor.',
      fetchError: 'No se pudieron cargar las fuentes. Revisa la API key o la red.',
      count: '{count} fuentes',
      capability:
        'Compatible con fuentes variables (VF) y WOFF2; solo afecta a la previsualización del logo.',
    },
    pornhub: {
      fontFamily: 'Fuente',
      textColor: 'Colores de texto',
      leftBgToggle: 'Mostrar fondo izquierdo',
      leftBg: 'Fondo izquierdo',
      leftTextColor: 'Texto izquierdo',
      rightBg: 'Fondo derecho',
      rightTextColor: 'Texto derecho',
      canvas: 'Fondo del lienzo',
      canvasBg: 'Color del lienzo',
      pureBlackPreview: 'Vista previa negro puro',
      transparentHint: 'Lienzo transparente (PNG / SVG mantienen transparencia)',
      fontSize: 'Tamaño de fuente',
    },
    simpleText: {
      previewTitle: 'Previsualización',
      controlsTitle: 'Controles tipográficos',
      controlsHint: 'Ajusta el texto abajo y verás los cambios al instante arriba.',
      textLabel: 'Texto',
      textPlaceholder: 'Escribe algo…',
      fontSize: 'Tamaño de fuente',
      textColor: 'Color de texto',
      previewBg: 'Fondo de previsualización',
      fontTitle: 'Fuente y variante',
      fontHint: 'Carga Google Fonts bajo demanda; las variantes aplican peso / cursiva.',
    },
  },
  page: {
    app: {
      renderError: 'Hubo un problema al renderizar la página. Haz clic para reintentar.',
    },
    home: {
      title: 'Generador de logos estilo Pornhub',
      state: {
        processing: 'Generando…',
        packaging: 'Empaquetando…',
      },
      actions: {
        downloadPng: 'Descargar PNG',
        downloadJpg: 'Descargar JPG',
        downloadSvg: 'Descargar SVG',
        downloadZip: 'Descargar ZIP',
      },
      errors: {
        downloadFail: 'La descarga falló, inténtalo de nuevo.',
        zipFail: 'La exportación ZIP falló, inténtalo de nuevo.',
        canvasNotReady: 'El lienzo aún se está cargando, espera un momento.',
      },
    },
    verticalPh: {
      title: 'Pornhub vertical',
      description: 'Página de plantilla de logo estilo Pornhub vertical.',
    },
    simpleText: {
      title: 'Simple Text',
      description:
        'Crea un wordmark de una línea con fuente, variante, tamaño y color personalizados.',
      defaultText: 'Simple Text',
    },
    onlyfans: {
      title: 'OnlyFans',
      status: 'En construcción',
      lead: 'Estamos actualizando el generador estilo OnlyFans para mejor espaciado y exportaciones.',
      note: 'Gracias por esperar; mientras tanto puedes probar otras plantillas.',
      items: {
        spacing: {
          title: 'Ajuste tipográfico',
          desc: 'Presets de kerning y baseline para acercarse al wordmark original.',
        },
        export: {
          title: 'Exportaciones limpias',
          desc: 'PNG/SVG/JPEG transparentes con bordes nítidos y paquetes ZIP.',
        },
      },
      actions: {
        home: 'Volver al inicio',
        progress: 'Seguir el progreso en GitHub',
      },
    },
    about: {
      title: 'Sobre nosotros',
      subtitle: {
        line1:
          'Logoly es un generador de logos open source que permite crear wordmarks en segundos, incluso sin base de diseño.',
        line2: 'Puedes usar, modificar y distribuir libremente el código y las imágenes generadas.',
      },
      highlights: {
        title: 'Aspectos destacados del producto',
        instant: {
          title: 'Generación con un clic',
          desc: 'Introduce texto y previsualiza al instante logos estilo Pornhub / OnlyFans; exporta PNG o SVG.',
          link: 'Probar ahora',
        },
        local: {
          title: 'Solo front-end, sin huellas',
          desc: 'El renderizado y la descarga se realizan en tu navegador; no subimos ni guardamos tu contenido.',
        },
        open: {
          title: 'Completamente de código abierto',
          desc: 'El código está alojado en GitHub con licencia WTFPL; siéntete libre de usarlo y hacer forks.',
          link: 'Repositorio en GitHub',
        },
        community: {
          title: 'Cocreación comunitaria',
          desc: 'Las plantillas, idiomas y funciones se mejoran continuamente gracias a la comunidad de desarrolladores.',
        },
      },
      community: {
        title: 'Código abierto y comunidad',
        desc: 'Logoly evoluciona gracias a la comunidad: aporta plantillas, mejora el UI/UX, añade idiomas o comparte ideas.',
        links: {
          issues: 'Enviar problema o sugerencia',
          guide: 'Guía de contribución',
        },
      },
      contact: {
        title: 'Contáctanos',
        desc: 'Si tienes ideas o propuestas de colaboración, deja un Issue en GitHub o encuentra otros contactos de bestony en el blog.',
        cta: 'Enviar feedback en GitHub',
      },
    },
    faq: {
      title: 'Preguntas frecuentes',
      lead: 'Listamos las preguntas comunes por categoría; haz clic para ver las respuestas.',
      expand: 'Expandir',
      groups: {
        usage: {
          title: 'Uso',
          items: {
            login: {
              q: '¿Logoly requiere registro o inicio de sesión?',
              a: 'No. Logoly es una herramienta puramente de front-end; basta abrir la página y no recopilamos datos personales.',
            },
            storage: {
              q: '¿Se guardan los logos generados en el servidor?',
              a: 'No. El renderizado y la descarga se hacen en el navegador; las imágenes permanecen en tu dispositivo.',
            },
            download: {
              q: '¿Qué hago si la descarga falla o faltan fuentes?',
              a: 'Refresca y confirma que puedes acceder a los recursos de fuentes; si sigue fallando, abre un Issue en GitHub.',
            },
          },
        },
        legal: {
          title: 'Legal',
          items: {
            commercial: {
              q: '¿Puedo usar los logos comercialmente?',
              a: 'Logoly es gratis y de código abierto; solo asegúrate de no infringir marcas o derechos de autor de terceros.',
            },
            privacy: {
              q: '¿Guardan o comparten el contenido del usuario?',
              a: 'No. El proyecto no tiene backend; todo lo que introduces y generas solo existe en tu sesión del navegador.',
            },
          },
        },
        openSource: {
          title: 'Código abierto',
          items: {
            hosting: {
              q: '¿Dónde se aloja el proyecto?',
              a: 'En GitHub: github.com/bestony/logoly; son bienvenidos los stars y las contribuciones.',
            },
            contrib: {
              q: '¿Cómo contribuir o enviar una nueva plantilla?',
              a: 'Haz fork y envía un PR con la página de plantilla y la vista previa; se agradecen pruebas o notas.',
            },
            license: {
              q: '¿Cuál es la licencia?',
              a: 'WTFPL — puedes copiar, modificar y distribuir libremente.',
            },
          },
        },
      },
    },
    fedex: {
      title: 'FedEx',
      status: 'En construcción',
      lead:
        'Estamos afinando el generador de logos estilo FedEx: colores, espaciado y exportaciones.',
      note: 'Gracias por tu paciencia; mientras tanto prueba otras plantillas.',
      items: {
        palette: {
          title: 'Paleta distintiva',
          desc: 'Combinación púrpura + naranja de FedEx con cambio rápido y tips de contraste.',
        },
        spacing: {
          title: 'Espaciado listo para entrega',
          desc: 'Ajustes de kerning, línea base y alineación que siguen el wordmark original.',
        },
        export: {
          title: 'Exportaciones limpias',
          desc: 'PNG/SVG/JPEG transparentes con bordes nítidos y paquetes zip.',
        },
      },
      actions: {
        home: 'Volver al inicio',
        progress: 'Seguir el progreso en GitHub',
      },
    },
    mastercard: {
      title: 'Mastercard',
      status: 'En construcción',
      lead: 'Estamos puliendo este generador: colores, espaciado y exportaciones vienen en camino.',
      note: 'Gracias por tu paciencia; mientras tanto prueba otras plantillas.',
      items: {
        palette: {
          title: 'Paleta de marca',
          desc: 'Colores en línea con la marca, con cambio rápido y tips de contraste.',
        },
        spacing: {
          title: 'Espaciado y alineación',
          desc: 'Presets de kerning y baseline para acercarse al wordmark original.',
        },
        export: {
          title: 'Exportaciones limpias',
          desc: 'PNG/SVG/JPEG transparentes con bordes nítidos y paquetes zip.',
        },
      },
      actions: {
        home: 'Volver al inicio',
        progress: 'Seguir el progreso en GitHub',
      },
    },
    bluesnap: {
      title: 'Bluesnap',
      status: 'En construcción',
      lead: 'Estamos puliendo este generador: colores, espaciado y exportaciones vienen en camino.',
      note: 'Gracias por tu paciencia; mientras tanto prueba otras plantillas.',
      items: {
        palette: {
          title: 'Paleta de marca',
          desc: 'Colores en línea con la marca, con cambio rápido y tips de contraste.',
        },
        spacing: {
          title: 'Espaciado y alineación',
          desc: 'Presets de kerning y baseline para acercarse al wordmark original.',
        },
        export: {
          title: 'Exportaciones limpias',
          desc: 'PNG/SVG/JPEG transparentes con bordes nítidos y paquetes zip.',
        },
      },
      actions: {
        home: 'Volver al inicio',
        progress: 'Seguir el progreso en GitHub',
      },
    },
    sega: {
      title: 'SEGA',
      status: 'En construcción',
      lead: 'Estamos puliendo este generador: colores, espaciado y exportaciones vienen en camino.',
      note: 'Gracias por tu paciencia; mientras tanto prueba otras plantillas.',
      items: {
        palette: {
          title: 'Paleta de marca',
          desc: 'Colores en línea con la marca, con cambio rápido y tips de contraste.',
        },
        spacing: {
          title: 'Espaciado y alineación',
          desc: 'Presets de kerning y baseline para acercarse al wordmark original.',
        },
        export: {
          title: 'Exportaciones limpias',
          desc: 'PNG/SVG/JPEG transparentes con bordes nítidos y paquetes zip.',
        },
      },
      actions: {
        home: 'Volver al inicio',
        progress: 'Seguir el progreso en GitHub',
      },
    },
    nintendo: {
      title: 'Nintendo',
      status: 'En construcción',
      lead: 'Estamos puliendo este generador: colores, espaciado y exportaciones vienen en camino.',
      note: 'Gracias por tu paciencia; mientras tanto prueba otras plantillas.',
      items: {
        palette: {
          title: 'Paleta de marca',
          desc: 'Colores en línea con la marca, con cambio rápido y tips de contraste.',
        },
        spacing: {
          title: 'Espaciado y alineación',
          desc: 'Presets de kerning y baseline para acercarse al wordmark original.',
        },
        export: {
          title: 'Exportaciones limpias',
          desc: 'PNG/SVG/JPEG transparentes con bordes nítidos y paquetes zip.',
        },
      },
      actions: {
        home: 'Volver al inicio',
        progress: 'Seguir el progreso en GitHub',
      },
    },
    lego: {
      title: 'Lego',
      status: 'En construcción',
      lead: 'Estamos puliendo este generador: colores, espaciado y exportaciones vienen en camino.',
      note: 'Gracias por tu paciencia; mientras tanto prueba otras plantillas.',
      items: {
        palette: {
          title: 'Paleta de marca',
          desc: 'Colores en línea con la marca, con cambio rápido y tips de contraste.',
        },
        spacing: {
          title: 'Espaciado y alineación',
          desc: 'Presets de kerning y baseline para acercarse al wordmark original.',
        },
        export: {
          title: 'Exportaciones limpias',
          desc: 'PNG/SVG/JPEG transparentes con bordes nítidos y paquetes zip.',
        },
      },
      actions: {
        home: 'Volver al inicio',
        progress: 'Seguir el progreso en GitHub',
      },
    },
    marvel: {
      title: 'Marvel',
      status: 'En construcción',
      lead: 'Estamos puliendo este generador: colores, espaciado y exportaciones vienen en camino.',
      note: 'Gracias por tu paciencia; mientras tanto prueba otras plantillas.',
      items: {
        palette: {
          title: 'Paleta de marca',
          desc: 'Colores en línea con la marca, con cambio rápido y tips de contraste.',
        },
        spacing: {
          title: 'Espaciado y alineación',
          desc: 'Presets de kerning y baseline para acercarse al wordmark original.',
        },
        export: {
          title: 'Exportaciones limpias',
          desc: 'PNG/SVG/JPEG transparentes con bordes nítidos y paquetes zip.',
        },
      },
      actions: {
        home: 'Volver al inicio',
        progress: 'Seguir el progreso en GitHub',
      },
    },
    bravo: {
      title: 'Bravo',
      status: 'En construcción',
      lead: 'Estamos puliendo este generador: colores, espaciado y exportaciones vienen en camino.',
      note: 'Gracias por tu paciencia; mientras tanto prueba otras plantillas.',
      items: {
        palette: {
          title: 'Paleta de marca',
          desc: 'Colores en línea con la marca, con cambio rápido y tips de contraste.',
        },
        spacing: {
          title: 'Espaciado y alineación',
          desc: 'Presets de kerning y baseline para acercarse al wordmark original.',
        },
        export: {
          title: 'Exportaciones limpias',
          desc: 'PNG/SVG/JPEG transparentes con bordes nítidos y paquetes zip.',
        },
      },
      actions: {
        home: 'Volver al inicio',
        progress: 'Seguir el progreso en GitHub',
      },
    },
    amc: {
      title: 'AMC',
      status: 'En construcción',
      lead: 'Estamos puliendo este generador: colores, espaciado y exportaciones vienen en camino.',
      note: 'Gracias por tu paciencia; mientras tanto prueba otras plantillas.',
      items: {
        palette: {
          title: 'Paleta de marca',
          desc: 'Colores en línea con la marca, con cambio rápido y tips de contraste.',
        },
        spacing: {
          title: 'Espaciado y alineación',
          desc: 'Presets de kerning y baseline para acercarse al wordmark original.',
        },
        export: {
          title: 'Exportaciones limpias',
          desc: 'PNG/SVG/JPEG transparentes con bordes nítidos y paquetes zip.',
        },
      },
      actions: {
        home: 'Volver al inicio',
        progress: 'Seguir el progreso en GitHub',
      },
    },
    notFound: {
      title: 'Página no encontrada, pero tus ideas importan',
      lead:
        'El enlace no existe o la página aún no está lista. ' +
        'Cuéntanos qué plantilla o función quieres ' +
        'y la seguiremos en GitHub.',
      issuePrompt:
        'Haz clic en el botón de abajo para abrir un Issue. ' +
        'Describe la plantilla, función o bug que necesitas ' +
        'y allí responderemos con el progreso.',
      actions: {
        issue: 'Crear un Issue en GitHub',
        home: 'Volver al inicio',
      },
    },
  },
  seo: {
    home: {
      title: 'Generador de logos estilo Pornhub | Exporta PNG/SVG gratis',
      description:
        'Logoly es un generador gratuito inspirado en Pornhub, OnlyFans, FedEx y Mastercard. Personaliza texto y colores en el navegador y exporta PNG, JPG o SVG sin registrarte.',
      keywords: [
        'generador logo pornhub',
        'creador logo onlyfans',
        'generador de logos gratis',
        'logo svg en línea',
        'logo estilo mastercard',
        'logo estilo fedex',
      ],
    },
    about: {
      title: 'Sobre Logoly | Generador de logos de código abierto',
      description:
        'Descubre cómo Logoly renderiza wordmarks de marcas totalmente en el navegador, la licencia open source y cómo aportar plantillas o traducciones.',
      keywords: [
        'sobre logoly',
        'generador de logos open source',
        'creador de logos en navegador',
        'comunidad logoly',
      ],
    },
    faq: {
      title: 'FAQ | Ayuda y resolución de problemas de Logoly',
      description:
        'Respuestas sobre descargas, fuentes, privacidad y cómo usar Logoly para crear logos estilo Pornhub u OnlyFans.',
      keywords: [
        'faq logoly',
        'ayuda generador de logos',
        'descargar logo svg',
        'fuentes faltantes',
      ],
    },
    'vertical-ph': {
      title: 'Plantilla vertical estilo Pornhub',
      description:
        'Crea logos verticales estilo Pornhub con colores ajustables y exportación inmediata PNG/SVG.',
      keywords: ['logo vertical pornhub', 'generador logo vertical', 'logo estilo ph'],
    },
    onlyfans: {
      title: 'Generador de logo OnlyFans',
      description:
        'Crea wordmarks inspirados en OnlyFans con tu propio texto y colores de marca; descarga PNG o SVG transparente.',
      keywords: ['logo onlyfans', 'generador logo onlyfans', 'logo azul creador'],
    },
    fedex: {
      title: 'Generador de logo FedEx',
      description:
        'Recrea el wordmark al estilo FedEx con colores y espaciado editables, exportado al instante a PNG o SVG.',
      keywords: ['logo fedex', 'generador logo fedex', 'logo de envío'],
    },
    mastercard: {
      title: 'Generador de logo Mastercard',
      description:
        'Construye wordmarks de doble círculo al estilo Mastercard con texto y colores editables en tu navegador.',
      keywords: ['logo mastercard', 'generador logo pago', 'creador de logo circular'],
    },
    bluesnap: {
      title: 'Generador de logo BlueSnap',
      description:
        'Genera logos inspirados en BlueSnap con colores de marca y expórtalos como SVG/PNG.',
      keywords: ['logo bluesnap', 'generador logo pago', 'logo azul'],
    },
    simpletext: {
      title: 'Creador de logo de texto simple',
      description:
        'Exporta rápido logos de texto limpios con fuentes, pesos y fondos personalizables.',
      keywords: ['generador logo de texto', 'creador de logo simple', 'logo con fuentes en línea'],
    },
    sega: {
      title: 'Generador de logo SEGA',
      description:
        'Diseña logos con contorno estilo SEGA con tu propio texto y descarga PNG/SVG en alta resolución.',
      keywords: ['logo sega', 'generador logo retro', 'creador logo gaming'],
    },
    nintendo: {
      title: 'Generador de logo Nintendo',
      description:
        'Crea wordmarks redondeados al estilo Nintendo con vista previa y descargas instantáneas.',
      keywords: ['logo nintendo', 'generador logo gaming', 'logo rojo'],
    },
    lego: {
      title: 'Generador de logo LEGO',
      description:
        'Crea logos estilo LEGO con tipografía cuadrada y colores brillantes listos para exportar.',
      keywords: ['logo lego', 'generador logo bloques', 'logo juguetes'],
    },
    marvel: {
      title: 'Generador de logo Marvel',
      description:
        'Crea títulos audaces al estilo Marvel con texto personalizado y control de colores rojo/blanco.',
      keywords: ['logo marvel', 'generador logo cómic', 'creador logo película'],
    },
    bravo: {
      title: 'Generador de logo Bravo',
      description:
        'Genera logos de canal inspirados en Bravo con texto editable y estilo de burbuja.',
      keywords: ['logo bravo', 'generador logo tv', 'logo de canal'],
    },
    amc: {
      title: 'Generador de logo AMC',
      description:
        'Crea wordmarks al estilo AMC en el navegador y exporta PNG/SVG listos para imprimir.',
      keywords: ['logo amc', 'logo cadena tv', 'generador de wordmarks'],
    },
  },
}
