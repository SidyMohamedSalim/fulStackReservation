import { useAuth0 } from "@auth0/auth0-react";
import { Button, Container, Group } from "@mantine/core";
import React from "react";
import { useMutation } from "react-query";
import { createTour } from "../../utils/api";

export const TerminateAddTour = ({
  prevStep,
  tourDetails,
  setTourDetails,
  setOpened,
  setActiveStep,
}) => {
  const { user } = useAuth0();

  console.log(tourDetails);

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => createTour(data),
    onError: ({ response }) =>
      toast.error(response.data.message, { position: "bottom-right" }),
    onSettled: () => {
      toast.success("Destination Ajouté", { position: "bottom-right" });
      setTourDetails({
        title: "",
        description: "",
        price: 0,
        country: "",
        city: "",
        address: "",
        image: null,
        userEmail: user?.email,
      });
      setOpened(false);
      setActiveStep(0);
    },
  });

  return (
    <Container>
      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Retour
        </Button>
        <Button
          color={"green"}
          disabled={isLoading}
          onClick={() => {
            mutate(tourDetails);
          }}
        >
          {isLoading ? "en cours..." : "Enregistrer la destination"}
        </Button>
      </Group>
    </Container>
  );
};
