import React from 'react';
import PropTypes from 'prop-types';
import FieldText from '@atlaskit/field-text';
import { Field, FormFooter } from '@atlaskit/form';
import Button from '@atlaskit/button';
import { withToastManager } from 'react-toast-notifications';
import { Formik } from 'formik';

class UserSettingsForm extends React.Component {
  render() {
    const { toastManager, onSubmit } = this.props;
    return (
      <div>
        <Formik
          initialValues={{
            email: this.props.email || '',
            username: this.props.username || '',
            firstName: this.props.firstName || '',
            lastName: this.props.lastName || '',
          }}
          validate={(values) => {
            // same as above, but feel free to move this into a class method now.
            let errors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={(
            values,
            { setSubmitting, setErrors }
          ) => {
            onSubmit(values).then(
              ({ data }) => {
                setSubmitting(false);
                if (data.updateUser.errors) {
                  const errorHash = JSON.parse(data.updateUser.errors);
                  setErrors(errorHash);
                } else {
                  toastManager.add('Saved Successfully',
                    { appearance: 'success', autoDismiss: true, autoDismissTimeout: 3500 });
                }
              },
            );
          }}
          render={({
            dirty,
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => {
            const fieldFor = (label, fieldName) => {
              return (
                <Field
                  label={label}
                  isInvalid={touched[fieldName] && errors[fieldName]}
                  invalidMessage={errors[fieldName]}
                >
                  <FieldText
                    name={fieldName}
                    shouldFitContainer
                    value={values[fieldName]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>
              );
            };

            return (
              <form onSubmit={handleSubmit} disabled={isSubmitting}>
                {fieldFor('Username', 'username')}
                {fieldFor('First Name', 'firstName')}
                {fieldFor('Last Name', 'lastName')}
                {fieldFor('Email', 'email')}

                {
                  dirty && (
                    <FormFooter>
                      <Button appearance="primary" type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
                        Save
                      </Button>
                    </FormFooter>
                  )
                }
              </form>
            );
          }}
        />
      </div>
    );
  }
}

const UserSettingsFormWithToast = withToastManager(UserSettingsForm);

UserSettingsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default UserSettingsFormWithToast;
