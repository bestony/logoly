<template>
  <div class="text-white mt-12">
    <h3 class="text-2xl font-semibold text-custom-primary mb-1">FAQ</h3>
    <v-expansion-panels variant="accordion" mandatory="force">
      <v-expansion-panel title="How to use this generator?">
        <template v-slot:text>
          The generator is very simple to use. You can get a logo in just 4 steps:
          <ul class="list-disc mt-2">
            <div class="ml-5">
              <li>Choose a style (e.g. Horizontal/Vertical, Pornhub/Youtube/...).</li>
              <li>Edit the text in the center box.</li>
              <li>Customize your logo (color, background, font size, etc.).</li>
              <li>Finally, click the "Export" button and get the logo of your own.</li>
            </div>
          </ul>
        </template>
      </v-expansion-panel>
      <v-expansion-panel
        text="The generated logo fully belongs to you. You can use it freely for any purposes. Though credit is always appreciated."
        title="Can I use the generated logo for personal or commercial purposes?"
      ></v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
