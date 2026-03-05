import express from "express";
import {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequestStatus,
  updateRequest,
  deleteRequest,
  getRequestsStats,
} from "../controllers/request.controller.js";
import { protect } from "../middlewears/auth.middlewear.js";

const router = express.Router();

router.post("/", createRequest);

router.get("/", protect, getAllRequests);
router.get("/stats", protect, getRequestsStats);
router.get("/:id", protect, getRequestById);
router.put("/:id/status", protect, updateRequestStatus);
router.put("/:id", protect, updateRequest);
router.delete("/:id", protect, deleteRequest);

export default router;
