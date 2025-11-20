export default {
  component: {
    menu: {
      home: 'PornHub',
      verticalPh: 'Vertical PH',
      onlyfans: 'OnlyFans',
      about: 'À propos',
      faq: 'FAQ',
      other: 'Autres',
      language: 'Langue',
      lang: {
        en: 'Anglais',
        zhCN: '简体中文',
        'zh-CN': '简体中文',
        es: 'Espagnol',
        fr: 'Français',
        ja: 'Japonais',
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
      defaultMessage: "Une erreur inattendue s'est produite",
      help: 'Copiez les infos de débogage ci-dessous et ouvrez un ticket GitHub pour que nous enquêtions.',
      copy: 'Copier les infos de débogage',
      retry: 'Réessayer',
      githubLink: 'Créer un ticket GitHub',
    },
    footerMenu: {
      heading: 'Changer rapidement de modèle de logo',
      note: 'Menu du bas : sauter par site ou marque',
      categories: {
        websites: 'Sites',
        brands: 'Marques',
      },
    },
    siteFooter: {
      copyright: '© {year} Logoly · Maintenu par la communauté, contributions bienvenues',
      github: 'GitHub',
      x: 'X.com',
      contact: "Contacter l'auteur",
    },
    versionDialog: {
      title: 'Infos de diagnostic',
      description: 'Cliquez pour copier les infos de débogage',
      close: 'Fermer',
      copy: 'Copier',
    },
    languagePrompt: {
      title: 'Basculer vers une langue plus adaptée ?',
      description:
        'Nous avons détecté que votre navigateur préfère {locale}. Voulez-vous changer ?',
      hint: 'Vous pouvez modifier ce choix à tout moment via le menu Langue en haut à droite.',
      switch: 'Passer en {locale}',
      stay: 'Garder la langue actuelle',
    },
  },
  page: {
    app: {
      renderError: 'Le rendu de la page a échoué, cliquez pour réessayer.',
    },
    about: {
      title: 'À propos de nous',
      subtitle: {
        line1:
          'Logoly est un générateur de logos en ligne open source dont le but est de permettre à tous de créer en quelques secondes de jolis wordmarks de marque, même sans bases de design.',
        line2:
          'Vous pouvez librement utiliser, modifier et distribuer le code ainsi que les images générées.',
      },
      highlights: {
        title: 'Points forts du produit',
        instant: {
          title: 'Génération en un clic',
          desc: 'Saisissez du texte pour prévisualiser instantanément des logos façon Pornhub / OnlyFans ; exportez en PNG ou SVG.',
          link: 'Essayer maintenant',
        },
        local: {
          title: '100 % front-end, aucune trace',
          desc: "Le rendu et le téléchargement se font dans votre navigateur, aucun contenu n'est envoyé ni stocké.",
        },
        open: {
          title: 'Entièrement open source',
          desc: 'Code hébergé sur GitHub sous licence WTFPL, libre à vous de l’utiliser et d’en faire des forks.',
          link: 'Repo GitHub',
        },
        community: {
          title: 'Co-créé par la communauté',
          desc: 'Modèles, packs de langues et fonctionnalités évoluent grâce aux contributions des développeurs.',
        },
      },
      community: {
        title: 'Open source & communauté',
        desc: 'Logoly progresse grâce à la communauté : proposez des modèles, améliorez l’UX/UI, ajoutez des langues ou partagez vos idées.',
        links: {
          issues: 'Soumettre un problème ou une suggestion',
          guide: 'Guide de contribution',
        },
      },
      contact: {
        title: 'Contactez-nous',
        desc: 'Pour toute idée ou besoin de partenariat, laissez un issue GitHub ou trouvez d’autres contacts de bestony sur le blog.',
        cta: 'Envoyer un feedback sur GitHub',
      },
    },
    faq: {
      title: 'FAQ',
      lead: 'Questions courantes par catégorie, cliquez pour afficher la réponse.',
      expand: 'Développer',
      groups: {
        usage: {
          title: 'Usage',
          items: {
            login: {
              q: 'Faut-il créer un compte pour utiliser Logoly ?',
              a: 'Non. Logoly est une appli 100 % front-end : ouvrez la page, aucune collecte de données personnelles.',
            },
            storage: {
              q: 'Les logos générés sont-ils enregistrés sur un serveur ?',
              a: 'Non. Le rendu et les téléchargements restent locaux ; les images ne quittent pas votre appareil.',
            },
            download: {
              q: "Que faire en cas d'échec de téléchargement ou de polices manquantes ?",
              a: "Actualisez et vérifiez l'accès aux ressources de police/CDN ; si le problème persiste, ouvrez un issue GitHub.",
            },
          },
        },
        legal: {
          title: 'Légal',
          items: {
            commercial: {
              q: 'Puis-je utiliser les logos à des fins commerciales ?',
              a: 'Logoly est libre et open source ; assurez-vous simplement de ne pas enfreindre de marques ou droits d’auteur tiers.',
            },
            privacy: {
              q: 'Stockez-vous ou partagez-vous le contenu utilisateur ?',
              a: 'Non. Il n’y a pas de stockage backend ; tout reste dans votre session navigateur.',
            },
          },
        },
        openSource: {
          title: 'Open source',
          items: {
            hosting: {
              q: 'Où le projet est-il hébergé ?',
              a: 'Sur GitHub : github.com/bestony/logoly — les stars et contributions sont bienvenues.',
            },
            contrib: {
              q: 'Comment contribuer ou ajouter un nouveau modèle ?',
              a: 'Forkez puis ouvrez une PR avec la page de modèle et l’aperçu ; tests ou notes appréciés.',
            },
            license: {
              q: 'Quelle est la licence ?',
              a: 'WTFPL — faites-en ce que vous voulez.',
            },
          },
        },
      },
    },
  },
}
