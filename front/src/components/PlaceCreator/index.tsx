import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Geosuggest, { Suggest } from 'react-geosuggest';

import Button from '@material-ui/core/Button';
import { Formik, Field, Form, FormikHelpers, FormikProps, FormikErrors } from 'formik';
import { TextField } from 'formik-material-ui';

import { actions } from '../../context';
import { Place } from "../../services/Places/types";

import {
  PLACE_CREATE_FORM_VALIDATION,
} from "../../common/constants";

import {
  FormWrapper,
} from "./styled";

import "./geosuggest.css"

const fixtures: any = [
  {label: 'New York', location: {lat: 40.7033127, lng: -73.979681}},
  {label: 'Rio', location: {lat: -22.066452, lng: -42.9232368}},
  {label: 'Tokyo', location: {lat: 35.673343, lng: 139.710388}}
];

type Props = ConnectedProps<typeof connector>

interface FormValues {
  description: string;
  visitedDate: string;
}

const PlaceCreator: React.FunctionComponent<Props> = ({
  createPlace,
}) => {
  const [suggest, setSuggest] = useState<Suggest>({} as Suggest);

  const onSuggestSelect = (s: Suggest) => {
    setSuggest(s)
  }

  const validate = (values: FormValues) => {
    const { description } = values
    const errors: FormikErrors<FormValues> = {}

    if (description && description.length < 12) {
      errors.description = PLACE_CREATE_FORM_VALIDATION.DESCRIPTION_WRONG_LENGTH;
    }

    return errors;
  }

  const onSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    setSubmitting(true);

    createPlace({
      id: suggest.placeId,
      name: suggest.label,
      location: {
        lat: suggest.location.lat,
        lng: suggest.location.lng,
      },
      description: values.description,
      visitedDate: values.visitedDate,
    } as Place);
  }

  return (
    <Formik
      initialValues={{ 
        description: '', 
        visitedDate: '', 
      }}
      validate={validate}
      onSubmit={onSubmit}
      render={({ submitForm, isSubmitting, dirty, errors }: FormikProps<FormValues>) => (
        <FormWrapper>
          <Form>
            <Field
              name="description"
              type="text"
              label="Opis miejsca"
              multiline={true}
              rows={3}
              rowsMax={6}
              component={TextField}
            />
            <br />
            <Field
              InputLabelProps={{ shrink: true }}
              type="date"
              label="Data odwiedzenia"
              name="visitedDate"
              component={TextField}
            />
            <br />
            <div className="MuiFormControl-root">
              <Geosuggest
                fixtures={fixtures}
                placeholder="Wybierz miejsce!"
                onSuggestSelect={onSuggestSelect}
                location={new google.maps.LatLng(53.558572, 9.9278215)}
                radius={20} 
              />
            </div>
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isSubmitting || !!Object.keys(errors).length}
            >
              Stwórz miejsce pobytu
            </Button>
          </Form>
        </FormWrapper>
      )}
    />
  )
}

const mapDispatch = ({
  createPlace: actions.discover.createPlace,
})

const connector = connect(
  undefined,
  mapDispatch
)

export default connector(PlaceCreator);
