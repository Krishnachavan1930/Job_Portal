"use client"
import { useState } from "react"
import { Button } from "./ui/button"
import { Search, Briefcase } from "lucide-react"
import { useDispatch } from "react-redux"
import { setSearchedQuery } from "@/redux/jobSlice"
import { useNavigate } from "react-router-dom"

const HeroSection = () => {
  const [query, setQuery] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchJobHandler = () => {
    if (query.trim()) {
      dispatch(setSearchedQuery(query))
      navigate("/browse")
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchJobHandler()
    }
  }

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex flex-col items-center gap-6 md:gap-8">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-teal-50 text-teal-600 font-medium border border-teal-100 animate-fade-in">
            <Briefcase className="w-4 h-4 mr-2" />
            No. 1 Job Hunt Website
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
            Search, Apply & <br /> Get Your <span className="text-teal-500">Dream Jobs</span>
          </h1>

          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Find thousands of job opportunities from top companies and start building your career path today.
          </p>

          <div className="relative w-full max-w-2xl mt-4">
            <div className="flex shadow-lg border border-slate-200 rounded-full overflow-hidden bg-white">
              <div className="flex items-center pl-5 text-slate-400">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                placeholder="Search for jobs, companies, or keywords..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="outline-none border-none w-full py-4 px-3 text-slate-700 placeholder:text-slate-400"
              />
              <Button
                onClick={searchJobHandler}
                className="rounded-r-full px-6 bg-teal-500 hover:bg-teal-600 text-white"
              >
                Search
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-4 text-sm text-slate-500">
            <span>Popular searches:</span>
            <button
              onClick={() => {
                dispatch(setSearchedQuery("Software Engineer"))
                navigate("/browse")
              }}
              className="text-teal-600 hover:text-teal-700 hover:underline"
            >
              Software Engineer
            </button>
            <button
              onClick={() => {
                dispatch(setSearchedQuery("Data Scientist"))
                navigate("/browse")
              }}
              className="text-teal-600 hover:text-teal-700 hover:underline"
            >
              Data Scientist
            </button>
            <button
              onClick={() => {
                dispatch(setSearchedQuery("UX Designer"))
                navigate("/browse")
              }}
              className="text-teal-600 hover:text-teal-700 hover:underline"
            >
              UX Designer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
