import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
  })

  if (typeof window !== 'undefined') {
    // Hard refreshes restore before paint when the browser owns the first
    // frame. Hand scroll restoration back to TanStack for SPA navigation.
    const useNativeScrollRestoration = () => {
      window.history.scrollRestoration = 'auto'
    }
    const useRouterScrollRestoration = () => {
      window.requestAnimationFrame(() => {
        window.history.scrollRestoration = 'manual'
      })
    }

    useNativeScrollRestoration()
    router.resetNextScroll = false

    window.addEventListener('pageshow', useRouterScrollRestoration)
    window.addEventListener('pagehide', useNativeScrollRestoration)

    if (document.readyState === 'complete') {
      useRouterScrollRestoration()
    }
  }

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
