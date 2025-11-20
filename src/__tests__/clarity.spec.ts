import { beforeEach, describe, expect, it } from 'vitest'

import { initClarity } from '../utils/clarity'

const CLARITY_SRC = 'https://www.clarity.ms/tag/'

describe('initClarity', () => {
  beforeEach(() => {
    window.clarity = undefined
    document.head.innerHTML = ''
  })

  it('skips when project id is missing', () => {
    initClarity(undefined, true)

    expect(document.querySelector(`script[src^="${CLARITY_SRC}"]`)).toBeNull()
  })

  it('skips outside production', () => {
    initClarity('abc123', false)

    expect(document.querySelector(`script[src^="${CLARITY_SRC}"]`)).toBeNull()
  })

  it('injects clarity tag once in production', () => {
    initClarity('abc123', true)

    const injected = document.querySelector(`script[src="${CLARITY_SRC}abc123"]`)

    expect(injected).not.toBeNull()
    expect(typeof window.clarity).toBe('function')

    initClarity('abc123', true)

    const allScripts = document.querySelectorAll(`script[src="${CLARITY_SRC}abc123"]`)
    expect(allScripts.length).toBe(1)
  })
})
