const Contact = require('../models/Contact');

const submitContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({ success: true, message: 'Submission received. Thank you!', data: contact });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getContacts = async (req, res) => {
  try {
    const query = {};
    if (req.query.cclSlug) query.cclSlug = req.query.cclSlug;
    if (req.query.type) query.type = req.query.type;
    if (req.query.status) query.status = req.query.status;
    const contacts = await Contact.find(query).sort('-createdAt');
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateContactStatus = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!contact) return res.status(404).json({ success: false, message: 'Contact not found' });
    res.json({ success: true, data: contact });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = { submitContact, getContacts, updateContactStatus };
