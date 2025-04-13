"use client";
import { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { Search, Filter, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Browse = () => {
  useGetAllJobs();
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Page Header */}
      <div className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <Link
                to="/"
                className="inline-flex items-center text-slate-600 hover:text-teal-600 mb-2"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Home
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center">
                {searchedQuery ? (
                  <>
                    Search Results for{" "}
                    <span className="text-teal-500 ml-2">
                      "{searchedQuery}"
                    </span>
                  </>
                ) : (
                  "Browse All Jobs"
                )}
              </h1>
              <p className="text-slate-500 mt-1">
                Found{" "}
                <span className="font-medium text-slate-700">
                  {allJobs.length}
                </span>{" "}
                job opportunities
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Refine your search..."
                  className="pl-10 pr-4 py-2 border border-slate-200 rounded-md w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={searchedQuery}
                  onChange={(e) => dispatch(setSearchedQuery(e.target.value))}
                />
              </div>
              <Button
                variant="outline"
                className="border-slate-200 text-slate-700 hover:bg-slate-100"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Job Results */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {allJobs.length === 0 ? (
          <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-slate-400" />
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              No jobs found
            </h2>
            <p className="text-slate-500 max-w-md mx-auto mb-6">
              We couldn't find any jobs matching your search criteria. Try
              adjusting your search or browse all available jobs.
            </p>
            <Button
              onClick={() => dispatch(setSearchedQuery(""))}
              className="bg-teal-500 hover:bg-teal-600 text-white"
            >
              View All Jobs
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
