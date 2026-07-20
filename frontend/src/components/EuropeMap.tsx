import { ComposableMap, Geographies, Geography } from '@vnedyalk0v/react19-simple-maps'
import type { ProjectionConfig } from '@vnedyalk0v/react19-simple-maps'

const GEO_URL = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json'

function EuropeMap() {
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
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              style={{
                default: { fill: '#D6D6DA', outline: 'none' },
                hover: { fill: '#F53', outline: 'none' },
                pressed: { fill: '#E42', outline: 'none' },
              }}
            />
          ))
        }
      </Geographies>
    </ComposableMap>
  )
}

export default EuropeMap