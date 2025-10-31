import { Alert } from '@mui/material'
import { useSelector } from 'react-redux'

const Notification = () => {
	const notification = useSelector(({ notification }) => { return notification })

	if (!notification) return null

	return <Alert severity="success">{notification}</Alert>
}

export default Notification