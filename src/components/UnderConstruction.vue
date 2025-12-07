<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = withDefaults(
  defineProps<{ baseKey: string; brandLabel?: string; progressHref?: string }>(),
  {
    brandLabel: '',
    progressHref: 'https://github.com/bestony/logoly',
  },
)

const { t } = useI18n()

const title = computed(() => t(`${props.baseKey}.title`))
const brand = computed(() => props.brandLabel || title.value)
const status = computed(() => t(`${props.baseKey}.status`))
const lead = computed(() => t(`${props.baseKey}.lead`))
const note = computed(() => t(`${props.baseKey}.note`))
const spacingTitle = computed(() => t(`${props.baseKey}.items.spacing.title`))
const spacingDesc = computed(() => t(`${props.baseKey}.items.spacing.desc`))
const exportTitle = computed(() => t(`${props.baseKey}.items.export.title`))
const exportDesc = computed(() => t(`${props.baseKey}.items.export.desc`))
const homeLabel = computed(() => t(`${props.baseKey}.actions.home`))
const progressLabel = computed(() => t(`${props.baseKey}.actions.progress`))
</script>

<template>
  <div class="container mx-auto px-4 py-10">
    <section
      class="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#140c1c] via-[#0c0c10] to-[#06060a] px-6 py-10 shadow-2xl"
    >
      <div class="pointer-events-none absolute inset-0">
        <div class="absolute -left-10 top-4 h-36 w-36 rounded-full bg-purple-500/25 blur-3xl" />
        <div class="absolute right-2 top-24 h-28 w-28 rounded-full bg-orange-400/30 blur-3xl" />
        <div
          class="absolute left-1/3 bottom-0 h-20 w-64 -skew-x-12 bg-gradient-to-r from-purple-500/20 via-orange-400/15 to-transparent blur-2xl"
        />
      </div>

      <div class="relative flex flex-col gap-6">
        <div class="flex flex-wrap items-center gap-3">
          <span class="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-white">
            {{ brand }}
          </span>
          <span
            class="rounded-full border border-orange-400/80 bg-orange-500/10 px-3 py-1 text-sm font-semibold text-orange-100"
          >
            {{ status }}
          </span>
        </div>

        <div class="space-y-3">
          <h1 class="text-4xl font-bold text-white">{{ title }}</h1>
          <p class="max-w-3xl text-lg text-gray-200">
            {{ lead }}
          </p>
          <p class="max-w-3xl text-sm text-gray-400">
            {{ note }}
          </p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          <article
            class="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur"
          >
            <div
              class="absolute -left-4 top-3 h-16 w-16 rotate-6 rounded-full bg-orange-400/20 blur-2xl transition group-hover:scale-110"
            />
            <div class="relative flex flex-col gap-2">
              <div class="text-sm font-semibold text-orange-100">
                {{ spacingTitle }}
              </div>
              <p class="text-sm text-gray-200">
                {{ spacingDesc }}
              </p>
              <div class="mt-2 flex items-center gap-1 text-xs font-mono text-gray-300">
                <span class="rounded bg-white/10 px-2 py-1">AA</span>
                <span class="rounded bg-white/5 px-2 py-1">1.2</span>
                <span class="rounded bg-white/5 px-2 py-1">baseline</span>
              </div>
            </div>
          </article>

          <article
            class="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur"
          >
            <div
              class="absolute right-0 top-6 h-20 w-24 -rotate-6 bg-gradient-to-r from-orange-400/25 via-purple-500/15 to-transparent blur-2xl transition group-hover:scale-110"
            />
            <div class="relative flex flex-col gap-2">
              <div class="text-sm font-semibold text-emerald-200">
                {{ exportTitle }}
              </div>
              <p class="text-sm text-gray-200">
                {{ exportDesc }}
              </p>
              <div class="mt-2 flex flex-wrap gap-2 text-xs font-semibold text-black">
                <span class="rounded bg-white px-2 py-1">PNG</span>
                <span class="rounded bg-white px-2 py-1">SVG</span>
                <span class="rounded bg-white px-2 py-1">JPEG</span>
              </div>
            </div>
          </article>
        </div>

        <div class="flex flex-wrap gap-3">
          <RouterLink
            to="/"
            class="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-orange-400"
          >
            {{ homeLabel }}
          </RouterLink>
          <a
            :href="progressHref"
            target="_blank"
            rel="noreferrer"
            class="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
          >
            {{ progressLabel }}
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
