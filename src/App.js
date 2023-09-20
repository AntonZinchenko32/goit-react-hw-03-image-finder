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
    images: null,
    totalHits: null,

    isLoading: false,
    error: '',
    searchQuery: '',
    pageNumber: 1,
    showModal: false,
    modalImage: null,
  };

  componentDidUpdate(_, prevState) {
    prevState.searchQuery !== this.state.searchQuery && this.fetchImages();
  }

  handleSetSearchQuery = value => {
    this.setState({ searchQuery: value });
  };

  fetchImages = async () => {
    try {
      await this.setState({ pageNumber: 1 });
      await this.setState({ images: null });
      this.setState({ isLoading: true });
      const data = await getAllImages(
        this.state.searchQuery,
        this.state.pageNumber
      );
      console.log(data);
      this.setState({ images: data.hits });
      this.setState({ totalHits: data.totalHits });
    } catch (error) {
      this.setState({ error: error.response.data });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  fetchMoreImages = async () => {
    try {
      await this.setState(({ pageNumber }) => ({
        pageNumber: pageNumber + 1,
      }));

      this.setState({ isLoading: true });

      const data = await getAllImages(
        this.state.searchQuery,
        this.state.pageNumber
      );

      this.setState(({ images }) => ({
        images: images.concat(data.hits),
      }));
    } catch (error) {
      this.setState({ error: error.response.data });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  toogleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    console.log(this.state.showModal);
  };

  getLargePicture = pictureURL => {
    this.setState({ modalImage: pictureURL });
  };

  render() {
    const { isLoading, images, showModal, modalImage, totalHits } = this.state;
    const {
      handleSetSearchQuery,
      fetchMoreImages,
      toogleModal,
      getLargePicture,
    } = this;
    return (
      <>
        <Global />
        <AppWrapper>
          {showModal && <Modal modalImage={modalImage} onClose={toogleModal} />}
          <Searchbar submit={handleSetSearchQuery}></Searchbar>
          {isLoading && <Loader />}
          {images && images.length !== 0 && (
            <>
              <ImageGallery
                data={images}
                getLargePicture={getLargePicture}
                openModalFunc={toogleModal}
              ></ImageGallery>
              {totalHits > images.length && (
                <Button LoadMoreFunc={fetchMoreImages}></Button>
              )}
            </>
          )}
        </AppWrapper>
      </>
    );
  }
}
