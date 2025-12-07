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
      badge: {
        building: '工事中',
      },
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
    fontPicker: {
      title: 'フォントピッカー',
      subtitle:
        'Google Web Fonts の API キーを使い、可変フォントと WOFF2 をオンデマンドで読み込みます。',
      search: 'フォントを検索',
      searchPlaceholder: 'ファミリー名を入力',
      fontLabel: 'フォントファミリー',
      variantLabel: 'バリアント',
      reload: 'リストを再読み込み',
      loading: '読込中…',
      missingKey:
        'フォントサービスを利用できません。サーバーの環境変数 GOOGLE_FONT_KEY を設定してください。',
      fetchError: 'フォントを読み込めませんでした。API キーまたはネットワークを確認してください。',
      count: '{count} 種類',
      capability: '可変フォント (VF) と WOFF2 に対応し、ロゴのプレビューにのみ適用します。',
    },
    pornhub: {
      fontFamily: 'フォント',
      textColor: 'テキストカラー',
      leftBgToggle: '左背景を表示',
      leftBg: '左背景',
      leftTextColor: '左テキスト',
      rightBg: '右背景',
      rightTextColor: '右テキスト',
      canvas: 'キャンバス背景',
      canvasBg: 'キャンバス色',
      pureBlackPreview: '純黒プレビュー',
      transparentHint: '透明キャンバス（PNG / SVG も透明を保持）',
      fontSize: 'フォントサイズ',
    },
    simpleText: {
      previewTitle: 'プレビュー',
      controlsTitle: 'タイポ設定',
      controlsHint: '下のコントロールで文字を調整すると、上のプレビューが即座に更新されます。',
      textLabel: 'テキスト',
      textPlaceholder: '入力してください…',
      fontSize: 'フォントサイズ',
      textColor: '文字色',
      fontTitle: 'フォントとバリアント',
      fontHint: 'Google Fonts をオンデマンドで読み込み、バリアントでウェイト/イタリックを適用します。',
    },
  },
  page: {
    app: {
      renderError: 'ページのレンダリングで問題が発生しました。クリックして再試行してください。',
    },
    home: {
      title: 'Pornhub風ロゴジェネレーター',
      state: {
        processing: '生成中…',
        packaging: 'パッケージ中…',
      },
      actions: {
        downloadPng: 'PNG をダウンロード',
        downloadJpg: 'JPG をダウンロード',
        downloadSvg: 'SVG をダウンロード',
        downloadZip: 'ZIP をダウンロード',
      },
      errors: {
        downloadFail: 'ダウンロードに失敗しました。もう一度お試しください。',
        zipFail: 'ZIP 作成に失敗しました。もう一度お試しください。',
        canvasNotReady: 'キャンバスを準備しています。少し待ってから再度お試しください。',
      },
    },
    verticalPh: {
      title: '縦型 Pornhub',
      description: '縦型の Pornhub 風ロゴテンプレートページです。',
    },
    simpleText: {
      title: 'Simple Text',
      description:
        'フォント・バリアント・サイズ・カラーを自由に設定したシンプルな1行ロゴを作成します。',
      defaultText: 'Simple Text',
    },
    onlyfans: {
      title: 'OnlyFans',
      status: '工事中',
      lead: 'OnlyFans 風ロゴジェネレーターをアップデート中。文字間と書き出し品質を改善しています。',
      note: 'お待ちいただきありがとうございます。他のテンプレートもぜひお試しください。',
      items: {
        spacing: {
          title: 'タイポ微調整',
          desc: '元のワードマークに近いカーニングとベースラインのプリセットを用意。',
        },
        export: {
          title: 'クリーンな書き出し',
          desc: '透過 PNG/SVG/JPEG を鋭いエッジで、ZIP まとめにも対応。',
        },
      },
      actions: {
        home: 'ホームに戻る',
        progress: 'GitHub で進捗を見る',
      },
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
    fedex: {
      title: 'FedEx',
      status: '工事中',
      lead: 'FedEx 風ロゴエディターを準備中です。配色・字間・書き出しを調整しています。',
      note: 'お待ちいただきありがとうございます。先に他のテンプレートをお試しください。',
      items: {
        palette: {
          title: 'シグネチャーカラー',
          desc: 'FedEx のパープル＋オレンジをワンクリックで切替、コントラストも確認。',
        },
        spacing: {
          title: '文字間と整列',
          desc: '元のワードマークに近いカーニング・ベースラインのプリセットを用意。',
        },
        export: {
          title: 'クリーンな書き出し',
          desc: '透過 PNG/SVG/JPEG を鋭いエッジで出力し、ZIP まとめも予定。',
        },
      },
      actions: {
        home: 'ホームに戻る',
        progress: 'GitHub で進捗を見る',
      },
    },
    mastercard: {
      title: 'Mastercard',
      status: '工事中',
      lead: 'このロゴジェネレーターは配色・字間・書き出しを調整中です。',
      note: 'お待ちいただきありがとうございます。他のテンプレートもぜひお試しください。',
      items: {
        palette: {
          title: 'ブランドカラー',
          desc: 'ブランドに沿った配色をワンクリックで切替、コントラストも確認。',
        },
        spacing: {
          title: '文字間と整列',
          desc: '元のワードマークに近いカーニングとベースラインのプリセット。',
        },
        export: {
          title: 'クリーンな書き出し',
          desc: '透過 PNG/SVG/JPEG をシャープなエッジで、ZIP まとめにも対応。',
        },
      },
      actions: {
        home: 'ホームに戻る',
        progress: 'GitHub で進捗を見る',
      },
    },
    bluesnap: {
      title: 'Bluesnap',
      status: '工事中',
      lead: 'このロゴジェネレーターは配色・字間・書き出しを調整中です。',
      note: 'お待ちいただきありがとうございます。他のテンプレートもぜひお試しください。',
      items: {
        palette: {
          title: 'ブランドカラー',
          desc: 'ブランドに沿った配色をワンクリックで切替、コントラストも確認。',
        },
        spacing: {
          title: '文字間と整列',
          desc: '元のワードマークに近いカーニングとベースラインのプリセット。',
        },
        export: {
          title: 'クリーンな書き出し',
          desc: '透過 PNG/SVG/JPEG をシャープなエッジで、ZIP まとめにも対応。',
        },
      },
      actions: {
        home: 'ホームに戻る',
        progress: 'GitHub で進捗を見る',
      },
    },
    sega: {
      title: 'SEGA',
      status: '工事中',
      lead: 'このロゴジェネレーターは配色・字間・書き出しを調整中です。',
      note: 'お待ちいただきありがとうございます。他のテンプレートもぜひお試しください。',
      items: {
        palette: {
          title: 'ブランドカラー',
          desc: 'ブランドに沿った配色をワンクリックで切替、コントラストも確認。',
        },
        spacing: {
          title: '文字間と整列',
          desc: '元のワードマークに近いカーニングとベースラインのプリセット。',
        },
        export: {
          title: 'クリーンな書き出し',
          desc: '透過 PNG/SVG/JPEG をシャープなエッジで、ZIP まとめにも対応。',
        },
      },
      actions: {
        home: 'ホームに戻る',
        progress: 'GitHub で進捗を見る',
      },
    },
    nintendo: {
      title: 'Nintendo',
      status: '工事中',
      lead: 'このロゴジェネレーターは配色・字間・書き出しを調整中です。',
      note: 'お待ちいただきありがとうございます。他のテンプレートもぜひお試しください。',
      items: {
        palette: {
          title: 'ブランドカラー',
          desc: 'ブランドに沿った配色をワンクリックで切替、コントラストも確認。',
        },
        spacing: {
          title: '文字間と整列',
          desc: '元のワードマークに近いカーニングとベースラインのプリセット。',
        },
        export: {
          title: 'クリーンな書き出し',
          desc: '透過 PNG/SVG/JPEG をシャープなエッジで、ZIP まとめにも対応。',
        },
      },
      actions: {
        home: 'ホームに戻る',
        progress: 'GitHub で進捗を見る',
      },
    },
    lego: {
      title: 'Lego',
      status: '工事中',
      lead: 'このロゴジェネレーターは配色・字間・書き出しを調整中です。',
      note: 'お待ちいただきありがとうございます。他のテンプレートもぜひお試しください。',
      items: {
        palette: {
          title: 'ブランドカラー',
          desc: 'ブランドに沿った配色をワンクリックで切替、コントラストも確認。',
        },
        spacing: {
          title: '文字間と整列',
          desc: '元のワードマークに近いカーニングとベースラインのプリセット。',
        },
        export: {
          title: 'クリーンな書き出し',
          desc: '透過 PNG/SVG/JPEG をシャープなエッジで、ZIP まとめにも対応。',
        },
      },
      actions: {
        home: 'ホームに戻る',
        progress: 'GitHub で進捗を見る',
      },
    },
    marvel: {
      title: 'Marvel',
      status: '工事中',
      lead: 'このロゴジェネレーターは配色・字間・書き出しを調整中です。',
      note: 'お待ちいただきありがとうございます。他のテンプレートもぜひお試しください。',
      items: {
        palette: {
          title: 'ブランドカラー',
          desc: 'ブランドに沿った配色をワンクリックで切替、コントラストも確認。',
        },
        spacing: {
          title: '文字間と整列',
          desc: '元のワードマークに近いカーニングとベースラインのプリセット。',
        },
        export: {
          title: 'クリーンな書き出し',
          desc: '透過 PNG/SVG/JPEG をシャープなエッジで、ZIP まとめにも対応。',
        },
      },
      actions: {
        home: 'ホームに戻る',
        progress: 'GitHub で進捗を見る',
      },
    },
    bravo: {
      title: 'Bravo',
      status: '工事中',
      lead: 'このロゴジェネレーターは配色・字間・書き出しを調整中です。',
      note: 'お待ちいただきありがとうございます。他のテンプレートもぜひお試しください。',
      items: {
        palette: {
          title: 'ブランドカラー',
          desc: 'ブランドに沿った配色をワンクリックで切替、コントラストも確認。',
        },
        spacing: {
          title: '文字間と整列',
          desc: '元のワードマークに近いカーニングとベースラインのプリセット。',
        },
        export: {
          title: 'クリーンな書き出し',
          desc: '透過 PNG/SVG/JPEG をシャープなエッジで、ZIP まとめにも対応。',
        },
      },
      actions: {
        home: 'ホームに戻る',
        progress: 'GitHub で進捗を見る',
      },
    },
    amc: {
      title: 'AMC',
      status: '工事中',
      lead: 'このロゴジェネレーターは配色・字間・書き出しを調整中です。',
      note: 'お待ちいただきありがとうございます。他のテンプレートもぜひお試しください。',
      items: {
        palette: {
          title: 'ブランドカラー',
          desc: 'ブランドに沿った配色をワンクリックで切替、コントラストも確認。',
        },
        spacing: {
          title: '文字間と整列',
          desc: '元のワードマークに近いカーニングとベースラインのプリセット。',
        },
        export: {
          title: 'クリーンな書き出し',
          desc: '透過 PNG/SVG/JPEG をシャープなエッジで、ZIP まとめにも対応。',
        },
      },
      actions: {
        home: 'ホームに戻る',
        progress: 'GitHub で進捗を見る',
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
  seo: {
    home: {
      title: 'Pornhub風ロゴジェネレーター｜PNG/SVGを無料エクスポート',
      description:
        'Logoly は Pornhub・OnlyFans・FedEx・Mastercard 風のロゴをブラウザだけで作れる無料ツールです。文字と配色を自由に編集し、登録不要で PNG・JPG・SVG をダウンロードできます。',
      keywords: [
        'pornhub ロゴ ジェネレーター',
        'onlyfans ロゴ メーカー',
        '無料 ロゴ 作成',
        'svg ロゴ オンライン',
        'mastercard ロゴ 風',
        'fedex ロゴ ジェネレーター',
      ],
    },
    about: {
      title: 'Logoly について｜オープンソースのロゴジェネレーター',
      description:
        'Logoly がブラウザ内だけでブランド風ワードマークを描画する仕組み、オープンソースライセンス、テンプレートや翻訳への貢献方法を紹介します。',
      keywords: [
        'logoly について',
        'オープンソース ロゴジェネレーター',
        'ブラウザ ロゴ メーカー',
        'logoly コミュニティ',
      ],
    },
    faq: {
      title: 'FAQ｜Logoly のヘルプとトラブルシューティング',
      description:
        'ダウンロードやフォント、プライバシー、Pornhub / OnlyFans 風ロゴの作り方に関する質問に回答します。',
      keywords: [
        'logoly faq',
        'ロゴ ジェネレーター ヘルプ',
        'svg ロゴ ダウンロード',
        'フォント 読み込み 失敗',
      ],
    },
    'vertical-ph': {
      title: '縦型 Pornhub 風ロゴテンプレート',
      description: 'カラーを調整して縦型の Pornhub 風ロゴを作成し、即座に PNG/SVG で保存できます。',
      keywords: ['pornhub 縦型 ロゴ', '縦長 ロゴ ジェネレーター', 'ph 風 ロゴ'],
    },
    onlyfans: {
      title: 'OnlyFans ロゴジェネレーター',
      description:
        'OnlyFans 風のワードマークを好きなテキストとブランドカラーで作成し、透明 PNG または SVG をダウンロード。',
      keywords: ['onlyfans ロゴ', 'onlyfans ロゴ ジェネレーター', '青色 ロゴ メーカー'],
    },
    fedex: {
      title: 'FedEx ロゴジェネレーター',
      description:
        'FedEx 風のワードマークを色と字間を調整して再現し、すぐに PNG/SVG へ書き出します。',
      keywords: ['fedex ロゴ', 'fedex ロゴ 作成', '配送 ロゴ ジェネレーター'],
    },
    mastercard: {
      title: 'Mastercard ロゴジェネレーター',
      description:
        'Mastercard 風の二重円ワードマークをブラウザで作り、テキストと色を自由に編集できます。',
      keywords: ['mastercard ロゴ', '決済 ロゴ 作成', '円形 ロゴ メーカー'],
    },
    bluesnap: {
      title: 'BlueSnap ロゴジェネレーター',
      description: 'BlueSnap 風のカラーでロゴを生成し、SVG/PNG としてエクスポートできます。',
      keywords: ['bluesnap ロゴ', '決済 ロゴ ジェネレーター', 'ブルー ロゴ'],
    },
    simpletext: {
      title: 'シンプルテキスト ロゴメーカー',
      description: 'フォントや太さ、背景を調整し、シンプルなテキストロゴを素早くエクスポート。',
      keywords: ['テキスト ロゴ ジェネレーター', 'シンプル ロゴ 作成', 'フォント ロゴ オンライン'],
    },
    sega: {
      title: 'SEGA ロゴジェネレーター',
      description:
        'SEGA 風のアウトラインロゴを任意のテキストで作成し、高解像度 PNG/SVG をダウンロード。',
      keywords: ['sega ロゴ', 'レトロ ロゴ 作成', 'ゲーム ロゴ ジェネレーター'],
    },
    nintendo: {
      title: 'Nintendo ロゴジェネレーター',
      description: '任天堂風の丸みを帯びたワードマークを即時プレビューしてダウンロードできます。',
      keywords: ['nintendo ロゴ', 'ゲーム ロゴ メーカー', '赤い ロゴ'],
    },
    lego: {
      title: 'LEGO ロゴジェネレーター',
      description: 'LEGO 風のブロック体ロゴを鮮やかな配色で作り、すぐに使えるデータを出力。',
      keywords: ['lego ロゴ', 'ブロック ロゴ', 'おもちゃ ロゴ 作成'],
    },
    marvel: {
      title: 'Marvel ロゴジェネレーター',
      description: '赤と白をコントロールして、太字の Marvel 風タイトルロゴを作成。',
      keywords: ['marvel ロゴ', 'コミック ロゴ', '映画 ロゴ メーカー'],
    },
    bravo: {
      title: 'Bravo ロゴジェネレーター',
      description: '吹き出しスタイルの Bravo 風チャンネルロゴをテキスト付きで生成します。',
      keywords: ['bravo ロゴ', 'テレビ ロゴ ジェネレーター', 'チャンネル ロゴ'],
    },
    amc: {
      title: 'AMC ロゴジェネレーター',
      description: 'AMC 風ワードマークをブラウザで作成し、印刷向け PNG/SVG を書き出します。',
      keywords: ['amc ロゴ', 'テレビ ネットワーク ロゴ', 'ワードマーク ジェネレーター'],
    },
  },
}
