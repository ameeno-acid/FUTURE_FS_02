import { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is installed: npm install axios
import './App.css';
import Dashboard from './Dashboard';
import ContactForm from './ContactForm';
import ContactList from './ContactList';

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // 1. Fetch leads from MongoDB when the component loads
  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5001/api/leads');
      setContacts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching leads from MongoDB:", error);
      setLoading(false);
    }
  };

  // 2. Updated to Save to MongoDB via Backend
  const addContact = async (newContact) => {
    try {
      const response = await axios.post('http://localhost:5001/api/leads', newContact);
      // Refresh list from DB to ensure we have the MongoDB _id
      setContacts([...contacts, response.data]);
      fetchLeads(); 
    } catch (error) {
      console.error("Error saving lead:", error);
      alert("Failed to save to database. Check if backend is running.");
    }
  };

  // 3. Delete from MongoDB
  const deleteContact = async (idToDelete) => {
    try {
      await axios.delete(`http://localhost:5001/api/leads/${idToDelete}`);
      const updatedContacts = contacts.filter((contact) => (contact._id || contact.id) !== idToDelete);
      setContacts(updatedContacts);
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  const updateContact = async (id, updatedData) => {
  try {
    // Send the update to your Node.js server
    const response = await axios.put(`http://localhost:5001/api/leads/${id}`, updatedData);
    
    // Update the local state so the UI changes instantly
    setContacts(contacts.map(c => (c._id === id ? response.data : c)));
    console.log("✅ Lead updated successfully!");
  } catch (error) {
    console.error("❌ Error updating lead:", error);
    alert("Failed to update lead. Is the backend running?");
  }
};

  // Add a new state for the status filter at the top of App()
const [statusFilter, setStatusFilter] = useState('All');

// Update your filtering logic:
const filteredContacts = contacts.filter((contact) => {
  const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase());
  const matchesStatus = statusFilter === 'All' || contact.status === statusFilter;
  return matchesSearch && matchesStatus;
});
  return (
    <div className="app-container">
      <h1>Mini CRM Dashboard</h1>
      
      {loading ? (
        <p>Connecting to MongoDB Atlas...</p>
      ) : (
        <>
          <Dashboard contacts={contacts} />
          <ContactForm onAddContact={addContact} />
          
          <div className="search-container">
            <input 
              type="text" 
              placeholder="🔍 Search live contacts..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <ContactList 
            contacts={filteredContacts} 
            onDeleteContact={deleteContact}
            onUpdateContact={updateContact}
          />
        </>
      )}
    </div>
  );
}

export default App;