import React from 'react';
import PropTypes from 'prop-types';
import DynamicTable from '@atlaskit/dynamic-table';
import Toggle from '@atlaskit/toggle';

import HipchatDialOutIcon from '@atlaskit/icon/glyph/hipchat/dial-out';
import EmailIcon from '@atlaskit/icon/glyph/email';
import CommentIcon from '@atlaskit/icon/glyph/comment';
import FeedbackIcon from '@atlaskit/icon/glyph/feedback';

import Tooltip from '@atlaskit/tooltip';

import { withToastManager } from 'react-toast-notifications';

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

const renderIcon = (communicationChannel) => {
  switch (communicationChannel.category) {
    case 'sms':
      return (
        <Tooltip content={communicationChannel.name}>
          <CommentIcon />
        </Tooltip>
      );
    case 'phone':
      return (
        <Tooltip content={communicationChannel.name}>
          <HipchatDialOutIcon />
        </Tooltip>
      );
    case 'email':
      return (
        <Tooltip content={communicationChannel.name}>
          <EmailIcon />
        </Tooltip>
      );
    default:
      return (
        <Tooltip content={communicationChannel.name}>
          <FeedbackIcon />
        </Tooltip>
      );
  }
};

const PrivacyForm = (props) => {
  const handleChange = (commMethodId) => {
    props.onChange(commMethodId).then(
      ({ data }) => {
        const { toastManager } = props;
        if (data.toggleUserCommunicationMethod.errors) {
          toastManager.add(data.toggleUserCommunicationMethod.errors,
            { appearance: 'error', autoDismiss: true, autoDismissTimeout: 2500 });
        } else {
          const enabledDescription = data.toggleUserCommunicationMethod.enabled ? 'Enabled' : 'Disabled';
          toastManager.add(`${data.toggleUserCommunicationMethod.communicationMethod.name} ${enabledDescription}`,
            { appearance: 'success', autoDismiss: true, autoDismissTimeout: 2500 });
        }
      },
    );
  }

  const rows = props.availableCommunicationMethods.map((commMethod) => {
    const selected = props.selectedCommunicationMethods.includes(commMethod.id);

    return {
      key: `${commMethod.id}-row`,
      cells: [
        {
          key: `${commMethod.id}-row-cell-icon`,
          content: renderIcon(commMethod.communicationChannel),
        },
        { key: `${commMethod.id}-row-cell-name`, content: commMethod.name },
        { key: `${commMethod.id}-row-cell-description`, content: commMethod.description },
        {
          key: `${commMethod.id}-row-cell-enabled`,
          content: (
            <Toggle size="large" isDefaultChecked={selected} onChange={() => handleChange(commMethod.id)} />
          ),
        },
      ],
    };
  });

  return (
    <DynamicTable
      caption="Communication Preferences"
      rows={rows}
      head={header}
      rowsPerPage={10}
      defaultPage={1}
    />
  );
};

PrivacyForm.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default withToastManager(PrivacyForm);
