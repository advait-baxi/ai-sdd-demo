import { html } from 'hono/html'
import { Header } from './Header'
import { Footer } from './Footer'
import { Main } from './Main'

export const Layout = (props: { title: string, children: any }) => html`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${props.title}</title>
    <link rel="stylesheet" href="/static/style.css">
  </head>
  <body>
    ${Header()}
    ${Main(props.children)}
    ${Footer()}
  </body>
  </html>
`
