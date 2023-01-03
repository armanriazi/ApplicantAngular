import { Injectable } from "@angular/core";

declare function require(name: string);

const config = require('../../../../package.json');

type StorageOptions = {
    session?: boolean
};

@Injectable()
export class StorageService {

    get prefix() {

        return `${config.name.toUpperCase()}@${config.version}:`;
    }

  clear(key: string, options?: StorageOptions) {

    options = options || {};
    let storageLocalStorage = window['localStorage'];
    let storageSession = window['sessionStorage'];

    try {
      if (key == null) {
        storageLocalStorage.clear();
        storageSession.clear();
      }
      else {
        key = this.prefix + key;
        try {
          storageLocalStorage.removeItem(key);
        } catch{ }
        try {
          storageSession.removeItem(key);
        } catch{ }
      }
    }
    catch (error) {
      console.log(error);
    }
 
  }

  get(key: string, options?: StorageOptions) {

        options = options || {};

        try {
     
            key = this.prefix + key;

            let result;

            let value = window[options.session ? 'sessionStorage' : 'localStorage']['getItem'](key);

            if (value == null)
            return null;

            let sections = value.split(':');

            let type = sections[0];

            value = value.replace(`${type}:`, '');

            if (type === 'object') {

                result = JSON.parse(value);
            }
            else if (type === 'string') {

                result = `${value}`;
            }
            else {

                result = eval(value);
            }

            return result;
        }
        catch (error) {
          console.log(error);
        }
    }

    set(key: string, value: any, options?: StorageOptions) {

        options = options || {};

        try {

            key = this.prefix + key;

            let type = typeof value;

            let result = `${type}:`;

            if (type === 'object') {

                result += JSON.stringify(value);
            }
            else {

                result += value;
          }
          //sessionStorage.setItem(key, result);
          window[options.session ? 'sessionStorage' : 'localStorage']['setItem'](key, result);
        }
        catch (error) {
          console.log(error);
        }
    }
}
