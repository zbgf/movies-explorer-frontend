import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => { return props.isLogged ? props.children : <Navigate to="/" replace /> };

export default ProtectedRoute;