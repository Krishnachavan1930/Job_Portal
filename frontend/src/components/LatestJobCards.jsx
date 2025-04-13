"use client"
import { Badge } from "./ui/badge"
import { useNavigate } from "react-router-dom"
import { Building2, MapPin, Briefcase, DollarSign } from "lucide-react"

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-6 rounded-lg border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-lg flex items-center text-slate-800">
            <Building2 className="h-4 w-4 mr-2 text-teal-500" />
            {job?.company?.name}
          </h3>
          <p className="text-sm text-slate-500 flex items-center mt-1">
            <MapPin className="h-3 w-3 mr-1" />
            India
          </p>
        </div>
        <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-200">{job?.jobType}</Badge>
      </div>

      <div className="mt-4">
        <h2 className="font-bold text-xl text-slate-900 group-hover:text-teal-600 transition-colors">{job?.title}</h2>
        <p className="text-sm text-slate-600 mt-2 line-clamp-2">{job?.description}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-slate-100">
        <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100">
          <Briefcase className="h-3 w-3 mr-1 text-teal-500" />
          {job?.position} Positions
        </Badge>
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100">
          {/* <DollarSign className="h-3 w-3 mr-1 text-amber-500" /> */}
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  )
}

export default LatestJobCards
