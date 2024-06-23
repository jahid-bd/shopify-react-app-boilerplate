import { getUserInfo } from '@/actions/userInfo';
import { Grid, Page, Spinner } from '@shopify/polaris';
import { useQuery } from 'react-query';
import CardWithTitle from '../ui/CardWithTitle';

function UserInfo() {
  const { data, isLoading } = useQuery(['getUserInfo'], getUserInfo);

  const userInfo = data?.slice(0, 10);

  if (isLoading) {
    return <Spinner accessibilityLabel="Spinner" size="large" />;
  }

  return (
    <Page fullWidth>
      <div style={{ marginBottom: '30px' }}>
        <h1>User Info</h1>
        <p>Here&lsquo;s a list of user info descriptions</p>
      </div>
      <Grid>
        {userInfo.map((user) => (
          <Grid.Cell
            key={user.id}
            columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}
          >
            <CardWithTitle
              title={user.title}
              description={user.body}
              userId={user.id}
            />
          </Grid.Cell>
        ))}
      </Grid>
    </Page>
  );
}

export default UserInfo;
