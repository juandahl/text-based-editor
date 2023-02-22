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
			<button onClick={handleDownload}>DOWNLOAD</button>
			<div className="container-input">
				<input
					type="file"
					name="file"
					onChange={handleUpload}
					accept="application/JSON"
					className="file-uploader"
				/>
				<label htmlFor="file">
					<span className="iborrainputfile">UPLOAD JSON</span>
				</label>
			</div>
		</div>
	);
};

export default TopBar;
