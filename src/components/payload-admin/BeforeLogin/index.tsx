import React from 'react'

const BeforeLogin: React.FC = () => {
  return (
    <div
      style={{
        textAlign: 'center',
        marginBottom: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 12px',
          borderRadius: '9999px',
          backgroundColor: 'rgba(59, 130, 246, 0.12)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          color: '#60a5fa',
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '0.05em',
        }}
      >
        <span style={{ width: '6px', height: '6px', borderRadius: '9999px', backgroundColor: '#3b82f6' }} />
        CUH Admin & Editorial Portal
      </div>
      <h1
        style={{
          fontSize: '24px',
          fontWeight: 800,
          margin: 0,
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Coding Club CUH
      </h1>
      <p
        style={{
          fontSize: '14px',
          color: '#94a3b8',
          margin: 0,
          maxWidth: '320px',
          lineHeight: 1.5,
        }}
      >
        Sign in to manage core committee members, events, projects, gallery, and certificates.
      </p>
    </div>
  )
}

export default BeforeLogin
