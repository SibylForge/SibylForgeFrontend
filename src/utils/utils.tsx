// eslint-disable-next-line import/no-extraneous-dependencies
import { mapKeys, camelCase } from 'lodash';

class Utils {
  static serializer(data: object) {
    const newObj = mapKeys(data, (_, key: string) => camelCase(key));
    return newObj;
  }
}

export default Utils;
