import { useSearchParams } from 'react-router-dom';

const useObjectSearchParams = () => {
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();

  const objectSearchParams: Record<string, string> = Array.from(urlSearchParams).reduce(
    (params, [key, value]) => ({ ...params, [key]: value }),
    {}
  );

  return {
    objectSearchParams,
    urlSearchParams,
    setUrlSearchParams
  };
};

export default useObjectSearchParams;
