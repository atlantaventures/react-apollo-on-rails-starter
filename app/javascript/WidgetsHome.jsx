import React from 'react';
import Button from '@atlaskit/button';

import EmptyState from '@atlaskit/empty-state';
import exampleImage from './images/elephant.png';

const primaryAction = (
  <Button
    appearance="primary"
    onClick={() => console.log('primary action clicked')}
  >
    Create a Widget
  </Button>
);

const secondaryAction = (
  <Button onClick={() => console.log('secondary action clicked')}>
    Take a Tour
  </Button>
);

const tertiaryAction = (
  <Button
    appearance="subtle-link"
    href="https://www.wikipedia.org/"
    target="_blank"
  >
    Knowledge Base
  </Button>
);

const WidgetsHome = props => (
  <EmptyState
    header="You have no widgets."
    description="Create some widgets below, or check out the knowledge base for more information."
    imageUrl={exampleImage}
    primaryAction={primaryAction}
    secondaryAction={secondaryAction}
    tertiaryAction={tertiaryAction}
  />
);

export default WidgetsHome;
