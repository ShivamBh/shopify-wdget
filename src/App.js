import React, { useEffect, useState } from "react";
import "./App.css";
import Toggle from "./components/Toggle";

function App(props) {
	console.log("app props", props.toggleProps);
	return <Toggle {...props.toggleProps} />;
}

export default App;
