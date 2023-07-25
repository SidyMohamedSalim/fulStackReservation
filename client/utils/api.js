import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const getAllTours = async () => {
  try {
    const response = await api.get("api/tour/allTours", {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something is error");
    throw error;
  }
};

export const getTour = async (id) => {
  try {
    const response = await api.get(`api/tour/${id}`, {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something is error");
    throw error;
  }
};

export const createUser = async (email, image, token) => {
  try {
    await api.post(
      `api/user/register`,
      { email, image },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something is error");
    throw error;
  }
};

export const bookVisit = async (date, tourId, email) => {
  try {
    await api.post(`api/user/bookVisit/${tourId}`, {
      email,
      date: dayjs(date).format("DD/MM/YYYY"),
    });
    toast.success("Reservation Reussi");
  } catch (error) {
    toast.error("Quelque chose s'est mal passée");
    throw error;
  }
};

export const removeBooking = async (id, email) => {
  try {
    await api.post(`api/user/removeBooking/${id}`, {
      email,
    });
    toast.error("delete");
  } catch (error) {
    toast.error("Something went wrong, Please try again");

    throw error;
  }
};

export const getAllBookings = async (email) => {
  try {
    const res = await api.post(`api/user/allBookings`, {
      email,
    });
    return res.data;
  } catch (error) {
    toast.error("Something went wrong while fetching bookings");
    throw error;
  }
};

export const toFav = async (id, email) => {
  try {
    await api.post(`api/user/toFav/${id}`, {
      email,
    });
  } catch (e) {
    throw e;
  }
};

export const getAllFavories = async (email) => {
  if (!token) return;
  try {
    const res = await api.post(`api/user/allFav`, {
      email,
    });

    return res;
  } catch (e) {
    toast.error("Something went wrong while fetching favs");
    throw e;
  }
};
