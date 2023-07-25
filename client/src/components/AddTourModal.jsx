import { Container, Modal, Button, Group, Stepper } from "@mantine/core";
import React, { useState } from "react";
import { AddLocation } from "./AddLocation/AddLocation";

export const AddTourModal = ({ OpenedAddTour, setOpenendAddTOur }) => {
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
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
            <AddLocation />
          </Stepper.Step>
          <Stepper.Step label="Second step" description="Verify email">
            Step 2 content: Verify email
          </Stepper.Step>
          <Stepper.Step label="Final step" description="Get full access">
            Step 3 content: Get full access
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>

        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Retour
          </Button>
          <Button onClick={nextStep}>Suivant</Button>
        </Group>
      </Container>
    </Modal>
  );
};
