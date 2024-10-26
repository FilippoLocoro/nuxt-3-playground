export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    const { mailjet } = event.context;

    const { firstname, lastname, email, marketingFlag } = await readBody(event);

    if (!firstname || !lastname || !email) {
      throw new Error('Required fields are missing.');
    }

    const request = await mailjet.post('contact', { version: 'v3' }).request({
      IsExcludedFromCampaigns: !marketingFlag ? 'true' : 'false',
      Name: `${firstname} ${lastname}`,
      Email: email,
    });

    if (request?.body && request.body.Messages[0].Status !== 'success') {
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
