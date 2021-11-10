import { resolve as _resolve } from 'path';

export const resolve = {
  alias: {
    lib: _resolve(__dirname, 'lib/'),
    config: _resolve(__dirname, 'config/'),
    utils: _resolve(__dirname, 'utils/'),
    data: _resolve(__dirname, 'data/'),
    components: _resolve(__dirname, 'components/'),
  },
};