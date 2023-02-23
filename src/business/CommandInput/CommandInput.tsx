import "./CommandInput.css";

import classNames from "classnames";
// Components
import CustomInput from "components/CustomInput";
// React
import React from "react";
// Services
import CommandsRepository from "services/CommandsRepository";

import Box from "./Box";

interface CommandInputProps {
	className?: string;
	commandsRepository: CommandsRepository;
	onCommandSelected: (command: Command) => void;
}

const CommandInput = React.forwardRef<HTMLInputElement, CommandInputProps>(
	({ className, commandsRepository, onCommandSelected }, ref) => {
		// States
		const [value, setValue] = React.useState<string>("");
		const [options, setOptions] = React.useState<Command[]>([]);

		// Handlers
		const handleChangeValue = async (event: React.ChangeEvent<HTMLInputElement>) => {
			const newValue = event.target.value;
			setValue(newValue);

			const newOptions = await commandsRepository.search({ text: newValue });
			setOptions(newOptions);
		};

		return (
			<div className={classNames("CommandInput", className)}>
				<CustomInput
					ref={ref}
					list="command"
					value={value}
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onChange={handleChangeValue}
					autoFocus
					data-testid="command-input"
					placeholder="Type '/' for commands..."
				/>

				{value.startsWith("/") && (
					<Box
						options={options}
						onClick={(option) => {
							onCommandSelected(option);
							setValue("");
						}}
					/>
				)}
			</div>
		);
	}
);

export default CommandInput;
