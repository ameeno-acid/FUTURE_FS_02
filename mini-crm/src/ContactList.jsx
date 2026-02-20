import React from 'react';

function ContactList({ contacts, onDeleteContact, onUpdateContact }) {
  // Helper to format the MongoDB date
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="contact-list">
      <h2>Recent Leads</h2>
      {contacts.length === 0 ? (
        <p>No leads found. Add your first lead above!</p>
      ) : (
        <div className="contact-grid">
          {contacts.map((contact) => (
            <div key={contact._id || contact.id} className="contact-card">
              <div className="card-header">
                <h3>{contact.name}</h3>
                <span className={`status-badge ${contact.status.toLowerCase()}`}>
                  {contact.status}
                </span>
              </div>
              
              <div className="card-body">
                <p><strong>📧 Email:</strong> {contact.email}</p>
                <p><strong>📍 Source:</strong> {contact.source}</p>
                <p><strong>📅 Added:</strong> {formatDate(contact.createdAt)}</p>
                
                {contact.notes && (
                  <div className="notes-section">
                    <strong>📝 Notes:</strong>
                    <p className="notes-text">{contact.notes}</p>
                  </div>
                )}
              </div>

              <div className="card-actions">
                {/* 1. Status Update Dropdown */}
                <select 
                  className="status-dropdown"
                  value={contact.status}
                  onChange={(e) => onUpdateContact(contact._id || contact.id, { status: e.target.value })}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Converted">Converted</option>
                </select>

                {/* 2. Delete Button */}
                <button 
                  className="delete-btn" 
                  onClick={() => onDeleteContact(contact._id || contact.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ContactList;