import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required.",
        success: false,
      });
    }

    // Check if company already exists
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "You can't register the same company.",
        success: false,
      });
    }

    // Create the company with the logged-in user's userId
    company = await Company.create({
      name: companyName,
      userId: req.userId, // Use req.userId instead of req.id
    });

    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred while registering the company.",
      success: false,
    });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.userId; // Get logged-in user's userId
    const companies = await Company.find({ userId });
    
    if (!companies || companies.length === 0) {
      return res.status(404).json({
        message: "No companies found for this user.",
        success: false,
      });
    }

    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred while fetching companies.",
      success: false,
    });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred while fetching the company.",
      success: false,
    });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    // Handle file upload
    const file = req.file;
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      const logo = cloudResponse.secure_url;

      // Prepare the update data
      const updateData = { name, description, website, location, logo };

      const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

      if (!company) {
        return res.status(404).json({
          message: "Company not found.",
          success: false,
        });
      }

      return res.status(200).json({
        message: "Company information updated successfully.",
        success: true,
      });
    } else {
      return res.status(400).json({
        message: "Logo file is required.",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred while updating the company.",
      success: false,
    });
  }
};
