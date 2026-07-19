import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
  })

  // Ensure the server emits TanStack's inline restoration script so the
  // saved position is applied while the document is still being parsed.
  if (typeof window === 'undefined') {
    router.isScrollRestoring = true
  }

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
