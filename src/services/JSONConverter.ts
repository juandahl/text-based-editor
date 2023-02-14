interface DownloadFileProps {
	data: CommonJSON;
	filename?: string;
}

export interface JSONConverterInstance {
	downloadFile: (props: DownloadFileProps) => void;
}

export class JSONConverter {
	/**
	 *
	 * @param data object to be exported as json format
	 * @param filename file name
	 */
	downloadFile({ data, filename = "form" }: DownloadFileProps): void {
		// create file in browser
		const json = JSON.stringify(data, null, 2);
		const blob = new Blob([json], { type: "application/json" });
		const href = URL.createObjectURL(blob);

		// create "a" HTLM element with href to file
		const link = document.createElement("a");
		link.href = href;
		link.download = `${filename}.json`;
		document.body.appendChild(link);
		link.click();

		// clean up "a" element & remove ObjectURL
		document.body.removeChild(link);
		URL.revokeObjectURL(href);
	}
}
