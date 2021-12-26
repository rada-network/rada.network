import React, { Suspense } from 'react';
import { withI18n } from 'storybook-addon-i18n';
import { addParameters, addDecorator } from '@storybook/react';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { RouterContext } from "next/dist/shared/lib/router-context";

const customViewports = {
  iPhone5: {
    name: 'iPhone5',
    styles: {
      width: '320px',
      height: '568px',
    },
  },
  iPhone6: {
    name: 'iPhone6,7,8',
    styles: {
      width: '375px',
      height: '667px',
    },
  },
  iPhoneX: {
    name: 'iPhoneX',
    styles: {
      width: '375px',
      height: '812px',
    },
  },
  iPhoneXsMax: {
    name: 'iPhoneXsMax',
    styles: {
      width: '414px',
      height: '896px',
    },
  },
};

export const parameters = {
  viewport: {
    viewports: {
      ...MINIMAL_VIEWPORTS,
      ...customViewports,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    defaultLocale: 'en',
    locales: ['en', 'vi'],
    debug: true,
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    initImmediate: false,
  });

addParameters({
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
});

export function i18nProviderWrapper({ children, i18n, locale }) {
  React.useEffect(() => {
    i18n.changeLanguage(locale);
    document.documentElement.setAttribute('lang', locale);
    document.querySelector('html body').setAttribute('lang', locale);
  }, [i18n, locale]);
  return <>{children}</>;
}

addParameters({
  i18n: {
    provider: i18nProviderWrapper,
    providerProps: {
      i18n: i18n,
    },
    supportedLocales: ['en', 'vi'],
  },
});

addDecorator(withI18n);

addDecorator((story) => <Suspense fallback="Loading...">{story()}</Suspense>);