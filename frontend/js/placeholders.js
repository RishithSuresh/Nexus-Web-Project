// Generate SVG placeholder as a data URL to avoid external network requests
function generatePlaceholderDataUrl(text = 'Placeholder', bg = '9B7EBD', fg = 'FFFFFF', width = 400, height = 250) {
    const safeText = String(text || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const svg = `<?xml version="1.0" encoding="UTF-8"?><svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'>` +
        `<rect width='100%' height='100%' fill='#${bg}'/>` +
        `<text x='50%' y='50%' font-family='Arial, Helvetica, sans-serif' font-size='20' fill='#${fg}' dominant-baseline='middle' text-anchor='middle'>${safeText}</text>` +
        `</svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}
