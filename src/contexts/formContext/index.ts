import React from "react";

// Context
import { formContext } from "./formContext";

/**
 * Hook for Form Context Functions.
 */
export function useFormContext(): FormContext {
	return React.useContext(formContext);
}
