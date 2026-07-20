import { ComposableMap, Geographies, Geography } from '@vnedyalk0v/react19-simple-maps'
import type { ProjectionConfig } from '@vnedyalk0v/react19-simple-maps'
import type { Country } from '../data/europeanCountries'

const GEO_URL = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json'

const DEFAULT_FILL = '#D6D6DA'
const SELECTED_FILL = '#3B82F6'
const UNAVAILABLE_FILL = '#4B5563'

interface EuropeMapProps {
  countries: Country[]
  selectedCountryCode: string
  onCountryClick: (code: string) => void
}

function EuropeMap({ countries, selectedCountryCode, onCountryClick }: EuropeMapProps) {
  return (
    <ComposableMap
      projection="geoAzimuthalEqualArea"
      projectionConfig={{
        rotate: [-10, -52, 0] as ProjectionConfig['rotate'],
        scale: 700,
      }}
    >
      <Geographies geography={GEO_URL}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const geoName = geo.properties?.name as string | undefined
            const match = countries.find((country) => country.name === geoName)
            const isClickable = Boolean(match)
            const isSelected = match?.code === selectedCountryCode

            const restFill = isSelected ? SELECTED_FILL : isClickable ? DEFAULT_FILL : UNAVAILABLE_FILL

            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => {
                  if (match) {
                    onCountryClick(match.code)
                  }
                }}
                style={{
                  default: { fill: restFill, outline: 'none' },
                  hover: {
                    fill: isClickable ? '#F53' : restFill,
                    outline: 'none',
                    cursor: isClickable ? 'pointer' : 'default',
                  },
                  pressed: { fill: isClickable ? '#E42' : restFill, outline: 'none' },
                  focused: { fill: restFill, outline: 'none' },
                }}
              />
            )
          })
        }
      </Geographies>
    </ComposableMap>
  )
}

export default EuropeMap