import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('Fetching Teams from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = Array.isArray(data) ? data : data.results || [];
        setTeams(results);
        console.log('Fetched Teams:', data);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, [endpoint]);

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title mb-4">Teams</h2>
        {teams.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                {Object.keys(teams[0]).map(key => <th key={key}>{key}</th>)}
              </tr>
            </thead>
            <tbody>
              {teams.map((team, idx) => (
                <tr key={team.id || idx}>
                  {Object.values(team).map((value, i) => <td key={i}>{typeof value === 'object' ? JSON.stringify(value) : String(value)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No teams available.</p>
        )}
      </div>
    </div>
  );
};

export default Teams;
