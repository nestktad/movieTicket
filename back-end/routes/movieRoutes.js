import express from "express";
import {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  getRecommendedMovies,
  updateMovieHotness,
  getTrendingMovies,
} from "../controllers/movieController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getMovies);
router.get("/trending", getTrendingMovies);
router.get("/recommended", getRecommendedMovies);

router.get("/:id", getMovieById);

// Protected routes
//router.get("/recommended", protect, getRecommendedMovies);

// Admin routes
router.post("/", protect, admin, createMovie);
// router.post("/", createMovie);

router.put("/update-hotness", protect, admin, updateMovieHotness);
router
  .route("/:id")
  .put(protect, admin, updateMovie)
  .delete(protect, admin, deleteMovie);

export default router;
