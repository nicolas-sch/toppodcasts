import SearchBar from './components/SearchBar';
import { Container, Spinner, Row } from 'react-bootstrap';
import { useState } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

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
        </Container>

      )}
      <SearchBar />
    </div>
  );
}

export default App;
