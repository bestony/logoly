<script setup lang="ts">
type Highlight = {
  title: string
  description: string
  link?: { label: string; href: string }
}

// biome-ignore lint/correctness/noUnusedVariables: used in template
const highlights: Highlight[] = [
  {
    title: '一键生成',
    description: '输入文字即可实时预览 Pornhub / OnlyFans 等风格 Logo，导出 PNG 或 SVG。',
    link: { label: '马上体验', href: 'https://logoly.pro' },
  },
  {
    title: '纯前端、无痕迹',
    description: '渲染和下载均在本地浏览器完成，不会上传或保存你的内容。',
  },
  {
    title: '完全开源',
    description: '代码托管在 GitHub，采用 WTFPL 许可证，欢迎自由使用与二次开发。',
    link: { label: 'GitHub 仓库', href: 'https://github.com/bestony/logoly' },
  },
  {
    title: '社区共创',
    description: '模板、语言包和功能由开发者社区持续贡献与迭代。',
  },
]

// biome-ignore lint/correctness/noUnusedVariables: used in template
const creatorPoints = [
  '白宦成（bestony），独立开发者、开源布道者，常驻天津。',
  '在 GitHub 维护多个工具项目，作品包括 Logoly 与 LarkGPT 等。',
  '技术播客「编码人声」主播之一，长期分享开源与开发者生态经验。',
]

// biome-ignore lint/correctness/noUnusedVariables: used in template
const communityLinks = [
  { label: '提交问题或建议', href: 'https://github.com/bestony/logoly/issues' },
  { label: '参与贡献指南', href: 'https://github.com/bestony/logoly#readme' },
]
</script>

<template>
  <div class="container mx-auto px-4 py-8 space-y-10">
    <header>
      <h1 class="text-4xl font-bold mb-4 text-white">关于我们</h1>
      <p class="text-lg text-gray-300 leading-relaxed">
        Logoly 是一款开源的线上 Logo 生成器，目标是让没有设计基础的人也能几秒做出好看的品牌字标。
        你可以自由使用、修改和分发它的代码与生成的图片。
      </p>
    </header>

    <section>
      <h2 class="text-2xl font-semibold text-primary mb-4">产品亮点</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <article
          v-for="item in highlights"
          :key="item.title"
          class="rounded-lg border border-gray-800 bg-gray-900/60 p-4 shadow-sm"
        >
          <h3 class="text-xl text-white font-medium mb-2">{{ item.title }}</h3>
          <p class="text-gray-400 leading-relaxed mb-3">
            {{ item.description }}
          </p>
          <a
            v-if="item.link"
            class="text-primary hover:underline text-sm"
            :href="item.link.href"
            target="_blank"
            rel="noreferrer"
          >
            {{ item.link.label }} →
          </a>
        </article>
      </div>
    </section>

    <section class="rounded-lg border border-gray-800 bg-gray-900/60 p-5 shadow-sm">
      <h2 class="text-2xl font-semibold text-primary mb-3">创作者 · bestony</h2>
      <ul class="list-disc list-inside space-y-2 text-gray-300 leading-relaxed">
        <li v-for="point in creatorPoints" :key="point">
          {{ point }}
        </li>
      </ul>
    </section>

    <section class="grid gap-4 md:grid-cols-2">
      <div class="rounded-lg border border-gray-800 bg-gray-900/60 p-5 shadow-sm">
        <h2 class="text-2xl font-semibold text-primary mb-3">开源与社区</h2>
        <p class="text-gray-400 leading-relaxed mb-3">
          Logoly 由社区驱动持续演进，欢迎提交模板、改进 UI/UX、增加语言或反馈任何想法。
        </p>
        <ul class="space-y-2">
          <li v-for="link in communityLinks" :key="link.label">
            <a
              class="text-primary hover:underline"
              :href="link.href"
              target="_blank"
              rel="noreferrer"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
      </div>

      <div class="rounded-lg border border-gray-800 bg-gray-900/60 p-5 shadow-sm">
        <h2 class="text-2xl font-semibold text-primary mb-3">联系我们</h2>
        <p class="text-gray-400 leading-relaxed mb-4">
          有任何想法或合作需求，可以通过 GitHub Issue 留言，或在博客找到 bestony 的更多联系方式。
        </p>
        <a
          class="inline-block rounded-md bg-primary px-4 py-2 text-sm font-semibold text-black hover:brightness-110"
          href="https://github.com/bestony/logoly/issues/new/choose"
          target="_blank"
          rel="noreferrer"
        >
          在 GitHub 上反馈
        </a>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
