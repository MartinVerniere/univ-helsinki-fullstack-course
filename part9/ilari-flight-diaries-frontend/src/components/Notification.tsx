import './Notification.css';

interface NotificationProps {
	notification: string;
	error: boolean;
}

export const Notification = (props: NotificationProps) => {
	return (
		<div className={`notification ${props.error ? "error" : "success"}`}>
			{props.notification}
		</div>
	);
}
