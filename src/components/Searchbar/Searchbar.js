import { Component } from 'react';
import { SearchBar, Form, SearchButton, Input } from './Searchbar.styled.jsx';

export class Searchbar extends Component {
  state = { value: '' };

  componentDidUpdate(_, prevState) {
    const isValueWasUpdate = prevState.value !== this.state.value;

    isValueWasUpdate && this.state.value && this.props.submit(this.state.value);
  }

  handleSubmit = e => {
    e.preventDefault();
    const trimmedInputValue = e.currentTarget.elements.searchInput.value.trim();
    this.setState({ value: trimmedInputValue });
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
            name="searchInput"
          />
        </Form>
      </SearchBar>
    );
  }
}


