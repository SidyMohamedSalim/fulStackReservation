import React from "react";
import { useQuery } from "react-query";
import { getAllTours } from "../../utils/api";

const useTours = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "allTours",
    getAllTours,
    { refetchOnWindowFocus: false }
  );

  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};

export default useTours;
