import { html } from 'hono/html'

export const Main = (content: any) => html`
  <main class="main-content">
    ${content}
  </main>
`
