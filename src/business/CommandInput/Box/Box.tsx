import React from "react";

interface BoxProps {
	options: Command[];
	onClick: (option: Command) => void;
}

interface OptionWithRef extends Command {
	ref: React.MutableRefObject<HTMLButtonElement | null>;
}

const CODE_UP = "ArrowUp";
const CODE_DOWN = "ArrowDown";

const Box: React.FC<BoxProps> = ({ options, onClick }) => {
	// States
	const [focusIndex, setFocusIndex] = React.useState(0);
	const [optionsWithRef, setOptionsWithRefs] = React.useState<OptionWithRef[]>([]);

	// Handlers
	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.code === CODE_DOWN) {
			setFocusIndex((prev) => (prev === options.length - 1 ? 0 : prev + 1));
		}
		if (event.code === CODE_UP) {
			setFocusIndex((prev) => (prev === 0 ? options.length - 1 : prev - 1));
		}
	};

	// Effects
	React.useEffect(() => {
		const ref =
			focusIndex > -1 && focusIndex < optionsWithRef.length
				? optionsWithRef[focusIndex].ref.current
				: null;
		if (ref) {
			ref.focus();
		}
	}, [focusIndex, optionsWithRef]);

	React.useEffect(() => {
		if (optionsWithRef.length > 0) {
			window.addEventListener("keydown", handleKeyDown);
		}

		return () =>
			optionsWithRef.length > 0 ? window.removeEventListener("keydown", handleKeyDown) : undefined;
	}, [optionsWithRef]);

	React.useEffect(() => {
		const newOptions = options.map((option) => ({
			...option,
			ref: React.createRef<HTMLButtonElement>(),
		}));

		setOptionsWithRefs(newOptions);
	}, [options]);

	return (
		<div id="command" className="box">
			<h6 className="title">Commands</h6>

			<div className="buttons-container">
				{optionsWithRef.map((option) => (
					<button
						ref={option.ref}
						key={`option-${option.type}`}
						data-testid={`button-${option.type}`}
						name={option.label}
						onClick={() => onClick(option)}
					>
						{option.label}
					</button>
				))}
			</div>
		</div>
	);
};

export default Box;
