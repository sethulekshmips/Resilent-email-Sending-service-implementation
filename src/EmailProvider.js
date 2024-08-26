// src/EmailProvider.js
class EmailProviderA {
  async sendEmail(email) {
    // Simulate random failure or success
    if (Math.random() < 0.7) {
      throw new Error('Provider A failed');
    }
    return { success: true, provider: 'ProviderA' };
  }
}

class EmailProviderB {
  async sendEmail(email) {
    // Simulate random failure or success
    if (Math.random() < 0.7) {
      throw new Error('Provider B failed');
    }
    return { success: true, provider: 'ProviderB' };
  }
}

module.exports = { EmailProviderA, EmailProviderB };
