import { NavigationMenu, Provider } from '@shopify/app-bridge-react';
import { AppProvider as PolarisProvider } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import './styles/globals.css';

// import Routes from './Routes';
import en from '@shopify/polaris/locales/en.json';
import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QueryProvider } from './components';
import config from './configs';
import { ToastProvider } from './context/ToastContext';
import Routes from './Routes';

declare const window: Window & { host?: string };

const App = () => {
  let host = new URLSearchParams(window.location.search).get('host');
  const shopifyHost = config.environment === 'development' ? config.host : host;

  const shopifyConfig = {
    apiKey: config.shopifyApiKey,
    host: shopifyHost,
    forceRedirect: config.environment !== 'development',
  };

  const navigate = useNavigate();
  const location = useLocation();
  const history = useMemo(
    () => ({ replace: (path) => navigate(path, { replace: true }) }),
    [navigate]
  );

  const router = useMemo(
    () => ({
      location,
      history,
    }),
    [location, history]
  );

  useEffect(() => {
    if (location.pathname === '/back/home') {
      navigate('/');
    }
  }, [location]);

  return (
    <PolarisProvider i18n={en}>
      <Provider config={shopifyConfig} router={router}>
        <QueryProvider>
          <ToastProvider>
            <NavigationMenu
              navigationLinks={[
                {
                  label: 'Page',
                  destination: '/page',
                },
              ]}
            />
            <Routes />
          </ToastProvider>
        </QueryProvider>
      </Provider>
    </PolarisProvider>
  );
};

export default App;
