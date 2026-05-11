import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Fetching Activities from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = Array.isArray(data) ? data : data.results || [];
        setActivities(results);
        console.log('Fetched Activities:', data);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, [endpoint]);

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title mb-4">Activities</h2>
        {activities.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                {Object.keys(activities[0]).map(key => <th key={key}>{key}</th>)}
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, idx) => (
                <tr key={activity.id || idx}>
                  {Object.values(activity).map((value, i) => <td key={i}>{typeof value === 'object' ? JSON.stringify(value) : String(value)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No activities available.</p>
        )}
      </div>
    </div>
  );
};

export default Activities;
