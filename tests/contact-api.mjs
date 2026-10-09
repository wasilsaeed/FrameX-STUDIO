// Pure handler checks: no server, real credentials, or external email requests.
import assert from 'node:assert/strict';
import handler from '../api/contact.ts';

const keys = ['RESEND_API_KEY', 'CONTACT_TO_EMAIL', 'CONTACT_FROM_EMAIL'];
const previous = keys.map(key => process.env[key]);
const originalFetch = globalThis.fetch;
const valid = { name: ' Test Person ', email: ' test@example.com ', service: 'Video editing', description: 'A video editing brief for a local handler test.', website: '' };
let requestNumber = 0;
async function call(body = valid, method = 'POST', ip) {
  const result = {};
  const response = { status(code) { result.status = code; return this; }, json(value) { result.body = value; return result; } };
  await handler({ method, body, headers: { 'x-forwarded-for': ip || `test-${++requestNumber}` } }, response);
  return result;
}
try {
  keys.forEach(key => { delete process.env[key]; });
  assert.equal((await call(valid, 'GET')).status, 405);
  assert.equal((await call({ ...valid, name: '  ', description: ' '.repeat(30) })).status, 400);
  assert.equal((await call({ ...valid, email: 'invalid' })).status, 400);
  assert.equal((await call({ ...valid, website: 'bot input' })).status, 400);
  assert.equal((await call()).status, 503);
  process.env.RESEND_API_KEY = 'local-test-only';
  process.env.CONTACT_TO_EMAIL = 'recipient@example.com';
  process.env.CONTACT_FROM_EMAIL = 'sender@example.com';
  let payload;
  globalThis.fetch = async (_url, options) => { payload = JSON.parse(options.body); return new Response('{}', { status: 502 }); };
  assert.equal((await call()).status, 502);
  globalThis.fetch = async (_url, options) => { payload = JSON.parse(options.body); return new Response('{"id":"local-test"}', { status: 200 }); };
  const accepted = await call();
  assert.equal(accepted.status, 200);
  assert.equal(accepted.body.message, 'Inquiry sent.');
  assert.equal(payload.reply_to, 'test@example.com');
  assert.match(payload.text, /Name: Test Person/);
  for (let index = 0; index < 5; index++) assert.equal((await call(valid, 'POST', 'rate-limit-test')).status, 200);
  assert.equal((await call(valid, 'POST', 'rate-limit-test')).status, 429);
  console.log('PASS contact handler validation, configuration, provider failure/success, trimming, and rate limit (mocked provider; no emails sent)');
} finally {
  keys.forEach((key, index) => { if (previous[index] === undefined) delete process.env[key]; else process.env[key] = previous[index]; });
  globalThis.fetch = originalFetch;
}
