// Generates public/og-image.png (1200x630) from inline SVG. Run: node scripts/og-image.mjs
import sharp from 'sharp';
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<rect width="1200" height="630" fill="#1e3a4c"/>
<rect x="60" y="60" width="1080" height="510" rx="28" fill="none" stroke="#b2cfc6" stroke-width="3"/>
<text x="110" y="240" font-family="Georgia,serif" font-size="120" font-weight="700" fill="#e8f1ee">Ψ PsyCoPed</text>
<text x="110" y="340" font-family="Georgia,serif" font-size="46" fill="#d3e4de">Psicologia clinica · Neuropsicologia</text>
<text x="110" y="400" font-family="Georgia,serif" font-size="46" fill="#d3e4de">Pedagogia · Ipnosi · Coaching</text>
<text x="110" y="500" font-family="Arial,sans-serif" font-size="34" fill="#b2cfc6">Cremenaga (VA) · In studio e online</text>
</svg>`;
await sharp(Buffer.from(svg)).png().toFile('public/og-image.png');
