import React, { useEffect, useState } from "react";
// import Client from "shopify-buy";
import Switch from "react-switch";

import ajax from "../utils/ajax";

// const client = Client.buildClient({
// 	domain: "hemisphereco.myshopify.com",
// 	storefrontAccessToken: "3dd522be200f102742efb18307de0481"
// });

const Toggle = props => {
	const [toggleState, setToggleState] = useState(false);
	const [itemInCart, setItemInCart] = useState(false);
	const { cartItem, position } = props;

	let formStuffAdd = {
		id: cartItem ? cartItem.id : 37986294497473,
		quantity: 1
	};

	let formStuffRemove = {
		id: cartItem ? cartItem.id : 37986294497473,
		quantity: 0
	};

	const handleToggle = () => {
		setToggleState(!toggleState);

		// if toggleState true and itemInCart false
		// add to cart

		// if toggleState true and itemInCart True
		// remove from cart
	};

	const checkItemInCart = cartItems => {
		let exists = false;
		cartItems.forEach(_item => {
			if (_item.id === formStuffAdd.id) {
				exists = true;
			}
		});
		return exists;
	};

	useEffect(() => {
		fetch("/cart.json")
			.then(response => response.json())
			.then(data => {
				console.log("Fetch Cart Data", data);
				if (checkItemInCart(data.items)) {
					setItemInCart(true);
					setToggleState(true);
				}
			});

		// check if item in cart

		// if item in cart, toggle switch to true
		// if (checkItemInCart(items)) {
		// 	setItemInCart(true);
		// 	setToggleState(true);
		// }
	}, []);

	useEffect(() => {
		if (toggleState && !itemInCart) {
			ajax.post("/cart/add.js", formStuffAdd, () => {
				console.log("ajax post success");
			});
		}
	}, [toggleState]);

	return (
		<>
			<div className="toggle-wrapper">
				<div className="toggle-container">
					{/* <button onClick={handleClick} className="toggle-btn">
					Plant Trees
        </button> */}
					<div class="toggle-logo"></div>
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

export default Toggle;
