import React from 'react';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import FolderIcon from '@atlaskit/icon/glyph/folder';
import IssueIcon from '@atlaskit/icon/glyph/issue';
import PreferencesIcon from '@atlaskit/icon/glyph/preferences';

import LinkItem from '../LinkItem';

import NavHeader from './NavHeader';

const homeView = {
  id: 'product/home',
  type: 'product',
  getItems: () => [
    {
      type: 'Section',
      id: 'product/home:header',
      items: [
        {
          type: () => (<NavHeader />),
          id: 'product-home-header',
        },
      ],
    },
    {
      type: 'Section',
      id: 'product/home:menu',
      nestedGroupKey: 'menu',
      items: [
        {
          type: LinkItem,
          id: 'dashboards',
          before: DashboardIcon,
          text: 'Dashboards',
          to: '/',
        },
        {
          type: 'Item',
          id: 'projects',
          before: FolderIcon,
          text: 'Projects',
        },
        {
          type: 'Item',
          id: 'issues-and-filters',
          goTo: 'product/issues',
          before: IssueIcon,
          text: 'Issues and filters',
        },
        {
          type: LinkItem,
          id: 'settings',
          before: PreferencesIcon,
          text: 'Settings',
          to: '/my-settings',
        },
      ],
    },
  ],
};

export default homeView;
