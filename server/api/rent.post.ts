import { generateRentalEmailTemplate } from '~/helpers/emailTemplates.js';

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    const { mailjet } = event.context;

    const options = { weekday: 'long', month: '2-digit', day: '2-digit' };

    const {
      firstname,
      lastname,
      telephone,
      email,
      height,
      weight,
      feet,
      category,
      start,
      end,
      where,
      privacy,
    } = await readBody(event);

    if (!firstname || !lastname || !email || !email || !category || !start || !end) {
      throw new Error('Required fields are missing.');
    }

    // Format dates
    const dayStart = new Date(start).toLocaleString('it-IT', options);
    const dayEnd = new Date(end).toLocaleString('it-IT', options);

    // Build dynamic variables
    const fromName = 'Noleggio';
    const toName = 'Scuola Sci e Snowboard San Domenico';
    const customer = `${firstname} ${lastname}`;
    const subject = `Noleggio ${customer} - ${category} - ${dayStart}`;

    // Generate email template
    const emailTemplateHTML = generateRentalEmailTemplate({
      customer,
      email,
      telephone,
      category,
      dayStart,
      dayEnd,
      height,
      weight,
      feet,
      where,
      privacy,
    });

    const sendRequest = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: { Email: config.emails.from, Name: fromName },
          To: [{ Email: config.emails.master, Name: toName }],
          ReplyTo: { Email: email, Name: customer },
          Bcc: [{ Email: config.emails.bcc, Name: toName }],
          TemplateLanguage: true,
          Subject: subject,
          HTMLPart: emailTemplateHTML,
          Variables: {
            customer,
            category,
            dayStart,
            dayEnd,
            email,
            privacy,
            telephone,
            where,
            feet,
            height,
            weight,
          },
        },
      ],
    });

    if (sendRequest?.body && sendRequest.body.Messages[0].Status !== 'success') {
      throw new Error('Failed to send the email via Mailjet.');
    }
    return { status: 'success' };
  } catch (error) {
    console.error('Error sending email:', error.message || error);

    return {
      status: 'error',
      message: error.message || 'Failed to process the request.',
    };
  }
});
