import { useAuth0 } from "@auth0/auth0-react";
import { Container, Modal, Button, Group, Stepper } from "@mantine/core";
import React, { useState } from "react";
import { AddLocation } from "./AddLocation/AddLocation";
import { UploadImage } from "./UploadImage/UploadImage";

export const AddTourModal = ({ OpenedAddTour, setOpenendAddTOur }) => {
  const [active, setActive] = useState(0);
  const { user } = useAuth0();

  const [tourDetails, setTourDetails] = useState({
    title: "",
    description: "",
    price: 0,
    country: "",
    city: "",
    address: "",
    image: null,
    userEmail: user?.email,
  });

  const nextStep = () => {
    setActive((current) => (current < 4 ? current + 1 : current));
  };

  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };

  return (
    <Modal
      centered
      opened={OpenedAddTour}
      onClose={() => setOpenendAddTOur(false)}
      title="Ajouter une destination"
      size={"90rem"}
    >
      <Container h={"40rem"} w={"100%"}>
        <Stepper active={active} onStepClick={setActive} breakpoint="sm">
          <Stepper.Step label="Localisation" description="Adresse">
            <AddLocation
              nextStep={nextStep}
              tourDetails={tourDetails}
              setTourDetails={setTourDetails}
            />
          </Stepper.Step>
          <Stepper.Step label="Second step" description="Verify email">
            <UploadImage
              nextStep={nextStep}
              prevStep={prevStep}
              tourDetails={tourDetails}
              setTourDetails={setTourDetails}
            />
          </Stepper.Step>
          <Stepper.Step label="Final step" description="Get full access">
            Step 3 content: Get full access
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>

        <Group position="center" mt="xl"></Group>
      </Container>
    </Modal>
  );
};
