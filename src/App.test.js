import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PodcastList from './components/PodcastList';
import App from './App';


test('fetches podcasts and updates state correctly', async () => {
    const mockPodcasts = [{ trackName: 'Podcast 1' }, { trackName: 'Podcast 2' }];
  
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ contents: JSON.stringify({ results: mockPodcasts }) })
      })
    );
  
    await act(async () => {
      render(
        <Router>
            <App />
        </Router>
      );
    });
  
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://api.allorigins.win/get?url=https%3A%2F%2Fitunes.apple.com%2Fsearch%3Fterm%3Dpodcast%26country%3DUS%26limit%3D100');
  
    expect(screen.getByText('Podcast 1')).toBeInTheDocument();
    expect(screen.getByText('Podcast 2')).toBeInTheDocument();
  });

  

test('displays podcast data correctly', () => {
  const mockPodcasts = [
    { 
      trackId: 1,
      trackName: 'Podcast 1', 
      artistName: 'Artist 1', 
      artworkUrl600: 'https://example.com/image1.jpg' 
    },
    { 
      trackId: 2,
      trackName: 'Podcast 2', 
      artistName: 'Artist 2', 
      artworkUrl600: 'https://example.com/image2.jpg' 
    }
  ];

  const { getByText, getByAltText } = render(
    <Router> 
      <PodcastList podcasts={mockPodcasts} />
    </Router>
  );
  // Check if each podcast is displayed correctly
  expect(getByText('Podcast 1')).toBeInTheDocument();
  expect(getByText('Artist 1')).toBeInTheDocument();
  expect(getByAltText('Podcast 1')).toHaveAttribute('src', 'https://example.com/image1.jpg');
  expect(getByText('Podcast 2')).toBeInTheDocument();
  expect(getByText('Artist 2')).toBeInTheDocument();
  expect(getByAltText('Podcast 2')).toHaveAttribute('src', 'https://example.com/image2.jpg');
});