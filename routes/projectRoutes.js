const express = require('express');
const router = express.Router();

const projectsDb = require('../data/helpers/projectModel');

const asyncHandler = fn => (req, res, next) => fn(req, res, next).catch(next);

router.get('/', asyncHandler(async (req, res) => {
  const projects = await projectsDb.get();
  res.status(200).json(projects);
}));

module.exports = router;
