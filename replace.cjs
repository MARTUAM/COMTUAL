const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(/bg-\[#050505\]/g, 'bg-white');
content = content.replace(/text-white\/80/g, 'text-black/80');
content = content.replace(/text-white\/60/g, 'text-black/60');
content = content.replace(/text-white\/30/g, 'text-black/30');
content = content.replace(/text-white\/20/g, 'text-black/20');
content = content.replace(/text-white/g, 'text-black');
content = content.replace(/bg-black\/80/g, 'bg-white/80');
content = content.replace(/bg-black\/50/g, 'bg-white/50');
content = content.replace(/bg-black/g, 'bg-white');
content = content.replace(/border-white\/5/g, 'border-black/5');
content = content.replace(/border-white\/10/g, 'border-black/10');
content = content.replace(/border-white\/20/g, 'border-black/20');
content = content.replace(/bg-white\/5/g, 'bg-black/5');

fs.writeFileSync('src/App.tsx', content);
console.log('Replacements done.');
