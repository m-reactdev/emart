import React from "react";

const ShippingBox = (props) => {
  let { icon, title, description } = props;
  return (
    <>
      <div className="shipping_Block">
        <div className="icon">{icon}</div>
        <div className="text">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </>
  );
};

export default ShippingBox;
