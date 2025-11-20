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
  },
  page: {
    app: {
      renderError: 'Hubo un problema al renderizar la página. Haz clic para reintentar.',
    },
    about: {
      title: 'Sobre nosotros',
      subtitle: {
        line1:
          'Logoly es un generador de logos en línea de código abierto que permite a cualquiera crear wordmarks de marca en segundos, incluso sin base de diseño.',
        line2:
          'Puedes usar, modificar y distribuir libremente tanto el código como las imágenes generadas.',
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
}
