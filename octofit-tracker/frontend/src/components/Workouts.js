import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    console.log('Fetching Workouts from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = Array.isArray(data) ? data : data.results || [];
        setWorkouts(results);
        console.log('Fetched Workouts:', data);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, [endpoint]);

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title mb-4">Workouts</h2>
        {workouts.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                {Object.keys(workouts[0]).map(key => <th key={key}>{key}</th>)}
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, idx) => (
                <tr key={workout.id || idx}>
                  {Object.values(workout).map((value, i) => <td key={i}>{typeof value === 'object' ? JSON.stringify(value) : String(value)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No workouts available.</p>
        )}
      </div>
    </div>
  );
};

export default Workouts;
