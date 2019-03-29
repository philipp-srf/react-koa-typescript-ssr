import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';

export const RadioPlayer = () => {
  const [stations, setStations] = useState<any[]>([]);

  useEffect(() => {
    async function fetchStations() {
      const result = await axios.get<any>('/play/stations');
      const stations = (result.data.stations as any[]) || [];
      setStations(stations);
    }

    fetchStations();
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
