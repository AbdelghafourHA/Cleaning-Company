import Request from "../models/request.model.js";

export const createRequest = async (req, res) => {
  try {
    const {
      type,
      clientName,
      phone,
      email,
      address,
      notes,
      agreeToTerms,
      workExperience,
      equipmentType,
      rentalDuration,
      equipmentNotes,
      placeType,
      additionalDetails,
    } = req.body;

    if (!type || !clientName || !phone) {
      return res.status(400).json({
        message: "نوع الطلب واسم العميل ورقم الهاتف مطلوبة",
      });
    }

    const request = await Request.create({
      type,
      clientName,
      phone,
      email,
      address,
      notes,
      agreeToTerms,
      workExperience,
      equipmentType,
      rentalDuration,
      equipmentNotes,
      placeType,
      additionalDetails,
    });

    res.status(201).json({
      message: "تم إنشاء الطلب بنجاح",
      request,
    });
  } catch (error) {
    console.error("Error creating request:", error);
    res.status(500).json({
      message: "حدث خطأ أثناء إنشاء الطلب",
    });
  }
};

export const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({
      message: "حدث خطأ أثناء جلب الطلبات",
    });
  }
};

export const getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "الطلب غير موجود",
      });
    }

    res.status(200).json(request);
  } catch (error) {
    console.error("Error fetching request:", error);
    res.status(500).json({
      message: "حدث خطأ أثناء جلب الطلب",
    });
  }
};

export const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "approved", "rejected", "completed"].includes(status)) {
      return res.status(400).json({
        message: "حالة غير صالحة",
      });
    }

    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "الطلب غير موجود",
      });
    }

    request.status = status;
    await request.save();

    res.status(200).json({
      message: "تم تحديث حالة الطلب بنجاح",
      request,
    });
  } catch (error) {
    console.error("Error updating request status:", error);
    res.status(500).json({
      message: "حدث خطأ أثناء تحديث حالة الطلب",
    });
  }
};

export const updateRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "الطلب غير موجود",
      });
    }

    const updatableFields = [
      "clientName",
      "phone",
      "email",
      "address",
      "notes",
      "workExperience",
      "equipmentType",
      "rentalDuration",
      "equipmentNotes",
      "placeType",
      "additionalDetails",
    ];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        request[field] = req.body[field];
      }
    });

    await request.save();

    res.status(200).json({
      message: "تم تحديث الطلب بنجاح",
      request,
    });
  } catch (error) {
    console.error("Error updating request:", error);
    res.status(500).json({
      message: "حدث خطأ أثناء تحديث الطلب",
    });
  }
};

export const deleteRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "الطلب غير موجود",
      });
    }

    await request.deleteOne();

    res.status(200).json({
      message: "تم حذف الطلب بنجاح",
    });
  } catch (error) {
    console.error("Error deleting request:", error);
    res.status(500).json({
      message: "حدث خطأ أثناء حذف الطلب",
    });
  }
};

export const getRequestsStats = async (req, res) => {
  try {
    const total = await Request.countDocuments();
    const pending = await Request.countDocuments({ status: "pending" });
    const approved = await Request.countDocuments({ status: "approved" });
    const rejected = await Request.countDocuments({ status: "rejected" });
    const completed = await Request.countDocuments({ status: "completed" });

    const byType = {
      work: await Request.countDocuments({ type: "work" }),
      rental: await Request.countDocuments({ type: "rental" }),
      cleaning: await Request.countDocuments({ type: "cleaning" }),
    };

    res.status(200).json({
      total,
      pending,
      approved,
      rejected,
      completed,
      byType,
    });
  } catch (error) {
    console.error("Error getting stats:", error);
    res.status(500).json({
      message: "حدث خطأ أثناء جلب الإحصائيات",
    });
  }
};
