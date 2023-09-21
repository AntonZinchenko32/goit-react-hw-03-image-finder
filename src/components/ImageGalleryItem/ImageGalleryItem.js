import { Item, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  getLargeImage,
  openModalFunc,
}) => {
  return (
    <Item>
      <Image
        src={webformatURL}
        alt="tag"
        width="360px"
        height="240px"
        loading="lazy"
        onClick={() => {
          getLargeImage(largeImageURL)
          openModalFunc()
        }}
      />
    </Item>
  );
};
