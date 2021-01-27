import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// get entrypoint divs
const WidgetDivs = document.querySelectorAll(".toggle-widget");

// inject react instances to one or all of the entrypoint divs
WidgetDivs.forEach(Div => {
	console.log("This Div", Number(Div.getAttribute("data-variant-id")));
	const cartItem = {
		id: Number(Div.getAttribute("data-variant-id"))
	};
	ReactDOM.render(
		<React.StrictMode>
			<App cartItem={cartItem.id ? cartItem : null} />
		</React.StrictMode>,
		Div
	);
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
