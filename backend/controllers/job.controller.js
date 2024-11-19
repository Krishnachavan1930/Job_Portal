import { Job } from "../models/job.model.js";
import { Company } from "../models/company.model.js";

// Admin post job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.userId;  // Correct userId extraction

        // Check if all required fields are provided
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            });
        }

        // Validate and convert experienceLevel to a number
        const experienceLevel = Number(experience);
        if (isNaN(experienceLevel)) {
            return res.status(400).json({
                message: "Experience level must be a valid number.",
                success: false
            });
        }

        // Check if the company ID exists
        const companyExists = await Company.findById(companyId);
        if (!companyExists) {
            return res.status(400).json({
                message: "Invalid company ID.",
                success: false
            });
        }

        // Create the job entry
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel, // Ensure experience is a valid number
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

// Get all jobs for students
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };

        const jobs = await Job.find(query).populate({
            path: "company",
            select: "name location"  // Populate only necessary fields
        }).sort({ createdAt: -1 });

        if (jobs.length === 0) {
            return res.status(404).json({
                message: "No jobs found.",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

// Get job by ID for students
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications",
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

// Get jobs created by admin
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.userId;  // Correct userId extraction
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: 'company',
            select: 'name location'  // Populate only necessary fields
        }).sort({ createdAt: -1 });

        if (jobs.length === 0) {
            return res.status(404).json({
                message: "No jobs found.",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
