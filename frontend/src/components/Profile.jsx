"use client";
import { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Mail, Pen, Phone, FileText, Briefcase, User } from "lucide-react";
import { Badge } from "./ui/badge";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  // Get first letter of name for avatar fallback
  const getInitials = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Card */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-teal-500/10 to-slate-50 p-6 border-b border-slate-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <Avatar className="h-20 w-20 border-4 border-white shadow-sm">
                  <AvatarImage
                    src={user?.profile?.profilePhoto || "/placeholder.svg"}
                    alt={user?.fullname}
                  />
                  <AvatarFallback className="bg-teal-100 text-teal-700 text-xl">
                    {getInitials(user?.fullname)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">
                    {user?.fullname}
                  </h1>
                  <p className="text-slate-600 mt-1">
                    {user?.profile?.bio || "No bio available"}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setOpen(true)}
                variant="outline"
                className="md:self-start border-slate-200 hover:bg-slate-50"
              >
                <Pen className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Information */}
              <div>
                <h2 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
                  <User className="h-5 w-5 mr-2 text-teal-500" />
                  Contact Information
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center text-slate-700">
                    <Mail className="h-4 w-4 mr-3 text-slate-400" />
                    <span>{user?.email || "No email available"}</span>
                  </div>
                  <div className="flex items-center text-slate-700">
                    <Phone className="h-4 w-4 mr-3 text-slate-400" />
                    <span>
                      {user?.phoneNumber || "No phone number available"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h2 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-teal-500" />
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {user?.profile?.skills && user.profile.skills.length > 0 ? (
                    user.profile.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-slate-50 hover:bg-slate-100 text-slate-700"
                      >
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-slate-500">No skills listed</span>
                  )}
                </div>
              </div>

              {/* Resume */}
              <div className="md:col-span-2">
                <h2 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-teal-500" />
                  Resume
                </h2>
                {user?.profile?.resume ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={user.profile.resume}
                    className="inline-flex items-center text-teal-600 hover:text-teal-700 hover:underline"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    {user.profile.resumeOriginalName || "View Resume"}
                  </a>
                ) : (
                  <span className="text-slate-500">No resume uploaded</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Applied Jobs Section */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-xl font-semibold text-slate-800">
              Applied Jobs
            </h2>
          </div>
          <AppliedJobTable />
        </div>
      </div>

      {/* Update Profile Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
