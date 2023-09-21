import React, { Component } from 'react';
import { Loader } from 'components/Loader/Loader.js';

// Стили
import { Global } from 'Global.styled.jsx';
import { AppWrapper } from 'App.styled.jsx';
import { Button } from 'components/Button/Button.js';

// Компоненты
import { getAllImages } from './components/services/api.js';
import Searchbar from './components/Searchbar/Searchbar.js';
import ImageGallery from './components/ImageGallery/ImageGallery.js';
import { Modal } from 'components/Modal/Modal.js';

export class App extends Component {
  state = {
    images: [],
    totalHits: null,

    isLoading: false,
    error: '',
    searchQuery: '',
    pageNumber: 1,
    showModal: false,
    modalImage: null,
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, pageNumber } = this.state;

    const searchQueryWasUpdate = prevState.searchQuery !== searchQuery;
    const pageNumberWasUpdate = prevState.pageNumber !== pageNumber;

    if (searchQueryWasUpdate || pageNumberWasUpdate) this.fetchImages();
  }

  handleSearch = value => {
    this.setState({ searchQuery: value, pageNumber: 1, images: [] });
  };

  // Записуємо дані з бекенду
  fetchImages = async () => {
    const { searchQuery, pageNumber } = this.state;

    this.setState({ isLoading: false });
    try {
      const data = await getAllImages(searchQuery, pageNumber);

      this.setState(({ images }) => ({
        images: [...images, ...data.hits],
        totalHits: data.totalHits,
      }));
    } catch (error) {
      this.setState({ error: error.response.data });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  pageTurner = () => {
    this.setState(({ pageNumber }) => ({
      pageNumber: pageNumber + 1,
    }));
  };

  toogleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  getLargeImage = imageURL => {
    this.setState({ modalImage: imageURL });
  };

  render() {
    const { isLoading, images, showModal, modalImage, totalHits } = this.state;
    const { handleSearch, pageTurner, toogleModal, getLargeImage } = this;
    return (
      <>
        <Global />
        <AppWrapper>
          {showModal && <Modal modalImage={modalImage} onClose={toogleModal} />}
          <Searchbar submit={handleSearch} />
          {isLoading && <Loader />}
          {images.length !== 0 && (
            <>
              <ImageGallery
                data={images}
                getLargeImage={getLargeImage}
                openModalFunc={toogleModal}
              />
              {totalHits > images.length && <Button pageTurner={pageTurner} />}
            </>
          )}
        </AppWrapper>
      </>
    );
  }
}
