import React, { useEffect, useState } from "react";
import "./App.css";
import Toggle from "./components/Toggle";

function App(props) {
	return (
		<div className="App">
			<Toggle cartItem={props.cartItem} />
		</div>
	);
}

export default App;
