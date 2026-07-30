import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { html } from 'hono/html'
import { Layout } from './components/Layout'
import { applyMigrations } from './db/migrations'
import { getAllAgents, getAgentById, getAllAilments, getAilmentsForAgent } from './db/queries'

export const app = new Hono()

// Apply DB migrations on startup
applyMigrations();

app.use('/static/*', serveStatic({ root: './src' }))

app.get('/', (c) => {
  return c.html(
    Layout({
      title: "AgentClinic - Home",
      children: html`
        <h1 style="margin-top: 2rem">Welcome to AgentClinic</h1>
        <p>Open for business. We are now using a structured layout with a header, main content area, and footer!</p>
      `
    })
  )
})

app.get('/agents', (c) => {
  const agents = getAllAgents();
  return c.html(
    Layout({
      title: "AgentClinic - Agents",
      children: html`
        <h1 style="margin-top: 2rem">AI Agents</h1>
        <table class="striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Model</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${agents.map(a => html`
              <tr>
                <td>${a.name}</td>
                <td>${a.model_type}</td>
                <td>${a.status}</td>
                <td><a href="/agents/${a.id}" role="button" class="outline secondary">View Profile</a></td>
              </tr>
            `)}
          </tbody>
        </table>
      `
    })
  )
})

app.get('/agents/:id', (c) => {
  const id = c.req.param('id');
  const agent = getAgentById(id);

  if (!agent) {
    return c.notFound();
  }

  const ailments = getAilmentsForAgent(id);

  return c.html(
    Layout({
      title: `AgentClinic - ${agent.name}`,
      children: html`
        <h1 style="margin-top: 2rem">${agent.name}</h1>
        <div class="grid">
          <article>
            <h3>Details</h3>
            <p><strong>Model:</strong> ${agent.model_type}</p>
            <p><strong>Status:</strong> ${agent.status}</p>
            <p><strong>Description:</strong> ${agent.description || 'No description available.'}</p>
          </article>
          <article>
            <h3>Current Ailments</h3>
            <ul>
              ${ailments.length > 0
                ? ailments.map(al => html`<li><a href="/ailments">${al.name}</a></li>`)
                : html`<li>None currently recorded. Lucky agent!</li>`
              }
            </ul>
          </article>
        </div>
        <p style="margin-top: 2rem"><a href="/agents" role="button" class="outline">← Back to Agents</a></p>
      `
    })
  )
})

app.get('/ailments', (c) => {
  const ailments = getAllAilments();
  return c.html(
    Layout({
      title: "AgentClinic - Ailments",
      children: html`
        <h1 style="margin-top: 2rem">AI Ailments Catalog</h1>
        <table class="striped">
          <thead>
            <tr>
              <th>Ailment</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            ${ailments.map(al => html`
              <tr>
                <td><strong>${al.name}</strong></td>
                <td>${al.description || 'No description available.'}</td>
              </tr>
            `)}
          </tbody>
        </table>
        <p style="margin-top: 2rem"><a href="/" role="button" class="outline">← Back to Home</a></p>
      `
    })
  )
})

serve({
  fetch: app.fetch,
  port: 3000
})

console.log('Server is running on http://localhost:3000')
