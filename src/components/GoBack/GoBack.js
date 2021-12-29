import { useHistory, useLocation } from 'react-router-dom';
import s from './GoBack.module.scss';

const GoBack = () => {
  const history = useHistory();
  const location = useLocation();

  const onGoBack = () => {
    history.push(location?.state?.from?.location ?? '/');
  };

  return (
    <button
      className={s.Button}
      type="button"
      aria-label="Go Back"
      onClick={onGoBack}
    >
      Back
    </button>
  );
};

export default GoBack;
