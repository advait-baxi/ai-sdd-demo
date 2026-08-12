import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { html } from 'hono/html'
import { Layout } from './components/Layout'
import { applyMigrations } from './db/migrations'
import { seed } from './db/seed'
import { getAllAgents, getAgentById, getAllAilments, getAilmentsForAgent, getAllTherapies, getTherapyById, getTherapiesForAilment, createAppointment, getAppointmentDetails, getDashboardStats, getAllAppointmentsDetails, updateAppointmentStatus } from './db/queries'
import { sanitizeInputs } from './utils/sanitization'

export const app = new Hono()

// Logging middleware
app.use('*', async (c, next) => {
  const start = Date.now();
  await next();
  const duration = Date.now() - start;
  console.log(`[${new Date().toISOString()}] ${c.req.method} ${c.req.url} - ${c.res.status} (${duration}ms)`);
})

// Apply DB migrations and seed on startup
applyMigrations();
seed();

app.use('/static/*', serveStatic({ root: './src' }))

app.get('/', (c) => {
  return c.html(
    Layout({
      title: "AgentClinic - Home",
      children: html`
        <h1 class="page-title">Welcome to AgentClinic</h1>
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
        <h1 class="page-title">AI Agents</h1>
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
  const therapies = getAllTherapies();

  return c.html(
    Layout({
      title: `AgentClinic - ${agent.name}`,
      children: html`
        <h1 class="page-title">${agent.name}</h1>
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
          <article>
            <h3>Book Therapy Session</h3>
            <form action="/appointments" method="POST">
              <input type="hidden" name="agent_id" value="${agent.id}">
              <div class="mb-1">
                <label for="therapy_id">Select Therapy</label>
                <select name="therapy_id" id="therapy_id" required class="full-width">
                  <option value="">-- Choose a Therapy --</option>
                  ${therapies.map(t => html`<option value="${t.id}">${t.name}</option>`)}
                </select>
              </div>
              <div class="mb-1">
                <label for="appointment_time">Preferred Time</label>
                <input type="datetime-local" name="appointment_time" id="appointment_time" required class="full-width">
              </div>
              <button type="submit">Book Now</button>
            </form>
          </article>
        </div>
        <p class="page-title"><a href="/agents" role="button" class="outline">← Back to Agents</a></p>
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
        <h1 class="page-title">AI Ailments Catalog</h1>
        <table class="striped">
          <thead>
            <tr>
              <th>Ailment</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${ailments.map(al => html`
              <tr>
                <td><strong>${al.name}</strong></td>
                <td>${al.description || 'No description available.'}</td>
                <td><a href="/ailments/${al.id}" role="button" class="outline secondary">View Details</a></td>
              </tr>
            `)}
          </tbody>
        </table>
        <p class="page-title"><a href="/" role="button" class="outline">← Back to Home</a></p>
      `
    })
  )
})

app.get('/ailments/:id', (c) => {
  const id = c.req.param('id');
  const ailment = getAllAilments().find(a => a.id == id);

  if (!ailment) {
    return c.notFound();
  }

  const therapies = getTherapiesForAilment(id);

  return c.html(
    Layout({
      title: `AgentClinic - ${ailment.name}`,
      children: html`
        <h1 class="page-title">${ailment.name}</h1>
        <div class="grid">
          <article>
            <h3>About this Ailment</h3>
            <p>${ailment.description || 'No description available.'}</p>
          </article>
          <article>
            <h3>Recommended Therapies</h3>
            <ul>
              ${therapies.length > 0
                ? therapies.map(t => html`<li><a href="/therapies/${t.id}">${t.name}</a> (${t.category})</li>`)
                : html`<li>No specific therapies recommended yet.</li>`
              }
            </ul>
          </article>
        </div>
        <p class="page-title"><a href="/ailments" role="button" class="outline">← Back to Ailments</a></p>
      `
    })
  )
})

app.get('/therapies', (c) => {
  const therapies = getAllTherapies();
  return c.html(
    Layout({
      title: "AgentClinic - Therapies",
      children: html`
        <h1 class="page-title">Wellness Therapies Catalog</h1>
        <table class="striped">
          <thead>
            <tr>
              <th>Therapy</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${therapies.map(t => html`
              <tr>
                <td><strong>${t.name}</strong></td>
                <td>${t.category}</td>
                <td><a href="/therapies/${t.id}" role="button" class="outline secondary">View Details</a></td>
              </tr>
            `)}
          </tbody>
        </table>
        <p class="page-title"><a href="/" role="button" class="outline">← Back to Home</a></p>
      `
    })
  )
})

app.get('/therapies/:id', (c) => {
  const id = c.req.param('id');
  const therapy = getTherapyById(id);

  if (!therapy) {
    return c.notFound();
  }

  return c.html(
    Layout({
      title: `AgentClinic - ${therapy.name}`,
      children: html`
        <h1 class="page-title">${therapy.name}</h1>
        <div class="grid">
          <article>
            <h3>Therapy Details</h3>
            <p><strong>Category:</strong> ${therapy.category}</p>
            <p><strong>Description:</strong> ${therapy.description || 'No description available.'}</p>
          </article>
        </div>
        <p class="page-title"><a href="/therapies" role="button" class="outline">← Back to Therapies</a></p>
      `
    })
  )
})

app.post('/appointments', async (c) => {
  const body = await c.req.parseBody();
  const sanitized = sanitizeInputs(body);

  const agentId = sanitized.agent_id;
  const therapyId = sanitized.therapy_id;
  const appointmentTime = sanitized.appointment_time;

  if (!agentId || !therapyId || !appointmentTime) {
    return c.text('Missing required fields', 400);
  }

  const appointmentId = createAppointment(agentId, therapyId, appointmentTime);
  return c.redirect(`/appointments/${appointmentId}`);
})

app.get('/appointments/:id', (c) => {
  const id = c.req.param('id');
  const appointment = getAppointmentDetails(id);

  if (!appointment) {
    return c.notFound();
  }

  return c.html(
    Layout({
      title: `AgentClinic - Appointment Confirmation`,
      children: html`
        <h1 class="page-title">Appointment Confirmed!</h1>
        <div class="grid">
          <article>
            <h3>Booking Details</h3>
            <p><strong>Agent:</strong> ${appointment.agent_name}</p>
            <p><strong>Therapy:</strong> ${appointment.therapy_name} (${appointment.therapy_category})</p>
            <p><strong>Time:</strong> ${appointment.appointment_time.replace('T', ' ')}</p>
            <p><strong>Status:</strong> ${appointment.status}</p>
          </article>
        </div>
        <p class="page-title">
          <a href="/agents/${appointment.agent_id}" role="button" class="outline">Back to Agent Profile</a>
        </p>
      `
    })
  )
})

app.get('/dashboard', (c) => {
  const stats = getDashboardStats();
  const appointments = getAllAppointmentsDetails();

  return c.html(
    Layout({
      title: "AgentClinic - Staff Dashboard",
      children: html`
        <h1 class="page-title">Staff Dashboard</h1>

        <div class="grid">
          <article>
            <h3>Agents</h3>
            <p class="stat-value">${stats.agents}</p>
          </article>
          <article>
            <h3>Ailments</h3>
            <p class="stat-value">${stats.ailments}</p>
          </article>
          <article>
            <h3>Appointments</h3>
            <p class="stat-value">${stats.appointments}</p>
          </article>
        </div>

        <h2 class="page-title">Appointment Management</h2>
        <table class="striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Agent</th>
              <th>Therapy</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${appointments.map(a => html`
              <tr>
                <td>${a.id}</td>
                <td>${a.agent_name}</td>
                <td>${a.therapy_name}</td>
                <td>${a.appointment_time.replace('T', ' ')}</td>
                <td>${a.status}</td>
                <td>
                  <form action="/appointments/${a.id}/status" method="POST" class="status-form">
                    <label for="status-${a.id}" class="sr-only">Update status for appointment ${a.id}</label>
                    <select name="status" id="status-${a.id}" class="status-select">
                      <option value="Scheduled" ${a.status === 'Scheduled' ? 'selected' : ''}>Scheduled</option>
                      <option value="Completed" ${a.status === 'Completed' ? 'selected' : ''}>Completed</option>
                      <option value="Cancelled" ${a.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                    <button type="submit" class="outline secondary status-btn">Update</button>
                  </form>
                </td>
              </tr>
            `)}
            ${appointments.length === 0 ? html`<tr><td colspan="6" style="text-align: center">No appointments scheduled.</td></tr>` : ''}
          </tbody>
        </table>

        <p class="page-title"><a href="/" role="button" class="outline">← Back to Home</a></p>
      `
    })
  )
})

app.post('/appointments/:id/status', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.parseBody();
  const sanitized = sanitizeInputs(body);
  const status = sanitized.status;

  if (!status) {
    return c.text('Status is required', 400);
  }

  updateAppointmentStatus(id, status);
  return c.redirect('/dashboard');
})

// Custom 404 handler
app.notFound((c) => {
  return c.html(
    Layout({
      title: "404 - Not Found",
      children: html`
        <div style="text-align: center; margin-top: 4rem">
          <h1 class="page-title">404 - Page Not Found</h1>
          <p>Sorry, we couldn't find the page you're looking for.</p>
          <p class="page-title"><a href="/" role="button" class="outline">Back to Home</a></p>
        </div>
      `
    }),
    404
  )
})

// Custom 500 handler
app.onError((err, c) => {
  console.error(`[ERROR] ${err.stack}`);
  return c.html(
    Layout({
      title: "500 - Internal Server Error",
      children: html`
        <div style="text-align: center; margin-top: 4rem">
          <h1 class="page-title">500 - Internal Server Error</h1>
          <p>Something went wrong on our end. Our engineers have been notified.</p>
          <p class="page-title"><a href="/" role="button" class="outline">Back to Home</a></p>
        </div>
      `
    }),
    500
  )
})

serve({
  fetch: app.fetch,
  port: 3000
})


console.log('Server is running on http://localhost:3000')
