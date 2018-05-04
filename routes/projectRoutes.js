const express = require('express');
const router = express.Router();

const projectsDb = require('../data/helpers/projectModel');

const asyncHandler = fn => (req, res, next) => fn(req, res, next).catch(next);

// Get all
router.get('/', asyncHandler(async (req, res, next) => {
  const projects = await projectsDb.get();
  res.status(200).json(projects);
}));

// Create
router.post('/', asyncHandler(async (req, res, next) => {
  const newProjectData = req.body;
  const newProject = await projectsDb.insert(newProjectData);
  res.status(200).json(newProject);
}));

// Read 
router.get('/:id', asyncHandler(async (req, res, next) => {
  const project = await projectsDb.get(req.params.id);
  if (!project) throw `Project id ${req.params.id} not found`;
  res.status(200).json(project);

}));

// Update
router.put('/:id', asyncHandler(async (req, res, next) => {
  const updatedProjectData = req.body;
  const updatedProject = await projectsDb.update(req.params.id, updatedProjectData);
  if (!updatedProjectData) throw `Project id ${req.params.id} not found`;
  res.status(200).json(updatedProject);

}));

// Delete 
router.delete('/:id', asyncHandler(async (req, res, next) => {
  const numRowsAffected = await projectsDb.remove(req.params.id);
  if (!numRowsAffected) throw `Project id ${req.params.id} not found`;
  res.status(200).json(numRowsAffected);

}));

// get project actions

router.get('/:id/actions', asyncHandler(async (req, res, next) => {
  const actions = await projectsDb.getProjectActions(req.params.id);
  if (actions.length === 0) res.status(500).json({ message: 'No actions for this project'});
  res.status(200).json(actions);
}));

module.exports = router;
