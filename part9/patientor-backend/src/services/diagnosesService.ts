import diagnoses from "../../data/diagnoses";
import { DiagnosesEntry } from "../types";

const getEntries = (): DiagnosesEntry[] => {
	return diagnoses;
};

export default {
	getEntries
};