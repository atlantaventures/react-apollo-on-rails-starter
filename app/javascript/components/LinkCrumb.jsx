import React from 'react';
import { Link } from 'react-router-dom';
import { BreadcrumbsItem } from '@atlaskit/breadcrumbs';

const LinkCrumb = ({ to, ...props }) => (
  <BreadcrumbsItem
    component={({ children, className }) => (
      <Link to={to}>{children}</Link>
    )}
    {...props}
  />
);

export default LinkCrumb;
