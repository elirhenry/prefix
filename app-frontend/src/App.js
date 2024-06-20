import React, { useEffect, useState } from 'react';

function App() {
  const [server, setServer] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/')
      .then(res => {
        console.log('Response status:', res.status); // Log the HTTP response status
        return res.json();
      })
      .then(data => {
        console.log('Data from server:', data); // Log the data received from the server
        setServer(data);
      })
      .catch(err => console.error('Fetch error:', err)); // Log any fetch errors
  }, []);

  return (
    <div>
      <p>Cookies!</p>
      <ul>
        {server.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
