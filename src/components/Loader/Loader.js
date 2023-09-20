import { ThreeDots } from 'react-loader-spinner';
import { LoaderWrapper } from './Loader.styled';

export const Loader = () => (
  <LoaderWrapper>
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="#4fa94d"
      ariaLabel="three-dots-loading"
      visible={true}
    />
  </LoaderWrapper>
);
