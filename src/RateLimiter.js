// src/RateLimiter.js
class RateLimiter {
  constructor(limit, interval) {
    this.limit = limit;
    this.interval = interval;
    this.queue = [];
    this.sentEmails = 0;

    setInterval(() => {
      this.sentEmails = 0;
    }, this.interval);
  }

  canSend() {
    return this.sentEmails < this.limit;
  }

  markSent() {
    this.sentEmails++;
  }
}

module.exports = RateLimiter;
