import type { Country } from '../data/europeanCountries'

interface CountrySelectorProps {
  countries: Country[]
  value: string
  onChange: (code: string) => void
}

function CountrySelector({ countries, value, onChange }: CountrySelectorProps) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {countries.map((country) => (
        <option key={country.code} value={country.code}>
          {country.name}
        </option>
      ))}
    </select>
  )
}

export default CountrySelector