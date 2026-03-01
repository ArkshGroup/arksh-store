const ApiError = require("../errors/api-error");
const Contact = require("../models/Contact");

module.exports.addContact = async (req, res, next) => {
  try {
    const { name, email, phone, company, message } = req.body;
    if (!name || !email || !phone || !message) {
      throw new ApiError(400, "Name, email, phone and message are required");
    }
    const contact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: String(phone).trim(),
      company: company ? String(company).trim() : "",
      message: message.trim(),
    });
    await contact.save();
    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: { _id: contact._id },
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, read } = req.query;
    const filter = {};
    if (read !== undefined) filter.read = read === "true";
    const skip = (Number(page) - 1) * Number(limit);
    const [data, total] = await Promise.all([
      Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).lean(),
      Contact.countDocuments(filter),
    ]);
    res.status(200).json({
      success: true,
      data,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id).lean();
    if (!contact) throw new ApiError(404, "Contact not found");
    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.updateContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).lean();
    if (!contact) throw new ApiError(404, "Contact not found");
    res.status(200).json({
      success: true,
      message: "Contact updated",
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) throw new ApiError(404, "Contact not found");
    res.status(200).json({
      success: true,
      message: "Contact deleted",
    });
  } catch (error) {
    next(error);
  }
};
