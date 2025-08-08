# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint with auto-fix on Vue/JS files
- `npm run format` - Format source code with Prettier

## Architecture Overview

**Logoly** is a Vue 3 single-page application built with Vite that generates logos in the style of popular brands (PornHub, OnlyFans). The app uses:

- **Vue 3** with Composition API and `<script setup>` syntax
- **Pinia** for state management (prefix/suffix text, font, editable state)
- **Vue Router** with lazy-loaded route components and analytics tracking
- **Vuetify 3** + **Tailwind CSS** for styling (default dark theme)
- **dom-to-image** library for PNG/SVG export functionality

## Key Components

### Logo Generators (`/src/components/generator/`)
- `Pornhub.vue` - Main horizontal PornHub-style logo generator
- `VerticalPornHub.vue` - Vertical variant of PornHub logo
- `Onlyfans.vue` - OnlyFans-style logo generator

Each generator component:
- Uses contenteditable spans for in-place text editing
- Connects to Pinia store for shared state
- Supports customizable colors, fonts, and background transparency
- Includes color pickers and controls for customization

### State Management (`/src/stores/store.js`)
- `prefix` and `suffix` - The two parts of the logo text
- `font` - Selected font family (defaults to Roboto)
- `editable` - Controls whether text areas are editable (needed for SVG export)

### Export System (`/src/components/ExportBtn.vue`)
- Dropdown menu with PNG/SVG options
- Uses dom-to-image library to convert DOM elements to images
- Temporarily disables contenteditable during SVG export to prevent browser issues
- Includes Google Analytics event tracking for downloads

## Technical Details

- **Path alias**: `@` maps to `/src` directory
- **Router**: Uses createWebHistory with lazy-loaded components
- **Analytics**: vue-gtag integration with custom pageview templates for each route
- **Styling**: Combines Vuetify components with Tailwind utility classes
- **Icons**: Uses Material Design Icons via @mdi/font and Vuetify icons

## Project Structure

```
src/
├── components/
│   ├── generator/          # Core logo generation components
│   ├── ExportBtn.vue      # PNG/SVG export functionality
│   └── [other UI components]
├── stores/
│   └── store.js           # Pinia store for logo state
├── router/
│   └── index.js           # Vue Router configuration
├── views/
│   └── AboutView.vue      # About page
└── main.js                # App initialization
```