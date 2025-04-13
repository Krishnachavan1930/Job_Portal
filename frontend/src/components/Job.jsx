"use client"
import { Button } from "./ui/button"
import { Bookmark, MapPin, Briefcase, DollarSign, Clock, ExternalLink } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const Job = ({ job }) => {
  const navigate = useNavigate()
  const [isSaved, setIsSaved] = useState(false)

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime)
    const currentTime = new Date()
    const timeDifference = currentTime - createdAt
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60))
  }

  const handleSaveJob = (e) => {
    e.stopPropagation()
    setIsSaved(!isSaved)
    // Here you would typically dispatch an action to save the job in your state management
  }

  return (
    <div
      onClick={() => navigate(`/description/${job?._id}`)}
      className="p-6 rounded-lg border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500 flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="ghost"
          size="icon"
          className={`rounded-full hover:bg-slate-100 ${isSaved ? "text-teal-500" : "text-slate-400"}`}
          onClick={handleSaveJob}
        >
          <Bookmark className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center gap-3 my-4">
        <Avatar className="h-12 w-12 border border-slate-200">
          <AvatarImage src={job?.company?.logo || "/placeholder.svg"} alt={job?.company?.name} />
          <AvatarFallback className="bg-teal-100 text-teal-700">{job?.company?.name?.charAt(0) || "C"}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium text-slate-800">{job?.company?.name}</h3>
          <p className="text-sm text-slate-500 flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            India
          </p>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="font-bold text-xl text-slate-900 group-hover:text-teal-600 transition-colors mb-2">
          {job?.title}
        </h2>
        <p className="text-sm text-slate-600 line-clamp-2">{job?.description}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-5">
        <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
          <Briefcase className="h-3 w-3 mr-1 text-teal-500" />
          {job?.position} Positions
        </Badge>
        <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
          {job?.jobType}
        </Badge>
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
          <DollarSign className="h-3 w-3 mr-1 text-amber-500" />
          {job?.salary} LPA
        </Badge>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
        <Button
          variant="outline"
          className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
          onClick={(e) => {
            e.stopPropagation()
            navigate(`/description/${job?._id}`)
          }}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Details
        </Button>
        <Button
          className={`flex-1 ${
            isSaved ? "bg-slate-100 text-teal-700 hover:bg-slate-200" : "bg-teal-500 hover:bg-teal-600 text-white"
          }`}
          onClick={handleSaveJob}
        >
          <Bookmark className="h-4 w-4 mr-2" />
          {isSaved ? "Saved" : "Save Job"}
        </Button>
      </div>
    </div>
  )
}

export default Job
