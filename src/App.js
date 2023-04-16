import { useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { Container, Spinner, Row } from 'react-bootstrap';
import SearchBar from './components/SearchBar';


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
          <Row>
            <Routes>
              <Route>
                
              </Route>
            </Routes>
          </Row>
        </Container>

      )}
    </div>
  );
}

export default App;
