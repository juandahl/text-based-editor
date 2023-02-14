import { v4 as uuidv4 } from "uuid";

/**
 * generate a random and unique key
 * @param prefix optional prefix for the key
 */
const generateKey = (prefix?: string): string => {
	const rand = uuidv4();

	return prefix ? `${prefix}-${rand}` : rand;
};

export { generateKey };
