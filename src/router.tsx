import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
  })

  if (typeof window !== 'undefined') {
    // The document restores hard refreshes after its blocking styles have
    // loaded. TanStack owns scroll restoration after hydration.
    window.history.scrollRestoration = 'manual'
    router.resetNextScroll = false
  }

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
