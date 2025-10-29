import { createRoot } from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './NotificationContext'
import { UserContextProvider } from './UserContext'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
	<UserContextProvider>
		<NotificationContextProvider>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</NotificationContextProvider>
	</UserContextProvider>
)