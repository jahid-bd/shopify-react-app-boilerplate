import { Layout } from '@shopify/polaris';
import UserInfo from '../feature/UserInfo';
import ButtonExample from '../ui/ButtonExample';

const DashboardView = () => {
  return (
    <Layout>
      <Layout.Section>
        <UserInfo />
      </Layout.Section>
      <Layout.Section>
        <ButtonExample />
      </Layout.Section>
    </Layout>
  );
};

export default DashboardView;
