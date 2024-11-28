import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

interface ProtectedRouteProps {
	element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
	const { user, loading } = useAuth();

	if (loading) {
		return <div>Ładowanie...</div>; // Możesz tu dodać własny komponent ładowania
	}

	if (!user) {
		return <Navigate to='/login' />;
	}

	return element;
};

export default ProtectedRoute;
