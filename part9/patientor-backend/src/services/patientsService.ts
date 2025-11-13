import patients from "../../data/patients";
import { NonSensitivePatientsEntry, PatientsEntry } from "../types";

const getEntries = (): PatientsEntry[] => {
	return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientsEntry[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};

export default {
	getEntries,
	getNonSensitiveEntries
};