import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'
import useSupercluster from 'use-supercluster'
import Marker from './Marker.jsx'
import { selectLastNameMap } from '../app/allSlice'

const ClusterMarker = ({ children }) => children

const GoogleMap = ({ points, activeItem, handleActiveItem, children, ...props }) => {
  const mapRef = useRef()
  const [bounds, setBounds] = useState(null)
  const [zoom, setZoom] = useState(10)
  const colorMap = useSelector(selectLastNameMap)

  // The other properties set on the points elements are only accessible when zoom level is
  // close enough.
  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 10 },
    disableRefresh: false,
  })

  return (
    <div className='mapWrapper'>
      <GoogleMapReact
        bootstrapURLKeys={{
          // TODO: Remove this.
          key: process.env.VITE_GOOGLE_MAPS_API_KEY,
        }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map
        }}
        // eslint-disable-next-line no-shadow
        onChange={({ zoom, bounds }) => {
          setZoom(zoom)
          setBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat,
          ])
        }}
        {...props}
      >
        {clusters.map(cluster => {
          const [longitude, latitude] = cluster.geometry.coordinates
          const {
            cluster: isCluster,
            point_count: pointCount,
          } = cluster.properties

          if (isCluster) {
            return (
              <ClusterMarker
                key={cluster.id}
                elem={cluster}
                lat={latitude}
                lng={longitude}
                handleActiveItem={handleActiveItem}
              >
                <div
                className="cluster-marker"
                onClick={() => {
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    20,
                  )

                  mapRef.current.setZoom(expansionZoom)
                  mapRef.current.panTo({ lat: latitude, lng: longitude })
                }}
                style={{
                  width: `${20 + (pointCount / points.length) * 1000}px`,
                  height: `${20 + (pointCount / points.length) * 1000}px`,
                  color: 'white',
                  textAlign: 'center',
                  padding: `${2.5 + (pointCount / points.length) * 100}px`,
                  fontWeight: 'bold',
                }}
                >
                {pointCount}
                </div>
              </ClusterMarker>
            )
          }

          return (
            <Marker
              key={cluster.properties.person.id}
              lat={latitude}
              lng={longitude}
              elem={cluster.properties.person}
              color={colorMap[cluster.properties.person.last_name_normed].color}
              handleActiveItem={handleActiveItem}
              activeItem={activeItem}
              {...props}
            >
            </Marker>
          )
        })}
      </GoogleMapReact>
    </div>
  )
}

GoogleMap.propTypes = {
  points: PropTypes.array,
  activeItem: PropTypes.string,
  handleActiveItem: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
}

GoogleMap.defaultProps = {
  children: null,
}

export default GoogleMap
