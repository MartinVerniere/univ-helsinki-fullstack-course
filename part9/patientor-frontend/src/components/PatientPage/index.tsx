import { Female, Male } from "@mui/icons-material";
import { Diagnosis, Patient } from "../../types";
import { Box, Divider, Typography } from "@mui/material";

interface PatientPageProps {
	patient: Patient
	diagnoses: Diagnosis[]
}

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
					<Typography variant="body1"> {entry.date} {entry.description} </Typography>
					{entry.diagnosisCodes && (
						<ul>
							{entry.diagnosisCodes.map(code => <li key={code}>{code} {diagnoses.find(diagnosis => diagnosis.code === code)?.name}</li>)}
						</ul>
					)}
				</div>
			))}
		</Box>
	);
};