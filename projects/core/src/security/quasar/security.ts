import { LocalStorage } from 'quasar';
import { userProfileKey, securityKey, beforeLoginPathKey } from '../../constant/security.constant';

let temp;

export class Security {
  public static getUserProfile () {
    try {
      temp = JSON.parse(LocalStorage.getItem(userProfileKey));
    } catch (e) {
      temp = null;
    }
    return temp;
  }

  public static getSecurity () {
    return JSON.parse(LocalStorage.getItem(securityKey));
  }

  public static setUserProfile (o: any) {
    LocalStorage.set(userProfileKey, JSON.stringify(o));
  }

  public static setSecurity (o: any) {
    LocalStorage.set(securityKey, JSON.stringify(o));
  }

  public static setBeforeLoginPath (path: string) {
    LocalStorage.set(beforeLoginPathKey, path);
  }

  public static getBeforeLoginPath (): string {
    return LocalStorage.getItem(beforeLoginPathKey);
  }

  public static clear () {
    LocalStorage.remove(userProfileKey);
    LocalStorage.remove(securityKey);
    LocalStorage.remove(beforeLoginPathKey);
  }
}
