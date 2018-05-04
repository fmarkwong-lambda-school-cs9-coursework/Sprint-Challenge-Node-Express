const express = require('express');
const router = express.Router();

const actionsDb = require('../data/helpers/actionModel');

const asyncHandler = fn => (req, res, next) => fn(req, res, next).catch(next);

// Get all
router.get('/', asyncHandler(async (req, res, next) => {
  const actions = await actionsDb.get();
  res.status(200).json(actions);
}));

// Create
router.post('/', asyncHandler(async (req, res, next) => {
  const newActionData = req.body;
  const newAction = await actionsDb.insert(newActionData);
  res.status(200).json(newAction);
}));

// Read 
router.get('/:id', asyncHandler(async (req, res, next) => {
  const action = await actionsDb.get(req.params.id);
  if (!action) throw `Action id ${req.params.id} not found`;
  res.status(200).json(action);

}));

// Update
router.put('/:id', asyncHandler(async (req, res, next) => {
  const updatedActionData = req.body;
  const updatedAction = await actionsDb.update(req.params.id, updatedActionData);
  if (!updatedActionData) throw `Project id ${req.params.id} not found`;
  res.status(200).json(updatedAction);

}));

// Delete 
router.delete('/:id', asyncHandler(async (req, res, next) => {
  const numRowsAffected = await actionsDb.remove(req.params.id);
  if (!numRowsAffected) throw `Action id ${req.params.id} not found`;
  res.status(200).json(numRowsAffected);

}));

module.exports = router;

