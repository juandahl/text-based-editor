import "./styles.css";

// Components
import TopBar from "components/CustomInput/TopBar/TopBar";
// Context
import { FormProvider } from "contexts/formContext/formContext";
// Pages
import TextEditor from "pages/TextEditor";
// Services
import { JSONConverter } from "services/JSONConverter";

const JSONConverterInstance = new JSONConverter();

const App = (): React.ReactElement => {
	return (
		<FormProvider>
			<div className="App">
				<TopBar JSONConverter={JSONConverterInstance} />
				<TextEditor />
			</div>
		</FormProvider>
	);
};

export default App;
