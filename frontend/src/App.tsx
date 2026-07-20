import { useEffect, useState } from 'react';
import CountrySelector from './components/CountrySelector';
import CountryStats from './components/CountryStats';
import EuropeMap from './components/EuropeMap';
import { EUROPEAN_COUNTRIES } from './data/europeanCountries';
import { fetchCountryStats } from './api/countryService';
import type { CountryStats as CountryStatsType } from './types';

function App() {
  const [countryCode, setCountryCode] = useState('se');
  const [stats, setStats] = useState<CountryStatsType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setStats(null);
    setError(null);

    fetchCountryStats(countryCode)
      .then(setStats)
      .catch((err) => setError(err.message));
  }, [countryCode]);

  return (
    <div>
      <CountrySelector
        countries={EUROPEAN_COUNTRIES}
        value={countryCode}
        onChange={setCountryCode}
      />

      {error && <p>Something went wrong: {error}</p>}
      {!error && !stats && <p>Loading...</p>}
      {stats && <CountryStats stats={stats} />}

      <EuropeMap />
    </div>
  );
}

export default App;
