import { useEffect, useState } from "react"
import {
  IconUserStar,
} from "@tabler/icons-react"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import useAxios from "@/hooks/useAxios"

export default function AdminDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { axiosUser } = useAxios()

  useEffect(() => {

    const fetchDashboard = async () => {
      try {
        const res = await axiosUser.get("/admin/dashboard")

        setData(res.data)
        setLoading(false)
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong")
      }
    }

    fetchDashboard()
  }, [axiosUser])

  if (loading) return <p>Loading dashboard...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        <StatCard
          title="Owners"
          value={data.total_owner}
          icon={<IconUserStar className="h-6 w-6 text-yellow-500" />}
          footer="Total Owners"
        />

        <StatCard
          title="Tenants"
          value={data.total_tenant}
          icon={<IconUserStar className="h-6 w-6 text-yellow-500" />}
          footer="Total Tenants"
        />

      </div>
    </>
  )
}

function StatCard({ title, value, icon, footer }) {
  return (
    <Card className="hover:shadow-md transition">
      <CardHeader className="flex items-center justify-between">
        <CardDescription>{title}</CardDescription>
        {icon}
      </CardHeader>
      <CardTitle className="text-3xl font-bold text-center">{value}</CardTitle>
      <CardFooter className="text-sm text-muted-foreground">{footer}</CardFooter>
    </Card>
  )
}
