import React from 'react';
import mapboxgl from 'mapbox-gl';

const secret = require('./secret');
mapboxgl.accessToken = secret.mapboxToken;

class EventMap extends React.Component {
    componentDidMount() {
        let geoJSON = {
            "type": "Feature",
            "geometry": {
            "type": "LineString",
            "coordinates": []
            }
        };
        const convertedCoordinates = [];
        for (let i = 0; i < this.props.data.length; i++) {
            convertedCoordinates[i] = [
                this.props.data[i][1],
                this.props.data[i][0]
            ];
        }
        geoJSON.geometry.coordinates = convertedCoordinates;
//        console.log(geojson);
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/outdoors-v11',
            center: convertedCoordinates[0],
            zoom: 10
        });

        map.on('load', function () {
            map.addSource('route', { type: 'geojson', data: geoJSON });
            map.addLayer({
                "id": "route",
                "type": "line",
                "source": "route",
                "paint": {
                    "line-color": "red",
                    "line-opacity": 0.75,
                    "line-width": 1
                }
            });
            const bounds = convertedCoordinates.reduce(function(bounds, coord) {
                return bounds.extend(coord);
              }, new mapboxgl.LngLatBounds(convertedCoordinates[0], convertedCoordinates[0]));
            map.fitBounds(bounds, {
                padding: 20 // add some spacing around the coordinates
            });
        });
    }

    render() {
//        console.log(this.props.data);

        return (
            <div>
              <div id="map" className="absolute top right left bottom" style={{height: '300px'}} />
            </div>
        );
    }
}
export default EventMap;