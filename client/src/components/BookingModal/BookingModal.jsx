import React, { useContext, useState } from "react";
import { Modal, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useMutation } from "react-query";
import UserDetailContext from "../../Context/UserDetailsContext";
import { bookVisit } from "../../../utils/api";
import { toast } from "react-toastify";
const BookingModal = ({ opened, setOpened, email, tourId }) => {
  const [value, setValue] = useState(null);

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: () => bookVisit(value, tourId, email),
    onError: ({ response }) => toast.error(response.data.message),
    onSettled: () => setOpened(false),
  });

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Choisir le moment que vous voulez le Visiter"
      centered
    >
      <div className="flexColCenter">
        <DatePicker onChange={setValue} />
        <Button disabled={!value || isLoading} onClick={() => mutate()}>
          Visitez
        </Button>
      </div>
    </Modal>
  );
};

export default BookingModal;
