import React from 'react';
import PropTypes from 'prop-types';
import Toggle from '@atlaskit/toggle';

class PrivacyToggle extends React.Component {
  handleChange = () => {
    const { onChange, communicationMethodId } = this.props;
    onChange(communicationMethodId);
  };

  render() {
    const { selected } = this.props;
    return (
      <Toggle size="large" isDefaultChecked={selected} onChange={this.handleChange} />
    );
  }
}

PrivacyToggle.defaultProps = {
  selected: false,
};

PrivacyToggle.propTypes = {
  selected: PropTypes.bool,
  communicationMethodId: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PrivacyToggle;
