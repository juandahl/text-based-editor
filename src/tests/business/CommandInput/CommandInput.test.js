import "@testing-library/jest-dom";

import { act, fireEvent, render, screen } from "@testing-library/react";
import CommandInput from "business/CommandInput/CommandInput";

import CommandsRepository from "../../../services/CommandsRepository";

jest.mock("../../../services/CommandsRepository");

const command = {
	type: "HEADLINE",
	label: "/headline",
};

const commands = [
	{
		type: "HEADLINE",
		label: "/headline",
	},
	{
		type: "TEXT_INPUT",
		label: "/textinput",
	},
];

describe("CommandInput component", () => {
	describe("list", () => {
		it("should list commands", async () => {
			const commandsRepo = new CommandsRepository();
			commandsRepo.searchAll.mockResolvedValue([command]);
			commandsRepo.search.mockResolvedValue([command]);

			render(<CommandInput commandsRepository={commandsRepo} />);

			const input = await screen.findByTestId("command-input");
			await act(() => fireEvent.change(input, { target: { value: "/" } }));

			const headlineButton = await screen.getByRole("button", { name: /headline/i });
			expect(headlineButton).toBeInTheDocument();

			commandsRepo.searchAll.mockReset();
		});

		it("should list empty", async () => {
			const commandsRepo = new CommandsRepository();
			commandsRepo.searchAll.mockResolvedValue([command]);
			commandsRepo.search.mockResolvedValue([]);

			render(<CommandInput commandsRepository={commandsRepo} />);

			const input = await screen.findByTestId("command-input");
			await act(() => fireEvent.keyDown(input, { key: "Enter", code: "Enter", charCode: 13 }));

			expect(input).toHaveFocus();

			commandsRepo.searchAll.mockReset();
		});
	});

	describe("focus with arrows down", () => {
		const showBox = async () => {
			const input = await screen.findByTestId("command-input");
			await act(() => fireEvent.change(input, { target: { value: "/" } }));

			return input;
		};

		it("should focus first", async () => {
			const commandsRepo = new CommandsRepository();
			commandsRepo.searchAll.mockResolvedValue([command]);
			commandsRepo.search.mockResolvedValue(commands);

			render(<CommandInput commandsRepository={commandsRepo} />);

			await showBox();

			const headlineButton = await screen.getByRole("button", { name: /headline/i });
			expect(headlineButton).toHaveFocus();

			commandsRepo.searchAll.mockReset();
		});

		it("should focus second", async () => {
			const commandsRepo = new CommandsRepository();
			commandsRepo.searchAll.mockResolvedValue([command]);
			commandsRepo.search.mockResolvedValue(commands);

			render(<CommandInput commandsRepository={commandsRepo} />);

			const input = await showBox();

			await act(() =>
				fireEvent.keyDown(input, { key: "ArrowDown", code: "ArrowDown", charCode: 38 })
			);

			const headlineButton = await screen.getByRole("button", { name: /textinput/i });
			expect(headlineButton).toHaveFocus();

			commandsRepo.searchAll.mockReset();
		});

		it("should focus first again", async () => {
			const commandsRepo = new CommandsRepository();
			commandsRepo.searchAll.mockResolvedValue([command]);
			commandsRepo.search.mockResolvedValue(commands);

			render(<CommandInput commandsRepository={commandsRepo} />);

			const input = await showBox();

			await act(() =>
				fireEvent.keyDown(input, { key: "ArrowDown", code: "ArrowDown", charCode: 38 })
			);
			await act(() =>
				fireEvent.keyDown(input, { key: "ArrowDown", code: "ArrowDown", charCode: 38 })
			);

			const headlineButton = await screen.getByRole("button", { name: /headline/i });
			expect(headlineButton).toHaveFocus();

			commandsRepo.searchAll.mockReset();
		});
	});

	describe("focus with arrows up", () => {
		const showBox = async () => {
			const input = await screen.findByTestId("command-input");
			await act(() => fireEvent.change(input, { target: { value: "/" } }));

			return input;
		};

		it("should focus last", async () => {
			const commandsRepo = new CommandsRepository();
			commandsRepo.searchAll.mockResolvedValue([command]);
			commandsRepo.search.mockResolvedValue(commands);

			render(<CommandInput commandsRepository={commandsRepo} />);

			const input = await showBox();

			await act(() => fireEvent.keyDown(input, { key: "ArrowUp", code: "ArrowUp", charCode: 39 }));

			const textInputButton = await screen.getByRole("button", { name: /textinput/i });
			expect(textInputButton).toHaveFocus();

			commandsRepo.searchAll.mockReset();
		});

		it("should focus first", async () => {
			const commandsRepo = new CommandsRepository();
			commandsRepo.searchAll.mockResolvedValue([command]);
			commandsRepo.search.mockResolvedValue(commands);

			render(<CommandInput commandsRepository={commandsRepo} />);

			const input = await showBox();

			await act(() => fireEvent.keyDown(input, { key: "ArrowUp", code: "ArrowUp", charCode: 39 }));
			await act(() => fireEvent.keyDown(input, { key: "ArrowUp", code: "ArrowUp", charCode: 39 }));

			const headlineButton = await screen.getByRole("button", { name: /headline/i });
			expect(headlineButton).toHaveFocus();

			commandsRepo.searchAll.mockReset();
		});

		it("should focus last again", async () => {
			const commandsRepo = new CommandsRepository();
			commandsRepo.searchAll.mockResolvedValue([command]);
			commandsRepo.search.mockResolvedValue(commands);

			render(<CommandInput commandsRepository={commandsRepo} />);

			const input = await showBox();

			await act(() => fireEvent.keyDown(input, { key: "ArrowUp", code: "ArrowUp", charCode: 39 }));
			await act(() => fireEvent.keyDown(input, { key: "ArrowUp", code: "ArrowUp", charCode: 39 }));
			await act(() => fireEvent.keyDown(input, { key: "ArrowUp", code: "ArrowUp", charCode: 39 }));

			const headlineButton = await screen.getByRole("button", { name: /textinput/i });
			expect(headlineButton).toHaveFocus();

			commandsRepo.searchAll.mockReset();
		});
	});
});
