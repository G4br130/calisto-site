import nodemailer from 'nodemailer'

export interface ContactFormData {
  name: string
  email: string
  phone: string
  company?: string
  message: string
  acceptLgpd: boolean
}

// Create transporter with environment variables
const createTransporter = () => {
  const host = process.env.MAIL_HOST
  const port = parseInt(process.env.MAIL_PORT || '587')
  const user = process.env.MAIL_USER
  const pass = process.env.MAIL_PASS

  if (!host || !user || !pass) {
    console.warn('Email configuration incomplete. Using test account.')
    // Return a test transporter for development
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false
    }
  })
}

export const sendContactEmail = async (data: ContactFormData) => {
  const transporter = createTransporter()

  const fromEmail = process.env.MAIL_FROM || 'gabriel.rocha@calistoai.com.br'
  const toEmail = process.env.MAIL_TO || 'gabrielrochanogueira16@gmail.com'

  // Email to company
  const companyEmailOptions = {
    from: fromEmail,
    to: toEmail,
    subject: `[Calisto A.I.] Novo contato: ${data.name}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Novo Contato - Calisto A.I.</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0DC9B8 0%, #0AA596 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #0DC9B8; }
            .value { margin-top: 5px; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🚀 Novo Contato Recebido</h2>
              <p>Um novo cliente entrou em contato através do site da Calisto A.I.</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Nome:</div>
                <div class="value">${data.name}</div>
              </div>
              
              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
              </div>
              
              <div class="field">
                <div class="label">Telefone/WhatsApp:</div>
                <div class="value">
                  <a href="tel:${data.phone.replace(/\D/g, '')}">${data.phone}</a>
                  <a href="https://wa.me/${data.phone.replace(/\D/g, '')}" style="margin-left: 10px; color: #25D366;">📱 WhatsApp</a>
                </div>
              </div>
              
              ${data.company ? `
                <div class="field">
                  <div class="label">Empresa:</div>
                  <div class="value">${data.company}</div>
                </div>
              ` : ''}
              
              <div class="field">
                <div class="label">Mensagem:</div>
                <div class="value" style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #0DC9B8;">
                  ${data.message.replace(/\n/g, '<br>')}
                </div>
              </div>
              
              <div class="field">
                <div class="label">LGPD:</div>
                <div class="value">✅ Cliente aceitou os termos da LGPD</div>
              </div>
            </div>
            
            <div class="footer">
              <p>📧 Email enviado automaticamente pelo sistema de contato da Calisto A.I.</p>
              <p>🕒 Recebido em: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }

  // Confirmation email to client
  const clientEmailOptions = {
    from: fromEmail,
    to: data.email,
    subject: 'Recebemos seu contato - Calisto A.I.',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Confirmação de Contato - Calisto A.I.</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0DC9B8 0%, #0AA596 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .cta-button { display: inline-block; background: #0DC9B8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 5px; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🚀 Obrigado pelo seu contato!</h2>
              <p>Recebemos sua mensagem com sucesso</p>
            </div>
            <div class="content">
              <p>Olá <strong>${data.name}</strong>,</p>
              
              <p>Recebemos sua mensagem e nossa equipe entrará em contato em breve. Normalmente respondemos em até <strong>2 horas</strong> durante o horário comercial.</p>
              
              <p><strong>Resumo da sua solicitação:</strong></p>
              <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #0DC9B8; margin: 15px 0;">
                ${data.message.replace(/\n/g, '<br>')}
              </div>
              
              <p>Enquanto isso, você pode:</p>
              <div style="text-align: center; margin: 20px 0;">
                <a href="https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, '')}" class="cta-button">💬 WhatsApp</a>
                <a href="https://t.me/${process.env.NEXT_PUBLIC_TELEGRAM?.replace('@', '')}" class="cta-button">📱 Telegram</a>
              </div>
              
              <p>Estamos ansiosos para ajudá-lo a transformar seu negócio com nossas soluções em IA e automação!</p>
              
              <p>Atenciosamente,<br><strong>Equipe Calisto A.I.</strong></p>
            </div>
            
            <div class="footer">
              <p>📍 Calisto A.I. - Balsas, MA, Brasil</p>
              <p>📧 contato@calistoai.com.br | 📞 ${process.env.NEXT_PUBLIC_WHATSAPP}</p>
              <p>🌐 Tecnologia que protege lavouras e agiliza processos</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }

  try {
    // Send both emails
    await Promise.all([
      transporter.sendMail(companyEmailOptions),
      transporter.sendMail(clientEmailOptions)
    ])

    return { success: true, message: 'Emails sent successfully' }
  } catch (error) {
    console.error('Error sending email:', error)
    throw new Error('Failed to send email')
  }
}

// Test email configuration
export const testEmailConfig = async () => {
  try {
    const transporter = createTransporter()
    await transporter.verify()
    return { success: true, message: 'Email configuration is valid' }
  } catch (error) {
    console.error('Email configuration test failed:', error)
    return { success: false, message: 'Email configuration is invalid' }
  }
}
