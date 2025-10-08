import AdminDashboard from "./admin-dashboard"
import OwnerDashboard from "./owner-dashboard"
import {useAuth} from "../../providers/AuthProvider.jsx";

export default function Dashboard() {

    const { userData } = useAuth();

    return (
    <>
        <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                Dashboard
            </h1>
        </div>

        { userData.role === 'admin' && (<AdminDashboard />) }
        { userData.role === 'owner' && (<OwnerDashboard />) }
    </>
  )
}
