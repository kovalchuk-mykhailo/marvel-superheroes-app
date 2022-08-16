import { useSearchParams } from 'react-router-dom';

const forbiddenKeys: Array<string> = ['page', 'limit', 'offset', 'name'];

const useObjectSearchParams = () => {
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();

  const objectSearchParams: Record<string, string> = Array.from(urlSearchParams).reduce(
    (params, [key, value]) =>
      forbiddenKeys.includes(key) ? { ...params } : { ...params, [key]: value },
    {}
  );

  return {
    objectSearchParams,
    urlSearchParams,
    setUrlSearchParams
  };
};

export default useObjectSearchParams;
