import { Button, Group } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./UploadImage.css";

export const UploadImage = ({
  nextStep,
  prevStep,
  tourDetails,
  setTourDetails,
}) => {
  const [imageUrl, setImageUrl] = useState(tourDetails.image);

  const handleNext = () => {
    setTourDetails((prev) => ({ ...prev, image: imageUrl }));
    nextStep();
  };

  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "ddic7gqyv",
        uploadPreset: "towsdqdr",
        maxFiles: 1,
      },
      (err, result) => {
        if (result.event === "success") {
          setImageUrl(result.info.secure_url);
        }
      }
    );
  }, []);

  return (
    <div className="flexColCenter uploadWrapper">
      {!imageUrl ? (
        <div
          className="flexColCenter uploadZone"
          onClick={() => widgetRef.current?.open()}
        >
          <AiOutlineCloudUpload size={50} color="grey" />
          <span>Telecharger Une Image</span>
        </div>
      ) : (
        <div
          className="uploadedImage"
          onClick={() => widgetRef.current?.open()}
        >
          <img src={imageUrl} alt="" />
        </div>
      )}

      <Group position="center" mt={"xl"}>
        <Button variant="default" onClick={prevStep}>
          Retour
        </Button>
        <Button onClick={handleNext} disabled={!imageUrl}>
          Suivant
        </Button>
      </Group>
    </div>
  );
};
