import axios from 'axios';
import * as React from 'react';
import { Fragment, useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContext';

export const RadioPlayer = () => {
  const appContext = useContext(AppContext);
  const [stations, setStations] = useState<any[]>(
    appContext.getInitialData() || []
  );

  useEffect(() => {
    if (stations.length === 0) {
      fetchStations().then(stations => setStations(stations));
    }
  }, []);

  const playerUrl = `https://player.srf.ch/p/srf/popup?urn=${
    stations[2] ? stations[2].livestream.urn : ''
  }&autoplay=true&start=0`;

  return (
    <Fragment>
      <ul>
        {stations.map(station => (
          <li key={station.channel.id}>{station.channel.name}</li>
        ))}
      </ul>

      {stations[2] && (
        <iframe
          id="srg_player_technical_player"
          src={playerUrl}
          width="100%"
          height="26px"
          frameBorder="0"
          srg-player-id="5337a54d-ab43-4823-9f49-ba06781f996d"
          title="Live - Radio - Play SRF"
          allow="geolocation *; autoplay; encrypted-media"
        />
      )}
    </Fragment>
  );
};

export async function fetchStations() {
  const result = await axios.get<any>('/api/stations');
  return (result.data.stations as any[]) || [];
}
