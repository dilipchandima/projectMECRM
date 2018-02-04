const express = require("express");
const router = express.Router();

const JobsController = require('../controllers/jobs');
const checkAuth = require('../middleware/check-auth');

router.get("/getAll", checkAuth, JobsController.job_getAll);
router.get("/:id", checkAuth, JobsController.job_getById);
router.get("/byUserId/:userId", checkAuth, JobsController.job_getByUserId);
router.get("/byStatus/:status", checkAuth, JobsController.job_getByStatus);

router.post("/create", checkAuth, JobsController.job_create);
router.post("/update", checkAuth, JobsController.job_status_update);
router.post("/accepted", checkAuth, JobsController.job_accepted);

router.delete("/delete/:id", checkAuth, JobsController.job_delete);
module.exports = router;
