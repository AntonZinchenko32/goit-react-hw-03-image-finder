import { Component } from 'react';
import { SearchBar, Form, SearchButton, Input } from './Searchbar.styled.jsx';

class Searchbar extends Component {
  state = { value: '' };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.submit(this.state.value);
  };

  render() {
    return (
      <SearchBar>
        <Form onSubmit={this.handleSubmit}>
          <SearchButton type="submit" />
          <Input
            onChange={this.handleChange}
            value={this.state.value}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name='searchInput'
          />
        </Form>
      </SearchBar>
    );
  }
}

export default Searchbar;
