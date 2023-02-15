import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const Rating = ({ avgRating }) => {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {avgRating >= index + 1 ? (
          <BsStarFill color="orange" size={16} />
        ) : avgRating >= number ? (
          <BsStarHalf color="orange" size={16} />
        ) : (
          <BsStar color="orange" size={16} />
        )}
      </span>
    );
  });
  return <div className="rate">{ratingStar}</div>;
};

export default Rating;
