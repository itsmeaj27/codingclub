// @ts-expect-error - nodemailer module types
import nodemailer from 'nodemailer'

interface SendCertificateEmailParams {
  to: string
  studentName: string
  courseTitle: string
  certificateId: string
  issueDate?: string
  serverUrl?: string
}

export async function sendCertificateEmail({
  to,
  studentName,
  courseTitle,
  certificateId,
  issueDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
  serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://codingclubcuh.online',
}: SendCertificateEmailParams): Promise<{ success: boolean; simulated?: boolean; messageId?: string; error?: string }> {
  const fromEmail = process.env.SMTP_FROM || '"Coding Club CUH" <cuhcodingclub@gmail.com>'
  const smtpUser = process.env.SMTP_USER || 'cuhcodingclub@gmail.com'
  const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASSWORD || ''
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com'
  const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10)

  const certUrl = `${serverUrl}/certificate/${certificateId}`
  const verifyUrl = `${serverUrl}/verify/${certificateId}`
  const studentDashboardUrl = `${serverUrl}/student`

  const subject = `🎓 Congratulations ${studentName}! Your Certificate for ${courseTitle} is Ready - Coding Club CUH`

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #0b0c10;
      color: #e2e8f0;
    }
    .wrapper {
      max-width: 600px;
      margin: 30px auto;
      background-color: #12141c;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
    }
    .header {
      background: linear-gradient(135deg, #0d503c 0%, #137558 50%, #1e9673 100%);
      padding: 36px 30px;
      text-align: center;
      position: relative;
    }
    .header h1 {
      margin: 0;
      color: #ffffff;
      font-size: 24px;
      font-weight: 800;
      letter-spacing: -0.02em;
    }
    .header p {
      margin: 8px 0 0;
      color: #a7f3d0;
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .content {
      padding: 32px 30px;
    }
    .greeting {
      font-size: 20px;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 16px;
    }
    .body-text {
      font-size: 15px;
      line-height: 1.6;
      color: #94a3b8;
      margin: 0 0 24px;
    }
    .cert-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      padding: 20px;
      margin-bottom: 28px;
    }
    .cert-item {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      font-size: 14px;
    }
    .cert-item:last-child {
      border-bottom: none;
    }
    .cert-label {
      color: #64748b;
      font-weight: 500;
    }
    .cert-value {
      color: #f1f5f9;
      font-weight: 600;
    }
    .cert-id {
      font-family: 'Courier New', monospace;
      color: #38bdf8;
      font-weight: 700;
    }
    .badge {
      display: inline-block;
      background: rgba(16, 185, 129, 0.15);
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.3);
      padding: 3px 10px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 700;
    }
    .button-wrap {
      text-align: center;
      margin: 30px 0 20px;
    }
    .cta-btn {
      display: inline-block;
      background: linear-gradient(135deg, #137558 0%, #1e9673 100%);
      color: #ffffff !important;
      text-decoration: none;
      padding: 14px 34px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 15px;
      box-shadow: 0 8px 20px rgba(19, 117, 88, 0.4);
    }
    .verify-link {
      text-align: center;
      font-size: 13px;
      color: #64748b;
      margin-top: 14px;
    }
    .verify-link a {
      color: #38bdf8;
      text-decoration: none;
      font-weight: 500;
    }
    .footer {
      background-color: #0a0b10;
      padding: 24px 30px;
      text-align: center;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      font-size: 12px;
      color: #64748b;
      line-height: 1.5;
    }
    .footer a {
      color: #94a3b8;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>CODING CLUB CUH</h1>
      <p>Central University of Haryana</p>
    </div>

    <div class="content">
      <h2 class="greeting">Congratulations, ${studentName}! 🎉</h2>
      
      <p class="body-text">
        We are thrilled to announce that you have successfully completed the <strong>${courseTitle}</strong> course and have been awarded an official Certificate of Completion by the Coding Club, Central University of Haryana.
      </p>

      <div class="cert-card">
        <div class="cert-item">
          <span class="cert-label">Student Name:</span>
          <span class="cert-value">${studentName}</span>
        </div>
        <div class="cert-item">
          <span class="cert-label">Programme / Course:</span>
          <span class="cert-value">${courseTitle}</span>
        </div>
        <div class="cert-item">
          <span class="cert-label">Certificate ID:</span>
          <span class="cert-id">${certificateId}</span>
        </div>
        <div class="cert-item">
          <span class="cert-label">Awarded On:</span>
          <span class="cert-value">${issueDate}</span>
        </div>
        <div class="cert-item">
          <span class="cert-label">Authenticity:</span>
          <span class="badge">✓ Cryptographically Verified</span>
        </div>
      </div>

      <div class="button-wrap">
        <a href="${certUrl}" target="_blank" class="cta-btn">
          🎓 View & Download Certificate
        </a>
      </div>

      <div class="verify-link">
        Direct Verifier Link: <a href="${verifyUrl}" target="_blank">${verifyUrl}</a>
      </div>

      <p class="body-text" style="font-size: 13px; margin-top: 24px; text-align: center;">
        You can also view and track all your earned certificates anytime by logging into your student account at <a href="${studentDashboardUrl}" style="color: #60a5fa;">${studentDashboardUrl}</a>.
      </p>
    </div>

    <div class="footer">
      <p>Sent by <strong>Coding Club CUH</strong> &bull; Central University of Haryana, Mahendergarh, Haryana &bull; 123031</p>
      <p>Official Club Email: <a href="mailto:cuhcodingclub@gmail.com">cuhcodingclub@gmail.com</a></p>
      <p>&copy; ${new Date().getFullYear()} Coding Club CUH. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`

  // Check if SMTP password is provided
  if (!smtpPass) {
    console.log('\n======================================================')
    console.log('[EMAIL SERVICE - SIMULATION MODE]')
    console.log(`From: ${fromEmail}`)
    console.log(`To: ${to}`)
    console.log(`Subject: ${subject}`)
    console.log(`Certificate URL: ${certUrl}`)
    console.log(`Notice: To send real emails via cuhcodingclub@gmail.com, configure SMTP_PASS in .env`)
    console.log('======================================================\n')
    return {
      success: true,
      simulated: true,
      messageId: `simulated-${Date.now()}-${certificateId}`,
    }
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    const info = await transporter.sendMail({
      from: fromEmail,
      to,
      subject,
      html,
    })

    console.log(`[EMAIL SERVICE] Certificate email successfully sent to ${to} (Message ID: ${info.messageId})`)
    return {
      success: true,
      messageId: info.messageId,
    }
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err)
    console.error(`[EMAIL SERVICE ERROR] Failed to send certificate email to ${to}:`, errorMessage)
    return {
      success: false,
      error: errorMessage,
    }
  }
}
