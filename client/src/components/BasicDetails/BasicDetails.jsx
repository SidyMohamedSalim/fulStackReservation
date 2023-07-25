import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  Button,
  Group,
  NumberInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useMutation } from "react-query";
import { createTour } from "../../../utils/api";
import { validateString } from "../../utils/common";

export const BasicDetails = ({
  nextStep,
  tourDetails,
  setTourDetails,
  prevStep,
}) => {
  const form = useForm({
    initialValues: {
      title: tourDetails.title,
      description: tourDetails.description,
      price: tourDetails.price,
    },
    validate: {
      title: (value) => validateString(value),
      description: (value) => validateString(value),
      price: (value) =>
        value > 1000 || !value ? "Ne doit pas etre > 1000 dollars" : null,
    },
  });

  const { title, description, price } = form.values;

  //  ajouter de la proprieties

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setTourDetails((prev) => ({ ...prev, title, description, price }));
      nextStep();
    }
  };

  return (
    <Box maw="50%" mx="auto" my="md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <TextInput
          withAsterisk
          label="Title"
          placeholder="Nom  de la Destination"
          {...form.getInputProps("title")}
        />
        <Textarea
          placeholder="Description"
          label="Description"
          withAsterisk
          {...form.getInputProps("description")}
        />
        <NumberInput
          withAsterisk
          label="Price"
          placeholder="1000"
          min={0}
          {...form.getInputProps("price")}
        />
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Retour
          </Button>
          <Button type="submit">Suivant</Button>
        </Group>
      </form>
    </Box>
  );
};
