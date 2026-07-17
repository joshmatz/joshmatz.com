/**
 * Format a `YYYY-MM-DD` post date for display.
 *
 * Post dates are calendar dates with no time or zone, but `new Date('2026-03-11')`
 * parses as UTC midnight. Formatting that instant in the local zone shifts the day
 * backwards west of UTC (e.g. "March 11" on the UTC server, "March 10" in Central
 * on the client), which causes a hydration flicker. Formatting in UTC on both
 * sides keeps the rendered day identical everywhere and equal to the frontmatter.
 */
export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
