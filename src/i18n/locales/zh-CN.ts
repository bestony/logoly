export default {
  component: {
    menu: {
      home: 'PornHub',
      verticalPh: 'Vertical PH',
      onlyfans: 'OnlyFans',
      about: '关于',
      faq: 'FAQ',
      other: '其他',
      language: '语言',
      lang: {
        en: 'English',
        zhCN: '简体中文',
        'zh-CN': '简体中文',
        es: '西班牙语',
        fr: '法语',
        ja: '日语',
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
      defaultMessage: '出现意外错误',
      help: '请复制下方调试信息并前往 GitHub 提交 Issue，方便我们排查。',
      copy: '复制调试信息',
      retry: '重试',
      githubLink: 'GitHub 提交 Issue',
    },
    footerMenu: {
      heading: '快速切换 Logo 模板',
      note: '底部菜单：按站点或品牌快速跳转',
      categories: {
        websites: '网站',
        brands: '品牌',
      },
    },
    siteFooter: {
      copyright: '© {year} Logoly · 由社区维护，欢迎贡献新模板',
      github: 'GitHub',
      x: 'X.com',
      contact: '联系作者',
    },
    versionDialog: {
      title: '诊断信息',
      description: '点击复制调试信息',
      close: '关闭',
      copy: '复制',
    },
    languagePrompt: {
      title: '切换为更合适的语言？',
      description: '检测到你的浏览器偏好 {locale}，是否切换？',
      hint: '你随时可以在右上角的语言菜单里再次修改。',
      switch: '切换为 {locale}',
      stay: '保持当前语言',
    },
    fontPicker: {
      title: '字体选择器',
      subtitle: '使用 Google Web Fonts API Key，按需加载可变字体与 WOFF2。',
      search: '搜索字体',
      searchPlaceholder: '输入字体名称',
      fontLabel: '字体族',
      variantLabel: '字重 / 变体',
      reload: '重新加载',
      loading: '加载中…',
      missingKey: '请在 .env 中配置 VITE_GOOGLE_FONT_KEY 后使用字体列表。',
      fetchError: '字体列表加载失败，请检查 API Key 或网络。',
      count: '{count} 款字体',
      capability: '支持可变字体（VF）与 WOFF2，仅作用于 logo 预览区域。',
    },
    pornhub: {
      fontFamily: '字体',
      textColor: '文本颜色',
      leftBgToggle: '显示左侧背景块',
      leftBg: '左侧背景',
      leftTextColor: '左侧文字颜色',
      rightBg: '右侧背景',
      rightTextColor: '右侧文字颜色',
      canvas: '画布背景色',
      canvasBg: '画布背景',
      pureBlackPreview: '纯黑预览',
      transparentHint: '透明画布背景（导出 PNG / SVG 可透明）',
      fontSize: '字体大小',
    },
  },
  page: {
    app: {
      renderError: '页面渲染出现问题，点击重试。',
    },
    home: {
      title: 'Pornhub 风格 Logo 生成器',
      state: {
        processing: '生成中…',
        packaging: '打包中…',
      },
      actions: {
        downloadPng: '下载 PNG',
        downloadJpg: '下载 JPG',
        downloadSvg: '下载 SVG',
        downloadZip: '打包下载 ZIP',
      },
      errors: {
        downloadFail: '下载失败，请稍后重试。',
        zipFail: '打包失败，请稍后重试。',
        canvasNotReady: '画布尚未加载，请稍候。',
      },
    },
    verticalPh: {
      title: '垂直版 PornHub',
      description: '垂直版 PornHub 风格 Logo 模板页面。',
    },
    about: {
      title: '关于我们',
      subtitle: {
        line1:
          'Logoly 是一款开源的线上 Logo 生成器，目标是让没有设计基础的人也能几秒做出好看的品牌字标。',
        line2: '你可以自由使用、修改和分发代码与生成的图片。',
      },
      highlights: {
        title: '产品亮点',
        instant: {
          title: '一键生成',
          desc: '输入文字即可实时预览 Pornhub / OnlyFans 等风格 Logo，导出 PNG 或 SVG。',
          link: '马上体验',
        },
        local: {
          title: '纯前端、无痕迹',
          desc: '渲染和下载均在本地浏览器完成，不会上传或保存你的内容。',
        },
        open: {
          title: '完全开源',
          desc: '代码托管在 GitHub，采用 WTFPL 许可证，欢迎自由使用与二次开发。',
          link: 'GitHub 仓库',
        },
        community: {
          title: '社区共创',
          desc: '模板、语言包和功能由开发者社区持续贡献与迭代。',
        },
      },
      community: {
        title: '开源与社区',
        desc: 'Logoly 由社区驱动持续演进，欢迎提交模板、改进 UI/UX、增加语言或反馈任何想法。',
        links: {
          issues: '提交问题或建议',
          guide: '参与贡献指南',
        },
      },
      contact: {
        title: '联系我们',
        desc: '有任何想法或合作需求，可以通过 GitHub Issue 留言，或在博客找到 bestony 的更多联系方式。',
        cta: '在 GitHub 上反馈',
      },
    },
    faq: {
      title: '常见问题',
      lead: '分组列出常见问题，点击展开查看答案。',
      expand: '展开',
      groups: {
        usage: {
          title: '使用',
          items: {
            login: {
              q: 'Logoly 是否需要注册或登录？',
              a: '不需要。Logoly 是纯前端工具，打开网页即可使用，不收集个人信息。',
            },
            storage: {
              q: '生成的 Logo 会保存到服务器吗？',
              a: '不会。渲染和下载都在本地浏览器完成，图片只会保存在你的设备。',
            },
            download: {
              q: '下载失败或字体缺失怎么办？',
              a: '请刷新后重试，确保网络可访问字体资源；仍有问题可在 GitHub 提 Issue。',
            },
          },
        },
        legal: {
          title: '法律',
          items: {
            commercial: {
              q: '生成的 Logo 能否用于商业用途？',
              a: 'Logoly 本身开源免费，你可自由使用生成的图片。但请确保你的使用不侵犯第三方商标或版权。',
            },
            privacy: {
              q: '是否会存储或分享用户内容？',
              a: '不会。项目无后端存储，所有输入和生成内容仅存在你的浏览器会话中。',
            },
          },
        },
        openSource: {
          title: '开源',
          items: {
            hosting: {
              q: '项目在哪托管？',
              a: '代码托管在 GitHub：github.com/bestony/logoly，欢迎 Star 和贡献。',
            },
            contrib: {
              q: '如何贡献或提交新模板？',
              a: 'Fork 仓库后提交 PR，提供对应的模板页面与预览截图；建议附带单元测试或使用说明。',
            },
            license: {
              q: '许可证是什么？',
              a: '使用 WTFPL 许可证，你可以自由复制、修改、分发。',
            },
          },
        },
      },
    },
    notFound: {
      title: '这里是空白页，但你的想法很重要',
      lead: '你访问的链接不存在，或页面尚未上线。告诉我们你想要的模板或功能，我们会在 GitHub 上和你一起跟进。',
      issuePrompt:
        '点击下方按钮提交 Issue，描述需要的品牌模板、功能或遇到的问题。我们会在讨论区回复并给出进度。',
      actions: {
        issue: '去 GitHub 提交 Issue',
        home: '返回首页',
      },
    },
  },
  seo: {
    home: {
      title: 'Pornhub 风格 Logo 生成器｜免费导出 PNG/SVG',
      description:
        'Logoly 是一个免费在线生成 Pornhub、OnlyFans、FedEx、Mastercard 等风格 Logo 的工具。直接在浏览器自定义文字和配色，导出 PNG/JPG/SVG 无需注册。',
      keywords: [
        'Pornhub logo生成器',
        'OnlyFans logo制作',
        '免费logo生成',
        'SVG logo 在线',
        'Mastercard 风格 logo',
        'FedEx logo 生成',
      ],
    },
    about: {
      title: '关于 Logoly｜开源 Logo 生成器',
      description:
        '了解 Logoly 如何在浏览器内渲染品牌风格文字标识、开源协议，以及如何贡献模板或翻译。',
      keywords: ['关于 Logoly', '开源 logo 生成器', '前端 logo 工具', 'Logoly 社区'],
    },
    faq: {
      title: '常见问题｜Logoly 帮助中心',
      description: '回答下载、字体、隐私，以及生成 Pornhub / OnlyFans 风格 logo 的常见问题。',
      keywords: ['Logoly FAQ', 'logo 生成器 帮助', 'SVG logo 下载', '字体加载 失败'],
    },
    'vertical-ph': {
      title: '纵向 Pornhub 风格 Logo 模板',
      description: '调整配色即可生成纵向 Pornhub 风格 Logo，立即导出 PNG/SVG。',
      keywords: ['Pornhub 纵向 logo', '纵向 logo 生成', 'ph 风格 logo'],
    },
    onlyfans: {
      title: 'OnlyFans Logo 生成器',
      description: '用自定义文字和品牌色生成 OnlyFans 风格的文字标识，支持透明 PNG 或 SVG 下载。',
      keywords: ['OnlyFans logo', 'OnlyFans logo 生成器', '蓝色 logo 制作'],
    },
    fedex: {
      title: 'FedEx Logo 生成器',
      description: '还原 FedEx 风格的文字标志，可调色和字距，立即导出 PNG/SVG。',
      keywords: ['FedEx logo', 'FedEx 风格 logo', '快递 logo 生成'],
    },
    mastercard: {
      title: 'Mastercard Logo 生成器',
      description: '在浏览器制作 Mastercard 风格的双圆文字标识，文字和颜色可自由编辑。',
      keywords: ['Mastercard logo', '支付 logo 生成', '圆形 logo 制作'],
    },
    bluesnap: {
      title: 'BlueSnap Logo 生成器',
      description: '生成 BlueSnap 风格的品牌色 Logo，支持 SVG/PNG 导出。',
      keywords: ['BlueSnap logo', '支付 logo 制作', '蓝色 logo'],
    },
    simpletext: {
      title: '纯文字 Logo 生成器',
      description: '快速导出简洁的文字 Logo，字体、粗细、背景均可调整。',
      keywords: ['文字 logo 生成器', '简洁 logo 制作', '字体 logo 在线'],
    },
    sega: {
      title: 'SEGA Logo 生成器',
      description: '用自定义文字生成 SEGA 风格描边 Logo，下载高清 PNG/SVG。',
      keywords: ['SEGA logo', '复古 logo 生成', '游戏 logo 制作'],
    },
    nintendo: {
      title: 'Nintendo Logo 生成器',
      description: '生成圆角的 Nintendo 风格文字标识，所见即所得并可立即下载。',
      keywords: ['Nintendo logo', '游戏 logo 生成器', '红色 logo'],
    },
    lego: {
      title: 'LEGO Logo 生成器',
      description: '打造 LEGO 风格的方块体 Logo，鲜亮配色，导出即可使用。',
      keywords: ['LEGO logo', '积木 logo', '玩具 logo 生成'],
    },
    marvel: {
      title: 'Marvel Logo 生成器',
      description: '控制红白配色，制作粗体的 Marvel 风格标题 Logo。',
      keywords: ['Marvel logo', '漫画 logo 生成', '电影 logo 制作'],
    },
    bravo: {
      title: 'Bravo Logo 生成器',
      description: '生成气泡样式的 Bravo 风格频道 Logo，文本可编辑。',
      keywords: ['Bravo logo', '电视台 logo', '频道 logo 生成'],
    },
    amc: {
      title: 'AMC Logo 生成器',
      description: '在浏览器生成 AMC 风格的文字标识，导出可打印的 PNG/SVG。',
      keywords: ['AMC logo', '电视网络 logo', 'wordmark 生成器'],
    },
  },
}
