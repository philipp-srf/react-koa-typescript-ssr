import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';

export const VideoPlayer = () => {
  const [media, setMedia] = useState<any>({});

  useEffect(() => {
    fetchMedia().then(media => setMedia(media));
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

export async function fetchMedia() {
  const result = await axios.get<any>('/api/video');

  return result.data || {};
}
