import "./CommandInput.css";

// Components
import CustomInput from "components/CustomInput";
// React
import React from "react";
// Services
import CommandsRepository from "services/CommandsRepository";

interface CommandInputProps {
	commandsRepository: CommandsRepository;
	onCommandSelected: (command: Command) => void;
}

const CommandInput: React.FC<CommandInputProps> = ({ commandsRepository, onCommandSelected }) => {
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
			<CustomInput
				list="command"
				value={value}
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				onChange={handleChangeValue}
				autoFocus
				name="command-input"
				placeholder="Type '/' for commands..."
			/>

			{value.startsWith("/") && (
				<div id="command" className="box">
					<h6 className="title">Commands</h6>

					<div className="buttons-container">
						{options.map((option) => (
							<button
								key={`option-${option.type}`}
								data-testid={`button-${option.type}`}
								name={option.label}
								onClick={() => onCommandSelected(option)}
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
