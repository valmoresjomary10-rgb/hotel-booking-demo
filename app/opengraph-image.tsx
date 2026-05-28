import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Hotel Lumière — Where Luxury Meets Serenity'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f0f0f',
          position: 'relative',
        }}
      >
        {/* Gold border frame */}
        <div
          style={{
            position: 'absolute',
            inset: '24px',
            border: '1px solid #d4aa5f',
            display: 'flex',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          {/* Decorative line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '60px', height: '1px', backgroundColor: '#d4aa5f' }} />
            <div style={{ width: '6px', height: '6px', backgroundColor: '#d4aa5f', transform: 'rotate(45deg)' }} />
            <div style={{ width: '60px', height: '1px', backgroundColor: '#d4aa5f' }} />
          </div>

          {/* Hotel name */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: '300',
              color: '#f9f6f1',
              letterSpacing: '0.05em',
              fontFamily: 'Georgia, serif',
            }}
          >
            Hotel Lumière
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: '24px',
              color: '#d4aa5f',
              letterSpacing: '0.2em',
              fontFamily: 'Georgia, serif',
              textTransform: 'uppercase',
            }}
          >
            Where Luxury Meets Serenity
          </div>

          {/* Decorative line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px' }}>
            <div style={{ width: '60px', height: '1px', backgroundColor: '#d4aa5f' }} />
            <div style={{ width: '6px', height: '6px', backgroundColor: '#d4aa5f', transform: 'rotate(45deg)' }} />
            <div style={{ width: '60px', height: '1px', backgroundColor: '#d4aa5f' }} />
          </div>

          {/* Location */}
          <div
            style={{
              fontSize: '18px',
              color: '#f0ebe0',
              letterSpacing: '0.15em',
              fontFamily: 'Georgia, serif',
              opacity: 0.7,
              textTransform: 'uppercase',
            }}
          >
            Panglao, Bohol, Philippines
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
