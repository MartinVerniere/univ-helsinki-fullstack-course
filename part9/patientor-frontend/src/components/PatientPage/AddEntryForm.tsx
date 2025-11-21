import { SyntheticEvent, useState } from "react";
import { EntryFormValues } from "../../types";
import { Alert, Box, Button, ButtonGroup, Chip, FormLabel, Grid, Stack, TextField } from "@mui/material";

interface EntryFormProps {
	onSubmit: (values: EntryFormValues) => void;
	notification: string | null;
	error: boolean;
}

export const AddEntryForm = ({ onSubmit, notification, error }: EntryFormProps) => {
	const [date, setDate] = useState("");
	const [description, setDescription] = useState("");
	const [specialist, setSpecialist] = useState("");
	const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
	const [diagnosisToAdd, setDiagnosisToAdd] = useState("");

	const [dischargeDate, setDischargeDate] = useState("");
	const [dischargeCriteria, setDischargeCriteria] = useState("");

	const addDiagnosisCode = () => {
		if (!diagnosisToAdd.trim()) return;
		setDiagnosisCodes(previousCodes => [...previousCodes, diagnosisToAdd.trim()]);
		setDiagnosisToAdd("");
	};

	const clearForm = () => {
		setDate("");
		setDescription("");
		setSpecialist("");
		setDiagnosisCodes([]);
		setDiagnosisToAdd("");
		setDischargeDate("");
		setDischargeCriteria("");
	};

	const addEntry = (event: SyntheticEvent) => {
		event.preventDefault();

		const newEntry: EntryFormValues = {
			type: "Hospital",
			date,
			description,
			specialist,
			diagnosisCodes,
			discharge: {
				date: dischargeDate,
				criteria: dischargeCriteria
			}
		} as EntryFormValues;

		onSubmit(newEntry);
		clearForm();
	};

	return (
		<form onSubmit={addEntry}>
			{notification && <Alert severity={error ? "error" : "success"}>{notification}</Alert>}

			<Box component="section" sx={{ p: 2, border: "2px dashed grey", mt: 2 }}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<FormLabel>Date</FormLabel>
						<TextField variant="standard" size="small" fullWidth value={date} onChange={e => setDate(e.target.value)} InputLabelProps={{ shrink: true }} />
					</Grid>
					<Grid item xs={12}>
						<FormLabel>Description</FormLabel>
						<TextField variant="standard" size="small" fullWidth value={description} onChange={e => setDescription(e.target.value)} />
					</Grid>
					<Grid item xs={12}>
						<FormLabel>Specialist</FormLabel>
						<TextField variant="standard" size="small" fullWidth value={specialist} onChange={e => setSpecialist(e.target.value)} />
					</Grid>

					<Grid item xs={12}>
						<FormLabel>Diagnosis Codes</FormLabel>

						<Stack direction="row" spacing={1} sx={{ mt: 1, mb: 1 }}>
							{diagnosisCodes.map((code, i) => (<Chip key={i} label={code} />))}
						</Stack>

						<Stack direction="row" spacing={1}>
							<TextField variant="standard" size="small" fullWidth value={diagnosisToAdd} onChange={e => setDiagnosisToAdd(e.target.value)} />
							<Button onClick={addDiagnosisCode} variant="outlined"> Add </Button>
							<Button type="button" color="error" onClick={() => setDiagnosisCodes([])}>Clear</Button>
						</Stack>
					</Grid>

					<Grid item xs={12}>
						<FormLabel>Discharge</FormLabel>

						<Grid container spacing={2} sx={{ mt: 1 }}>
							<Grid item xs={6}>
								<TextField label="Date" variant="standard" size="small" fullWidth value={dischargeDate} onChange={e => setDischargeDate(e.target.value)} InputLabelProps={{ shrink: true }} />
							</Grid>

							<Grid item xs={6}>
								<TextField label="Criteria" variant="standard" size="small" fullWidth value={dischargeCriteria} onChange={e => setDischargeCriteria(e.target.value)} />
							</Grid>
						</Grid>
					</Grid>

					<Grid item xs={12}>
						<ButtonGroup>
							<Button type="button" color="error" onClick={clearForm}> Cancel </Button>
							<Button type="submit" color="success"> Add </Button>
						</ButtonGroup>
					</Grid>
				</Grid>
			</Box>
		</form>
	);
};
