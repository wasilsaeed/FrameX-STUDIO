// Run against an isolated Chrome instance started with --remote-debugging-port=9224.
// node tests/browser-smoke.mjs [http://localhost:5173] [--probe]
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';

const origin = process.argv[2] || 'http://localhost:5173';
const probe = process.argv.includes('--probe');
const screenshots = process.argv.includes('--screenshots');
const audit = process.argv.includes('--audit');
const interactions = process.argv.includes('--interactions');
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
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
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
  await send('Page.bringToFront');
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
      ['/services', 1440, 1050, 'services'], ['/about', 1440, 1050, 'about'],
      ['/team', 1440, 1050, 'team'], ['/team', 390, 844, 'team-mobile'], ['/faq', 390, 844, 'faq-mobile'],
      ['/contact', 390, 844, 'contact-mobile'], ['/work/the-modern-muse', 1440, 1050, 'case-study'],
    ]) {
      await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 600 });
      await send('Page.navigate', { url: origin + path });
      await waitFor('document.querySelector("h1") !== null');
      await evaluate('document.fonts.ready');
      await new Promise(resolve => setTimeout(resolve, 1800));
      await waitFor('getComputedStyle(document.querySelector(".route-view")).opacity === "1"');
      await evaluate('[...document.images].forEach(i => i.loading = "eager")');
      await waitFor('[...document.images].every(i => i.complete)');
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
        for(const [selector,name] of [['.home-services','capabilities'],['.home-process','process']]) {
          await evaluate(`window.scrollTo({top:document.querySelector(${JSON.stringify(selector)}).offsetTop-110,behavior:"instant"})`);
          await new Promise(resolve=>setTimeout(resolve,1200));
          const sectionShot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
          await writeFile('/private/tmp/framex-'+name+'.png',Buffer.from(sectionShot.data,'base64'));
          console.log('SCREENSHOT /private/tmp/framex-'+name+'.png');
        }
        await evaluate('window.scrollTo({top:document.querySelector(".testimonials-section").offsetTop - 110,behavior:"instant"})');
        await new Promise(resolve => setTimeout(resolve, 1200));
        const closing = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
        await writeFile('/private/tmp/framex-home-closing.png', Buffer.from(closing.data, 'base64'));
        console.log('SCREENSHOT /private/tmp/framex-home-closing.png');
      }
    }
  } else if (audit || interactions) {
    const routes = ['/', '/services', '/work', '/about', '/team', '/contact', '/faq', '/privacy', '/terms', '/404', ...['midnight-drive', 'the-modern-muse', 'pureform', 'city-after-dark', 'creator-cuts', 'timeless-spaces', 'motion-theory', 'portrait-series', 'momentum', 'studio-essentials', 'frame-by-frame', 'golden-hour'].map(slug => '/work/' + slug)];
    const summaries = [];
    for (const width of interactions ? [] : [320, 390, 768, 1440]) {
      await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 600 });
      for (const path of routes) {
        await send('Page.navigate', { url: origin + path });
        await waitFor('document.querySelector("h1") !== null');
        await evaluate('document.fonts.ready');
        await new Promise(resolve => setTimeout(resolve, 400));
        await evaluate('[...document.images].forEach(i => i.loading = "eager")');
        await waitFor('[...document.images].every(i => i.complete)');
        const layout = await evaluate(`({width:innerWidth,documentWidth:document.documentElement.scrollWidth,headings:document.querySelectorAll('h1').length,broken:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src),buttons:[...document.querySelectorAll('.button')].map(b=>({height:b.getBoundingClientRect().height,radius:getComputedStyle(b).borderRadius})),words:document.querySelector('main').innerText.trim().split(/\\s+/).length})`);
        assert.equal(layout.headings, 1, `${path}: expected one page heading`);
        assert.ok(layout.documentWidth <= width, `${path} overflows at ${width}px`);
        assert.deepEqual(layout.broken, [], `${path}: broken image`);
        assert.ok(layout.buttons.every(b => b.height >= 47.9 && b.radius === '10px'), `${path}: inconsistent button size or radius`);
        if (path === '/') {
          assert.equal(await evaluate('document.querySelectorAll(".home-projects .project-card").length'),6);
          assert.ok(await evaluate('document.querySelector(".testimonials-section") !== null'));
          if(await evaluate('document.querySelector(".testimonials-empty") !== null')) assert.equal(await evaluate('document.querySelectorAll(".testimonial-quote-card").length'),0,'Do not mix placeholders with published reviews');
          assert.ok(await evaluate('document.querySelector("header nav a[href=\\"/team\\"]") !== null'));
        }
        if(path === '/team') {
          assert.equal(await evaluate('document.querySelectorAll(".pp-team-profile").length'),2);
          assert.match(await evaluate('document.querySelector("main").innerText'), /Editor/);
          assert.match(await evaluate('document.querySelector("main").innerText'), /Client & Operations Lead/);
        }
        if (width === 1440) summaries.push({path, words:layout.words});
      }
      console.log(`PASS all routes: ${width}px, images, headings and buttons`);
    }
    console.log('CONTENT AUDIT', JSON.stringify(summaries));
    for(const width of [390,1440]) {
      await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<600});
      await send('Page.navigate',{url:origin});
      await waitFor('document.querySelector("#project-slider") !== null');
      await waitFor('document.querySelector("[aria-label=\\"Previous projects\\"]").disabled === true');
      await evaluate('document.querySelector("[aria-label=\\"Next projects\\"]").click()');
      await waitFor('document.querySelector("#project-slider").scrollLeft > 30');
      await new Promise(resolve=>setTimeout(resolve,650));
      assert.equal(await evaluate('document.querySelector("[aria-label=\\"Previous projects\\"]").disabled'),false);
      await evaluate('document.querySelector("[aria-label=\\"Previous projects\\"]").click()');
      await waitFor('document.querySelector("#project-slider").scrollLeft < 2');
      await evaluate('document.querySelector("#project-slider").focus()');
      await send('Input.dispatchKeyEvent',{type:'keyDown',key:'ArrowRight',code:'ArrowRight',windowsVirtualKeyCode:39});
      await send('Input.dispatchKeyEvent',{type:'keyUp',key:'ArrowRight',code:'ArrowRight',windowsVirtualKeyCode:39});
      await waitFor('document.querySelector("#project-slider").scrollLeft > 30');
      await evaluate('document.querySelector("#project-slider").scrollTo({left:99999,behavior:"instant"})');
      await waitFor('document.querySelector("[aria-label=\\"Next projects\\"]").disabled === true');
      assert.equal(await evaluate('document.querySelector(".home-work .section-top a").getAttribute("href")'),'/work');
      await evaluate('document.querySelector("#service-tab-1").click()');
      await waitFor('document.querySelector("#service-panel").getAttribute("aria-labelledby") === "service-tab-1"');
      assert.equal(await evaluate('document.querySelector("#service-tab-1").getAttribute("aria-selected")'),'true');
      assert.match(await evaluate('document.querySelector("#service-panel a").getAttribute("href")'), /Photo%20retouching/);
      await evaluate('document.querySelector("#service-tab-1").focus()');
      await send('Input.dispatchKeyEvent',{type:'keyDown',key:'ArrowRight',code:'ArrowRight',windowsVirtualKeyCode:39});
      await send('Input.dispatchKeyEvent',{type:'keyUp',key:'ArrowRight',code:'ArrowRight',windowsVirtualKeyCode:39});
      await waitFor('document.querySelector("#service-panel").getAttribute("aria-labelledby") === "service-tab-2"');
      assert.equal(await evaluate('document.activeElement.id'),'service-tab-2');
      console.log(`PASS project carousel and service tabs: ${width}px`);
    }
    for(const width of [320,1440]) {
      await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<600});
      await send('Page.navigate',{url:origin+'/services'});
      await waitFor('document.querySelectorAll(".pp-service-option").length === 5');
      await evaluate('document.querySelectorAll(".pp-service-option").forEach(detail=>detail.open=true)');
      await new Promise(resolve=>setTimeout(resolve,350));
      assert.ok(await evaluate('document.documentElement.scrollWidth <= innerWidth'),'Expanded service details overflow');
      const serviceButtons=await evaluate('[...document.querySelectorAll(".pp-service-option-body .button")].map(button=>({height:button.getBoundingClientRect().height,radius:getComputedStyle(button).borderRadius}))');
      assert.ok(serviceButtons.every(button=>button.height>=47.9 && button.radius==='10px'),JSON.stringify(serviceButtons));
      console.log(`PASS expanded service details: ${width}px`);
    }
    await send('Emulation.setDeviceMetricsOverride', {width:390,height:844,deviceScaleFactor:1,mobile:true});
    await send('Page.navigate', {url:origin+'/faq'});
    await waitFor('document.querySelectorAll(".faq-item").length === 8');
    assert.equal(await evaluate('document.querySelectorAll(".faq-item button[aria-expanded=true]").length'), 0);
    await evaluate('document.querySelectorAll(".faq-item button")[0].click()');
    await waitFor('document.querySelectorAll(".faq-answer").length === 1');
    await evaluate('document.querySelectorAll(".faq-item button")[1].click()');
    await new Promise(resolve=>setTimeout(resolve,350));
    assert.equal(await evaluate('document.querySelectorAll(".faq-item button[aria-expanded=true]").length'), 1);
    console.log('PASS animated accessible FAQ');
    await evaluate('document.querySelector(".menu-toggle").click()');
    await new Promise(resolve=>setTimeout(resolve,100));
    assert.equal(await evaluate('document.querySelector(".menu-toggle").getAttribute("aria-expanded")'), 'true');
    await waitFor('document.activeElement?.getAttribute("href") === "/work"');
    assert.equal(await evaluate('document.body.style.overflow'), 'hidden');
    await send('Input.dispatchKeyEvent', {type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
    assert.equal(await evaluate('document.querySelector(".menu-toggle").getAttribute("aria-expanded")'), 'false');
    assert.equal(await evaluate('document.activeElement.className'), 'menu-toggle');
    console.log('PASS mobile menu focus, Escape and scroll lock');
    await send('Page.navigate', {url:origin+'/contact?service=Photo%20retouching'});
    await waitFor('document.querySelector(".contact-form") !== null');
    assert.equal(await evaluate('document.querySelector("select[name=service]").value'), 'Photo retouching');
    assert.equal(await evaluate('document.querySelectorAll(".contact-form [required]").length'),4);
    await evaluate(`(() => {
      for(const [name,value] of [['name','  '],['email','test@example.com'],['description',' '.repeat(30)]]) {
        const element=document.querySelector('.contact-form [name="'+name+'"]');
        const prototype=element.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;
        Object.getOwnPropertyDescriptor(prototype,'value').set.call(element,value);
        element.dispatchEvent(new Event('input',{bubbles:true}));
        element.dispatchEvent(new Event('change',{bubbles:true}));
      }
      document.querySelector('.contact-form button[type=submit]').click();
    })()`);
    await waitFor('document.querySelector("#name-error") !== null && document.querySelector("#description-error") !== null');
    console.log('PASS whitespace-only form fields rejected');
    await evaluate(`(() => {
      for(const [name,value] of [['name','Browser Test'],['email','test@example.com'],['description','A concept campaign edit for the browser validation check.']]) {
        const element=document.querySelector('.contact-form [name="'+name+'"]');
        const prototype=element.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;
        Object.getOwnPropertyDescriptor(prototype,'value').set.call(element,value);
        element.dispatchEvent(new Event('input',{bubbles:true}));
        element.dispatchEvent(new Event('change',{bubbles:true}));
      }
      window.fetch=async()=>new Response('<html>Not an API response</html>',{status:200,headers:{'Content-Type':'text/html'}});
      document.querySelector('.contact-form button[type=submit]').click();
    })()`);
    await waitFor('document.querySelector(".form-status.error") !== null');
    assert.match(await evaluate('document.querySelector(".form-status.error").textContent'), /not been sent/);
    await evaluate(`window.fetch=async()=>new Response(JSON.stringify({message:'Inquiry sent.'}),{status:200,headers:{'Content-Type':'application/json'}}); document.querySelector('.contact-form button[type=submit]').click()`);
    await waitFor('document.querySelector(".form-status.success") !== null');
    await waitFor('document.activeElement?.classList.contains("form-status") === true');
    assert.match(await evaluate('document.querySelector(".form-status.success").textContent'), /submitted successfully/);
    await evaluate('document.querySelector(".contact-form button[type=submit]").click()');
    await waitFor('document.querySelector(".form-status.success") === null && document.querySelector("#name-error") !== null');
    console.log('PASS service prefill and inquiry UI success/failure (mock responses, not live delivery)');
    await send('Page.navigate',{url:origin+'/work/the-modern-muse'});
    await waitFor('document.querySelector(".before-after input") !== null');
    await evaluate('document.querySelector(".before-after input").focus()');
    await send('Input.dispatchKeyEvent',{type:'keyDown',key:'ArrowRight',code:'ArrowRight',windowsVirtualKeyCode:39});
    await send('Input.dispatchKeyEvent',{type:'keyUp',key:'ArrowRight',code:'ArrowRight',windowsVirtualKeyCode:39});
    assert.equal(await evaluate('document.querySelector(".before-after input").value'),'51');
    console.log('PASS keyboard color comparison');
    await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
    await send('Page.navigate',{url:origin});
    await waitFor('document.querySelector(".hero-art") !== null');
    assert.equal(await evaluate('getComputedStyle(document.documentElement).scrollBehavior'),'auto');
    assert.equal(await evaluate('getComputedStyle(document.querySelector(".route-view")).opacity'),'1');
    assert.equal(await evaluate('getComputedStyle(document.querySelector(".hero-art-motion")).transform'),'none');
    assert.ok(await evaluate('getComputedStyle(document.querySelector(".button")).transitionDuration.split(",").every(v=>parseFloat(v)<.001)'));
    console.log('PASS reduced-motion preference');
    assert.deepEqual(errors, [], 'Browser reported runtime or React errors');
    console.log('PASS no browser runtime errors');
  } else if (probe) {
    console.log(JSON.stringify(await evaluate('({ text: document.body.innerText.slice(0,1200), scrollReturn: Object.prototype.toString.call(window.scrollTo({top:0,behavior:"instant"})), hero: [...document.querySelectorAll(".hero-art, .hero-art-motion, .hero-art img, .route-view")].map(e=>({class:e.className,width:e.offsetWidth,height:e.offsetHeight,opacity:getComputedStyle(e).opacity,transform:getComputedStyle(e).transform})) })'), null, 2));
    console.log(JSON.stringify({ errors }, null, 2));
  } else {
    assert.match(await evaluate('document.querySelector("h1")?.textContent || ""'), /The difference/);
    for (const [path, heading] of [
      ['/services', 'Cut with purpose'], ['/work', 'A better finish'],
      ['/about', 'The room between'],
      ['/team', 'Two roles'],
      ['/contact', 'Good work starts'], ['/', 'The difference'],
    ]) {
      await evaluate(`document.querySelector('header a[href="${path}"]').click()`);
      await waitFor(`document.querySelector('h1')?.textContent.includes(${JSON.stringify(heading)})`);
      console.log(`PASS navigation ${path}`);
    }
    await evaluate('document.querySelector("footer a[href=\\"/team\\"]").click()');
    await waitFor('document.querySelector("h1")?.textContent.includes("Two roles")');
    console.log('PASS secondary navigation /team');
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
