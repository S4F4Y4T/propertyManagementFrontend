import { useEffect, useState } from "react"
import {
  IconUserStar,
  IconCash,
  IconTrendingUp,
  IconTrendingDown,
} from "@tabler/icons-react"
import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import useAxios from "@/hooks/useAxios"

export default function OwnerDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { axiosUser } = useAxios()

  useEffect(() => {

    const fetchDashboard = async () => {
      try {
        const res = await axiosUser.get("/owner/dashboard")

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

  const { summary, products, recentConversions, payouts, invoices } = data

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        <StatCard
          title="Flats"
          value={data.total_flats}
          icon={<IconUserStar className="h-6 w-6 text-yellow-500" />}
          footer="Total Flats"
        />

        <StatCard
          title="Tenants"
          value={data.total_tenants}
          icon={<IconUserStar className="h-6 w-6 text-yellow-500" />}
          footer="Total Tenants"
        />

        <StatCard
          title="Paid Bills"
          value={data.total_paid_bills}
          icon={<IconTrendingUp className="h-6 w-6 text-yellow-500" />}
          footer="Total Paid Bills"
        />

        <StatCard
          title="Unpaid Bills"
          value={data.total_unpaid_bills}
          icon={<IconCash className="h-6 w-6 text-yellow-500" />}
          footer="Total Unpaid Bills"
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
