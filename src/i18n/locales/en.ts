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
  },
  page: {
    app: {
      renderError: 'Page failed to render, click Retry to try again.',
    },
    about: {
      title: 'About Logoly',
      subtitle: {
        line1:
          'Logoly is an open-source online logo generator that helps anyone create brand wordmarks in seconds.',
        line2:
          'You can freely use, modify, and distribute both the code and the images you export.',
      },
      highlights: {
        title: 'Product highlights',
        instant: {
          title: 'Generate in one click',
          desc: 'Type text to preview Pornhub / OnlyFans-style logos instantly; export PNG or SVG.',
          link: 'Try now',
        },
        local: {
          title: 'All in the browser',
          desc: 'Rendering and downloads stay local—no uploads, no traces left behind.',
        },
        open: {
          title: 'Open source',
          desc: 'Code lives on GitHub under WTFPL, free to reuse and fork.',
          link: 'GitHub repo',
        },
        community: {
          title: 'Community-built',
          desc: 'Templates, locales, and features evolve through community contributions.',
        },
      },
      community: {
        title: 'Open Source & Community',
        desc: 'Logoly grows with community input—add templates, improve UX, translate, or share ideas.',
        links: {
          issues: 'File an issue or suggestion',
          guide: 'Contribution guide',
        },
      },
      contact: {
        title: 'Contact us',
        desc: 'Have ideas or partnership needs? Open a GitHub issue or find more contacts on the blog.',
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
              a: 'Logoly is free and open; ensure your use does not violate third-party trademarks or copyrights.',
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
              a: 'Fork and open a PR with the template page and preview; tests or notes appreciated.',
            },
            license: {
              q: 'What is the license?',
              a: 'WTFPL — do what you want with it.',
            },
          },
        },
      },
    },
  },
}
