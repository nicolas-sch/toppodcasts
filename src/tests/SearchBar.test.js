import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router} from 'react-router-dom';
import SearchBar from '../components/SearchBar';

describe('SearchBar component', () => {
  test('renders search input', () => {
    render(
        <Router>
            <SearchBar />
        </Router>
    );
    const inputElement = screen.getByPlaceholderText('Search Podcasts...');
    expect(inputElement).toBeInTheDocument();
  });

  test('calls handleSearch when input value changes', () => {
    const mockHandleSearch = jest.fn();
    render(
        <Router>
            <SearchBar handleSearch={mockHandleSearch} searchTerm="" />
        </Router>
    );
    const inputElement = screen.getByPlaceholderText('Search Podcasts...');
    userEvent.type(inputElement, 'React');
    expect(mockHandleSearch).toHaveBeenCalledTimes(5);
  });
});
