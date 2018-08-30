import React from 'react';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import NavHeader from './NavHeader';

const issuesView = {
  id: 'product/issues',
  type: 'product',
  getItems: () => [
    {
      type: 'Section',
      id: 'product/issues:header',
      items: [
        {
          type: () => (<NavHeader />),
          id: 'product-issues-header',
        },
        {
          type: 'Item',
          id: 'back-item',
          after: null,
          before: ArrowLeftIcon,
          goTo: 'product/home',
          text: 'Back',
        },
      ],
    },
    {
      type: 'Section',
      nestedGroupKey: 'menu',
      id: 'product/issues:menu',
      parentId: 'product/home:menu',
      items: [
        { type: 'Item', text: 'Search issues', id: 'search-issues' },
        { type: 'GroupHeading', id: 'other-heading', text: 'Other' },
        { type: 'Item', text: 'My open issues', id: 'my-open-issues' },
        { type: 'Item', text: 'Reported by me', id: 'reported-by-me' },
        { type: 'Item', text: 'All issues', id: 'all-issues' },
        { type: 'Item', text: 'Open issues', id: 'open-issues' },
        { type: 'Item', text: 'Done issues', id: 'done-issues' },
        { type: 'Item', text: 'Viewed recently', id: 'viewed-recently' },
        { type: 'Item', text: 'Created recently', id: 'created-recently' },
        { type: 'Item', text: 'Resolved recently', id: 'resolved-recently' },
        { type: 'Item', text: 'Updated recently', id: 'updated-recently' },
        { type: 'Separator', id: 'separator' },
        { type: 'Item', text: 'View all filters', id: 'view-all-filters' },
      ],
    },
  ],
};

export default issuesView;
