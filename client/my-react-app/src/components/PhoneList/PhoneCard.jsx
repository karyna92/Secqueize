import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

const PhoneCard = ({ phone, onClick }) => {
  const { model, ram, brandName } = phone;
  return (
    <article className="card-wrapper" onClick={onClick}>
      <h1>{model}</h1>
      <p>Brand: {brandName}</p> 
      <p>ram: {ram}</p>
    </article>
  );
};



PhoneCard.propTypes = {
  phone: PropTypes.shape({
    model: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    ram: PropTypes.string.isRequired,
    brandName: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
};

export default PhoneCard;
