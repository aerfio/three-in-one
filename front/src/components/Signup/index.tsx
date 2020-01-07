import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Button from '@material-ui/core/Button';
import { Formik, Field, Form, FormikHelpers, FormikProps, FormikErrors } from 'formik';
import { TextField } from 'formik-material-ui';

import { actions } from '../../context';
import { LoginDTO } from '../../services/Auth/types';

import {
  COMMON_FORM_VALIDATION,
  SIGNUP_FORM_VALIDATION,
} from "../../common/constants";

import {
  FormWrapper,
} from "./styled";

type Props = ConnectedProps<typeof connector>

const Signup: React.FunctionComponent<Props> = ({
  register,
}) => {
  const validate = (values: LoginDTO) => {
    const { email, password } = values
    const errors: FormikErrors<LoginDTO> = {}

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = SIGNUP_FORM_VALIDATION.EMAIL_WRONG_PATTERN;
    }
    else if (!email) {
      errors.email = COMMON_FORM_VALIDATION.FIELD_REQUIRED;
    }

    if (!password) {
      errors.password = COMMON_FORM_VALIDATION.FIELD_REQUIRED;
    }
    else if (password.length < 6) {
      errors.password = SIGNUP_FORM_VALIDATION.PASSWORD_WRONG_LENGTH;
    }

    return errors;
  }

  const onSubmit = (values: LoginDTO, { setSubmitting }: FormikHelpers<LoginDTO>) => {
    setSubmitting(true);
    register(values);
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
              Zarejestruj się
            </Button>
          </Form>
        </FormWrapper>
      )}
    />
  )
}

const mapDispatch = ({
  register: actions.auth.register,
})

const connector = connect(
  undefined,
  mapDispatch
)

export default connector(Signup);
