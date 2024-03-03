import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";

const Skillsquare = ({ logo, title, description, expertise }) => {
  const [open, setOpen] = useState(false);

  const renderStars = (expertise) => {
    const fullStars = Math.floor(expertise);
    const hasHalfStar = expertise - fullStars >= 0.5;

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={`star-${i}`} />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalfIcon key="half-star" />);
    }

    const remainingStars = 5 - stars.length;

    for (let i = 0; i < remainingStars; i++) {
      stars.push(<StarBorderIcon key={`border-star-${i}`} />);
    }

    return stars;
  };

  return (
    <div
      className={`relative bg-gray-800 rounded-md w-48 h-48 inline-block mb-4 mr-4 p-6
      }`}
      onMouseOver={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="w-full h-full rounded-full  overflow-hidden">
        <img
          src={
            logo ||
            "https://www.pinclipart.com/picdir/big/157-1578186_user-profile-default-image-png-clipart.png"
          }
          alt="Logo"
          className="w-full h-full object-cover"
          style={{ display: "block", borderRadius: "50%" }}
        />
      </div>
      <div
        className={`absolute bottom-0 rounded-md left-0 bg-white p-2 text-black w-full ${
          open ? "animate-slide-up" : "hidden"
        }`}
      >
        <p className="font-bold text-blue-800 text-lg overflow-hidden overflow-ellipsis line-clamp-2">
          {title ? title : "(EMPTY)"}
        </p>
        <p className="font-mono text-xs overflow-hidden overflow-ellipsis line-clamp-2 text-gray-700">
          {description}
        </p>
        <div className="mt-2">{renderStars(expertise)}</div>
        <p></p>
      </div>
    </div>
  );
};

export default Skillsquare;
