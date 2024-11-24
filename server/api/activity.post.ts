import { generateActivityEmailTemplate } from '~/helpers/emailTemplates.js';

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    const { mailjet } = event.context;

    const { firstname, lastname, telephone, email, message, privacy, activity, category, city } =
      await readBody(event);

    if (!firstname || !lastname || !email || !message || !privacy || !activity || !category) {
      throw new Error('Required fields are missing.');
    }

    const fromName = 'Website';
    const toName = 'Scuola Sci e Snowboard San Domenico';
    const customer = `${firstname} ${lastname}`;
    const subject = `${activity} - ${customer}`;

    const emailTemplateHTML = generateActivityEmailTemplate({
      customer,
      city,
      email,
      telephone,
      category,
      activity,
      privacyFlag: privacy,
      message,
    });

    const toEmail =
      category === 'ski' || category === 'sci'
        ? config.emails.activitySky
        : config.emails.activitySnowboard;

    const sendRequest = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: { Email: config.emails.from, Name: fromName },
          To: [{ Email: toEmail, Name: toName }],
          ReplyTo: { Email: email, Name: customer },
          Bcc: [{ Email: config.emails.bcc, Name: toName }],
          TemplateLanguage: true,
          Subject: subject,
          HTMLPart: emailTemplateHTML,
          Variables: {
            customer,
            email,
            city,
            telephone,
            category,
            activity,
            privacyFlag: privacy,
            message,
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
