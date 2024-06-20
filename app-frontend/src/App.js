import React, { useEffect, useState } from 'react';

function App() {
  const [server, setServer] = useState([])

  useEffect(() => {
  fetch('http://localhost:8080/')
  .then(res => res.json())
  .then(data => setServer(data))
  }, [])
  return (
    <div>
      <p>Cookies!</p>
    </div>
  );
}

export default App;
