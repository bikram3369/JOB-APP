import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You can't register same company.",
                success: false
            })
        };
        company = await Company.create({
            name: companyName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // logged in user id
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
// get company by id
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// export const updateCompany = async (req, res) => {
//     try {
//         const { name, description, website, location } = req.body;

//         const logoFile = req.files["photo"]?.[0];
 
//         // idhar cloudinary ayega
//         const fileUri = getDataUri(logoFile);
//         const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
//         const logo = cloudResponse.secure_url;
    
//         const updateData = { name, description, website, location, logo };
//         // remove undefined fields

//         const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

//         if (!company) {
//             return res.status(404).json({
//                 message: "Company not found.",
//                 success: false
//             })
//         }
//         return res.status(200).json({
//             message:"Company information updated.",
//             success:true
//         })

//     } catch (error) {
//         console.log(error);
//     }
// }


export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    // ✅ CORRECT for multer().single("photo")
    const logoFile = req.file;

    let logoUrl;

    if (logoFile) {
      const fileUri = getDataUri(logoFile);
      const uploadResult = await cloudinary.uploader.upload(
        fileUri.content,
        {
          resource_type: "image",
          folder: "company_logos",
          public_id: `company_${req.params.id}_${Date.now()}`, // 🔥 force new URL
        }
      );
      logoUrl = uploadResult.secure_url;
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (website !== undefined) updateData.website = website;
    if (location !== undefined) updateData.location = location;
    if (logoUrl) updateData.logo = logoUrl;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message: "No data provided to update.",
        success: false,
      });
    }

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company information updated.",
      company,
      success: true,
    });

  } catch (error) {
    console.error("UPDATE COMPANY ERROR:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
