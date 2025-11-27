import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import { Route, Routes, Navigate } from 'react-router-native';

const Main = () => {
	return (
		<>
			<AppBar />
			<Routes>
				<Route path="/" element={<RepositoryList />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</>
	);
};

export default Main;