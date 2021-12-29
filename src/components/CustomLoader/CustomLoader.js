import Loader from 'react-loader-spinner';
import s from './CustomLoader.module.scss';

const CustomLoader = () => {
  return (
    <div className={s.CustomLoader}>
      <Loader type="ThreeDots" color="#1976d2" height={200} width={200} />
    </div>
  );
};

export default CustomLoader;
