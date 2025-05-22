import { useEffect, useState } from 'react';
import axios from 'axios';

import '../styles/App.css';


export default function DeletedList() {
  const [list, setList] = useState([]);

  const load = async () => {
    const res = await axios.get('http://localhost:5000/api/contacts/deleted');
    setList(res.data);
  };

  const recover = async (id) => {
    await axios.put(`http://localhost:5000/api/contacts/recover/${id}`);
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="list">
      {list.map(c => (
        <div key={c.id} className="card deleted">
          <img src={c.picture} className={`pic ${c.shape}`} />
          <h3>{c.firstName} {c.lastName}</h3>
          <button onClick={() => recover(c.id)}>Recover</button>
        </div>
      ))}
    </div>
  );
}
