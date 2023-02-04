import "@testing-library/jest-dom";

import { act, fireEvent, render, screen } from "@testing-library/react";
import FormElementCreator from "business/FormElementCreator";

describe("FormElementCreator component", () => {
	it("should create a heading", async () => {
		render(<FormElementCreator type={"HEADLINE"} />);

		const input = await screen.findByTestId("heading-input");
		await act(() => fireEvent.change(input, { target: { value: "this is a heading" } }));
		await act(() => fireEvent.keyDown(input, { key: "Enter", code: "Enter", charCode: 13 }));

		const heading = await screen.queryByTestId(/heading-created/i);
		expect(heading).toBeInTheDocument();
	});

	it("should not create a heading yet", async () => {
		render(<FormElementCreator type={"HEADLINE"} />);

		const input = await screen.findByTestId("heading-input");
		await act(() => fireEvent.change(input, { target: { value: "this is a heading" } }));

		expect(screen.queryByTestId(/heading-created/i)).not.toBeInTheDocument();
	});
});
