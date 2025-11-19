<template>
  <div class="text-white mt-12">
    <h3 class="text-2xl font-semibold text-custom-primary mb-1">FAQ</h3>
    <v-expansion-panels variant="accordion" mandatory="force">
      <v-expansion-panel title="How to use this generator?">
        <template v-slot:text>
          The generator is very simple to use. You can get a logo in just 4 steps:
          <ol class="list-decimal mt-2 ml-6 space-y-1" aria-label="Steps to generate a logo">
            <li v-for="step in steps" :key="step.id">{{ step.text }}</li>
          </ol>
        </template>
      </v-expansion-panel>
      <v-expansion-panel
        text="The generated logo fully belongs to you. You can use it freely for any purposes. Though credit is always appreciated."
        title="Can I use the generated logo for personal or commercial purposes?"
      ></v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup>
const steps = [
  {
    id: 'choose-style',
    text: 'Choose a style (e.g. Horizontal/Vertical, Pornhub/Youtube/...).'
  },
  {
    id: 'edit-text',
    text: 'Edit the text in the center box.'
  },
  {
    id: 'customize',
    text: 'Customize your logo (color, background, font size, etc.).'
  },
  {
    id: 'export',
    text: 'Click the Export button to download your logo as PNG or SVG.'
  }
];
</script>
