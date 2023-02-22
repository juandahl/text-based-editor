interface DownloadFileProps<T> {
	data: T;
	filename?: string;
}
interface UploadFileProps {
	data: string;
}

export interface JSONConverterInstance<T> {
	downloadFile: (props: DownloadFileProps<T>) => void;
	uploadJson: (props: UploadFileProps) => T;
}

export class JSONConverter<T = unknown> {
	/**
	 *
	 * @param data object to be exported as json format
	 * @param filename file name
	 */
	downloadFile({ data, filename = "form" }: DownloadFileProps<T>): void {
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

	uploadJson<T = unknown>({ data }: UploadFileProps): T {
		return JSON.parse(data) as T;
	}
}
