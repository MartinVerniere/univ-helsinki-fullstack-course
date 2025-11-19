import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';
import { Diagnosis, Patient } from "./types";
import patientService from "./services/patients";
import diagnosesService from "./services/diagnoses";
import PatientListPage from "./components/PatientListPage";
import { PatientPage } from "./components/PatientPage";

const App = () => {
	const [patients, setPatients] = useState<Patient[]>([]);
	const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

	useEffect(() => {
		void axios.get<void>(`http://localhost:3000/ping`);

		const fetchPatientList = async () => {
			const patients = await patientService.getAll();
			setPatients(patients);
		};
		const fetchDiagnoses = async () => {
			const diagnoses = await diagnosesService.getAll();
			setDiagnoses(diagnoses);
		};

		void fetchPatientList();
		void fetchDiagnoses();
	}, []);

	const match = useMatch('/patients/:id');
	const patient = match
		? patients.find(patient => patient.id === match.params.id)
		: null;

	return (
		<div className="App">
			<Container>
				<Typography variant="h3" style={{ marginBottom: "0.5em" }}>
					Patientor
				</Typography>
				<Button component={Link} to="/" variant="contained" color="primary">
					Home
				</Button>
				<Divider hidden />
				<Routes>
					<Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
					{patient && <Route path={`/patients/${patient.id}`} element={<PatientPage patient={patient} diagnoses={diagnoses} />} />}
				</Routes>
			</Container>
		</div>
	);
};

export default App;
