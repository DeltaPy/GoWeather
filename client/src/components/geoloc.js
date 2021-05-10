import React, { useState } from 'react'
import Geolocation from "react-geolocation";
function geoloc() {

    let [lat, setLat] = useState(0.0);
    let [lon, setLon] = useState(0.0);
    return (
        <div>
            <Geolocation
            render={({
                fetchingPosition,
                position: { coords: { latitude, longitude } = {} } = {},
                error,
                getCurrentPosition
            }) => {
                while(typeof latitude !== 'undefined') {
                    setLat({latitude});
                    setLon({longitude});
            }}}
             />
        </div>
    )
}

export default geoloc;
