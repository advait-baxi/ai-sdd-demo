import { describe, it, expect } from 'vitest'
import { app } from './index'

describe('Hello Hono', () => {
  it('responds with 200 OK and correct content on root route', async () => {
    const res = await app.request('/')
    expect(res.status === 200).toBe(true)
    const body = await res.text()
    expect(body).toContain('AgentClinic')
    expect(body).toContain('Open for business')
  })
})
