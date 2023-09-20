import { LoadMoreBtn } from './Button.styled';

export const Button = ({ LoadMoreFunc }) => {
  return (
    <LoadMoreBtn type="button" onClick={LoadMoreFunc}>
      Load more
    </LoadMoreBtn>
  );
};
