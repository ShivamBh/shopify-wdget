import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Switch from "react-switch";
import ajax from "../utils/ajax";

const propTypes = {
	autoToggle: PropTypes.bool,
	position: PropTypes.oneOf(["left", "center", "right"]),
	tooltip: PropTypes.bool,
	variantId: PropTypes.string.isRequired
};

const Toggle = props => {
	const [toggleState, setToggleState] = useState(false);
	const [itemInCart, setItemInCart] = useState(false);
	const { autoToggle, position, tooltip, variantId } = props;

	const handleToggle = () => {
		setToggleState(!toggleState);
	};

	const checkItemInCart = cartItems => {
		let exists = false;
		cartItems.forEach(_item => {
			if (_item.id === Number(variantId)) {
				exists = true;
			}
		});
		return exists;
	};

	const addEcodrive = () => {
		console.log("Form Data Add", {
			id: Number(variantId),
			quantity: 1
		});
		ajax.post(
			"/cart/add.js",
			{
				id: Number(variantId),
				quantity: 1
			},
			() => {
				console.log("ajax post success");
			}
		);
	};

	const removeEcodrive = () => {
		ajax.post(
			"/cart/update.js",
			{
				updates: {
					[Number(variantId)]: 0
				}
			},
			() => {
				console.log("Removed Eco product");
			}
		);
	};

	useEffect(() => {
		if (toggleState && !itemInCart) {
			addEcodrive();
		}
		if (!toggleState && itemInCart) {
			removeEcodrive();
		}
	}, [toggleState]);

	useEffect(() => {
		fetch("/cart.json")
			.then(response => response.json())
			.then(data => {
				console.log("Currently in Cart", data);
				if (checkItemInCart(data.items)) {
					setItemInCart(true);
					setToggleState(true);
				}
			});

		if (!itemInCart && autoToggle === "true") {
			setToggleState(!toggleState);
		}
	}, []);

	return (
		<>
			<div className={`toggle-wrapper toggle-${position}`}>
				<div className="toggle-container">
					{/* <button onClick={handleClick} className="toggle-btn">
					Plant Trees
        </button> */}
					<div className="toggle-logo"></div>
					<label className="switch-container">
						<div className="toggle-content">
							<span className="toggle-title">Plant a Tree</span>
							<span className="toggle-subtitle">
								Offset CO2 with Ecodrive for <b>$0.65</b>
							</span>
						</div>
						<Switch
							onChange={handleToggle}
							checked={toggleState}
							onColor="#8ce0b5"
							onHandleColor="#3c8633"
							offColor="#ccc"
							offHandleColor="#fff"
							handleDiameter={20}
							uncheckedIcon={false}
							checkedIcon={false}
							boxShadow="0px 1px 5px rgba(0, 0, 0, 0.24)"
							activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.24)"
							height={24}
							width={48}
							className="react-switch"
						/>
					</label>
				</div>
			</div>
		</>
	);
};

Toggle.propTypes = propTypes;

export default Toggle;
