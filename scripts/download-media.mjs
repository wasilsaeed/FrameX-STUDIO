import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// Reference photography for the concept portfolio. Keep assets local so the
// site does not depend on a third-party image request on every page load.
// The custom Midnight Drive hero is managed separately.
const assets = [
  ['modern-muse', '1539109136881-3be0616acf4b'],
  ['pureform', '1523275335684-37898b6baf30'],
  ['city-after-dark', '1519608487953-e999c86e7455'],
  ['creator-cuts', '1574717024653-61fd2cf4d44d'],
  ['timeless-spaces', '1600566753190-17f0baa2a6c3'],
  ['motion-theory', '1550745165-9bc0b252726f'],
  ['portrait-series', '1517841905240-472988babdf9'],
  ['momentum', '1538805060514-97d9cc17730c'],
  ['studio-essentials', '1542291026-7eec264c27ff'],
  ['frame-by-frame', '1485846234645-a62644f84728'],
  // The original Golden Hour source repeatedly timed out; use the available
  // warm landscape reference for this illustrative concept instead.
  ['golden-hour', '1500534314209-a25ddb2bd429'],
  ['cinema-reference', '1489599849927-2ee91cede3ba'],
  ['landscape-reference', '1500534314209-a25ddb2bd429'],
  ['service-video-editing', '1574717024653-61fd2cf4d44d'],
  ['service-photo-retouching', '1529139574466-a303027c1d8b'],
  ['service-short-form', '1611162617474-5b21e879e113'],
  ['service-commercial', '1526170375885-4d8ecf77b99f'],
  ['service-color-grading', '1492619375914-88005aa9e8fb'],
  ['service-creative-support', '1531058020387-3be344556be6'],
  ['team-editor', '1568602471122-7832951cc4c5'],
  ['team-manager', '1534528741775-53994a69daeb'],
];

const directory = fileURLToPath(new URL('../public/media/', import.meta.url));
await mkdir(directory, { recursive: true });
let failures = 0;

async function download([name, photo]) {
  const target = `${directory}${name}.jpg`;
  try {
    const existing = await readFile(target).catch(() => null);
    if (existing?.[0] === 0xff && existing?.[1] === 0xd8) {
      console.log(`Present: ${name}.jpg`);
      return;
    }
    const width = name.startsWith('team-') ? 900 : 1200;
    const url = `https://images.unsplash.com/photo-${photo}?fit=crop&w=${width}&q=82&fm=jpg`;
    const response = await fetch(url, {
      headers: { Accept: 'image/jpeg' },
      signal: AbortSignal.timeout(45000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    if (!response.headers.get('content-type')?.startsWith('image/')) {
      throw new Error('Response was not an image');
    }
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length < 1000 || bytes[0] !== 0xff || bytes[1] !== 0xd8) {
      throw new Error('Response was not a valid JPEG');
    }
    await writeFile(target, bytes);
    console.log(`Downloaded: ${name}.jpg (${Math.round(bytes.length / 1024)} KB)`);
  } catch (error) {
    failures++;
    console.error(`Failed: ${name}.jpg — ${error.message}`);
  }
}

// A small concurrency limit avoids overwhelming the image host.
for (let index = 0; index < assets.length; index += 4) {
  await Promise.all(assets.slice(index, index + 4).map(download));
}
if (failures) process.exitCode = 1;
