import { useState } from 'react';
import axios from 'axios';
import '../styles/App.css';

export default function ContactForm() {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    dob: '',
    email: '',
    picture: null,
    shape: 'circle',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    dob: '',
    email: '',
  });

  const validate = () => {
    const nameRegex = /^[A-Z][a-zA-Z]{0,49}$/;
    const phoneRegex = /^\+91\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const dobRegex = /^\d{2}\/\d{2}\/\d{4}$/;

    const newErrors = {};

    newErrors.firstName = nameRegex.test(data.firstName)
      ? ''
      : 'First name must start with uppercase and max 50 alphabets';

    newErrors.lastName = nameRegex.test(data.lastName)
      ? ''
      : 'Last name must start with uppercase and max 50 alphabets';

    newErrors.phone = phoneRegex.test(data.phone)
      ? ''
      : 'Phone must be in format +91XXXXXXXXXX';

    newErrors.email = emailRegex.test(data.email)
      ? ''
      : 'Invalid email format';

    newErrors.dob = dobRegex.test(data.dob)
      ? ''
      : 'DOB must be in dd/mm/yyyy format';

    setErrors(newErrors);

    return Object.values(newErrors).every((msg) => msg === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    try {
      await axios.post('http://localhost:5000/api/contacts', formData);
      alert('Contact saved!');
      setData({
        firstName: '',
        lastName: '',
        phone: '',
        dob: '',
        email: '',
        picture: null,
        shape: 'circle',
      });
      setErrors({});
    } catch (error) {
      alert('Error saving contact');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        placeholder="First Name"
        value={data.firstName}
        onChange={(e) => setData({ ...data, firstName: e.target.value })}
      />
      {errors.firstName && <p className="error">{errors.firstName}</p>}

      <input
        placeholder="Last Name"
        value={data.lastName}
        onChange={(e) => setData({ ...data, lastName: e.target.value })}
      />
      {errors.lastName && <p className="error">{errors.lastName}</p>}

      <input
        placeholder="Phone (+911234567890)"
        value={data.phone}
        onChange={(e) => setData({ ...data, phone: e.target.value })}
      />
      {errors.phone && <p className="error">{errors.phone}</p>}

      <input
        placeholder="DOB (dd/mm/yyyy)"
        value={data.dob}
        onChange={(e) => setData({ ...data, dob: e.target.value })}
      />
      {errors.dob && <p className="error">{errors.dob}</p>}

      <input
        placeholder="Email"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />
      {errors.email && <p className="error">{errors.email}</p>}

      <input
        type="file"
        onChange={(e) => setData({ ...data, picture: e.target.files[0] })}
      />

      <select
        value={data.shape}
        onChange={(e) => setData({ ...data, shape: e.target.value })}
      >
        <option value="circle">Circle</option>
        <option value="square">Square</option>
        <option value="rectangle">Rectangle</option>
      </select>

      <button type="submit">Save Contact</button>
    </form>
  );
}
