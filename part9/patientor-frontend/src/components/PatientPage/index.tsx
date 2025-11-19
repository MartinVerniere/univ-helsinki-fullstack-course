import { Favorite, FavoriteBorder, Female, HeartBroken, Male, MedicalServices, Work } from "@mui/icons-material";
import { Diagnosis, Entry, Patient, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry, HealthCheckRating } from "../../types";
import { Box, Divider, Typography } from "@mui/material";

interface PatientPageProps {
	patient: Patient
	diagnoses: Diagnosis[]
}

interface HospitalEntryProps {
	entry: HospitalEntry
	diagnoses: Diagnosis[]
}

interface OccupationalHealthcareProps {
	entry: OccupationalHealthcareEntry
	diagnoses: Diagnosis[]
}

interface HealthCheckProps {
	entry: HealthCheckEntry
	diagnoses: Diagnosis[]
}

interface EntryDetailsProps {
	entry: Entry
	diagnoses: Diagnosis[]
}

const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

const HospitalEntryDetails = ({ entry, diagnoses }: HospitalEntryProps) => {
	return (
		<Box>
			<Typography>{entry.date} <MedicalServices /></Typography>
			<Typography>{entry.description} </Typography>
			{entry.diagnosisCodes && (
				<ul>
					{entry.diagnosisCodes.map(code => <li key={code}>{code} {diagnoses.find(diagnosis => diagnosis.code === code)?.name}</li>)}
				</ul>
			)}
			{entry.discharge && <Typography>Allowed discharge because {entry.discharge.criteria} on {entry.discharge.date}</Typography>}
			<Typography>diagnose by {entry.specialist} </Typography>
		</Box>
	);
};

const OccupationalHealthcareEntryDetails = ({ entry, diagnoses }: OccupationalHealthcareProps) => {
	return (
		<Box>
			<Typography>{entry.date} <Work /> {entry.employerName}</Typography>
			<Typography>{entry.description} </Typography>
			{entry.diagnosisCodes && (
				<ul>
					{entry.diagnosisCodes.map(code => <li key={code}>{code} {diagnoses.find(diagnosis => diagnosis.code === code)?.name}</li>)}
				</ul>
			)}
			{entry.sickLeave && <Typography>Allowed sick leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</Typography>}
			<Typography>diagnose by {entry.specialist} </Typography>
		</Box>
	);
};

const HealthIcon = ({ healthRating }: { healthRating: HealthCheckRating }) => {
	switch (healthRating) {
		case HealthCheckRating.Healthy:
			return <Favorite />;
		case HealthCheckRating.LowRisk:
			return <Favorite />;
		case HealthCheckRating.HighRisk:
			return <FavoriteBorder />;
		case HealthCheckRating.CriticalRisk:
			return <HeartBroken />;
		default:
			return <HeartBroken />;
	}
};

const HealthCheckEntryDetails = ({ entry, diagnoses }: HealthCheckProps) => {
	return (
		<Box>
			<Typography>{entry.date} <MedicalServices /></Typography>
			<Typography>{entry.description} </Typography>
			{entry.diagnosisCodes && (
				<ul>
					{entry.diagnosisCodes.map(code => <li key={code}>{code} {diagnoses.find(diagnosis => diagnosis.code === code)?.name}</li>)}
				</ul>
			)}
			<HealthIcon healthRating={entry.healthCheckRating} />
			<Typography>diagnose by {entry.specialist} </Typography>
		</Box>
	);
};

const EntryDetails = ({ entry, diagnoses }: EntryDetailsProps) => {
	switch (entry.type) {
		case "Hospital":
			return <HospitalEntryDetails entry={entry} diagnoses={diagnoses} />;
		case "OccupationalHealthcare":
			return <OccupationalHealthcareEntryDetails entry={entry} diagnoses={diagnoses} />;
		case "HealthCheck":
			return <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses} />;
		default:
			return assertNever(entry);
	}
};

export const PatientPage = ({ patient, diagnoses }: PatientPageProps) => {
	return (
		<Box>
			<Typography variant="h4" component="h1">
				{patient.name} {patient.gender === "male" ? <Male /> : patient.gender === "female" ? <Female /> : null}
			</Typography>
			<Divider />
			{patient.ssn && <Typography variant="body1"> ssn: {patient.ssn} </Typography>}
			<Typography variant="body1"> occupation: {patient.occupation} </Typography>
			<Divider />
			<Typography variant="h5">entries</Typography>
			{patient.entries.map(entry => (
				<div key={entry.id}>
					<EntryDetails entry={entry} diagnoses={diagnoses} />
				</div>
			))}
		</Box>
	);
};