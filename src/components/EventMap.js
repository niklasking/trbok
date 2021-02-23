import React from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';

const secret = require('./secret');
mapboxgl.accessToken = secret.mapboxToken;

//const backendBaseUrl = 'http://localhost:3333';
const backendBaseUrl = 'https://trbokbackend.niklasking.com';

class EventMap extends React.Component {
    state = {
        found: false
    }
    componentDidMount = async () => {
        const url = backendBaseUrl + '/api/v1/activities/' + this.props.eventId + '/details/latlng';
        const result = await axios.get(url);
    
        let geoJSON = {
            "type": "Feature",
            "geometry": {
            "type": "LineString",
            "coordinates": []
            }
        };
        const convertedCoordinates = [];
        if (result.data.data !== undefined) {
            this.setState({ found: true});
            for (let i = 0; i < result.data.data.length; i++) {
                convertedCoordinates[i] = [
                    result.data.data[i][1],
                    result.data.data[i][0]
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
    }

    render() {
        if (!this.state.found) {
            return <div></div>;
        }
        return (
            <div>
              <div id="map" className="absolute top right left bottom" style={{height: '300px'}} />
            </div>
        );
    }
}
export default EventMap;