import { html } from 'hono/html'

export const Header = () => html`
  <header class="main-header">
    <h1>AgentClinic</h1>
    <nav>
      <a href="/">Home</a>
    </nav>
  </header>
`
