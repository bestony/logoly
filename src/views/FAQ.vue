<script setup lang="ts">
// biome-ignore lint/correctness/noUnusedImports: used in template
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

type FaqItem = {
  question: string
  answer: string
}

type FaqGroup = {
  title: string
  items: FaqItem[]
}

// biome-ignore lint/correctness/noUnusedVariables: used in template
const faqGroups: FaqGroup[] = [
  {
    title: '使用',
    items: [
      {
        question: 'Logoly 是否需要注册或登录？',
        answer: '不需要。Logoly 是纯前端工具，打开网页即可使用，不收集个人信息。',
      },
      {
        question: '生成的 Logo 会保存到服务器吗？',
        answer: '不会。渲染和下载都在本地浏览器完成，图片只会保存在你的设备。',
      },
      {
        question: '下载失败或字体缺失怎么办？',
        answer: '请刷新后重试，确保网络可访问字体资源；仍有问题可在 GitHub 提 Issue。',
      },
    ],
  },
  {
    title: '法律',
    items: [
      {
        question: '生成的 Logo 能否用于商业用途？',
        answer:
          'Logoly 本身开源免费，你可自由使用生成的图片。但请确保你的使用不侵犯第三方商标或版权。',
      },
      {
        question: '是否会存储或分享用户内容？',
        answer: '不会。项目无后端存储，所有输入和生成内容仅存在你的浏览器会话中。',
      },
    ],
  },
  {
    title: '开源',
    items: [
      {
        question: '项目在哪托管？',
        answer: '代码托管在 GitHub：github.com/bestony/logoly，欢迎 Star 和贡献。',
      },
      {
        question: '如何贡献或提交新模板？',
        answer: 'Fork 仓库后提交 PR，提供对应的模板页面与预览截图；建议附带单元测试或使用说明。',
      },
      {
        question: '许可证是什么？',
        answer: '使用 WTFPL 许可证，你可以自由复制、修改、分发。',
      },
    ],
  },
]
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-4 text-white">常见问题</h1>
    <p class="text-lg text-gray-300 mb-6">分组列出常见问题，点击展开查看答案。</p>

    <div class="space-y-6">
      <section
        v-for="group in faqGroups"
        :key="group.title"
        class="rounded-lg border border-gray-800 bg-gray-900/60 p-4 shadow-sm"
      >
        <h2 class="text-xl font-semibold text-primary mb-3">{{ group.title }}</h2>
        <div class="divide-y divide-gray-800">
          <Disclosure v-for="item in group.items" :key="item.question">
            <DisclosureButton
              class="w-full py-3 text-left text-gray-100 flex items-center justify-between hover:text-primary"
            >
              <span>{{ item.question }}</span>
              <span class="text-sm text-gray-500">展开</span>
            </DisclosureButton>
            <DisclosurePanel class="py-2 text-gray-400 leading-relaxed">
              {{ item.answer }}
            </DisclosurePanel>
          </Disclosure>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped></style>
