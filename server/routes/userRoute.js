import express from "express";
import jwtCheck from "../config/auht0Config.js";
import {
  bookVisit,
  cancelBooking,
  createUser,
  getAllBookings,
  getallFavoritesTour,
  UpdateFovoriteTour,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/bookVisit/:id", bookVisit);
router.post("/allBookings", getAllBookings);
router.delete("/removeBooking/:id", cancelBooking);
router.post("/toFav/:Tourid", UpdateFovoriteTour);
router.get("/allFav", getallFavoritesTour);

export { router as userRouter };
