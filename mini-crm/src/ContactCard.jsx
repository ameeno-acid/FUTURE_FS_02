import { useState } from 'react';

function ContactCard({ contact, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(contact);

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="contact-card edit-mode">
        <input type="text" name="name" value={editData.name} onChange={handleEditChange} className="form-input" />
        <input type="email" name="email" value={editData.email} onChange={handleEditChange} className="form-input" />
        
        <select name="source" value={editData.source || 'Website Contact Form'} onChange={handleEditChange} className="form-input">
          <option value="Website Contact Form">🌐 Website Contact Form</option>
          <option value="Referral">🤝 Referral</option>
          <option value="Social Media">📱 Social Media</option>
        </select>

        <select name="status" value={editData.status || 'New'} onChange={handleEditChange} className="form-input">
          <option value="New">🔵 New Lead</option>
          <option value="Contacted">🟡 Contacted</option>
          <option value="Converted">🟢 Converted</option>
        </select>

        <textarea 
          name="notes" 
          value={editData.notes || ''} 
          onChange={handleEditChange} 
          className="form-input notes-area"
          rows="3"
        />
        
        <div className="button-group">
          <button onClick={handleSave} className="save-btn">Save</button>
          <button onClick={() => setIsEditing(false)} className="cancel-btn">Cancel</button>
        </div>
      </div>
    );
  }

  const safeStatus = contact.status || 'New';

  return (
    <div className="contact-card">
      <span className={`status-badge ${safeStatus.toLowerCase()}`}>
        {safeStatus}
      </span>
      
      <h3>{contact.name}</h3>
      <p>📧 {contact.email}</p>
      {/* Replaced phone with source */}
      <p>🌐 {contact.source || 'Website Contact Form'}</p> 
      
      {/* Added the Notes Display block */}
      <div className="notes-display">
        <strong>Notes:</strong> 
        <p>{contact.notes || 'No notes yet.'}</p>
      </div>
      
      <div className="button-group">
        <button onClick={() => setIsEditing(true)} className="edit-btn">Edit</button>
        <button onClick={() => onDelete(contact.id)} className="delete-btn">Delete</button>
      </div>
    </div>
  );
}

export default ContactCard;