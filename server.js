const express = require('express');
const server = express();

server.use(express.json());

const projectRoutes = require('./routes/projectRoutes');
const actionRoutes = require('./routes/actionRoutes');

server.listen(5000, () => console.log("\n server listening on port 5000"));

server.use('/api/projects', projectRoutes);
server.use('/api/actions', actionRoutes);


const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "blah" });
}
