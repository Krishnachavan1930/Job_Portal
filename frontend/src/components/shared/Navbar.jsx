"use client"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { Avatar, AvatarImage } from "../ui/avatar"
import { LogOut, User2, Menu, X } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { USER_API_END_POINT } from "@/utils/constant"
import { setUser } from "@/redux/authSlice"
import { toast } from "sonner"
import { useState } from "react"

const Navbar = () => {
  const { user } = useSelector((store) => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
      if (res.data.success) {
        dispatch(setUser(null))
        navigate("/")
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="bg-gradient-to-r from-slate-50 to-slate-100 shadow-sm">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 md:px-6">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-teal-500">Portal</span>
          </h1>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 rounded-md text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex font-medium items-center gap-6">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies" className="text-slate-700 hover:text-teal-600 transition-colors">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className="text-slate-700 hover:text-teal-600 transition-colors">
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="text-slate-700 hover:text-teal-600 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="text-slate-700 hover:text-teal-600 transition-colors">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/browse" className="text-slate-700 hover:text-teal-600 transition-colors">
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="outline" className="border-teal-500 text-teal-600 hover:bg-teal-50">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-teal-500 hover:bg-teal-600 text-white">Signup</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer border-2 border-teal-200 hover:border-teal-400 transition-all">
                  <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname || "User"} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0 overflow-hidden border border-slate-200 shadow-lg rounded-lg">
                <div className="bg-gradient-to-r from-teal-500/10 to-slate-100 p-4">
                  <div className="flex gap-3">
                    <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                      <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname || "User"} />
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-slate-800">{user?.fullname}</h4>
                      <p className="text-sm text-slate-500 line-clamp-2">{user?.profile?.bio || "No bio available"}</p>
                    </div>
                  </div>

                  <div className="flex flex-col mt-4 pt-4 border-t border-slate-200">
                    {user && user.role === "student" && (
                      <div className="flex items-center gap-2 text-slate-700 hover:text-teal-600 transition-colors">
                        <User2 size={18} />
                        <Button variant="link" className="p-0 h-auto text-inherit hover:no-underline">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-slate-700 hover:text-teal-600 transition-colors mt-2">
                      <LogOut size={18} />
                      <Button
                        onClick={logoutHandler}
                        variant="link"
                        className="p-0 h-auto text-inherit hover:no-underline"
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white shadow-lg z-50 md:hidden">
            <div className="px-4 py-6 space-y-4">
              <ul className="space-y-4">
                {user && user.role === "recruiter" ? (
                  <>
                    <li>
                      <Link to="/admin/companies" className="block text-slate-700 hover:text-teal-600">
                        Companies
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/jobs" className="block text-slate-700 hover:text-teal-600">
                        Jobs
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/" className="block text-slate-700 hover:text-teal-600">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/jobs" className="block text-slate-700 hover:text-teal-600">
                        Jobs
                      </Link>
                    </li>
                    <li>
                      <Link to="/browse" className="block text-slate-700 hover:text-teal-600">
                        Browse
                      </Link>
                    </li>
                  </>
                )}
              </ul>

              {!user && (
                <div className="flex flex-col gap-3 pt-4 border-t border-slate-200">
                  <Link to="/login" className="w-full">
                    <Button variant="outline" className="w-full border-teal-500 text-teal-600 hover:bg-teal-50">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" className="w-full">
                    <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">Signup</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
