import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/App.css';


export default function ContactList() {
  const [list, setList] = useState([]);
  const [sortKey, setSortKey] = useState('firstName');

  const load = async () => {
    const res = await axios.get('http://localhost:5000/api/contacts');
    setList(res.data);
  };

  const del = async (id) => {
    await axios.delete(`http://localhost:5000/api/contacts/${id}`);
    load();
  };

  useEffect(() => {
    load();
  }, []);

  const sorted = [...list].sort((a, b) => a[sortKey].localeCompare(b[sortKey]));

  return (
    <div>
      <select onChange={(e) => setSortKey(e.target.value)}>
        <option value="firstName">First Name</option>
        <option value="lastName">Last Name</option>
        <option value="dob">DOB</option>
      </select>
      <div className="list">
        {sorted.map(c => (
          <div key={c.id} className="card">
            <img src={`http://localhost:5000/uploads/${c.picture}`} className={`pic ${c.shape}`} />
            <h3>{c.firstName} {c.lastName}</h3>
            <p>{c.phone}</p>
            <p>{c.email}</p>
            <p>{c.dob}</p>
            <button onClick={() => del(c.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
