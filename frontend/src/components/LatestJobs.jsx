import LatestJobCards from "./LatestJobCards"
import { useSelector } from "react-redux"
import { ArrowRight } from "lucide-react"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job)

  return (
    <div className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-teal-500">Latest & Top</span> Job Openings
          </h2>
          <Link to="/browse">
            <Button
              variant="outline"
              className="mt-4 md:mt-0 border-teal-200 text-teal-700 hover:bg-teal-50 hover:border-teal-500 group"
            >
              View all jobs
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {allJobs.length <= 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="text-xl font-medium text-slate-700">No Jobs Available</h3>
            <p className="text-slate-500 mt-2">Check back later for new opportunities</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allJobs?.slice(0, 6).map((job) => (
              <LatestJobCards key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default LatestJobs
