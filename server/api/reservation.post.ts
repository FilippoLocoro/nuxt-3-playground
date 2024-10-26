import { generateReservationEmailTemplate } from '~/helpers/emailTemplates.js';

function formatDate(date) {
  return new Date(date).toLocaleString('it-IT', {
    weekday: 'long',
    month: '2-digit',
    day: '2-digit',
  });
}

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    const { mailjet } = event.context;

    const {
      category,
      activity,
      firstname,
      lastname,
      telephone,
      email,
      city,
      fromDay,
      toDay,
      fromTime,
      toTime,
      level,
      participants,
      notes,
      privacyFlag,
      marketingFlag,
    } = await readBody(event);

    if (
      !category ||
      !activity ||
      !firstname ||
      !lastname ||
      !telephone ||
      !email ||
      !city ||
      !fromDay ||
      !toDay ||
      !fromTime ||
      !toTime ||
      !level ||
      !privacyFlag
    ) {
      throw new Error('Required fields are missing.');
    }

    // Format dates
    const dayStart = formatDate(fromDay);
    const dayEnd = formatDate(toDay);

    // Build dynamic variables
    const activityTitle = 'Activity Title';
    const reservationId = 'Reservation ID';

    const fromName = 'Website';
    const toName = 'Scuola Sci e Snowboard San Domenico';
    const customer = `${firstname} ${lastname}`;
    const subject = `${category} - ${activityTitle} - ${customer}`;
    // TODO: Check this
    const onlyForIsaac = [
      'ski-pacchetto-freestyle',
      'snowboard-pacchetto-freestyle',
      'ski-freestyle-stagionale',
      'ski-mini-gruppi',
      'snowboard-mini-gruppi',
    ];

    let emailTo = 'filippo.locoro@gmail.com';

    if (onlyForIsaac.includes(activity.id)) {
      emailTo =
        category === 'ski' ? 'scuolasci@sandomenicoski.com' : 'rocksnowboardschool@gmail.com';
    }

    // Generate email template
    const emailTemplateHTML = generateReservationEmailTemplate({
      activityTitle,
      customer,
      city,
      email,
      telephone,
      category,
      dayStart,
      dayEnd,
      lessonStartAt: fromTime,
      lessonEndAt: toTime,
      level,
      participants,
      notes,
      privacyFlag,
      marketingFlag,
      reservationId,
    });

    const sendRequest = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: { Email: config.emails.from, Name: fromName },
          To: [{ Email: emailTo, Name: toName }],
          ReplyTo: { Email: email, Name: customer },
          Bcc: [{ Email: config.emails.bcc, Name: toName }],
          TemplateLanguage: true,
          Subject: subject,
          HTMLPart: emailTemplateHTML,
          Variables: {
            activityTitle,
            customer,
            city,
            email,
            telephone,
            category,
            dayStart,
            dayEnd,
            lessonStartAt: fromTime,
            lessonEndAt: toTime,
            level,
            participants,
            notes,
            privacyFlag,
            marketingFlag,
            reservationId,
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
