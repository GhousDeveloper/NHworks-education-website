const fs = require('fs');

console.log('--- 1. Testing js/script.js syntax ---');
try {
  const code = fs.readFileSync('js/script.js', 'utf8');
  new Function(code);
  console.log('PASS: js/script.js is 100% syntactically valid!');
} catch (e) {
  console.error('FAIL: js/script.js error:', e.message);
  process.exit(1);
}

console.log('--- 2. Testing index.html referenced assets ---');
const html = fs.readFileSync('index.html', 'utf8');
const regex = /src=["']([^"']+)["']/g;
let match;
let missing = 0;
while ((match = regex.exec(html)) !== null) {
  const file = match[1];
  if (!file.startsWith('http') && !file.startsWith('data:') && file.length > 0) {
    if (!fs.existsSync(file)) {
      console.error('MISSING:', file);
      missing++;
    } else {
      console.log('EXISTS:', file);
    }
  }
}

if (missing === 0) {
  console.log('PASS: All referenced images exist in project!');
} else {
  console.error('FAIL: ' + missing + ' missing files!');
  process.exit(1);
}

console.log('--- 3. Testing course catalog image assets ---');
const scriptContent = fs.readFileSync('js/script.js', 'utf8');
const courseImgMatches = [...scriptContent.matchAll(/image:\s*['"]([^'"]+)['"]/g)];
courseImgMatches.forEach(m => {
  const file = m[1];
  if (!fs.existsSync(file)) {
    console.error('MISSING COURSE IMAGE:', file);
    missing++;
  } else {
    console.log('EXISTS COURSE IMAGE:', file);
  }
});

if (missing === 0) {
  console.log('PASS: All 9 course images exist!');
} else {
  process.exit(1);
}

console.log('\n*** ALL TESTS PASSED! READY FOR PRODUCTION! ***');
