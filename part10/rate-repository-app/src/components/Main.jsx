import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { RepositoryDetails } from './RepositoryDetails';
import { ReviewForm } from './ReviewForm';

const Main = () => {
	return (
		<>
			<AppBar />
			<Routes>
				<Route path="repositories">
					<Route index element={<RepositoryList />} />
					<Route path=":id" element={<RepositoryDetails />} />
					<Route path="create-review" element={<ReviewForm />} />
				</Route>
				<Route path="/signIn" element={<SignIn />} />
				<Route path="/signUp" element={<SignUp />} />
				<Route path="*" element={<Navigate to="/repositories" replace />} />
			</Routes>
		</>
	);
};

export default Main;