import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';

const ImageGallery = ({ data, getLargeImage, openModalFunc }) => (
  <List>
    {data.map(({ id, webformatURL, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        webformatURL={webformatURL}
        largeImageURL={largeImageURL}
        getLargeImage={getLargeImage}
        openModalFunc={openModalFunc}
      />
    ))}
  </List>
);

export default ImageGallery;
