import { LoadMoreBtn } from './Button.styled';

export const Button = ({ pageTurner }) => {
  return (
    <LoadMoreBtn type="button" onClick={pageTurner}>
      Load more
    </LoadMoreBtn>
  );
};
