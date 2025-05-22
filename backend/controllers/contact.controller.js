const db = require('../models');
const Contact = db.contact;

exports.createContact = async (req, res) => {
  try {
    const { firstName, lastName, phone, dob, email, shape } = req.body;
    const picture = req.file ? req.file.filename : null;

    const contact = await Contact.create({
      firstName,
      lastName,
      phone,
      dob,
      email,
      picture,
      shape,
      deleted: false
    });

    res.status(201).json(contact);
  } catch (err) {
    console.error('Create Contact Error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll({ where: { deleted: false } });
    res.json(contacts);
  } catch (err) {
    console.error('Get Contacts Error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getDeletedContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll({ where: { deleted: true } });
    res.json(contacts);
  } catch (err) {
    console.error('Get Deleted Contacts Error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.recoverContact = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Contact.update({ deleted: false }, { where: { id } });
    if (updated) {
      res.json({ message: 'Contact recovered' });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (err) {
    console.error('Recover Contact Error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Contact.update({ deleted: true }, { where: { id } });
    if (updated) {
      res.json({ message: 'Contact deleted' });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (err) {
    console.error('Delete Contact Error:', err);
    res.status(500).json({ error: err.message });
  }
};
