import { useEffect, useState } from 'react';

function App() {
  const [status, setStatus] = useState('loading...');

  useEffect(() => {
    fetch('http://localhost:8080/api/health')
      .then((res) => res.json())
      .then((data) => setStatus(data.status))
      .catch(() => setStatus('error'));
  }, []);

  return (
    <div>
      <h1>Backend status: {status}</h1>
    </div>
  );
}

export default App;
