import { TitleBar } from '@shopify/app-bridge-react';
import { Page } from '@shopify/polaris';

import DashboardView from '@/components/view/DashboardView';
import '../styles/globals.css';

export default function HomePage() {
  return (
    <Page>
      <TitleBar title="Dashboard" />
      <DashboardView />
    </Page>
  );
}
