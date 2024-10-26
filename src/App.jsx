import { useState } from 'react'
import './App.css'

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingContact, setEditingContact] = useState(null);
  const [newContact, setNewContact] = useState('');

  const addContact = () => {
    setContacts([...contacts, { name: newContact }]);
    setNewContact('');
  };

  const deleteContact = (name) => {
    setContacts(contacts.filter(contact => contact.name !== name));
  };

  const editContact = (oldName, newName) => {
    setContacts(contacts.map(contact => contact.name === oldName ? { name: newName } : contact));
    setEditingContact(null);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedContacts = filteredContacts.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div>
      <input
        type="text"
        value={newContact}
        onChange={(e) => setNewContact(e.target.value)}
        placeholder="Add new contact"
      />
      <button onClick={addContact}>Add</button>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search contacts"
      />

      <ul>
        {sortedContacts.map(contact => (
          <li key={contact.name}>
            {editingContact === contact.name ? (
              <input
                type="text"
                defaultValue={contact.name}
                onBlur={(e) => editContact(contact.name, e.target.value)}
              />
            ) : (
              <>
                {contact.name}
                <button onClick={() => setEditingContact(contact.name)}>Edit</button>
                <button onClick={() => deleteContact(contact.name)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
