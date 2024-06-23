import { Box, Card, Text } from '@shopify/polaris';

export default function CardWithTitle({ title, description, userId }) {
  return (
    <Card roundedAbove="sm">
      <Text as="h2" variant="headingSm">
        <span style={{ color: 'red' }}>{userId}.</span> {title}
      </Text>
      <Box paddingBlockStart="200">
        <Text as="p" variant="bodyMd">
          {description}
        </Text>
      </Box>
    </Card>
  );
}
