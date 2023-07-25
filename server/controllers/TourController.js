import asynHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createTour = asynHandler(async (req, res) => {
  console.log("creating tour");
  const { title, description, price, address, country, city, image } = req.body;

  console.log(req.body);

  const user = await prisma.user.findFirst();
  try {
    const tour = await prisma.tour.create({
      data: {
        title,
        description,
        price,
        address,
        city,
        country,
        image,
        userEmail: user.email,
      },
    });

    res.status(200).send({ message: "create tour succes", tour: tour });
  } catch (error) {
    if (error.code === "P2002") {
      throw new Error("A tour already exists");
    }

    throw new Error(error.message);
  }
});

export const getAllTours = asynHandler(async (req, res) => {
  const tours = await prisma.tour.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  res.send({ tours });
});

export const getTourById = asynHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await prisma.tour.findUnique({
      where: {
        id,
      },
    });

    res.send({ tour });
  } catch (error) {
    throw new Error(error.message);
  }
});
