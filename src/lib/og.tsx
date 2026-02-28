import { ImageResponse, loadGoogleFont } from 'workers-og'

async function loadFonts() {
  const [loraRegular, loraSemibold] = await Promise.all([
    loadGoogleFont({ family: 'Lora', weight: 400 }),
    loadGoogleFont({ family: 'Lora', weight: 600 }),
  ])
  return [
    { name: 'Lora', data: loraRegular, weight: 400 as const },
    { name: 'Lora', data: loraSemibold, weight: 600 as const },
  ]
}

/**
 * Blog post OG — dark warm background, diagonal line pattern accent,
 * large serif title in cream, thin rule, date + branding footer.
 */
export async function generatePostOgImage(title: string, date: string) {
  const fonts = await loadFonts()

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          width: '100%',
          height: '100%',
          backgroundColor: '#1c1a16',
          fontFamily: 'Lora',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Diagonal line pattern — top-right corner */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 500,
            height: 500,
            background:
              'repeating-linear-gradient(135deg, #4a4439 0px, #4a4439 1px, transparent 1px, transparent 12px)',
            opacity: 0.5,
            display: 'flex',
          }}
        />

        {/* Diagonal line pattern — bottom-left corner, smaller */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: 300,
            height: 300,
            background:
              'repeating-linear-gradient(135deg, #4a4439 0px, #4a4439 1px, transparent 1px, transparent 12px)',
            opacity: 0.3,
            display: 'flex',
          }}
        />

        {/* Warm gradient overlay for depth */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background:
              'radial-gradient(ellipse at 30% 70%, #332f28 0%, transparent 60%)',
            display: 'flex',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '0 80px 60px 80px',
            position: 'relative',
          }}
        >
          {/* Title */}
          <div
            style={{
              fontSize: 60,
              fontWeight: 600,
              color: '#faf9f7',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: 40,
            }}
          >
            {title}
          </div>

          {/* Rule */}
          <div
            style={{
              width: '100%',
              height: 1,
              backgroundColor: '#4a4439',
              marginBottom: 20,
              display: 'flex',
            }}
          />

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <div
              style={{
                fontSize: 20,
                fontStyle: 'italic',
                color: '#8c8272',
              }}
            >
              {formattedDate}
            </div>
            <div
              style={{
                fontSize: 20,
                color: '#6b6355',
              }}
            >
              joshmatz.com
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts },
  )
}

/**
 * Homepage OG — dark warm background, diagonal hatching in the
 * top-right corner, large name bottom-left with tagline and rule.
 * Same visual family as the post OG but with the name as hero.
 */
export async function generateHomeOgImage() {
  const fonts = await loadFonts()

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          width: '100%',
          height: '100%',
          backgroundColor: '#1c1a16',
          fontFamily: 'Lora',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Diagonal hatching — top-right, same as post OG */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 600,
            height: 600,
            background:
              'repeating-linear-gradient(135deg, #4a4439 0px, #4a4439 1px, transparent 1px, transparent 12px)',
            opacity: 0.5,
            display: 'flex',
          }}
        />

        {/* Content — bottom-left */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '0 80px 60px 80px',
            position: 'relative',
          }}
        >
          {/* Tagline */}
          <div
            style={{
              fontSize: 22,
              color: '#8c8272',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            Designer & developer
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: 88,
              fontWeight: 600,
              color: '#faf9f7',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              marginBottom: 40,
            }}
          >
            Josh Matz
          </div>

          {/* Rule */}
          <div
            style={{
              width: '100%',
              height: 1,
              backgroundColor: '#4a4439',
              marginBottom: 20,
              display: 'flex',
            }}
          />

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <div
              style={{
                fontSize: 20,
                fontStyle: 'italic',
                color: '#8c8272',
              }}
            >
              Writing & building for the web
            </div>
            <div
              style={{
                fontSize: 20,
                color: '#6b6355',
              }}
            >
              joshmatz.com
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts },
  )
}

/**
 * Default/fallback OG — dark background, diagonal hatching in
 * bottom-left corner, domain centered. Simple brand card.
 */
export async function generateDefaultOgImage() {
  const fonts = await loadFonts()

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#1c1a16',
          fontFamily: 'Lora',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Diagonal hatching — bottom-left */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: 400,
            height: 400,
            background:
              'repeating-linear-gradient(135deg, #4a4439 0px, #4a4439 1px, transparent 1px, transparent 12px)',
            opacity: 0.4,
            display: 'flex',
          }}
        />

        {/* Diagonal hatching — top-right */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 400,
            height: 400,
            background:
              'repeating-linear-gradient(135deg, #4a4439 0px, #4a4439 1px, transparent 1px, transparent 12px)',
            opacity: 0.4,
            display: 'flex',
          }}
        />

        {/* Domain — centered */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 600,
            color: '#faf9f7',
            letterSpacing: '-0.02em',
            position: 'relative',
          }}
        >
          joshmatz.com
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts },
  )
}
