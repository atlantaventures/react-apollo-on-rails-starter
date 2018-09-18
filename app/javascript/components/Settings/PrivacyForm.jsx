import React from 'react';
import PropTypes from 'prop-types';
import DynamicTable from '@atlaskit/dynamic-table';
import HipchatDialOutIcon from '@atlaskit/icon/glyph/hipchat/dial-out';
import EmailIcon from '@atlaskit/icon/glyph/email';
import CommentIcon from '@atlaskit/icon/glyph/comment';
import FeedbackIcon from '@atlaskit/icon/glyph/feedback';
import Tooltip from '@atlaskit/tooltip';

import { withToastManager } from 'react-toast-notifications';

import PrivacyToggle from './PrivacyToggle';

const header = {
  cells: [
    {
      key: 'channel',
      content: 'Channel',
      isSortable: true,
      width: 10,
    },
    {
      key: 'name',
      content: 'Name',
      shouldTruncate: false,
      isSortable: true,
    },
    {
      key: 'description',
      content: 'Description',
      shouldTruncate: true,
      isSortable: true,
    },
    {
      key: 'enabled',
      shouldTruncate: true,
    },
  ],
};

const iconMap = {
  sms: <CommentIcon />,
  phone: <HipchatDialOutIcon />,
  email: <EmailIcon />,
};

const renderIcon = (category, name) => (
  <Tooltip content={name}>
    {iconMap[category] || <FeedbackIcon />}
  </Tooltip>
);

class PrivacyForm extends React.Component {
  handleChange = (commMethodId) => {
    const { onChange } = this.props;
    onChange(commMethodId).then(
      ({ data }) => {
        const { toggleUserCommunicationMethod } = data;
        if (toggleUserCommunicationMethod.errors) {
          this.handleToast(toggleUserCommunicationMethod.errors, false);
        } else {
          const enabledDescription = toggleUserCommunicationMethod.enabled ? 'Enabled' : 'Disabled';
          this.handleToast(`${toggleUserCommunicationMethod.communicationMethod.name} ${enabledDescription}`);
        }
      },
    );
  }

  handleToast(message, success = true) {
    const { toastManager } = this.props;
    console.log(toastManager);
    toastManager.add(message,
      { appearance: success ? 'success' : 'error', autoDismiss: true, autoDismissTimeout: 2500 });
  }

  rows() {
    const { availableCommunicationMethods, selectedCommunicationMethods } = this.props;
    return availableCommunicationMethods.map((commMethod) => {
      const selected = selectedCommunicationMethods.includes(commMethod.id);
      const commChannel = commMethod.communicationChannel;

      return {
        key: `${commMethod.id}-row`,
        cells: [
          {
            key: `${commMethod.id}-row-cell-icon`,
            content: renderIcon(commChannel.category, commChannel.name),
          },
          { key: `${commMethod.id}-row-cell-name`, content: commMethod.name },
          { key: `${commMethod.id}-row-cell-description`, content: commMethod.description },
          {
            key: `${commMethod.id}-row-cell-enabled`,
            content: (
              <PrivacyToggle selected={selected} onChange={this.handleChange} communicationMethodId={commMethod.id} />
            ),
          },
        ],
      };
    });
  }

  render() {
    return (
      <DynamicTable
        caption="Communication Preferences"
        rows={this.rows()}
        head={header}
        rowsPerPage={10}
        defaultPage={1}
      />
    );
  }
}

PrivacyForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  toastManager: PropTypes.shape({
    add: PropTypes.func,
  }).isRequired,
};

export default withToastManager(PrivacyForm);
