<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

type Highlight = {
  title: string
  description: string
  link?: { label: string; href: string }
}

const { t } = useI18n()

// biome-ignore lint/correctness/noUnusedVariables: used in template
const highlights = computed<Highlight[]>(() => [
  {
    title: t('page.about.highlights.instant.title'),
    description: t('page.about.highlights.instant.desc'),
    link: { label: t('page.about.highlights.instant.link'), href: 'https://logoly.pro' },
  },
  {
    title: t('page.about.highlights.local.title'),
    description: t('page.about.highlights.local.desc'),
  },
  {
    title: t('page.about.highlights.open.title'),
    description: t('page.about.highlights.open.desc'),
    link: {
      label: t('page.about.highlights.open.link'),
      href: 'https://github.com/bestony/logoly',
    },
  },
  {
    title: t('page.about.highlights.community.title'),
    description: t('page.about.highlights.community.desc'),
  },
])

// biome-ignore lint/correctness/noUnusedVariables: used in template
const communityLinks = computed(() => [
  {
    label: t('page.about.community.links.issues'),
    href: 'https://github.com/bestony/logoly/issues',
  },
  {
    label: t('page.about.community.links.guide'),
    href: 'https://github.com/bestony/logoly#readme',
  },
])
</script>

<template>
  <div class="container mx-auto px-4 py-8 space-y-10">
    <header>
      <h1 class="text-4xl font-bold mb-4 text-white">{{ t('page.about.title') }}</h1>
      <p class="text-lg text-gray-300 leading-relaxed">
        {{ t('page.about.subtitle.line1') }}
        {{ t('page.about.subtitle.line2') }}
      </p>
    </header>

    <section>
      <h2 class="text-2xl font-semibold text-primary mb-4">
        {{ t('page.about.highlights.title') }}
      </h2>
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


    <section class="grid gap-4 md:grid-cols-2">
      <div class="rounded-lg border border-gray-800 bg-gray-900/60 p-5 shadow-sm">
        <h2 class="text-2xl font-semibold text-primary mb-3">
          {{ t('page.about.community.title') }}
        </h2>
        <p class="text-gray-400 leading-relaxed mb-3">
          {{ t('page.about.community.desc') }}
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
        <h2 class="text-2xl font-semibold text-primary mb-3">
          {{ t('page.about.contact.title') }}
        </h2>
        <p class="text-gray-400 leading-relaxed mb-4">
          {{ t('page.about.contact.desc') }}
        </p>
        <a
          class="inline-block rounded-md bg-primary px-4 py-2 text-sm font-semibold text-black hover:brightness-110"
          href="https://github.com/bestony/logoly/issues/new/choose"
          target="_blank"
          rel="noreferrer"
        >
          {{ t('page.about.contact.cta') }}
        </a>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
