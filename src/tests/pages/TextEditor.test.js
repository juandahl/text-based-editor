import "@testing-library/jest-dom";

import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TextEditor from "pages/TextEditor";

describe("TextEditor component", () => {
	const createInput = async (type, text) => {
		if (type === "HEADLINE") {
			const input = await screen.findByTestId("command-input");
			await act(() => fireEvent.change(input, { target: { value: "/" } }));

			const headlineButton = await screen.getByRole("button", { name: /headline/i });
			await userEvent.click(headlineButton);

			const headlineInput = await screen.getByRole("textbox", { name: /heading/i });
			await act(() => fireEvent.change(input, { target: { value: text } }));

			await act(() =>
				fireEvent.keyDown(headlineInput, { key: "Enter", code: "Enter", charCode: 13 })
			);
		}

		if (type === "TEXT_INPUT") {
			const input = await screen.findByTestId("command-input");
			await act(() => fireEvent.change(input, { target: { value: "/" } }));

			const headlineButton = await screen.getByRole("button", { name: /textinput/i });
			await userEvent.click(headlineButton);

			const headlineInput = await screen.getByRole("textbox", { name: /text-input-creator/i });
			await act(() => fireEvent.change(input, { target: { value: text } }));

			await act(() =>
				fireEvent.keyDown(headlineInput, { key: "Enter", code: "Enter", charCode: 13 })
			);
		}
	};

	it("should create inputs and focus on command input", async () => {
		render(<TextEditor />);

		const input = await screen.findByTestId("command-input");

		await createInput("HEADLINE", "test");
		await createInput("TEXT_INPUT", "test");

		expect(input).toHaveFocus();
	});
});
