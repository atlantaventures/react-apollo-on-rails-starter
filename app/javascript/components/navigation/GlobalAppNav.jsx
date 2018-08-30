import React from 'react';
import UserAvatarCircleIcon from '@atlaskit/icon/glyph/user-avatar-circle';
import QuestionCircleIcon from '@atlaskit/icon/glyph/question-circle';
import SearchIcon from '@atlaskit/icon/glyph/search';
import MenuIcon from '@atlaskit/icon/glyph/menu';
import {
  GlobalNav,
  UIControllerSubscriber,
} from '@atlaskit/navigation-next';
import { Link } from 'react-router-dom';

import brandMark from '../../images/av_mark_white.png';

const globalNavPrimaryItems = [
  {
    id: 'home',
    icon: () => (<img src={brandMark} alt="ReactApolloOnRailsStarter" style={{ height: 32 }} />),
    label: 'Home',
  },
  {
    id: 'menu',
    icon: MenuIcon,
    label: 'Menu',
    component: ({ className, children }: *) => (
      <UIControllerSubscriber>
        {(navigationUIController) => {
          function onClick() {
            if (navigationUIController.state.isCollapsed) {
              navigationUIController.expand();
            } else if (!navigationUIController.state.isCollapsed) {
              navigationUIController.collapse();
            }
          }
          return (
            <button
              type="button"
              className={className}
              onClick={onClick}
            >
              {children}
            </button>
          );
        }}
      </UIControllerSubscriber>
    ),
  },
  { id: 'search', icon: SearchIcon, label: 'Search' },
];

const globalNavSecondaryItems = [
  {
    id: 'help',
    icon: QuestionCircleIcon,
    label: 'Help',
  },
  {
    icon: UserAvatarCircleIcon,
    label: 'Profile',
    component: ({ className, children }: *) => (
      <Link to="/my-settings">
        {children}
      </Link>
    ),
  },
];

const GlobalAppNav = () => (
  <GlobalNav
    primaryItems={globalNavPrimaryItems}
    secondaryItems={globalNavSecondaryItems}
  />
);

export default GlobalAppNav;
//
// () => (
//   <Avatar
//     borderColor="transparent"
//     isActive={false}
//     isHover={false}
//     size="small"
//   />
// )
