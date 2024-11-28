import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { Toaster } from 'react-hot-toast';

export default function Root() {
	return (
		<>
			<ScrollToTop />
			<Navbar />
			<Outlet />
			<Footer />
			<Toaster />
		</>
	);
}
