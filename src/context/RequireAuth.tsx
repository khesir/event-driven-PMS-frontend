import { useContext } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

type Props = {
    allowedRoles: string[]
}
export default function RequireAuth({ allowedRoles }: Props) {
    const { auth } = useContext(AuthContext);
    const location = useLocation();
    const isAllowed = allowedRoles.includes(auth.accessLevel);

    return (
        isAllowed ? (
            <Outlet />
        ) : auth.accessToken ? (
            <Navigate to="/unauthorized" state={{ from: location }} replace />
        ) :
        (
            <Navigate to="/login" state={{ from: location }} replace />
        )
    );
}
