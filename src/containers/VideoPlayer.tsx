import axios from 'axios';
import * as React from 'react';
import { Fragment, useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContext';

export const VideoPlayer = () => {
  const appContext = useContext(AppContext);
  const [media, setMedia] = useState<any>(appContext.getInitialData() || {});

  useEffect(() => {
    if (!media.episode) {
      fetchMedia().then(media => setMedia(media));
    }
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
