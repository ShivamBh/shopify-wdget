import React, { useEffect, useState } from "react";
import "./App.css";
import Toggle from "./components/Toggle";

function App(props) {
	return <Toggle cartItem={props.cartItem} toggleProps={props.toggleProps} />;
}

export default App;
