import React, { useEffect, useState } from 'react';

function App() {
  const [server, setServer] = useState()

  useEffect(() => {
  fetch('/test')
  .then(response => response.json())
  .then(
    data => {
      setServer(data)
    }
  )
  }, [])
  return (
    <div>
      <p>Cookies!</p>
    </div>
  );
}

export default App;
