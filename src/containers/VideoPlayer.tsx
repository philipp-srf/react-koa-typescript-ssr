import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';

export const VideoPlayer = () => {
  const [media, setMedia] = useState<any>({});

  useEffect(() => {
    async function fetchStations() {
      const result = await axios.get<any>(
        'http://il.srf.ch/integrationlayer/2.0/srf/mediaComposition/video/6dfeb34c-43ae-4baf-94da-6069fdf1d507.json'
      );
      setMedia(result.data || {});
    }

    fetchStations();
  }, []);

  return (
    <Fragment>
      {media.episode && (
        <Fragment>
          <h1>{media.episode.title}</h1>
          <p>{media.episode.description}</p>

          <iframe
            src={`//tp.srgssr.ch/p/srf/embed?urn=${media.chapterUrn}`}
            width="624"
            height="351"
            frameBorder="0"
            allow="geolocation *; autoplay; encrypted-media"
          />
        </Fragment>
      )}
    </Fragment>
  );
};
