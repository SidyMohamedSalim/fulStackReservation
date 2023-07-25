import express from "express";
import {
  createTour,
  getAllTours,
  getTourById,
} from "../controllers/TourController.js";

const router = express.Router();

router.post("/create", createTour);

router.get("/allTours", getAllTours);

router.get("/:id", getTourById);

export { router as tourRouter };
