import type { LinksFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

import stylesheet from '@/app/tailwind.css'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '@/lib/querryClient'
import { Toaster } from '@/components/ui/toaster'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
]

export default function App() {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <Toaster />

          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </QueryClientProvider>
      </body>
    </html>
  )
}
