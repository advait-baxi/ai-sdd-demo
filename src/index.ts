import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { html } from 'hono/html'
import { Layout } from './components/Layout'

export const app = new Hono()

app.use('/static/*', serveStatic({ root: './src' }))

app.get('/', (c) => {
  return c.html(
    Layout({
      title: "AgentClinic - Home",
      children: html`
        <h1>Welcome to AgentClinic</h1>
        <p>Open for business. We are now using a structured layout with a header, main content area, and footer!</p>
      `
    })
  )
})

serve({
  fetch: app.fetch,
  port: 3000
})

console.log('Server is running on http://localhost:3000')
