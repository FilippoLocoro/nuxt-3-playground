import Mailjet from 'node-mailjet';

export default defineNitroPlugin((nitroApp) => {
  const config = useRuntimeConfig();

  const mailjetCredentials = {
    apiKey: config.mailjet.publicKey || 'your-api-key',
    apiSecret: config.mailjet.privateKey || 'your-api-secret',
  };

  if (!mailjetCredentials.apiKey || !mailjetCredentials.apiSecret) {
    console.error('Mailjet API key or secret is missing');
    return;
  }

  const mailjetClient = Mailjet.apiConnect(mailjetCredentials.apiKey, mailjetCredentials.apiSecret);

  if (!mailjetClient) {
    console.error('Mailjet Client not initialized');
    return;
  }

  nitroApp.hooks.hook('request', (event) => {
    event.context.mailjet = mailjetClient;
  });
});
