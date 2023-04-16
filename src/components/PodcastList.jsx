import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Routes, Route, Link } from 'react-router-dom';
import EpisodesList from './EpisodesList';

const PodcastList = ({ podcasts }) => {
  return (
    <>
      {podcasts.map((podcast) => (
        <Col key={podcast.trackId} xs={12} sm={6} md={4} lg={3}>
          <Card key={podcast.trackId} className="mb-4" data-testid="podcast">
            <Card.Img variant="top" src={podcast.artworkUrl600} alt={podcast.trackName} />
            <Card.Body>
              <Card.Title>{podcast.trackName}</Card.Title>
              <Card.Text>{podcast.artistName}</Card.Text>
              <Link to={`podcast/${podcast.trackId}`}>View Episodes</Link>
              <Routes>
                <Route
                  path={`podcast/${podcast.trackId}`}
                  element={<EpisodesList trackId={podcast.trackId} />}
                ></Route>
              </Routes>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </>
  );
};

export default PodcastList;
