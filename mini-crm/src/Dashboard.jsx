function Dashboard({ contacts }) {
  const totalLeads = contacts.length;
  const convertedLeads = contacts.filter(c => c.status === 'Converted').length;
  const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : 0;

  return (
    <div className="dashboard-stats">
      <div className="stat-card">
        <h3>{totalLeads}</h3>
        <p>Total Leads</p>
      </div>
      <div className="stat-card">
        <h3>{convertedLeads}</h3>
        <p>Converted</p>
      </div>
      <div className="stat-card">
        <h3>{conversionRate}%</h3>
        <p>Conversion Rate</p>
      </div>
    </div>
  );
}

export default Dashboard;