import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Button from '@material-ui/core/Button';
import { Formik, Field, Form, FormikHelpers, FormikProps, FormikErrors } from 'formik';
import { TextField } from 'formik-material-ui';

import { actions } from '../../context';
import { LoginDTO } from '../../services/Auth/types';

import {
  COMMON_FORM_VALIDATION,
  LOGIN_FORM_VALIDATION,
} from "../../common/constants";

import {
  FormWrapper,
} from "./styled";

type Props = ConnectedProps<typeof connector>

const Login: React.FunctionComponent<Props> = ({
  login,
}) => {
  const validate = (values: LoginDTO) => {
    const { email, password } = values
    const errors: FormikErrors<LoginDTO> = {}

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = LOGIN_FORM_VALIDATION.EMAIL_WRONG_PATTERN;
    }
    else if (!email) {
      errors.email = COMMON_FORM_VALIDATION.FIELD_REQUIRED;
    }

    if (!password) {
      errors.password = COMMON_FORM_VALIDATION.FIELD_REQUIRED;
    }

    return errors;
  }

  const onSubmit = (values: LoginDTO, { setSubmitting }: FormikHelpers<LoginDTO>) => {
    setSubmitting(true);
    login(values);
  }

  return (
    <Formik
      initialValues={{ 
        email: '', 
        password: '', 
      }}
      validate={validate}
      onSubmit={onSubmit}
      render={({ submitForm, isSubmitting, dirty, errors }: FormikProps<LoginDTO>) => (
        <FormWrapper>
          <Form>
            <Field
              name="email"
              type="email"
              label="Email"
              component={TextField}
            />
            <br />
            <Field
              type="password"
              name="password"
              label="Password"
              component={TextField}
            />
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isSubmitting || !dirty || !!Object.keys(errors).length}
            >
              Zaloguj się
            </Button>
          </Form>
        </FormWrapper>
      )}
    />
  )
}

const mapDispatch = ({
  login: actions.auth.login,
})

const connector = connect(
  undefined,
  mapDispatch
)

export default connector(Login);
