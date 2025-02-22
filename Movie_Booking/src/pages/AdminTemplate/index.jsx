import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminTemplate() {
  const { data } = useSelector((state) => state.authReducer);
  // Nếu chưa login => redirect về trang /auth
  if (!data) {
    return <Navigate to="/auth" />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );s
}
