import { createStartHandler } from '@tanstack/react-start/server'
import { defaultRenderHandler } from '@tanstack/react-router/ssr/server'

// This site is small enough to buffer SSR. Sending one complete document lets
// the browser restore a hard-refresh scroll position before the first paint.
export default {
  fetch: createStartHandler(defaultRenderHandler),
}
