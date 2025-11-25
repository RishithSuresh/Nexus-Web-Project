const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Serve index.html for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve pages
app.get('/pages/:page', (req, res) => {
    const page = req.params.page;
    res.sendFile(path.join(__dirname, 'pages', `${page}.html`));
});

// 404 handler - serve index.html for all other routes
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`✅ Frontend server running on http://localhost:${PORT}`);
    console.log(`📁 Serving files from: ${__dirname}`);
});
