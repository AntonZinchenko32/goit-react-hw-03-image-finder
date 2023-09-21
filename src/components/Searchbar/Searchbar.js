import { Component } from 'react';
import { SearchBar, Form, SearchButton, Input } from './Searchbar.styled.jsx';

class Searchbar extends Component {
  state = { value: '' };

  componentDidUpdate(_, prevState) {
    prevState.value !== this.state.value && this.props.submit(this.state.value);
  }


  handleSubmit = e => {
    e.preventDefault();
    this.setState({ value: e.currentTarget.elements.searchInput.value });
  };

  render() {
    return (
      <SearchBar>
        <Form onSubmit={this.handleSubmit}>
          <SearchButton type="submit" />
          <Input
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
