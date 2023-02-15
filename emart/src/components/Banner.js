import React from "react";

const Banner = (props) => {
  let { title, background } = props;
  return (
    <>
      <div className="banner" style={{ backgroundImage: `url(${background})` }}>
        <h2>{title}</h2>
      </div>
    </>
  );
};

export default Banner;
