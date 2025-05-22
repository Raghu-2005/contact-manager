import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ContactForm from './components/Contactform';
import ContactList from './components/ContactList';
import DeletedList from './components/DeletedList';

export default function App() {
  return (
    <BrowserRouter>
      <h1 className="title">Contact Manager</h1>
      <nav className="nav">
        <Link to="/">Add Contact</Link>
        <Link to="/contacts">View Contacts</Link>
        <Link to="/deleted">Deleted Contacts</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ContactForm />} />
        <Route path="/contacts" element={<ContactList />} />
        <Route path="/deleted" element={<DeletedList />} />
      </Routes>
    </BrowserRouter>
  );
}
