import "@testing-library/jest-dom";

import { act, fireEvent, render, screen } from "@testing-library/react";
import FormElementCreator from "business/FormElementCreator";

// TODO: improve these tests
describe("FormElementCreator component", () => {
	it("should create a heading", async () => {
		let type;
		const handleSetFormElement = (option) => {
			type = option.type;
		};

		render(<FormElementCreator type={"HEADLINE"} onCompleted={handleSetFormElement} />);

		const input = await screen.findByTestId("heading-input");
		await act(() => fireEvent.change(input, { target: { value: "this is a heading" } }));
		await act(() => fireEvent.keyDown(input, { key: "Enter", code: "Enter", charCode: 13 }));

		expect(type).toEqual("HEADLINE");
	});

	it("should not create a heading yet", async () => {
		let type;
		const handleSetFormElement = (option) => {
			type = option.type;
		};

		render(<FormElementCreator type={"HEADLINE"} onCompleted={handleSetFormElement} />);

		const input = await screen.findByTestId("heading-input");
		await act(() => fireEvent.change(input, { target: { value: "this is a heading" } }));

		expect(type).not.toEqual("HEADLINE");
	});
});
