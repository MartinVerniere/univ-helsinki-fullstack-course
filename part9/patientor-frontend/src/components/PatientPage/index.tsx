import { Female, Male } from "@mui/icons-material";
import { Patient } from "../../types";
import { Box, Typography } from "@mui/material";

interface PatientPageProps {
	patient: Patient
}

export const PatientPage = ({ patient }: PatientPageProps) => {
	return (
		<Box>
			<Typography variant="h4" component="h1">
				{patient.name} {patient.gender === "male" ? <Male /> : patient.gender === "female" ? <Female /> : null}
			</Typography>
			{patient.ssn && <Typography variant="body1">ssn: {patient.ssn}</Typography>}
			<Typography variant="body1"> occupation: {patient.occupation} </Typography>
		</Box>
	);
};