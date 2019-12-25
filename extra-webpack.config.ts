import { CustomWebpackBrowserSchema } from '@angular-builders/custom-webpack';
import * as webpack from 'webpack';

export default (config: webpack.Configuration, options: CustomWebpackBrowserSchema) => {
  config.module.rules.push({
    test: /\.mock$/,
    use: [{ loader: 'raw-loader' }]
  });

  return config;
};
