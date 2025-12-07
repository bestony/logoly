export default {
  component: {
    menu: {
      home: 'PornHub',
      verticalPh: 'Vertical PH',
      onlyfans: 'OnlyFans',
      about: 'About',
      faq: 'FAQ',
      other: 'More',
      language: 'Language',
      lang: {
        en: 'English',
        zhCN: '简体中文',
        'zh-CN': '简体中文',
        es: 'Spanish',
        fr: 'French',
        ja: 'Japanese',
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
        building: 'building',
      },
    },
    errorBoundary: {
      defaultMessage: 'Something went wrong',
      help: 'Please copy the debug info below and submit an issue on GitHub so we can investigate.',
      copy: 'Copy Debug Info',
      retry: 'Retry',
      githubLink: 'Submit GitHub Issue',
    },
    footerMenu: {
      heading: 'Quick switch logo templates',
      note: 'Footer: jump quickly by site or brand',
      categories: {
        websites: 'Sites',
        brands: 'Brands',
      },
    },
    siteFooter: {
      copyright: '© {year} Logoly · Community maintained, contributions welcome',
      github: 'GitHub',
      x: 'X.com',
      contact: 'Contact Author',
    },
    versionDialog: {
      title: 'Debug Info',
      description: 'Click to copy debug info',
      close: 'Close',
      copy: 'Copy',
    },
    languagePrompt: {
      title: 'Switch language?',
      description: 'We detected your browser prefers {locale}. Would you like to switch?',
      hint: 'You can change this anytime via the Language menu in the header.',
      switch: 'Switch to {locale}',
      stay: 'Keep current language',
    },
    fontPicker: {
      title: 'Font Picker',
      subtitle: 'Uses your Google Web Fonts API key, loads variable fonts and WOFF2 on demand.',
      search: 'Search fonts',
      searchPlaceholder: 'Type a family name',
      fontLabel: 'Font family',
      variantLabel: 'Variant',
      reload: 'Reload list',
      loading: 'Loading…',
      missingKey: 'Fonts API unavailable. Ensure server env GOOGLE_FONT_KEY is configured.',
      fetchError: 'Unable to load fonts. Check your API key or network.',
      count: '{count} fonts',
      capability: 'Supports variable fonts (VF) and WOFF2, applied to the logo preview only.',
    },
    pornhub: {
      fontFamily: 'Font',
      textColor: 'Text colors',
      leftBgToggle: 'Show left background block',
      leftBg: 'Left background',
      leftTextColor: 'Left text',
      rightBg: 'Right background',
      rightTextColor: 'Right text',
      canvas: 'Canvas background',
      canvasBg: 'Canvas color',
      pureBlackPreview: 'Pure black preview',
      transparentHint: 'Transparent canvas (PNG / SVG keep transparency)',
      fontSize: 'Font size',
    },
    simpleText: {
      previewTitle: 'Preview',
      controlsTitle: 'Typography controls',
      controlsHint: 'Tweak the wordmark below and see changes instantly above.',
      textLabel: 'Text',
      textPlaceholder: 'Type anything…',
      fontSize: 'Font size',
      textColor: 'Text color',
      previewBg: 'Preview background',
      fontTitle: 'Font & variant',
      fontHint: 'Loads Google Fonts on demand; variants auto-apply weight or italics.',
    },
  },
  page: {
    app: {
      renderError: 'Page failed to render, click Retry to try again.',
    },
    home: {
      title: 'Pornhub-style Logo Generator',
      state: {
        processing: 'Generating…',
        packaging: 'Packaging…',
      },
      actions: {
        downloadPng: 'Download PNG',
        downloadJpg: 'Download JPG',
        downloadSvg: 'Download SVG',
        downloadZip: 'Download ZIP',
      },
      errors: {
        downloadFail: 'Download failed, please try again later.',
        zipFail: 'ZIP export failed, please try again later.',
        canvasNotReady: 'Canvas is still loading—please wait a moment.',
      },
    },
    verticalPh: {
      title: 'Vertical PH',
      description: 'Vertical Pornhub-style logo template page.',
    },
    simpleText: {
      title: 'Simple Text',
      description:
        'Create a clean single-line wordmark with custom font, variant, size, and color.',
      defaultText: 'Simple Text',
    },
    onlyfans: {
      title: 'OnlyFans',
      status: 'Under construction',
      lead: 'The OnlyFans-style logo maker is being refreshed for better spacing and exports.',
      note: 'Thanks for waiting. You can still explore other templates meanwhile.',
      items: {
        spacing: {
          title: 'Typography tuning',
          desc: 'Kerning and baseline presets to mirror the original wordmark feel.',
        },
        export: {
          title: 'Clean exports',
          desc: 'Transparent PNG/SVG/JPEG with crisp edges and ZIP bundles.',
        },
      },
      actions: {
        home: 'Back to home',
        progress: 'Follow progress on GitHub',
      },
    },
    about: {
      title: 'About Logoly',
      subtitle: {
        line1:
          'Logoly is an open-source logo generator that makes brand wordmarks in seconds.',
        line2:
          'You can freely use, modify, and distribute the code and the images you export.',
      },
      highlights: {
        title: 'Product highlights',
        instant: {
          title: 'Generate in one click',
          desc: 'Type text to preview Pornhub / OnlyFans-style logos, then export PNG or SVG.',
          link: 'Try now',
        },
        local: {
          title: 'All in the browser',
          desc: 'Rendering and downloads stay local—no uploads or traces left behind.',
        },
        open: {
          title: 'Open source',
          desc: 'Code lives on GitHub under WTFPL—free to reuse and fork.',
          link: 'GitHub repo',
        },
        community: {
          title: 'Community-built',
          desc: 'Templates, locales, and features grow through community contributions.',
        },
      },
      community: {
        title: 'Open Source & Community',
        desc: 'Logoly grows with community input—add templates, polish UX, translate, share ideas.',
        links: {
          issues: 'File an issue or suggestion',
          guide: 'Contribution guide',
        },
      },
      contact: {
        title: 'Contact us',
        desc: 'Have ideas or partnership needs? Open a GitHub issue or reach out via the blog.',
        cta: 'Feedback on GitHub',
      },
    },
    faq: {
      title: 'FAQ',
      lead: 'Browse by category and expand to see the answers.',
      expand: 'Expand',
      groups: {
        usage: {
          title: 'Usage',
          items: {
            login: {
              q: 'Do I need an account to use Logoly?',
              a: 'No. Logoly runs fully in your browser with no login or data collection.',
            },
            storage: {
              q: 'Is my generated logo stored on servers?',
              a: 'No. Rendering and downloads stay local; images remain on your device.',
            },
            download: {
              q: 'What if download fails or fonts are missing?',
              a: 'Refresh and ensure fonts/CDN are reachable; if it persists, open a GitHub issue.',
            },
          },
        },
        legal: {
          title: 'Legal',
          items: {
            commercial: {
              q: 'Can I use logos commercially?',
              a: 'Logoly is free and open; avoid infringing third-party trademarks or copyrights.',
            },
            privacy: {
              q: 'Do you store or share user content?',
              a: 'No backend storage; inputs and outputs stay within your browser session.',
            },
          },
        },
        openSource: {
          title: 'Open Source',
          items: {
            hosting: {
              q: 'Where is the project hosted?',
              a: 'On GitHub: github.com/bestony/logoly — stars and contributions welcome.',
            },
            contrib: {
              q: 'How do I contribute or add a new template?',
              a: 'Fork and open a PR with the template page and preview; tests welcome.',
            },
            license: {
              q: 'What is the license?',
              a: 'WTFPL — do what you want with it.',
            },
          },
        },
      },
    },
    fedex: {
      title: 'FedEx',
      status: 'Under construction',
      lead:
        'We are tuning the FedEx-style logo maker—colors, spacing, and exports are being polished.',
      note: 'Thanks for your patience. You can use other templates while this one ships.',
      items: {
        palette: {
          title: 'Signature palette',
          desc: 'FedEx purple + orange pairing with one-click swap and contrast hints.',
        },
        spacing: {
          title: 'Delivery-ready spacing',
          desc: 'Kerning, baseline, and alignment presets that mirror the original wordmark.',
        },
        export: {
          title: 'Clean exports',
          desc: 'Transparent PNG/SVG/JPEG with crisp vector edges and zip bundles.',
        },
      },
      actions: {
        home: 'Back to home',
        progress: 'Follow progress on GitHub',
      },
    },
    mastercard: {
      title: 'Mastercard',
      status: 'Under construction',
      lead: 'This logo maker is being polished—colors, spacing, and exports are on the way.',
      note: 'Thanks for your patience. Try other templates while we finish.',
      items: {
        palette: {
          title: 'Signature palette',
          desc: 'On-brand colors with quick swap and contrast tips.',
        },
        spacing: {
          title: 'Spacing & alignment',
          desc: 'Kerning and baseline presets to match the original wordmark.',
        },
        export: {
          title: 'Clean exports',
          desc: 'Transparent PNG/SVG/JPEG with crisp edges and ZIP bundles.',
        },
      },
      actions: {
        home: 'Back to home',
        progress: 'Follow progress on GitHub',
      },
    },
    bluesnap: {
      title: 'Bluesnap',
      status: 'Under construction',
      lead: 'This logo maker is being polished—colors, spacing, and exports are on the way.',
      note: 'Thanks for your patience. Try other templates while we finish.',
      items: {
        palette: {
          title: 'Signature palette',
          desc: 'On-brand colors with quick swap and contrast tips.',
        },
        spacing: {
          title: 'Spacing & alignment',
          desc: 'Kerning and baseline presets to match the original wordmark.',
        },
        export: {
          title: 'Clean exports',
          desc: 'Transparent PNG/SVG/JPEG with crisp edges and ZIP bundles.',
        },
      },
      actions: {
        home: 'Back to home',
        progress: 'Follow progress on GitHub',
      },
    },
    sega: {
      title: 'SEGA',
      status: 'Under construction',
      lead: 'This logo maker is being polished—colors, spacing, and exports are on the way.',
      note: 'Thanks for your patience. Try other templates while we finish.',
      items: {
        palette: {
          title: 'Signature palette',
          desc: 'On-brand colors with quick swap and contrast tips.',
        },
        spacing: {
          title: 'Spacing & alignment',
          desc: 'Kerning and baseline presets to match the original wordmark.',
        },
        export: {
          title: 'Clean exports',
          desc: 'Transparent PNG/SVG/JPEG with crisp edges and ZIP bundles.',
        },
      },
      actions: {
        home: 'Back to home',
        progress: 'Follow progress on GitHub',
      },
    },
    nintendo: {
      title: 'Nintendo',
      status: 'Under construction',
      lead: 'This logo maker is being polished—colors, spacing, and exports are on the way.',
      note: 'Thanks for your patience. Try other templates while we finish.',
      items: {
        palette: {
          title: 'Signature palette',
          desc: 'On-brand colors with quick swap and contrast tips.',
        },
        spacing: {
          title: 'Spacing & alignment',
          desc: 'Kerning and baseline presets to match the original wordmark.',
        },
        export: {
          title: 'Clean exports',
          desc: 'Transparent PNG/SVG/JPEG with crisp edges and ZIP bundles.',
        },
      },
      actions: {
        home: 'Back to home',
        progress: 'Follow progress on GitHub',
      },
    },
    lego: {
      title: 'Lego',
      status: 'Under construction',
      lead: 'This logo maker is being polished—colors, spacing, and exports are on the way.',
      note: 'Thanks for your patience. Try other templates while we finish.',
      items: {
        palette: {
          title: 'Signature palette',
          desc: 'On-brand colors with quick swap and contrast tips.',
        },
        spacing: {
          title: 'Spacing & alignment',
          desc: 'Kerning and baseline presets to match the original wordmark.',
        },
        export: {
          title: 'Clean exports',
          desc: 'Transparent PNG/SVG/JPEG with crisp edges and ZIP bundles.',
        },
      },
      actions: {
        home: 'Back to home',
        progress: 'Follow progress on GitHub',
      },
    },
    marvel: {
      title: 'Marvel',
      status: 'Under construction',
      lead: 'This logo maker is being polished—colors, spacing, and exports are on the way.',
      note: 'Thanks for your patience. Try other templates while we finish.',
      items: {
        palette: {
          title: 'Signature palette',
          desc: 'On-brand colors with quick swap and contrast tips.',
        },
        spacing: {
          title: 'Spacing & alignment',
          desc: 'Kerning and baseline presets to match the original wordmark.',
        },
        export: {
          title: 'Clean exports',
          desc: 'Transparent PNG/SVG/JPEG with crisp edges and ZIP bundles.',
        },
      },
      actions: {
        home: 'Back to home',
        progress: 'Follow progress on GitHub',
      },
    },
    bravo: {
      title: 'Bravo',
      status: 'Under construction',
      lead: 'This logo maker is being polished—colors, spacing, and exports are on the way.',
      note: 'Thanks for your patience. Try other templates while we finish.',
      items: {
        palette: {
          title: 'Signature palette',
          desc: 'On-brand colors with quick swap and contrast tips.',
        },
        spacing: {
          title: 'Spacing & alignment',
          desc: 'Kerning and baseline presets to match the original wordmark.',
        },
        export: {
          title: 'Clean exports',
          desc: 'Transparent PNG/SVG/JPEG with crisp edges and ZIP bundles.',
        },
      },
      actions: {
        home: 'Back to home',
        progress: 'Follow progress on GitHub',
      },
    },
    amc: {
      title: 'AMC',
      status: 'Under construction',
      lead: 'This logo maker is being polished—colors, spacing, and exports are on the way.',
      note: 'Thanks for your patience. Try other templates while we finish.',
      items: {
        palette: {
          title: 'Signature palette',
          desc: 'On-brand colors with quick swap and contrast tips.',
        },
        spacing: {
          title: 'Spacing & alignment',
          desc: 'Kerning and baseline presets to match the original wordmark.',
        },
        export: {
          title: 'Clean exports',
          desc: 'Transparent PNG/SVG/JPEG with crisp edges and ZIP bundles.',
        },
      },
      actions: {
        home: 'Back to home',
        progress: 'Follow progress on GitHub',
      },
    },
    notFound: {
      title: 'Page not found, but your ideas matter',
      lead:
        'This link does not exist or the page is not ready yet. ' +
        'Tell us which template or feature you want ' +
        'and we will track it on GitHub.',
      issuePrompt:
        'Click the button below to open an Issue. ' +
        'Describe the brand template, feature, or bug you need ' +
        'and we will reply and share progress there.',
      actions: {
        issue: 'Submit a GitHub Issue',
        home: 'Back to Home',
      },
    },
  },
  seo: {
    home: {
      title: 'Pornhub-style logo generator | Free PNG/SVG export',
      description:
        'Free Pornhub/OnlyFans/FedEx/Mastercard logo maker. Edit text/colors; export PNG/JPG/SVG.',
      keywords: [
        'pornhub logo generator',
        'onlyfans logo maker',
        'free logo generator',
        'svg logo online',
        'mastercard logo style',
        'fedex logo generator',
      ],
    },
    about: {
      title: 'About Logoly | Open-source logo generator',
      description:
        'How Logoly renders wordmarks in-browser, its open-source license, and how to add templates or translations.',
      keywords: [
        'about logoly',
        'open source logo generator',
        'browser logo maker',
        'logoly community',
      ],
    },
    faq: {
      title: 'FAQ | Logoly help and troubleshooting',
      description:
        'Answers about downloads, fonts, privacy, and making Pornhub or OnlyFans style logos with Logoly.',
      keywords: ['logoly faq', 'logo generator help', 'download svg logo', 'fonts missing help'],
    },
    'vertical-ph': {
      title: 'Vertical Pornhub logo template',
      description:
        'Create vertical Pornhub-style logos with adjustable colors and instant PNG/SVG export.',
      keywords: ['vertical pornhub logo', 'pornhub vertical logo generator', 'ph style logo'],
    },
    onlyfans: {
      title: 'OnlyFans logo generator',
      description:
        'Make OnlyFans-inspired wordmarks with your own text and brand colors; download transparent PNG or SVG.',
      keywords: ['onlyfans logo', 'onlyfans logo generator', 'blue logo maker'],
    },
    fedex: {
      title: 'FedEx logo generator',
      description:
        'Recreate the FedEx-style wordmark with editable colors and spacing, exported instantly to PNG or SVG.',
      keywords: ['fedex logo', 'fedex style logo maker', 'delivery logo generator'],
    },
    mastercard: {
      title: 'Mastercard logo generator',
      description:
        'Build Mastercard-style double-circle wordmarks with editable text and colors in your browser.',
      keywords: ['mastercard logo', 'payment logo generator', 'circle logo maker'],
    },
    bluesnap: {
      title: 'BlueSnap logo generator',
      description:
        'Generate BlueSnap-inspired logos with on-brand colors and export them as SVG/PNG.',
      keywords: ['bluesnap logo', 'payment logo maker', 'blue logo'],
    },
    simpletext: {
      title: 'Simple text logo maker',
      description:
        'Quickly export clean text logos with customizable fonts, weights, and backgrounds.',
      keywords: ['text logo generator', 'simple logo maker', 'font logo online'],
    },
    sega: {
      title: 'SEGA logo generator',
      description:
        'Design SEGA-style outlined logos with custom wording and download high-resolution PNG/SVG.',
      keywords: ['sega logo', 'retro logo generator', 'gaming logo maker'],
    },
    nintendo: {
      title: 'Nintendo logo generator',
      description: 'Create rounded Nintendo-style wordmarks with instant preview and downloads.',
      keywords: ['nintendo logo', 'gaming logo maker', 'red logo generator'],
    },
    lego: {
      title: 'LEGO logo generator',
      description:
        'Craft LEGO-inspired blocky logos with bright colors and export ready-to-use assets.',
      keywords: ['lego logo', 'block logo maker', 'toy logo generator'],
    },
    marvel: {
      title: 'Marvel logo generator',
      description:
        'Make bold Marvel-style title logos with custom text and red/white color controls.',
      keywords: ['marvel logo', 'comic logo generator', 'movie logo maker'],
    },
    bravo: {
      title: 'Bravo logo generator',
      description: 'Generate Bravo-inspired channel logos with editable text and bubble styling.',
      keywords: ['bravo logo', 'tv logo maker', 'channel logo'],
    },
    amc: {
      title: 'AMC logo generator',
      description: 'Create AMC-style wordmarks in-browser and export print-ready PNG/SVG.',
      keywords: ['amc logo', 'tv network logo', 'wordmark generator'],
    },
  },
}
