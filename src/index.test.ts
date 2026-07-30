import { describe, it, expect } from 'vitest'
import { app } from './index'
import { getAllAgents } from './db/queries'

describe('Phase 2 Routes', () => {
  it('responds with 200 OK and correct content on root route', async () => {
    const res = await app.request('/')
    expect(res.status === 200).toBe(true)
    const body = await res.text()
    expect(body).toContain('AgentClinic')
    expect(body).toContain('Open for business')
  })

  it('renders the agents list page', async () => {
    const res = await app.request('/agents')
    expect(res.status === 200).toBe(true)
    const body = await res.text()
    expect(body).toContain('AI Agents')

    const agents = getAllAgents()
    if (agents.length > 0) {
      expect(body).toContain(agents[0].name)
    }
  })

  it('renders a specific agent profile page', async () => {
    const agents = getAllAgents()
    if (agents.length === 0) {
      console.warn('No agents in DB, skipping test')
      return
    }
    const agent = agents[0]
    const res = await app.request(`/agents/${agent.id}`)
    expect(res.status === 200).toBe(true)
    const body = await res.text()
    expect(body).toContain(agent.name)
    expect(body).toContain(agent.model_type)
  })

  it('returns 404 for non-existent agent', async () => {
    const res = await app.request('/agents/999999')
    expect(res.status === 404).toBe(true)
  })

  it('renders the ailments catalog page', async () => {
    const res = await app.request('/ailments')
    expect(res.status === 200).toBe(true)
    const body = await res.text()
    expect(body).toContain('AI Ailments Catalog')
  })
})
