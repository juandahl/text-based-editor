import "@testing-library/jest-dom";

import { act, fireEvent, render, screen } from "@testing-library/react";
import CommandInput from "business/CommandInput/CommandInput";

import CommandsRepository from "../services/CommandsRepository";

jest.mock("../services/CommandsRepository");

const command = {
	type: "HEADLINE",
	label: "/headline",
};

describe("CommandInput component", () => {
	it("should list commands", async () => {
		const commandsRepo = new CommandsRepository();
		commandsRepo.searchAll.mockResolvedValue([command]);
		commandsRepo.search.mockResolvedValue([command]);

		render(<CommandInput commandsRepository={commandsRepo} />);

		const input = await screen.findByRole("textbox");
		await act(() => fireEvent.change(input, { target: { value: "/" } }));

		const headlineButton = screen.getByRole("button", { name: /headline/i });
		expect(headlineButton).toBeInTheDocument();

		commandsRepo.searchAll.mockReset();
	});

	it("should list empty", async () => {
		const commandsRepo = new CommandsRepository();
		commandsRepo.searchAll.mockResolvedValue([command]);
		commandsRepo.search.mockResolvedValue([]);

		render(<CommandInput commandsRepository={commandsRepo} />);

		const input = await screen.findByRole("textbox");
		await act(() => fireEvent.change(input, { target: { value: "/headd" } }));

		expect(() => screen.getByTestId(/headline/i)).toThrow();

		commandsRepo.searchAll.mockReset();
	});
});
