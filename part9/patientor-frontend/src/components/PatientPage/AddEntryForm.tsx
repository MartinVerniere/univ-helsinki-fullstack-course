import { SyntheticEvent, useState } from "react";
import { Diagnosis, EntryFormValues, HealthCheckRating } from "../../types";
import { Alert, Box, Button, ButtonGroup, FormLabel, Grid, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";

interface EntryFormProps {
	diagnoses: Diagnosis[],
	onSubmit: (values: EntryFormValues) => void;
	notification: string | null;
	error: boolean;
}

enum FormTypes {
	"Hospital" = 0,
	"OccupationalHealthcare" = 1,
	"HealthCheck" = 2,
}

interface HospitalFormFieldsProps {
	dischargeDate: string,
	dischargeCriteria: string,
	setDischargeDate: (value: string) => void,
	setDischargeCriteria: (value: string) => void
}

interface OccupationalHealthcareFormFieldsProps {
	employerName: string,
	setEmployerName: (value: string) => void,
	sickLeaveStartDate: string,
	setSickLeaveStartDate: (value: string) => void,
	sickLeaveEndDate: string,
	setSickLeaveEndDate: (value: string) => void,
}

interface HealtCheckFormFieldsProps {
	healthcheckRating: HealthCheckRating,
	setHealthcheckRating: (value: HealthCheckRating) => void
}

const HospitalFormFields = ({ dischargeDate, dischargeCriteria, setDischargeDate, setDischargeCriteria }: HospitalFormFieldsProps) => {
	return (
		<Grid item xs={12}>
			<FormLabel>Discharge</FormLabel>

			<Grid container spacing={2} sx={{ mt: 1 }}>
				<Grid item xs={6}>
					<TextField type="date" label="Date" variant="standard" size="small" fullWidth value={dischargeDate} onChange={e => setDischargeDate(e.target.value)} InputLabelProps={{ shrink: true }} />
				</Grid>

				<Grid item xs={6}>
					<TextField label="Criteria" variant="standard" size="small" fullWidth value={dischargeCriteria} onChange={e => setDischargeCriteria(e.target.value)} InputLabelProps={{ shrink: true }} />
				</Grid>
			</Grid>
		</Grid>
	);
};

const OccupationlaHealthcareFormFields = ({ employerName, sickLeaveStartDate, sickLeaveEndDate, setEmployerName, setSickLeaveStartDate, setSickLeaveEndDate }: OccupationalHealthcareFormFieldsProps) => {
	return (
		<Grid item xs={12}>
			<Grid item xs={12} sx={{ mb: 1 }}>
				<TextField label="Employer Name" variant="standard" size="small" fullWidth value={employerName} onChange={e => setEmployerName(e.target.value)} InputLabelProps={{ shrink: true }} />
			</Grid>

			<FormLabel>Sick Leave</FormLabel>

			<Grid container spacing={2} sx={{ mt: 1 }}>
				<Grid item xs={6}>
					<TextField type="date" label="Start date" variant="standard" size="small" fullWidth value={sickLeaveStartDate} onChange={e => setSickLeaveStartDate(e.target.value)} InputLabelProps={{ shrink: true }} />
				</Grid>

				<Grid item xs={6}>
					<TextField type="date" label="End date" variant="standard" size="small" fullWidth value={sickLeaveEndDate} onChange={e => setSickLeaveEndDate(e.target.value)} InputLabelProps={{ shrink: true }} />
				</Grid>
			</Grid>
		</Grid>
	);
};

const HealthCheckFormFields = ({ healthcheckRating, setHealthcheckRating }: HealtCheckFormFieldsProps) => {
	return (
		<Grid item xs={12}>
			<FormLabel>Health Check</FormLabel>

			<Grid container spacing={2} sx={{ mt: 1 }}>
				<Grid item xs={6}>
					<TextField label="Rating" variant="standard" size="small" fullWidth value={healthcheckRating} onChange={e => setHealthcheckRating(Number(e.target.value) as HealthCheckRating)} InputLabelProps={{ shrink: true }} />
				</Grid>
			</Grid>
		</Grid>
	);
};

export const AddEntryForm = ({ diagnoses, onSubmit, notification, error }: EntryFormProps) => {
	const [formType, setFormType] = useState<FormTypes>(FormTypes.Hospital);

	const changeFormType = (_event: unknown, newValue: FormTypes) => {
		clearForm();
		setFormType(newValue);
	};

	const [date, setDate] = useState("");
	const [description, setDescription] = useState("");
	const [specialist, setSpecialist] = useState("");
	const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

	//Hospital form
	const [dischargeDate, setDischargeDate] = useState("");
	const [dischargeCriteria, setDischargeCriteria] = useState("");

	const clearHospitalForm = () => {
		setDischargeDate("");
		setDischargeCriteria("");
	};

	//OccupationalHealthcare form
	const [employerName, setEmployerName] = useState("");
	const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
	const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");

	const clearOccupationalHealthcareForm = () => {
		setEmployerName("");
		setSickLeaveStartDate("");
		setSickLeaveEndDate("");
	};

	// HealthCheck form
	const [healthcheckRating, setHealthcheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);

	const clearHealthCheckForm = () => {
		setHealthcheckRating(HealthCheckRating.Healthy);
	};

	const clearForm = () => {
		setDate("");
		setDescription("");
		setSpecialist("");
		setDiagnosisCodes([]);

		clearHospitalForm();
		clearOccupationalHealthcareForm();
		clearHealthCheckForm();
	};

	const addEntry = (event: SyntheticEvent) => {
		event.preventDefault();

		switch (formType) {
			case FormTypes.Hospital:
				const newEntryHospital: EntryFormValues = {
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

				onSubmit(newEntryHospital);
				break;
			case FormTypes.OccupationalHealthcare:
				const newEntryOccupationalHealthcare: EntryFormValues = {
					type: "OccupationalHealthcare",
					date,
					description,
					specialist,
					diagnosisCodes,
					employerName: employerName,
					sickLeave: {
						startDate: sickLeaveStartDate,
						endDate: sickLeaveEndDate
					}
				} as EntryFormValues;

				onSubmit(newEntryOccupationalHealthcare);
				break;
			case FormTypes.HealthCheck:
				const newEntryHealthCheck: EntryFormValues = {
					type: "HealthCheck",
					date,
					description,
					specialist,
					diagnosisCodes,
					healthCheckRating: healthcheckRating
				} as EntryFormValues;

				onSubmit(newEntryHealthCheck);
				break;
		}

		clearForm();
	};

	return (
		<form onSubmit={addEntry}>
			{notification && <Alert severity={error ? "error" : "success"}>{notification}</Alert>}

			<ToggleButtonGroup value={formType} exclusive color="primary" size="medium" onChange={changeFormType}>
				<ToggleButton value={FormTypes.Hospital}>Hospital</ToggleButton>
				<ToggleButton value={FormTypes.OccupationalHealthcare}>Occupational Healthcare</ToggleButton>
				<ToggleButton value={FormTypes.HealthCheck}>Health Check</ToggleButton>
			</ToggleButtonGroup>

			<Box component="section" sx={{ p: 2, border: "2px dashed grey", mt: 2 }}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<FormLabel>Date</FormLabel>
						<TextField type="date" variant="standard" size="small" fullWidth value={date} onChange={e => setDate(e.target.value)} InputLabelProps={{ shrink: true }} />
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

						<Select multiple value={diagnosisCodes} onChange={(event: SelectChangeEvent<string[]>) => setDiagnosisCodes(event.target.value as string[])} input={<OutlinedInput label="Diagnosis Codes" />} >
							{diagnoses.map((diagnosis) => (
								<MenuItem key={diagnosis.code} value={diagnosis.code} >
									{diagnosis.name}
								</MenuItem>
							))}
						</Select>
					</Grid>

					{formType === FormTypes.Hospital &&
						<HospitalFormFields
							dischargeDate={dischargeDate}
							setDischargeDate={setDischargeDate}
							dischargeCriteria={dischargeCriteria}
							setDischargeCriteria={setDischargeCriteria}
						/>
					}
					{formType === FormTypes.OccupationalHealthcare &&
						<OccupationlaHealthcareFormFields
							employerName={employerName}
							setEmployerName={setEmployerName}
							sickLeaveStartDate={sickLeaveStartDate}
							setSickLeaveStartDate={setSickLeaveStartDate}
							sickLeaveEndDate={sickLeaveEndDate}
							setSickLeaveEndDate={setSickLeaveEndDate}
						/>
					}
					{formType === FormTypes.HealthCheck &&
						<HealthCheckFormFields
							healthcheckRating={healthcheckRating}
							setHealthcheckRating={setHealthcheckRating}
						/>
					}

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
