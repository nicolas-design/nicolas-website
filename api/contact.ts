// api/contact.ts
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(3),
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' })

  const parsed = schema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ success: false, error: 'Invalid input' })

  const { name, email, message } = parsed.data

  try {
    const resend = new Resend(process.env.RESEND_API_KEY!)
    const to = process.env.CONTACT_TO || 'nicolas@gadner.dev'
    const from = process.env.CONTACT_FROM || 'Website Contact <hello@gadner.dev>' // must be on a verified domain

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New message via gadner.dev — ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <h2>New contact message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space:pre-wrap;font-family:ui-monospace,monospace">${escapeHtml(message)}</pre>
      `,
    })

    if (error) throw error
    res.status(200).json({ success: true })
  } catch (e: any) {
    res.status(500).json({ success: false, error: e?.message ?? 'Email send failed' })
  }
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c] as string))
}
