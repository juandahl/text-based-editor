import CustomInput from "components/CustomInput";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HeadlineCreatorProps {}

const HeadlineCreator: React.FC<HeadlineCreatorProps> = () => {
	// States
	const [headingText, setHeadingText] = React.useState<string>("");

	return (
		<>
			{headingText ? (
				<h1 data-testid="heading-created">{headingText}</h1>
			) : (
				<CustomInput
					className="heading1"
					placeholder="Heading 1"
					name="Heading1"
					data-testid="heading-input"
					// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
					onPressEnter={(event) =>
						setHeadingText((event.target as unknown as { value: string }).value)
					}
				/>
			)}
		</>
	);
};

export default HeadlineCreator;
