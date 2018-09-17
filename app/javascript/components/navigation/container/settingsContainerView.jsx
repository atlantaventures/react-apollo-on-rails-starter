import React from 'react';

import { Link } from 'react-router-dom';

import PersonCircleIcon from '@atlaskit/icon/glyph/person-circle';
import PreferencesIcon from '@atlaskit/icon/glyph/preferences';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';

import LinkItem from '../LinkItem';

const settingsContainerView = {
  id: 'product/settings',
  type: 'container',
  getItems: () => [
    {
      type: 'Section',
      id: 'product/settings:header',
      items: [
        {
          type: 'ContainerHeader',
          before: SettingsIcon,
          text: 'Settings',
          subText: (
            <Link to="/">Back to Home</Link>
          ),
          id: 'project-header',
        },
      ],
    },
    {
      type: 'Section',
      nestedGroupKey: 'menu',
      id: 'settings/home:menu',
      parentId: null,
      items: [
        {
          type: LinkItem,
          before: PersonCircleIcon,
          text: 'Profile',
          id: 'profile',
          to: '/my-settings/profile',
        },
        {
          type: LinkItem,
          before: PreferencesIcon,
          text: 'Privacy',
          id: 'privacy',
          to: '/my-settings/privacy',
        },
      ],
    },
  ],
};

export default settingsContainerView;
