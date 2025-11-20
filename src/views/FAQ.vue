<script setup lang="ts">
// biome-ignore lint/correctness/noUnusedImports: used in template
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

type FaqItem = {
  question: string
  answer: string
}

type FaqGroup = {
  title: string
  items: FaqItem[]
}

const { t } = useI18n()

// biome-ignore lint/correctness/noUnusedVariables: used in template
const faqGroups = computed<FaqGroup[]>(() => [
  {
    title: t('page.faq.groups.usage.title'),
    items: [
      {
        question: t('page.faq.groups.usage.items.login.q'),
        answer: t('page.faq.groups.usage.items.login.a'),
      },
      {
        question: t('page.faq.groups.usage.items.storage.q'),
        answer: t('page.faq.groups.usage.items.storage.a'),
      },
      {
        question: t('page.faq.groups.usage.items.download.q'),
        answer: t('page.faq.groups.usage.items.download.a'),
      },
    ],
  },
  {
    title: t('page.faq.groups.legal.title'),
    items: [
      {
        question: t('page.faq.groups.legal.items.commercial.q'),
        answer: t('page.faq.groups.legal.items.commercial.a'),
      },
      {
        question: t('page.faq.groups.legal.items.privacy.q'),
        answer: t('page.faq.groups.legal.items.privacy.a'),
      },
    ],
  },
  {
    title: t('page.faq.groups.openSource.title'),
    items: [
      {
        question: t('page.faq.groups.openSource.items.hosting.q'),
        answer: t('page.faq.groups.openSource.items.hosting.a'),
      },
      {
        question: t('page.faq.groups.openSource.items.contrib.q'),
        answer: t('page.faq.groups.openSource.items.contrib.a'),
      },
      {
        question: t('page.faq.groups.openSource.items.license.q'),
        answer: t('page.faq.groups.openSource.items.license.a'),
      },
    ],
  },
])
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-4 text-white">{{ t('page.faq.title') }}</h1>
    <p class="text-lg text-gray-300 mb-6">{{ t('page.faq.lead') }}</p>

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
              <span class="text-sm text-gray-500">{{ t('page.faq.expand') }}</span>
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
