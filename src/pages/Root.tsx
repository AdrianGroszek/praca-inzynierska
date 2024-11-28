import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import CourtsContextProvider from '../context/courts-context';
import EventsContextProvider from '../context/events-context';
import { UserLoginProvider } from '../context/user-login-context';
import { Toaster } from 'react-hot-toast';

export default function Root() {
	return (
		<EventsContextProvider>
			<UserLoginProvider>
				<CourtsContextProvider>
					<ScrollToTop />
					<Navbar />
					<Outlet />
					<Footer />
					<Toaster />
				</CourtsContextProvider>
			</UserLoginProvider>
		</EventsContextProvider>
	);
}
