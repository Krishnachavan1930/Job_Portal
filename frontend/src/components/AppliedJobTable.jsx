import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Badge } from "./ui/badge"
import { useSelector } from "react-redux"
import { Calendar, AlertCircle } from 'lucide-react'

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job)

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  // Function to get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200 hover:bg-red-200"
      case "approved":
        return "bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
      case "pending":
      default:
        return "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200"
    }
  }

  return (
    <div className="rounded-lg border border-slate-200 overflow-hidden">
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="text-slate-700">Date</TableHead>
            <TableHead className="text-slate-700">Job Role</TableHead>
            <TableHead className="text-slate-700">Company</TableHead>
            <TableHead className="text-right text-slate-700">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8">
                <div className="flex flex-col items-center justify-center text-slate-500">
                  <AlertCircle className="h-8 w-8 mb-2 text-slate-400" />
                  <p>You haven't applied to any jobs yet.</p>
                  <p className="text-sm mt-1">Start exploring opportunities and submit your applications.</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id} className="hover:bg-slate-50">
                <TableCell className="font-medium flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                  {formatDate(appliedJob?.createdAt)}
                </TableCell>
                <TableCell className="text-slate-700">{appliedJob.job?.title || "N/A"}</TableCell>
                <TableCell className="text-slate-700">{appliedJob.job?.company?.name || "N/A"}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline" className={getStatusBadge(appliedJob.status)}>
                    {appliedJob.status?.toUpperCase() || "PENDING"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable

