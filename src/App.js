import { useEffect, useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { Container, Spinner, Row } from 'react-bootstrap';
import SearchBar from './components/SearchBar';
import PodcastList from './components/PodcastList';
import EpisodesList from './components/EpisodesList';

function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { trackId } = useParams();
  const podcastListUrl =
    'https://itunes.apple.com/search?term=podcast&country=US&limit=100';

  useEffect(() => {
    const fetchPodcasts = async () => {
      const response = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          `${podcastListUrl}`
        )}`
      );
      const data = await response.json();
      const prettyToJSON = JSON.parse(data.contents);

      await setPodcasts(prettyToJSON.results);
      setIsLoading(false);
    };

    fetchPodcasts();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPodcasts = podcasts.filter((podcast) => {
    return podcast.trackName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div 
      className="d-flex justify-content-center align-items-center mt-5"
      style={{ minHeight: '100vh' }}
    >
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Fetching episodes...</span>
        </Spinner>
      ) : (
        <Container>
          <SearchBar handleSearch={handleSearch} searchTerm={searchTerm} />
          <Row>
            <Routes>
              <Route>
                <Route path='*' Component={<PodcastList podcasts={filteredPodcasts} trackId={trackId} />} />
                <Route path='podcast/:trackId' element={<EpisodesList />} />
              </Route>
            </Routes>
          </Row>
        </Container>

      )}
    </div>
  );
}

export default App;
