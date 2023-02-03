import App from "App";
// React
import React from "react";
import * as ReactDOM from "react-dom/client";

// Pages

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById("root")!;

// Create a root.
const root = ReactDOM.createRoot(container);

root.render(<App />);
