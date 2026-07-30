import { describe, it, expect } from 'vitest'
import { html } from 'hono/html'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Main } from './components/Main'
import { Layout } from './components/Layout'

const render = (template: any): string => {
  if (typeof template === 'string') return template
  if (Array.isArray(template)) {
    return template.map(render).join('')
  }
  return String(template)
}

describe('Layout Components', () => {
  it('Header renders correctly', () => {
    const result = render(Header())
    expect(result).toContain('<header class="main-header">')
    expect(result).toContain('<h1>AgentClinic</h1>')
    expect(result).toContain('<a href="/">Home</a>')
  })

  it('Footer renders correctly', () => {
    const result = render(Footer())
    expect(result).toContain('<footer class="main-footer">')
    expect(result).toContain('&copy; 2026 AgentClinic')
  })

  it('Main wraps content correctly', () => {
    const content = html`<div>Test Content</div>`
    const result = render(Main(content))
    expect(result).toContain('<main class="main-content">')
    expect(result).toContain('<div>Test Content</div>')
  })

  it('Layout wraps all components and links CSS', () => {
    const props = {
      title: 'Test Page',
      children: html`<div>Page Content</div>`
    }
    const result = render(Layout(props))
    expect(result).toContain('<title>Test Page</title>')
    expect(result).toContain('<link rel="stylesheet" href="/static/style.css">')
    expect(result).toContain('<header class="main-header">')
    expect(result).toContain('<main class="main-content">')
    expect(result).toContain('<div>Page Content</div>')
    expect(result).toContain('<footer class="main-footer">')
  })
})
