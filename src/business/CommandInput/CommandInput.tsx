import "./CommandInput.css";

import React from "react";
import CommandsRepository from "services/CommandsRepository";

interface CommandInputProps {
	commandsRepository: CommandsRepository;
}

const CommandInput: React.FC<CommandInputProps> = ({ commandsRepository }) => {
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
		<div className="CommandInput">
			<input
				className="input"
				value={value}
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				onChange={handleChangeValue}
				autoFocus
				name="command-input"
				type="text"
				placeholder="Type '/' for commands..."
			/>

			{value.startsWith("/") && (
				<div className="box">
					<h6 className="title">Commands</h6>

					<div className="buttons-container">
						{options.map((option) => (
							<button
								key={`option-${option.type}`}
								data-testid={`button-${option.type}`}
								name={option.label}
							>
								{option.label}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default CommandInput;
