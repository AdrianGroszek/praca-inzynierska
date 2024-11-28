import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Root from './pages/Root';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import HelpPage from './pages/HelpPage';
import AppPage from './pages/AppPage';
import CourtDescription from './components/appFutures/courts/CourtDescription';
import EventDescription from './components/appFutures/events/EventDescription';
import UserPage from './pages/UserPage';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import ProtectedRoute from './ProtectedRoute';
import { UserProvider } from './context/UserContext';
import EventsContextProvider from './context/events-context';
import CourtsContextProvider from './context/courts-context';

const Router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: 'login',
				element: <LoginForm />,
			},
			{
				path: 'register',
				element: <RegisterForm />,
			},
			{
				path: 'news',
				element: <NewsPage />,
			},
			{
				path: 'help',
				element: <HelpPage />,
			},
			{
				path: 'app/courts',
				element: <ProtectedRoute element={<AppPage />} />,
				children: [
					{
						path: ':courtId',
						element: <CourtDescription />,
					},
				],
			},
			{
				path: 'app/events',
				element: <ProtectedRoute element={<AppPage />} />,
				children: [
					{
						path: ':eventId',
						element: <EventDescription />,
					},
				],
			},
			{
				path: 'app/create',
				element: <ProtectedRoute element={<AppPage />} />,
			},
			{
				path: 'app/user',
				element: <ProtectedRoute element={<UserPage />} />,
			},
		],
	},
]);

function App() {
	return (
		<AuthProvider>
			<UserProvider>
				<EventsContextProvider>
					<CourtsContextProvider>
						<RouterProvider router={Router} />
					</CourtsContextProvider>
				</EventsContextProvider>
			</UserProvider>
		</AuthProvider>
	);
}

export default App;
