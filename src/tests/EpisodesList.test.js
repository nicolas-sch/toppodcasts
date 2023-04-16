import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { BrowserRouter as Router} from 'react-router-dom';
import EpisodesList from '../components/EpisodesList';


test('renders EpisodesList component without errors', () => {
    render(
        <Router>
            <EpisodesList />
        </Router>
    
    );
});


test('displays "Fetching episodes..." message when loading', () => {
    const { getByText } = render(
        <Router>
            <EpisodesList loading={true} />
        </Router>
    );
    const messageElement = getByText(/fetching episodes/i);
    expect(messageElement).toBeInTheDocument();
});