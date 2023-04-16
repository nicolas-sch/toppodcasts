import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import PodcastList from '../components/PodcastList';
import { BrowserRouter as Router} from 'react-router-dom';


describe('PodcastList component', () => {
  const podcasts = [
    {
      trackId: 1,
      trackName: 'Podcast 1',
      artistName: 'Artist 1',
      artworkUrl600: 'https://example.com/artwork1.png',
    },
    {
      trackId: 2,
      trackName: 'Podcast 2',
      artistName: 'Artist 2',
      artworkUrl600: 'https://example.com/artwork2.png',
    },
  ];

  it('should render all podcasts', () => {
    const { getAllByTestId } = render(
      <Router>
        <PodcastList podcasts={podcasts} />
      </Router>
    );

    const podcastElements = getAllByTestId('podcast');
    expect(podcastElements).toHaveLength(podcasts.length);
  });

  it('should render podcast information', () => {
    const { getByText, getByAltText } = render(
      <Router>
        <PodcastList podcasts={podcasts} />
      </Router>
    );

    podcasts.forEach((podcast) => {
      expect(getByText(podcast.trackName)).toBeInTheDocument();
      expect(getByText(podcast.artistName)).toBeInTheDocument();
      expect(getByAltText(podcast.trackName)).toBeInTheDocument();
    });
  });
  
});