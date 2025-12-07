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
      badge: {
        building: 'en cours',
      },
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
    fontPicker: {
      title: 'Sélecteur de polices',
      subtitle:
        'Utilise votre clé Google Web Fonts et charge les polices variables et WOFF2 à la demande.',
      search: 'Rechercher une police',
      searchPlaceholder: 'Saisir le nom de la famille',
      fontLabel: 'Famille de police',
      variantLabel: 'Variante',
      reload: 'Recharger la liste',
      loading: 'Chargement…',
      missingKey: 'Service de polices indisponible. Vérifiez la variable serveur GOOGLE_FONT_KEY.',
      fetchError: 'Impossible de charger les polices. Vérifiez la clé API ou le réseau.',
      count: '{count} polices',
      capability:
        'Compatible polices variables (VF) et WOFF2, appliquées seulement à la prévisualisation.',
    },
    pornhub: {
      fontFamily: 'Police',
      textColor: 'Couleurs du texte',
      leftBgToggle: 'Afficher le fond gauche',
      leftBg: 'Fond gauche',
      leftTextColor: 'Texte gauche',
      rightBg: 'Fond droit',
      rightTextColor: 'Texte droit',
      canvas: 'Arrière-plan du canevas',
      canvasBg: 'Couleur du canevas',
      pureBlackPreview: 'Aperçu noir uni',
      transparentHint: 'Canevas transparent (PNG / SVG conservent la transparence)',
      fontSize: 'Taille de police',
    },
    simpleText: {
      previewTitle: 'Aperçu',
      controlsTitle: 'Réglages typographiques',
      controlsHint: 'Ajustez le mot ci-dessous, la prévisualisation se met à jour instantanément.',
      textLabel: 'Texte',
      textPlaceholder: 'Saisissez votre texte…',
      fontSize: 'Taille de police',
      textColor: 'Couleur du texte',
      previewBg: "Fond de l'aperçu",
      fontTitle: 'Police et variante',
      fontHint: 'Charge Google Fonts à la demande ; les variantes appliquent poids / italique.',
    },
  },
  page: {
    app: {
      renderError: 'Le rendu de la page a échoué, cliquez pour réessayer.',
    },
    home: {
      title: 'Générateur de logos style Pornhub',
      state: {
        processing: 'Génération…',
        packaging: 'Compression…',
      },
      actions: {
        downloadPng: 'Télécharger PNG',
        downloadJpg: 'Télécharger JPG',
        downloadSvg: 'Télécharger SVG',
        downloadZip: 'Télécharger ZIP',
      },
      errors: {
        downloadFail: 'Échec du téléchargement, réessayez plus tard.',
        zipFail: 'Échec de l’archive ZIP, réessayez plus tard.',
        canvasNotReady: 'La zone de dessin se charge encore, patientez un instant.',
      },
    },
    verticalPh: {
      title: 'Pornhub vertical',
      description: 'Page de modèle de logo style Pornhub vertical.',
    },
    simpleText: {
      title: 'Simple Text',
      description:
        'Créez un wordmark mono-ligne épuré avec police, variante, taille et couleur sur mesure.',
      defaultText: 'Simple Text',
    },
    onlyfans: {
      title: 'OnlyFans',
      status: 'En construction',
      lead: 'Nous mettons à jour le générateur OnlyFans pour un meilleur espacement et de meilleurs exports.',
      note: 'Merci de patienter ; vous pouvez tester les autres modèles en attendant.',
      items: {
        spacing: {
          title: 'Réglage typographique',
          desc: 'Préréglages de crénage et de baseline proches du wordmark original.',
        },
        export: {
          title: 'Exports propres',
          desc: 'PNG/SVG/JPEG transparents, bords nets et archives ZIP.',
        },
      },
      actions: {
        home: 'Retour à l’accueil',
        progress: 'Suivre l’avancement sur GitHub',
      },
    },
    about: {
      title: 'À propos de nous',
      subtitle: {
        line1:
          'Logoly est un générateur de logos open source permettant à tous de créer en quelques secondes des wordmarks de marque, même sans bases de design.',
        line2: 'Vous pouvez librement utiliser, modifier et distribuer le code et les images générées.',
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
    fedex: {
      title: 'FedEx',
      status: 'En construction',
      lead:
        'Nous peaufinons le générateur de logo façon FedEx : palette, espacement et export sont en cours.',
      note: 'Merci de votre patience ; en attendant, essayez les autres modèles.',
      items: {
        palette: {
          title: 'Palette signature',
          desc: 'Violet + orange FedEx avec échange instantané et conseils de contraste.',
        },
        spacing: {
          title: 'Espacement prêt à livrer',
          desc: 'Réglages de crénage et de baseline alignés sur le wordmark original.',
        },
        export: {
          title: 'Exports propres',
          desc: 'PNG/SVG/JPEG transparents, bords nets et paquets zip.',
        },
      },
      actions: {
        home: 'Retour à l’accueil',
        progress: 'Suivre l’avancement sur GitHub',
      },
    },
    mastercard: {
      title: 'Mastercard',
      status: 'En construction',
      lead: 'Nous peaufinons ce générateur : palette, espacement et exports arrivent.',
      note: 'Merci de votre patience ; essayez les autres modèles en attendant.',
      items: {
        palette: {
          title: 'Palette de marque',
          desc: 'Couleurs fidèles avec échange rapide et conseils de contraste.',
        },
        spacing: {
          title: 'Espacement et alignement',
          desc: 'Préréglages de crénage et baseline proches du wordmark original.',
        },
        export: {
          title: 'Exports propres',
          desc: 'PNG/SVG/JPEG transparents, bords nets et archives ZIP.',
        },
      },
      actions: {
        home: 'Retour à l’accueil',
        progress: 'Suivre l’avancement sur GitHub',
      },
    },
    bluesnap: {
      title: 'Bluesnap',
      status: 'En construction',
      lead: 'Nous peaufinons ce générateur : palette, espacement et exports arrivent.',
      note: 'Merci de votre patience ; essayez les autres modèles en attendant.',
      items: {
        palette: {
          title: 'Palette de marque',
          desc: 'Couleurs fidèles avec échange rapide et conseils de contraste.',
        },
        spacing: {
          title: 'Espacement et alignement',
          desc: 'Préréglages de crénage et baseline proches du wordmark original.',
        },
        export: {
          title: 'Exports propres',
          desc: 'PNG/SVG/JPEG transparents, bords nets et archives ZIP.',
        },
      },
      actions: {
        home: 'Retour à l’accueil',
        progress: 'Suivre l’avancement sur GitHub',
      },
    },
    sega: {
      title: 'SEGA',
      status: 'En construction',
      lead: 'Nous peaufinons ce générateur : palette, espacement et exports arrivent.',
      note: 'Merci de votre patience ; essayez les autres modèles en attendant.',
      items: {
        palette: {
          title: 'Palette de marque',
          desc: 'Couleurs fidèles avec échange rapide et conseils de contraste.',
        },
        spacing: {
          title: 'Espacement et alignement',
          desc: 'Préréglages de crénage et baseline proches du wordmark original.',
        },
        export: {
          title: 'Exports propres',
          desc: 'PNG/SVG/JPEG transparents, bords nets et archives ZIP.',
        },
      },
      actions: {
        home: 'Retour à l’accueil',
        progress: 'Suivre l’avancement sur GitHub',
      },
    },
    nintendo: {
      title: 'Nintendo',
      status: 'En construction',
      lead: 'Nous peaufinons ce générateur : palette, espacement et exports arrivent.',
      note: 'Merci de votre patience ; essayez les autres modèles en attendant.',
      items: {
        palette: {
          title: 'Palette de marque',
          desc: 'Couleurs fidèles avec échange rapide et conseils de contraste.',
        },
        spacing: {
          title: 'Espacement et alignement',
          desc: 'Préréglages de crénage et baseline proches du wordmark original.',
        },
        export: {
          title: 'Exports propres',
          desc: 'PNG/SVG/JPEG transparents, bords nets et archives ZIP.',
        },
      },
      actions: {
        home: 'Retour à l’accueil',
        progress: 'Suivre l’avancement sur GitHub',
      },
    },
    lego: {
      title: 'Lego',
      status: 'En construction',
      lead: 'Nous peaufinons ce générateur : palette, espacement et exports arrivent.',
      note: 'Merci de votre patience ; essayez les autres modèles en attendant.',
      items: {
        palette: {
          title: 'Palette de marque',
          desc: 'Couleurs fidèles avec échange rapide et conseils de contraste.',
        },
        spacing: {
          title: 'Espacement et alignement',
          desc: 'Préréglages de crénage et baseline proches du wordmark original.',
        },
        export: {
          title: 'Exports propres',
          desc: 'PNG/SVG/JPEG transparents, bords nets et archives ZIP.',
        },
      },
      actions: {
        home: 'Retour à l’accueil',
        progress: 'Suivre l’avancement sur GitHub',
      },
    },
    marvel: {
      title: 'Marvel',
      status: 'En construction',
      lead: 'Nous peaufinons ce générateur : palette, espacement et exports arrivent.',
      note: 'Merci de votre patience ; essayez les autres modèles en attendant.',
      items: {
        palette: {
          title: 'Palette de marque',
          desc: 'Couleurs fidèles avec échange rapide et conseils de contraste.',
        },
        spacing: {
          title: 'Espacement et alignement',
          desc: 'Préréglages de crénage et baseline proches du wordmark original.',
        },
        export: {
          title: 'Exports propres',
          desc: 'PNG/SVG/JPEG transparents, bords nets et archives ZIP.',
        },
      },
      actions: {
        home: 'Retour à l’accueil',
        progress: 'Suivre l’avancement sur GitHub',
      },
    },
    bravo: {
      title: 'Bravo',
      status: 'En construction',
      lead: 'Nous peaufinons ce générateur : palette, espacement et exports arrivent.',
      note: 'Merci de votre patience ; essayez les autres modèles en attendant.',
      items: {
        palette: {
          title: 'Palette de marque',
          desc: 'Couleurs fidèles avec échange rapide et conseils de contraste.',
        },
        spacing: {
          title: 'Espacement et alignement',
          desc: 'Préréglages de crénage et baseline proches du wordmark original.',
        },
        export: {
          title: 'Exports propres',
          desc: 'PNG/SVG/JPEG transparents, bords nets et archives ZIP.',
        },
      },
      actions: {
        home: 'Retour à l’accueil',
        progress: 'Suivre l’avancement sur GitHub',
      },
    },
    amc: {
      title: 'AMC',
      status: 'En construction',
      lead: 'Nous peaufinons ce générateur : palette, espacement et exports arrivent.',
      note: 'Merci de votre patience ; essayez les autres modèles en attendant.',
      items: {
        palette: {
          title: 'Palette de marque',
          desc: 'Couleurs fidèles avec échange rapide et conseils de contraste.',
        },
        spacing: {
          title: 'Espacement et alignement',
          desc: 'Préréglages de crénage et baseline proches du wordmark original.',
        },
        export: {
          title: 'Exports propres',
          desc: 'PNG/SVG/JPEG transparents, bords nets et archives ZIP.',
        },
      },
      actions: {
        home: 'Retour à l’accueil',
        progress: 'Suivre l’avancement sur GitHub',
      },
    },
    notFound: {
      title: 'Page introuvable, mais vos idées comptent',
      lead:
        "Ce lien n'existe pas ou la page n'est pas encore prête. " +
        'Dites-nous le modèle ou la fonctionnalité que vous souhaitez ' +
        'et nous la suivrons sur GitHub.',
      issuePrompt:
        'Cliquez sur le bouton ci-dessous pour ouvrir un ticket. ' +
        'Décrivez le modèle de marque, la fonctionnalité ou le bug dont vous avez besoin ; ' +
        'nous répondrons et partagerons l’avancement là-bas.',
      actions: {
        issue: 'Ouvrir un ticket GitHub',
        home: "Retour à l'accueil",
      },
    },
  },
  seo: {
    home: {
      title: 'Générateur de logo style Pornhub | Export PNG/SVG gratuit',
      description:
        'Logoly est un générateur gratuit inspiré de Pornhub, OnlyFans, FedEx et Mastercard. Personnalisez texte et couleurs dans le navigateur et exportez en PNG, JPG ou SVG sans inscription.',
      keywords: [
        'générateur logo pornhub',
        'créateur logo onlyfans',
        'générateur de logo gratuit',
        'logo svg en ligne',
        'logo style mastercard',
        'logo style fedex',
      ],
    },
    about: {
      title: 'À propos de Logoly | Générateur de logos open source',
      description:
        'Découvrez comment Logoly rend des wordmarks inspirés de marques directement dans le navigateur, sa licence open source et comment contribuer avec des modèles ou des traductions.',
      keywords: [
        'à propos de logoly',
        'générateur de logo open source',
        'créateur de logo navigateur',
        'communauté logoly',
      ],
    },
    faq: {
      title: 'FAQ | Aide et dépannage Logoly',
      description:
        'Réponses sur les téléchargements, les polices, la confidentialité et l’usage de Logoly pour créer des logos façon Pornhub ou OnlyFans.',
      keywords: [
        'faq logoly',
        'aide générateur de logo',
        'télécharger logo svg',
        'polices manquantes',
      ],
    },
    'vertical-ph': {
      title: 'Modèle vertical façon Pornhub',
      description:
        'Créez des logos verticaux style Pornhub avec couleurs ajustables et export PNG/SVG instantané.',
      keywords: ['logo pornhub vertical', 'générateur logo vertical', 'logo style ph'],
    },
    onlyfans: {
      title: 'Générateur de logo OnlyFans',
      description:
        'Créez des wordmarks inspirés d’OnlyFans avec votre texte et vos couleurs; téléchargez en PNG ou SVG transparent.',
      keywords: ['logo onlyfans', 'générateur logo onlyfans', 'créateur logo bleu'],
    },
    fedex: {
      title: 'Générateur de logo FedEx',
      description:
        'Reproduisez le wordmark FedEx avec couleurs et espacement éditables, exporté immédiatement en PNG ou SVG.',
      keywords: ['logo fedex', 'générateur logo fedex', 'logo livraison'],
    },
    mastercard: {
      title: 'Générateur de logo Mastercard',
      description:
        'Composez des wordmarks double-cercle façon Mastercard avec texte et couleurs modifiables dans votre navigateur.',
      keywords: ['logo mastercard', 'générateur logo paiement', 'créateur logo circulaire'],
    },
    bluesnap: {
      title: 'Générateur de logo BlueSnap',
      description:
        'Générez des logos inspirés de BlueSnap avec les couleurs de la marque et exportez en SVG/PNG.',
      keywords: ['logo bluesnap', 'générateur logo paiement', 'logo bleu'],
    },
    simpletext: {
      title: 'Créateur de logo texte simple',
      description:
        'Exportez rapidement des logos texte épurés avec polices, graisses et fonds personnalisables.',
      keywords: ['générateur logo texte', 'créateur logo simple', 'logo police en ligne'],
    },
    sega: {
      title: 'Générateur de logo SEGA',
      description:
        'Dessinez des logos à contour style SEGA avec votre texte puis téléchargez en PNG/SVG haute résolution.',
      keywords: ['logo sega', 'générateur logo rétro', 'créateur logo gaming'],
    },
    nintendo: {
      title: 'Générateur de logo Nintendo',
      description:
        'Créez des wordmarks arrondis façon Nintendo avec aperçu instantané et téléchargements.',
      keywords: ['logo nintendo', 'générateur logo gaming', 'logo rouge'],
    },
    lego: {
      title: 'Générateur de logo LEGO',
      description:
        'Concevez des logos inspirés de LEGO avec typographie angulaire et couleurs vives prêtes à exporter.',
      keywords: ['logo lego', 'générateur logo blocs', 'logo jouet'],
    },
    marvel: {
      title: 'Générateur de logo Marvel',
      description:
        'Créez des titres audacieux façon Marvel avec texte personnalisé et contrôle des couleurs rouge/blanc.',
      keywords: ['logo marvel', 'générateur logo comics', 'logo film'],
    },
    bravo: {
      title: 'Générateur de logo Bravo',
      description:
        'Générez des logos de chaîne inspirés de Bravo avec texte éditable et bulle stylisée.',
      keywords: ['logo bravo', 'générateur logo tv', 'logo chaîne'],
    },
    amc: {
      title: 'Générateur de logo AMC',
      description:
        'Créez des wordmarks façon AMC dans le navigateur et exportez des PNG/SVG prêts à imprimer.',
      keywords: ['logo amc', 'logo chaîne tv', 'générateur de wordmark'],
    },
  },
}
