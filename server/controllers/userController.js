import { json } from "express";
import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createUser = asyncHandler(async (req, res) => {
  console.log("creating user");
  let { email, image } = req.body;
  const userExists = await prisma.user.findUnique({
    where: { email: email, image: image },
  });

  if (!userExists) {
    const user = await prisma.user.create({ data: req.body });
    res.send({
      message: "user register succesfully",
      user: user,
    });
  } else {
    res.status(201).send({ message: "user already exist" });
  }
});

// book une visite d'un tour
// function to book a visit to resd
export const bookVisit = asyncHandler(async (req, res) => {
  const { date, email } = req.body;
  const { id } = req.params;

  try {
    const alreadyBooked = await prisma.booking.findMany({
      where: {
        UserEmail: email,
      },
      select: {
        TourId: true,
      },
    });

    if (alreadyBooked.some((visit) => visit.TourId === id)) {
      res
        .status(400)
        .json({ message: "This residency is already booked by you" });
    } else {
      await prisma.booking.create({
        data: {
          UserEmail: email,
          date: date,
          TourId: id,
        },
      });
      res.send({ message: "your visit is booked successfully" });
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

export const getAllBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const bookings = await prisma.booking.findMany({
      where: { UserEmail: email },
    });
    res.status(200).send(bookings);
  } catch (err) {
    throw new Error(err.message);
  }
});

//

export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        booekdVisits: true,
      },
    });

    const index = user.booekdVisits.findIndex((book) => book.TourId === id);

    if (index === -1) {
      res.status(404).json({ message: "booking not found" });
    } else {
      const book = user.booekdVisits[index];

      await prisma.booking.delete({
        where: {
          id: book.id,
          UserEmail_TourId: {
            UserEmail: email,
            TourId: id,
          },
        },
      });

      res.status(200).send("booking removed succesfully");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

export const UpdateFovoriteTour = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { Tourid } = req.params;

  try {
    const toursUser = await prisma.favoritesTours.findMany({
      where: {
        userEmail: email,
      },
    });

    if (toursUser.some((fav) => fav.TourId == Tourid)) {
      const newFavUser = toursUser.filter((fav) => fav.TourId !== Tourid);

      await prisma.favoritesTours.delete({
        where: {
          TourId_userEmail: {
            userEmail: email,
            TourId: Tourid,
          },
        },
      });

      res.send({ message: "remove from favorite success" });
    } else {
      const fav = await prisma.favoritesTours.create({
        data: {
          TourId: Tourid,
          userEmail: email,
        },
      });
      res.send({ message: "add from favorite success", user: fav });
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// get all favorites

export const getallFavoritesTour = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const favTour = await prisma.user.findUnique({
      where: { email },
      select: { FavTour: true },
    });

    res.status(200).send({ fav: favTour.FavTour });
  } catch (err) {
    throw new Error(err.message);
  }
});
