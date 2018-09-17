import React from 'react';
import { Link } from 'react-router-dom';
import { BreadcrumbsItem } from '@atlaskit/breadcrumbs';

const LinkCrumb = ({ to, ...props }) => (
  <BreadcrumbsItem
    component={({ children, className }) => (
      <button className={className} type="button">
        <Link to={to}>{children}</Link>
      </button>
    )}
    {...props}
  />
);

export default LinkCrumb;
