// Run against an isolated Chrome instance started with --remote-debugging-port=9224.
// node tests/browser-smoke.mjs [http://localhost:5173] [--probe]
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';

const origin = process.argv[2] || 'http://localhost:5173';
const probe = process.argv.includes('--probe');
const screenshots = process.argv.includes('--screenshots');
// A new tab prevents cached console errors from an earlier run being replayed.
const target = await fetch('http://127.0.0.1:9224/json/new?about:blank', { method: 'PUT' }).then(r => r.json());
assert.ok(target, 'Start an isolated Chrome debugging session first');
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }));
const pending = new Map();
const errors = [];
let id = 0;
socket.addEventListener('message', event => {
  const message = JSON.parse(event.data);
  if (message.id) {
    const task = pending.get(message.id);
    if (task) {
      pending.delete(message.id);
      message.error ? task.reject(new Error(message.error.message)) : task.resolve(message.result);
    }
  }
  if (message.method === 'Runtime.exceptionThrown') {
    const detail = message.params.exceptionDetails;
    errors.push(detail.exception?.description || detail.text);
  }
  if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') {
    errors.push(message.params.args.map(a => a.description || a.value).join(' '));
  }
});
function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const requestId = ++id;
    pending.set(requestId, { resolve, reject });
    socket.send(JSON.stringify({ id: requestId, method, params }));
  });
}
async function evaluate(expression) {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}
async function waitFor(expression) {
  const deadline = Date.now() + 20000;
  while (Date.now() < deadline) {
    if (await evaluate(expression)) return;
    await new Promise(resolve => setTimeout(resolve, 150));
  }
  throw new Error(`Timed out waiting for ${expression}`);
}
try {
  await send('Runtime.enable');
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: origin });
  await waitFor('document.querySelector("h1, h2") !== null');
  await new Promise(resolve => setTimeout(resolve, 1500));
  if (screenshots) {
    await evaluate('document.fonts.ready');
    console.log('FONTS', await evaluate('[...document.fonts].map(f => ({ family: f.family, status: f.status }))'));
    for (const [path, width, height, name] of [
      ['/', 1440, 1050, 'desktop'], ['/', 390, 844, 'mobile'],
      ['/work', 1440, 1050, 'work'], ['/contact', 1440, 1050, 'contact'],
    ]) {
      await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 600 });
      await send('Page.navigate', { url: origin + path });
      await waitFor('document.querySelector("h1") !== null');
      await evaluate('document.fonts.ready');
      await new Promise(resolve => setTimeout(resolve, 1800));
      const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
      await writeFile(`/private/tmp/framex-${name}.png`, Buffer.from(shot.data, 'base64'));
      console.log('SCREENSHOT', `/private/tmp/framex-${name}.png`);
      console.log('LAYOUT', await evaluate('({width: innerWidth, documentWidth: document.documentElement.scrollWidth, heroHeight: document.querySelector(".home-hero")?.offsetHeight, brokenImages: [...document.images].filter(i=>i.loading!=="lazy" && i.complete && !i.naturalWidth).map(i=>i.src)})'));
      if (name === 'desktop') {
        await evaluate('window.scrollTo({top:document.querySelector(".home-work").offsetTop - 110,behavior:"instant"})');
        await new Promise(resolve => setTimeout(resolve, 1200));
        const detail = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
        await writeFile('/private/tmp/framex-selected-work.png', Buffer.from(detail.data, 'base64'));
        console.log('SCREENSHOT /private/tmp/framex-selected-work.png');
      }
    }
  } else if (probe) {
    console.log(JSON.stringify(await evaluate('({ text: document.body.innerText.slice(0,1200), scrollReturn: Object.prototype.toString.call(window.scrollTo({top:0,behavior:"instant"})) })'), null, 2));
    console.log(JSON.stringify({ errors }, null, 2));
  } else {
    assert.match(await evaluate('document.querySelector("h1")?.textContent || ""'), /We don’t just edit/);
    for (const [path, heading] of [
      ['/services', 'Craft where it'], ['/work', 'Stories, shaped'],
      ['/about', 'Behind every great frame'], ['/team', 'Creative focus'],
      ['/contact', 'Let’s create something'], ['/', 'We don’t just edit'],
    ]) {
      await evaluate(`document.querySelector('header a[href="${path}"]').click()`);
      await waitFor(`document.querySelector('h1')?.textContent.includes(${JSON.stringify(heading)})`);
      console.log(`PASS navigation ${path}`);
    }
    await evaluate('document.querySelector("header nav a[href=\\"/work\\"]").click()');
    await waitFor('document.querySelectorAll(".project-card").length === 12');
    await evaluate('[...document.querySelectorAll(".filters button")].find(b => b.textContent === "Retouching").click()');
    await waitFor('document.querySelectorAll(".project-card").length === 2');
    await evaluate('document.querySelector(".project-card").click()');
    await waitFor('document.querySelector(".case-study") !== null');
    console.log('PASS portfolio filter and project navigation');
    await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
    await evaluate('document.querySelector(".menu-toggle").click()');
    assert.equal(await evaluate('document.querySelector(".menu-toggle").getAttribute("aria-expanded")'), 'true');
    await evaluate('document.querySelector("header nav a[href=\\"/contact\\"]").click()');
    await waitFor('document.querySelector(".contact-form") !== null');
    assert.equal(await evaluate('document.querySelector(".menu-toggle").getAttribute("aria-expanded")'), 'false');
    assert.ok(await evaluate('document.documentElement.scrollWidth <= window.innerWidth'), 'Mobile layout overflows');
    await evaluate('document.querySelector(".contact-form button").click()');
    await waitFor('document.querySelectorAll("[role=alert]").length >= 4');
    console.log('PASS mobile navigation, layout and form validation');
    for (const path of ['/', '/services', '/work', '/about', '/team', '/faq', '/work/midnight-drive', '/work/the-modern-muse']) {
      await send('Page.navigate', { url: origin + path });
      await waitFor('document.querySelector("h1") !== null');
      assert.ok(await evaluate('document.documentElement.scrollWidth <= window.innerWidth'), `Mobile overflow on ${path}`);
    }
    console.log('PASS supporting pages fit mobile viewport');
    assert.deepEqual(errors, [], 'Browser reported runtime or React errors');
    console.log('PASS no browser runtime errors');
  }
} finally {
  socket.close();
  await fetch(`http://127.0.0.1:9224/json/close/${target.id}`);
}
