import express from "express";
import protect from "../middlewears/auth.middlewear.js";

const router = express.Router();

/* GET ADMIN DASHBOARD */
router.get("/dashboard", protect, (req, res) => {
  res.status(200).json({
    admin: req.admin,
  });
});

export default router;
