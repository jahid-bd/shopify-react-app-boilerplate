import { TitleBar, useAppBridge } from '@shopify/app-bridge-react';
import { Page } from '@shopify/polaris';

import DashboardView from '@/components/view/DashboardView';
import { getSessionToken } from '@shopify/app-bridge-utils';
import { useEffect } from 'react';
import '../styles/globals.css';

export default function HomePage() {
  // check authentication when app run in the admin
  const app = useAppBridge();
  console.log('App', app);

  const getToken = async () => {
    const sessionToken = await getSessionToken(app);
    console.log('sessionToken', sessionToken);
  };

  useEffect(() => {
    getToken();
  });

  return (
    <Page>
      <TitleBar title="Dashboard" />
      <DashboardView />
    </Page>
  );
}
