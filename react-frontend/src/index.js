import React from "react";
import MyApp from "./MyApp";
import ReactDOMClient from "react-dom/client";
import "./index.css";



// Create the container
const container = document.getElementById("root");

// Create a root
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the Root
root.render(<MyApp />);