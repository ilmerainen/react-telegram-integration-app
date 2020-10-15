import React from "react";
import PropTypes from "prop-types";

const BagProductItemProps = {
	id: PropTypes.string.isRequired,
	image: PropTypes.string,
	title: PropTypes.string.isRequired,
	size: PropTypes.string,
	price: PropTypes.number.isRequired,
	discountPrice: PropTypes.number,
	quantity: PropTypes.number.isRequired,
};

export default BagProductItemProps;
