import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./UploadImage.css";

export const UploadImage = ({
  nextStep,
  prevStep,
  tourDetails,
  setTourDetails,
}) => {
  const [imageUrl, setImageUrl] = useState(tourDetails.image);

  return (
    <div className="flexColCenter uploadWrapper">
      {!imageUrl ? (
        <div className="flexColCenter uploadZone">
          <AiOutlineCloudUpload size={50} color="grey" />
          <span>Telecharger Une Image</span>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
