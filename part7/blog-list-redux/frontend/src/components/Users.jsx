import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {
	if (!users) return <div>Loading users...</div>

	return (
		<div>
			<h2>Users</h2>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Users</TableCell>
							<TableCell>Blogs created</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map(user => (
							<TableRow key={user.id}>
								<TableCell>
									<Link to={`/users/${user.id}`}>{user.name}</Link>
								</TableCell>
								<TableCell>
									{user.blogs.length}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}

export default Users