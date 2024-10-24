import { generateReservationEmailTemplate } from '~/helpers/emailTemplates.js';

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
    const emailTemplateHTML = generateReservationEmailTemplate({
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

// try {
//     const { body } = event
//     if (!body) return
//     const formData = JSON.parse(body)

//     const options = { weekday: 'long', month: '2-digit', day: '2-digit' }

//     const dayStart = formData.days.start
//       ? new Date(formData.days.start).toLocaleString('it-IT', options)
//       : ''
//     const dayEnd = formData.days.end
//       ? new Date(formData.days.end).toLocaleString('it-IT', options)
//       : ''

//     const customer = `${firstname} ${lastname}`
//     const subject = `${activityTitle} - ${customer}`

//     const onlyForIsaac = [
//       'ski-pacchetto-freestyle',
//       'snowboard-pacchetto-freestyle',
//       'ski-freestyle-stagionale',
//       'ski-mini-gruppi',
//       'snowboard-mini-gruppi',
//     ]

//     let emailTo = 'scuolasci@domobianca.it'
//     const bcc = 'scuolascisandomenico@gmail.com'

//     if (onlyForIsaac.includes(id)) {
//       emailTo =
//         category === 'ski'
//           ? 'scuolasci@sandomenicoski.com'
//           : 'rocksnowboardschool@gmail.com'
//     }

//     // Form prenotazione
//     // Bisogna mettere in copia alla mail scuolasci@domobianca.it tutte le mail di prenotazione, sia sci che snowboard,
//     //  tranne il pacchetto freestyle,
//     // i mini gruppi del sabato e il corso freestyle stagionale (che è solo sci)

//     // const emailTo = 'scuolascisandomenico@gmail.com'

//     // if (marketingConsent) {
//     //   const contactRequest = await mailjet
//     //     .post('contact', { version: 'v3' })
//     //     .request({
//     //       IsExcludedFromCampaigns: false,
//     //       Name: customer,
//     //       Email: email,
//     //     })

//     //   const {
//     //     data: { id: contactId },
//     //   } = contactRequest

//     //   if (contactId) {
//     //     const listRequest = await mailjet
//     //       .post('listrecipient', { version: 'v3' })
//     //       .request({
//     //         IsUnsubscribed: false,
//     //         ContactID: contactId,
//     //         ContactAlt: email,
//     //         ListID: 'nfzgva7ep',
//     //         ListAlt: 'test',
//     //       })
//     //   }
//     // }

//     const sendRequest = await mailjet
//       .post('send', { version: 'v3.1' })
//       .request({
//         Messages: [
//           {
//             From: {
//               Email: 'info@scuolascisandomenico.it',
//               Name: 'Website',
//             },
//             To: [
//               {
//                 Email: emailTo,
//                 Name: 'Scuola Sci e Snowboard San Domenico',
//               },
//             ],
//             ReplyTo: {
//               Email: email,
//               Name: customer,
//             },
//             Bcc: [
//               {
//                 Email: bcc,
//                 Name: 'Scuola Sci e Snowboard',
//               },
//             ],
//             TemplateLanguage: true,
//             Subject: subject,
//             HTMLPart: `
//                   <h1>Prenotazione per <b>{{var:activityTitle}}</b></h1>
//                   <hr>
//                   <h2>Dati cliente</h2>
//                   <div>Cliente: {{var:customer}}</div>
//                   <div>Città: {{var:city}}</div>
//                   <div>Email: {{var:email}}</div>
//                   <div>Telefono: {{var:telephone}}</div>
//                   <hr>
//                   <h2>Dati lezione</h2>
//                   <div>Categoria lezione: {{var:category}}</div>
//                   <div>Periodo: {{var:dayStart}} {{var:dayEnd}}</div>
//                   <div>Orari: {{var:lessonStartAt}} {{var:lessonEndAt}}</div>
//                   <div>Livello: {{var:level}}</div>
//                   <div>Partecipanti: {{var:participants}}</div>
//                   <hr>
//                   <h2>Info aggiuntive</h2>
//                   <div>Extra: {{var:description}}</div>
//                   <hr>
//                   <h2>Consensi checkbox</h2>
//                   <div>Privacy: {{var:privacy}}</div>
//                   <div>Marketing: {{var:marketing}}</div>
//                   <h2>Id prenotazione</h2>
//                   <div>{{var:id}}</div>
//                 `,
//             Variables: {
//               activityTitle,
//               customer,
//               category,
//               city,
//               dayStart,
//               dayEnd,
//               participants,
//               description: description || '',
//               email,
//               lessonEndAt: lessonEndAt || '',
//               lessonStartAt: lessonStartAt || '',
//               level,
//               privacy: privacyConsent || false,
//               marketing: marketingConsent || false,
//               telephone,
//               id,
//             },
//           },
//         ],
//       })

//     let payload = { message: 'success' }

//     if (sendRequest) {
//       payload = {
//         ...payload,
//         send: sendRequest.body,
//       }
//     }
//     // if (contactRequest) {
//     //   payload = {
//     //     ...payload,
//     //     contact: contactRequest.body,
//     //   }
//     // }
//     // if (listRequest) {
//     //   payload = {
//     //     ...payload,
//     //     list: listRequest.body,
//     //   }
//     // }

//     return {
//       statusCode: 200,
//       body: JSON.stringify(payload),
//     }
//   } catch (error) {
//     return {
//       statusCode: error && error.statusCode ? error.statusCode : 500,
//       body: JSON.stringify({ msg: error }),
//     }
//   }
