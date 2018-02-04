const express = require("express");
const router = express.Router();

const NotesController = require('../controllers/notes');
const checkAuth = require('../middleware/check-auth');

router.get("/getAll", checkAuth, NotesController.notes_getAll);
router.get("/:jobId", checkAuth, NotesController.notes_getByJob);

router.post("/create", checkAuth, NotesController.notes_create);
router.delete("/delete/:id", checkAuth, NotesController.notes_delete);
module.exports = router;
