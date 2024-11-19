import React, { useState, useCallback } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const registerNewCompany = useCallback(async (e) => {
    e.preventDefault();
    if (!companyName.trim()) {
      toast.error("Company name is required");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          timeout: 30000, // Increased timeout to 30 seconds
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      } else {
        throw new Error(res.data.message || "Failed to register company");
      }
    } catch (error) {
      console.error("Error registering company:", error);
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED") {
          toast.error("Request timed out. Please try again or check your internet connection.");
        } else if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          toast.error(`Server error: ${error.response.data.message || error.message}`);
        } else if (error.request) {
          // The request was made but no response was received
          toast.error("No response from server. Please try again later.");
        } else {
          // Something happened in setting up the request that triggered an Error
          toast.error(`Error: ${error.message}`);
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [companyName, dispatch, navigate]);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500 mt-2">
            What would you like to name your company? You can change this later.
          </p>
        </div>

        <form onSubmit={registerNewCompany} className="space-y-4">
          <div>
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              type="text"
              className="mt-1"
              placeholder="JobHunt, Microsoft etc."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/companies")}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Registering..." : "Continue"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyCreate;