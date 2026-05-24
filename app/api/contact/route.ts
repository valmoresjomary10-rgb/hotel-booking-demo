import { NextResponse } from 'next/server'
import * as SibApiV3Sdk from '@getbrevo/brevo'

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
apiInstance.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY!
)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, subject, message } = body

    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()
    sendSmtpEmail.subject = `[Contact Form] ${subject} — ${firstName} ${lastName}`
    sendSmtpEmail.to = [{ email: 'reservations@hotellumiere.com', name: 'Hotel Lumière' }]
    sendSmtpEmail.replyTo = { email, name: `${firstName} ${lastName}` }
    sendSmtpEmail.sender = { name: 'Hotel Lumière Website', email: 'noreply@hotellumiere.com' }
    sendSmtpEmail.htmlContent = `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a;">
        <div style="border-bottom: 2px solid #c49a3a; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="font-size: 28px; font-weight: 300; color: #0f0f0f; margin: 0;">Hotel Lumière</h1>
          <p style="font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #c49a3a; margin: 4px 0 0;">New Contact Form Submission</p>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #888; width: 120px;">Name</td>
            <td style="padding: 10px 0; font-size: 14px;">${firstName} ${lastName}</td>
          </tr>
          <tr style="border-top: 1px solid #f0ebe0;">
            <td style="padding: 10px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #888;">Email</td>
            <td style="padding: 10px 0; font-size: 14px;"><a href="mailto:${email}" style="color: #c49a3a;">${email}</a></td>
          </tr>
          ${phone ? `
          <tr style="border-top: 1px solid #f0ebe0;">
            <td style="padding: 10px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #888;">Phone</td>
            <td style="padding: 10px 0; font-size: 14px;">${phone}</td>
          </tr>` : ''}
          <tr style="border-top: 1px solid #f0ebe0;">
            <td style="padding: 10px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #888;">Subject</td>
            <td style="padding: 10px 0; font-size: 14px;">${subject}</td>
          </tr>
        </table>
        <div style="margin-top: 30px; padding: 24px; background: #f9f6f1; border-left: 3px solid #c49a3a;">
          <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #888; margin: 0 0 12px;">Message</p>
          <p style="font-size: 14px; line-height: 1.8; margin: 0; white-space: pre-wrap;">${message}</p>
        </div>
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #f0ebe0;">
          <p style="font-size: 11px; color: #aaa; margin: 0;">Sent via Hotel Lumière contact form. Reply directly to respond to ${firstName}.</p>
        </div>
      </div>
    `

    await apiInstance.sendTransacEmail(sendSmtpEmail)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
