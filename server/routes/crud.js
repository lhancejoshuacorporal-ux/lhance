
const express = require("express");
const db = require("../models");

function makeCrudRouter(modelName) {
  const router = express.Router();
  const Model = db[modelName];

  if (!Model) {
    throw new Error(`Model "${modelName}" was not found`);
  }

  // Automatically detect primary key
  const primaryKey = Model.primaryKeyAttribute;

  router.get("/", async (_req, res) => {
    try {
      const rows = await Model.findAll({
        order: [[primaryKey, "DESC"]]
      });
      res.json(rows);
    } catch (error) {
      console.error(`GET ${modelName}:`, error);
      res.status(500).json({ message: error.message });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const row = await Model.findByPk(req.params.id);
      if (!row) {
        return res.status(404).json({
          message: `${modelName} not found`
        });
      }
      res.json(row);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const row = await Model.create(req.body);
      res.status(201).json(row);
    } catch (error) {
      console.error(`POST ${modelName}:`, error);
      res.status(400).json({ message: error.message });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const row = await Model.findByPk(req.params.id);
      if (!row) {
        return res.status(404).json({
          message: `${modelName} not found`
        });
      }
      await row.update(req.body);
      res.json(row);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const row = await Model.findByPk(req.params.id);
      if (!row) {
        return res.status(404).json({
          message: `${modelName} not found`
        });
      }
      await row.destroy();
      res.json({
        message: `${modelName} deleted successfully`
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  return router;
}

module.exports = makeCrudRouter;
