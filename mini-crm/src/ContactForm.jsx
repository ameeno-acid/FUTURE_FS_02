import { useState } from 'react';

function ContactForm({ onAddContact }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    source: 'Website Contact Form',
    status: 'New',
    notes: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 
    
    // We call the function passed from App.jsx
    // This function already contains the axios.post logic
    onAddContact(formData);
    
    // Clear the form fields locally
    setFormData({ 
      name: '', 
      email: '', 
      source: 'Website Contact Form', 
      status: 'New', 
      notes: '' 
    });
  };

  return (
    <div className="form-container">
      <h2>Add New Lead</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
        </div>
        
        <div>
          <select name="source" value={formData.source} onChange={handleChange} className="form-input">
            <option value="Website Contact Form">🌐 Website Contact Form</option>
            <option value="Referral">🤝 Referral</option>
            <option value="Social Media">📱 Social Media</option>
          </select>
        </div>

        <div>
          <select name="status" value={formData.status} onChange={handleChange} className="form-input">
            <option value="New">🔵 New Lead</option>
            <option value="Contacted">🟡 Contacted</option>
            <option value="Converted">🟢 Converted</option>
          </select>
        </div>

        <div>
          <textarea 
            name="notes" 
            placeholder="Add follow-up notes here..." 
            value={formData.notes} 
            onChange={handleChange} 
            className="form-input notes-area"
            rows="3"
          />
        </div>

        <button type="submit">Save Lead</button>
      </form>
    </div>
  );
}

export default ContactForm;