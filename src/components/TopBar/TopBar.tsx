import "./TopBar.css";

// Context
import { useFormContext } from "contexts/formContext";
// Hooks
import { useUploader } from "hooks/useUploader";
import React from "react";
// Services
import { JSONConverterInstance } from "services/JSONConverter";

interface TopBarProps {
	JSONConverter: JSONConverterInstance<FormElement[]>;
}

const TopBar: React.FC<TopBarProps> = ({ JSONConverter }) => {
	// Hooks
	const [jsonUploaded, onUpload] = useUploader();

	// Context
	const { formElements, onAddInBulk } = useFormContext();

	// Handlers
	const handleDownload = () => {
		JSONConverter.downloadFile({
			data: formElements,
		});
	};

	React.useEffect(() => {
		if (jsonUploaded) {
			const form = JSONConverter.uploadJson({ data: jsonUploaded });
			onAddInBulk(form);
		}
	}, [jsonUploaded]);

	const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		onUpload(e);
	};

	return (
		<div className="TopBar">
			<input type="file" onChange={handleUpload} />
			<button onClick={handleDownload}>DOWNLOAD</button>
		</div>
	);
};

export default TopBar;
