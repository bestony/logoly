import type { Router } from 'vue-router'
import { createMemoryHistory, createRouter } from 'vue-router'
import { routes } from '../router'

export const createTestRouter = (): Router =>
  createRouter({
    history: createMemoryHistory(),
    routes,
  })
