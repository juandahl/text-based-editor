import React from "react";

/**
 * Hooks which returs an string with the content of a file
 * @returns [file, handleChange]
 */
export const useUploader = (): readonly [
	string | undefined,
	(e: React.ChangeEvent<HTMLInputElement>) => void
] => {
	const [file, setFile] = React.useState<string>();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const fileReader = new FileReader();

		const blob = e.target.files && e.target.files[0];

		if (blob) {
			fileReader.readAsText(blob, "UTF-8");
			fileReader.onload = (e) => {
				const result = e.target?.result;

				if (result) {
					setFile(e.target.result as string);
				}
			};
		}
	};

	return [file, handleChange] as const;
};
