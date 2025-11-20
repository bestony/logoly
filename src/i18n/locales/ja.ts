export default {
  component: {
    menu: {
      home: 'PornHub',
      verticalPh: 'Vertical PH',
      onlyfans: 'OnlyFans',
      about: '概要',
      faq: 'FAQ',
      other: 'その他',
      language: '言語',
      lang: {
        en: '英語',
        zhCN: '简体中文',
        'zh-CN': '简体中文',
        es: 'スペイン語',
        fr: 'フランス語',
        ja: '日本語',
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
      defaultMessage: '予期しないエラーが発生しました',
      help: '下のデバッグ情報をコピーし、GitHub で Issue を作成して調査にご協力ください。',
      copy: 'デバッグ情報をコピー',
      retry: '再試行',
      githubLink: 'GitHub で Issue を作成',
    },
    footerMenu: {
      heading: 'ロゴテンプレートを素早く切り替え',
      note: 'フッターメニュー：サイトやブランドで素早くジャンプ',
      categories: {
        websites: 'サイト',
        brands: 'ブランド',
      },
    },
    siteFooter: {
      copyright: '© {year} Logoly · コミュニティによってメンテナンス、貢献歓迎',
      github: 'GitHub',
      x: 'X.com',
      contact: '作者に連絡',
    },
    versionDialog: {
      title: '診断情報',
      description: 'クリックしてデバッグ情報をコピー',
      close: '閉じる',
      copy: 'コピー',
    },
    languagePrompt: {
      title: 'より適した言語に切り替えますか？',
      description: '{locale} がブラウザーの優先言語として検出されました。切り替えますか？',
      hint: '右上の言語メニューからいつでも変更できます。',
      switch: '{locale} に切り替える',
      stay: '現在の言語を維持',
    },
  },
  page: {
    app: {
      renderError: 'ページのレンダリングで問題が発生しました。クリックして再試行してください。',
    },
    about: {
      title: '私たちについて',
      subtitle: {
        line1:
          'Logoly はオープンソースのオンラインロゴジェネレーターで、デザイン経験がなくても数秒でブランドのワードマークを作れます。',
        line2: 'コードも生成した画像も自由に利用・変更・配布できます。',
      },
      highlights: {
        title: '製品の特長',
        instant: {
          title: 'ワンクリック生成',
          desc: '文字を入力するだけで Pornhub / OnlyFans 風のロゴを即時プレビューし、PNG または SVG で出力できます。',
          link: '今すぐ試す',
        },
        local: {
          title: 'フロントエンドのみ・痕跡なし',
          desc: 'レンダリングとダウンロードはブラウザー内で完結し、内容はアップロードも保存もされません。',
        },
        open: {
          title: '完全オープンソース',
          desc: 'コードは GitHub で公開され、WTFPL ライセンスを採用。自由に利用・改変できます。',
          link: 'GitHub リポジトリ',
        },
        community: {
          title: 'コミュニティ共創',
          desc: 'テンプレート、言語パック、機能は開発者コミュニティによって継続的に改善されています。',
        },
      },
      community: {
        title: 'オープンソースとコミュニティ',
        desc: 'Logoly はコミュニティ主導で進化しています。テンプレート追加、UI/UX 改善、翻訳やアイデアの共有を歓迎します。',
        links: {
          issues: '課題や提案を投稿',
          guide: 'コントリビューションガイド',
        },
      },
      contact: {
        title: 'お問い合わせ',
        desc: 'アイデアや協業の相談があれば、GitHub Issue にコメントするか、ブログで bestony の連絡先をご確認ください。',
        cta: 'GitHub でフィードバック',
      },
    },
    faq: {
      title: 'よくある質問',
      lead: 'カテゴリ別に質問をまとめています。クリックして回答を表示してください。',
      expand: '開く',
      groups: {
        usage: {
          title: '使用',
          items: {
            login: {
              q: 'Logoly の利用に登録やログインは必要ですか？',
              a: 'いいえ。Logoly は純粋なフロントエンドツールで、ページを開くだけで使えます。個人情報も収集しません。',
            },
            storage: {
              q: '生成したロゴはサーバーに保存されますか？',
              a: '保存されません。レンダリングもダウンロードもブラウザー内で行われ、画像はあなたの端末にだけ残ります。',
            },
            download: {
              q: 'ダウンロードに失敗したりフォントが欠けていたら？',
              a: 'リロードして再試行し、フォントリソースにアクセスできるか確認してください。解決しない場合は GitHub で Issue を送ってください。',
            },
          },
        },
        legal: {
          title: '法務',
          items: {
            commercial: {
              q: '生成したロゴを商用利用できますか？',
              a: 'Logoly 自体は無料でオープンソースです。第三者の商標や著作権を侵害しないようご注意ください。',
            },
            privacy: {
              q: 'ユーザーコンテンツを保存・共有しますか？',
              a: 'いいえ。バックエンド保存はなく、入力と生成物はブラウザーセッション内だけに存在します。',
            },
          },
        },
        openSource: {
          title: 'オープンソース',
          items: {
            hosting: {
              q: 'プロジェクトはどこでホストされていますか？',
              a: 'GitHub（github.com/bestony/logoly）で公開しており、Star や貢献を歓迎します。',
            },
            contrib: {
              q: 'どうやって貢献や新しいテンプレートを追加できますか？',
              a: 'リポジトリをフォークしてテンプレートページとプレビューを含む PR を送ってください。テストや使い方の補足も歓迎です。',
            },
            license: {
              q: 'ライセンスは何ですか？',
              a: 'WTFPL を採用しており、自由に複製・改変・配布できます。',
            },
          },
        },
      },
    },
    notFound: {
      title: 'ページが見つかりませんが、あなたのアイデアは大切です',
      lead:
        'このリンクは存在しないか、まだ公開前のページです。欲しいテンプレートや機能を教えてください。' +
        'GitHub で追跡します。',
      issuePrompt:
        '下のボタンから Issue を開いてください。欲しいブランドテンプレート、機能、バグ内容を書いて ' +
        'いただければ、そこで返信し進捗を共有します。',
      actions: {
        issue: 'GitHub で Issue を作成',
        home: 'ホームへ戻る',
      },
    },
  },
}
