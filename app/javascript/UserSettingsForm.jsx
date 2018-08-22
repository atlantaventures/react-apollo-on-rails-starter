import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  Button,
  Icon,
  Checkbox,
  Radio,
  Divider,
  Collapse,
  Alert,
} from 'antd';

const WrappedUserSettingsForm = Form.create({
  mapPropsToFields(props) {
    return {
      username: Form.createFormField({ value: props.username }),
      firstName: Form.createFormField({ value: props.firstName }),
      lastName: Form.createFormField({ value: props.lastName }),
      emailOpt: Form.createFormField({ value: props.emailOpt }),
      communicationMethodIds: Form.createFormField({ value: props.selectedCommunicationMethods }),
      phone: Form.createFormField({ value: props.phone }),
      email: Form.createFormField({ value: props.email }),
    };
  },
  onValuesChange({ onChange }, changedValues) {
    //onChange(changedValues);
  },
})((props) => {
  const { getFieldDecorator } = props.form;
  const loadingFields = {
    disabled: props.loading,
  };
  const profileFields = {
    prefix: (<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />),
  };
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
    colon: false,
  };
  const buttonItemLayout = {
    wrapperCol: { span: 14, offset: 4 },
  };
  const communicationOptions = props.availableCommunicationMethods.map(commMethod => (
    { label: commMethod.name, value: commMethod.id }
  ));

  const handleSubmit = (event) => {
    event.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        props.onSubmit(values);
      }
    });
  };

  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <h3>Personal</h3>
      <Form.Item label="Username" {...formItemLayout}>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Username is required.' }],
        })(
          <Input placeholder="johndoe3" {...profileFields} {...loadingFields} />
        )}
      </Form.Item>
      <Form.Item label="First Name" {...formItemLayout}>
        {getFieldDecorator('firstName')(<Input placeholder="John" {...profileFields} {...loadingFields} />)}
      </Form.Item>
      <Form.Item label="Last Name" {...formItemLayout}>
        {getFieldDecorator('lastName')(<Input placeholder="Doe" {...profileFields} {...loadingFields} />)}
      </Form.Item>
      <h3>Contact</h3>
      <Form.Item label="Email" {...formItemLayout}>
        {getFieldDecorator('email')(
          <Input
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="john.doe@acme.com"
            {...loadingFields}
          />
        )}
      </Form.Item>
      <Form.Item label="Phone" {...formItemLayout} help="Used for SMS and Phone communication">
        {getFieldDecorator('phone')(
          <Input
            prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="555-555-5555"
            {...loadingFields}
          />
        )}
      </Form.Item>
      <h3>Privacy</h3>
      <Form.Item label="Communication Preferences" {...formItemLayout}>
        <Alert
          description="Your privacy is very important to us. Please review our privacy policy <link>"
          type="info"
          showIcon
        />
        {
          getFieldDecorator('communicationMethodIds', {})(
            <Checkbox.Group
              options={communicationOptions}
              disabled={props.loading}
            />
          )
        }
      </Form.Item>
      <Form.Item label="Account Deletion" {...formItemLayout}>
        <Button type="ghost" disabled={props.loading}>
          <Icon type="delete" />
          Delete my data (permanent)
        </Button>
      </Form.Item>
      {
        props.form.isFieldsTouched() &&
        (
          <React.Fragment>
            <Divider />
            <Form.Item {...buttonItemLayout}>
              <Button type="primary" block htmlType="submit" loading={props.loading}>
                <Icon type="check" />
                {props.loading ? 'Saving' : 'Save'}
              </Button>
            </Form.Item>
          </React.Fragment>
        )
      }
    </Form>
  );
});

const UserSettingsForm = props => (
  <WrappedUserSettingsForm {...props} />
);

UserSettingsForm.defaultProps = {
  emailOpt: 'email_no',
  emailSelections: ['weekly', 'promotions', 'new_features'],
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  loading: false,
};

UserSettingsForm.propTypes = {
  emailOpt: PropTypes.string,
  emailSelections: PropTypes.arrayOf(PropTypes.string),
  username: PropTypes.string.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  loading: PropTypes.bool,
};

export default UserSettingsForm;
