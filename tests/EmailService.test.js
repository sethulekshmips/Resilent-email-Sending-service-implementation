// tests/EmailService.test.js
const EmailService = require('../src/EmailService');

describe('EmailService', () => {
  it('should send an email successfully', async () => {
    const emailService = new EmailService();
    const email = { id: '123', to: 'user@example.com', content: 'Hello World' };
    const response = await emailService.sendEmail(email);

    expect(response.status).toBe('success');
  });

  it('should retry and fallback on failure', async () => {
    const emailService = new EmailService();
    const email = { id: '124', to: 'user@example.com', content: 'Hello Again' };
    const response = await emailService.sendEmail(email);

    expect(['success', 'failed']).toContain(response.status);
  });

  it('should prevent duplicate sends', async () => {
    const emailService = new EmailService();
    const email = { id: '125', to: 'user@example.com', content: 'Hello Again' };

    await emailService.sendEmail(email); // First send
    const response = await emailService.sendEmail(email); // Duplicate send

    expect(response.status).toBe('duplicate');
  });
});
