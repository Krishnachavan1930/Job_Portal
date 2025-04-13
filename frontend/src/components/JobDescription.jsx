"use client"
import { useEffect, useState } from "react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { useParams } from "react-router-dom"
import axios from "axios"
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant"
import { setSingleJob } from "@/redux/jobSlice"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"
import { Briefcase, Building2, Calendar, Clock, DollarSign, MapPin, Users, CheckCircle2, ArrowLeft } from 'lucide-react'
import { Link } from "react-router-dom"

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job)
  const { user } = useSelector((store) => store.auth)
  const isInitiallyApplied = singleJob?.applications?.some((application) => application.applicant === user?._id) || false
  const [isApplied, setIsApplied] = useState(isInitiallyApplied)
  const [isLoading, setIsLoading] = useState(false)

  const params = useParams()
  const jobId = params.id
  const dispatch = useDispatch()

  const applyJobHandler = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true })

      if (res.data.success) {
        setIsApplied(true)
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        }
        dispatch(setSingleJob(updatedSingleJob))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true })
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job))
          setIsApplied(res.data.job.applications.some((application) => application.applicant === user?._id))
        }
      } catch (error) {
        console.log(error)
        toast.error("Failed to load job details")
      }
    }
    fetchSingleJob()
  }, [jobId, dispatch, user?._id])

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  if (!singleJob) {
    return (
      <div className="max-w-7xl mx-auto my-10 px-4">
        <div className="text-center py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/4 mx-auto mb-8"></div>
            <div className="h-32 bg-slate-200 rounded w-full mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <Link to="/browse" className="inline-flex items-center text-slate-600 hover:text-teal-600 mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Jobs
      </Link>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">{singleJob?.title}</h1>
              <div className="flex items-center text-slate-500 mb-4">
                <Building2 className="h-4 w-4 mr-2" />
                <span className="font-medium">{singleJob?.company?.name}</span>
                <span className="mx-2">•</span>
                <MapPin className="h-4 w-4 mr-1" />
                <span>{singleJob?.location || "Remote"}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
                  <Briefcase className="h-3 w-3 mr-1 text-teal-500" />
                  {singleJob?.position} Positions
                </Badge>
                <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                  {singleJob?.jobType}
                </Badge>
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                  <DollarSign className="h-3 w-3 mr-1 text-amber-500" />
                  {singleJob?.salary} LPA
                </Badge>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <Button
                onClick={isApplied ? null : applyJobHandler}
                disabled={isApplied || isLoading}
                className={`rounded-lg px-6 ${
                  isApplied
                    ? "bg-slate-100 text-teal-700 hover:bg-slate-100"
                    : "bg-teal-500 hover:bg-teal-600 text-white"
                }`}
              >
                {isLoading ? (
                  "Processing..."
                ) : isApplied ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Already Applied
                  </>
                ) : (
                  "Apply Now"
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="p-6 md:p-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Job Description</h2>
          <div className="space-y-4 text-slate-700">
            <p>{singleJob?.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
              <div className="flex items-start">
                <Briefcase className="h-5 w-5 mr-3 text-slate-400 mt-0.5" />
                <div>
                  <h3 className="font-medium text-slate-800">Role</h3>
                  <p>{singleJob?.title}</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-slate-400 mt-0.5" />
                <div>
                  <h3 className="font-medium text-slate-800">Location</h3>
                  <p>{singleJob?.location || "Remote"}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-5 w-5 mr-3 text-slate-400 mt-0.5" />
                <div>
                  <h3 className="font-medium text-slate-800">Experience</h3>
                  <p>{singleJob?.experience} years</p>
                </div>
              </div>

              <div className="flex items-start">
                <DollarSign className="h-5 w-5 mr-3 text-slate-400 mt-0.5" />
                <div>
                  <h3 className="font-medium text-slate-800">Salary</h3>
                  <p>{singleJob?.salary} LPA</p>
                </div>
              </div>

              <div className="flex items-start">
                <Users className="h-5 w-5 mr-3 text-slate-400 mt-0.5" />
                <div>
                  <h3 className="font-medium text-slate-800">Total Applicants</h3>
                  <p>{singleJob?.applications?.length || 0}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Calendar className="h-5 w-5 mr-3 text-slate-400 mt-0.5" />
                <div>
                  <h3 className="font-medium text-slate-800">Posted Date</h3>
                  <p>{formatDate(singleJob?.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDescription

