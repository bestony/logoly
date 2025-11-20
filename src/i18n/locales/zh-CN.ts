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
  },
  page: {
    app: {
      renderError: '页面渲染出现问题，点击重试。',
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
  },
}
