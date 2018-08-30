import React from 'react';
import { Route, Link } from 'react-router-dom';

const LinkItem = ({ components: { Item }, to, ...props }) => (
  <Route
    render={({ location: { pathname } }) => (
      <Item
        component={({ children, className }) => (
          <Link className={className} to={to}>
            {children}
          </Link>
        )}
        isSelected={pathname === to}
        {...props}
      />
    )}
  />
);

export default LinkItem;
