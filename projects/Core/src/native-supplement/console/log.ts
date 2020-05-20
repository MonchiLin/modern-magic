import { curry } from '../../fp';

const logInfo = (prefix: string) => {
  return (...msg:any[]) => {
    console.log(prefix, ...msg);
  };
};

export {
  logInfo
};
