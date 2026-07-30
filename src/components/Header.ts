import { html } from 'hono/html'

export const Header = () => html`
  <header class="main-header">
    <nav>
      <ul>
        <li><strong><a href="/" class="contrast">AgentClinic</a></strong></li>
      </ul>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/agents">Agents</a></li>
        <li><a href="/ailments">Ailments</a></li>
      </ul>
    </nav>
  </header>
`
