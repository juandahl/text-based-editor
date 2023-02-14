import "./TopBar.css";

import { useFormContext } from "contexts/formContext";
import React from "react";
// Services
import { JSONConverterInstance } from "services/JSONConverter";

interface TopBarProps {
	JSONConverter: JSONConverterInstance;
}

const TopBar: React.FC<TopBarProps> = ({ JSONConverter }) => {
	// Context
	const { formElements } = useFormContext();

	// Handlers
	const handleDownload = () => {
		JSONConverter.downloadFile({
			data: formElements,
		});
	};

	return (
		<div className="TopBar">
			<button>UPLOAD</button>
			<button onClick={handleDownload}>DOWNLOAD</button>
		</div>
	);
};

export default TopBar;
