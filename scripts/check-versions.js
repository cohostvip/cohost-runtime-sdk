const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '../packages');
const allowedPrefix = '1.0.'; // Change this to your target major.minor
const packages = fs.readdirSync(baseDir);

let ok = true;

for (const pkg of packages) {
  const pkgPath = path.join(baseDir, pkg, 'package.json');

  if (!fs.existsSync(pkgPath)) {
    console.warn(`[!] Skipping ${pkg} (no package.json)`);
    continue;
  }

  const json = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const version = json.version || '';

  if (!version.startsWith(allowedPrefix)) {
    console.error(`[x] ${pkg}: version ${version} does not match ${allowedPrefix}x`);
    ok = false;
  }
}

if (!ok) {
  console.error('\nSome packages do not match the expected version prefix.');
  process.exit(1);
} else {
  console.log('✅ All packages match the version prefix:', allowedPrefix);
}
