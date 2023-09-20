import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';

const ImageGallery = ({ data, getLargePicture, openModalFunc }) => (
  <List>
    {data.map(({ id, webformatURL, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        webformatURL={webformatURL}
        largeImageURL={largeImageURL}
        getLargePicture={getLargePicture}
        openModalFunc={openModalFunc}
      />
    ))}
  </List>
);

export default ImageGallery;
