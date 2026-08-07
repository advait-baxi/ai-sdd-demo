import { describe, it, expect } from 'vitest'
import { app } from './index'
import { getAllAgents, getAllAilments, getAllTherapies, getTherapiesForAilment } from './db/queries'

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

  it('renders an ailment detail page with recommended therapies', async () => {
    const ailments = getAllAilments()
    if (ailments.length === 0) {
      console.warn('No ailments in DB, skipping test')
      return
    }
    const ailment = ailments[0]
    const res = await app.request(`/ailments/${ailment.id}`)
    expect(res.status === 200).toBe(true)
    const body = await res.text()
    expect(body).toContain(ailment.name)

    const therapies = getTherapiesForAilment(ailment.id)
    if (therapies.length > 0) {
      expect(body).toContain(therapies[0].name)
    }
  })

  it('renders the therapies list page', async () => {
    const res = await app.request('/therapies')
    expect(res.status === 200).toBe(true)
    const body = await res.text()
    expect(body).toContain('Wellness Therapies Catalog')
  })

  it('renders a specific therapy detail page', async () => {
    const therapies = getAllTherapies()
    if (therapies.length === 0) {
      console.warn('No therapies in DB, skipping test')
      return
    }
    const therapy = therapies[0]
    const res = await app.request(`/therapies/${therapy.id}`)
    expect(res.status === 200).toBe(true)
    const body = await res.text()
    expect(body).toContain(therapy.name)
  })

  it('successfully books an appointment', async () => {
    const agents = getAllAgents()
    const therapies = getAllTherapies()
    if (agents.length === 0 || therapies.length === 0) {
      console.warn('Missing agents or therapies in DB, skipping test')
      return
    }
    const agent = agents[0]
    const therapy = therapies[0]

    const formData = new FormData()
    formData.append('agent_id', agent.id.toString())
    formData.append('therapy_id', therapy.id.toString())
    formData.append('appointment_time', '2026-09-01T10:00')

    const res = await app.request('/appointments', {
      method: 'POST',
      body: formData
    })

    expect(res.status === 302).toBe(true)
    const location = res.headers.get('location')
    expect(location).toContain('/appointments/')

    const confirmationRes = await app.request(location!)
    expect(confirmationRes.status === 200).toBe(true)
    const body = await confirmationRes.text()
    expect(body).toContain('Appointment Confirmed!')
    expect(body).toContain(agent.name)
    expect(body).toContain(therapy.name)
  })

  it('renders the staff dashboard with stats', async () => {
    const res = await app.request('/dashboard')
    expect(res.status === 200).toBe(true)
    const body = await res.text()
    expect(body).toContain('Staff Dashboard')
    expect(body).toContain('Agents')
    expect(body).toContain('Ailments')
    expect(body).toContain('Appointments')
  })

  it('updates appointment status via dashboard', async () => {
    const agents = getAllAgents()
    const therapies = getAllTherapies()
    if (agents.length === 0 || therapies.length === 0) {
      console.warn('Missing data for appointment test, skipping')
      return
    }

    // Create an appointment first
    const formData = new FormData()
    formData.append('agent_id', agents[0].id.toString())
    formData.append('therapy_id', therapies[0].id.toString())
    formData.append('appointment_time', '2026-09-02T11:00')

    const resBook = await app.request('/appointments', {
      method: 'POST',
      body: formData
    })
    const location = resBook.headers.get('location')
    const appointmentId = location!.split('/').pop()

    // Update status to Completed
    const updateData = new FormData()
    updateData.append('status', 'Completed')

    const resUpdate = await app.request(`/appointments/${appointmentId}/status`, {
      method: 'POST',
      body: updateData
    })
    expect(resUpdate.status === 302).toBe(true)
    expect(resUpdate.headers.get('location')).toBe('/dashboard')

    // Verify on dashboard
    const resDash = await app.request('/dashboard')
    const body = await resDash.text()
    expect(body).toContain('Completed')
  })
})
