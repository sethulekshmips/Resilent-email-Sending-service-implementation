// src/EmailService.js
const { EmailProviderA, EmailProviderB } = require('./EmailProvider');
const RateLimiter = require('./RateLimiter');
const { exponentialBackoff, checkIdempotency } = require('./utilis');

class EmailService {
  constructor() {
    this.providers = [new EmailProviderA(), new EmailProviderB()];
    this.rateLimiter = new RateLimiter(10, 60000); // 10 emails per minute
  }

  async sendEmail(email) {
    const emailId = email.id; // Assume each email has a unique ID

    if (!checkIdempotency(emailId)) {
      return { status: 'duplicate', message: 'Email already sent' };
    }

    if (!this.rateLimiter.canSend()) {
      return { status: 'rate_limited', message: 'Rate limit exceeded' };
    }

    for (let i = 0; i < this.providers.length; i++) {
      let attempts = 0;

      while (attempts < 3) { // Retry 3 times
        try {
          const response = await this.providers[i].sendEmail(email);
          this.rateLimiter.markSent();
          return { status: 'success', provider: response.provider };
        } catch (error) {
          attempts++;
          const backoffTime = exponentialBackoff(attempts);
          console.log(`Retrying after ${backoffTime}ms...`);
          await new Promise((resolve) => setTimeout(resolve, backoffTime));
        }
      }

      console.log(`Switching to next provider after ${attempts} attempts...`);
    }

    return { status: 'failed', message: 'All providers failed' };
  }
}

module.exports = EmailService;
