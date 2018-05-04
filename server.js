const express = require('express');
const server = express();

const projectRoutes = require('./routes/projectRoutes');

server.listen(5000, () => console.log("\n server listening on port 5000"));

server.use('/api/projects', projectRoutes);
