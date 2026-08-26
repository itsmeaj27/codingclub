import { ImageResponse } from 'next/og'

const size = {
  width: 1200,
  height: 630,
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ text: string }> }
) {
  const data = await params;
  const text = decodeURIComponent(data.text || 'Coding Club CUH')
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {text}
      </div>
    ),
    {
      ...size,
      // fonts: [
      //   {
      //     name: 'Inter',
      //     data: interSemiBold,
      //     style: 'normal',
      //     weight: 400,
      //   },
      // ],
    }
  )
}
