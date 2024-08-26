// src/utils.js
const idempotencyStore = new Set();

function exponentialBackoff(attempt) {
  return Math.min(1000 * 2 ** attempt, 30000); // Max 30 seconds
}

function checkIdempotency(emailId) {
  if (idempotencyStore.has(emailId)) {
    return false;
  }
  idempotencyStore.add(emailId);
  return true;
}

module.exports = { exponentialBackoff, checkIdempotency };
