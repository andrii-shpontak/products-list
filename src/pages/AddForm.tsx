import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { Button, Paper, Typography } from '@mui/material';

import { addNewProduct } from '../store/productsSlice';

const AddForm: React.FC<{}> = () => {
  const [ifSend, setIfSend] = useState(false);
  const dispatch = useDispatch();
  const initialFormValues = {
    id: uuidv4(),
    title: '',
    author: '',
    yearOfPublication: 0,
    rating: 0,
    category: 'others',
    images: [
      'https://us.123rf.com/450wm/get4net/get4net2112/get4net211221910/179510358-unknown-address-of-parcel-item-from-logistic-website-portal.jpg?ver=6',
    ],
  };

  if (ifSend) {
    return <Navigate to="/products-list/" />;
  }

  return (
    <Paper sx={{ paddingBottom: '20px', margin: '0 auto', maxWidth: '500px' }}>
      <Formik
        initialValues={initialFormValues}
        validationSchema={Yup.object({
          title: Yup.string().min(2, 'Minimum 2 letters').required('This field is required'),
          author: Yup.string().min(2, 'Minimum 2 letters').required('This field is required'),
          yearOfPublication: Yup.number()
            .min(1, 'Not zero value')
            .max(2023, 'The maximum value is 2023')
            .required('This field is required'),
          rating: Yup.number()
            .min(1, 'The minimum rating is 1')
            .max(5, '5 is the highest rating')
            .required('This field is required'),
        })}
        onSubmit={(values, actions) => {
          dispatch(addNewProduct(values));
          actions.resetForm();
          actions.setSubmitting(false);
          setIfSend(true);
        }}>
        <Form
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20px',
            textAlign: 'center',
          }}>
          <Typography variant="h3">Add new product</Typography>
          <Typography variant="h6">Title of product</Typography>
          <Field style={{ fontSize: '18px' }} id="title" name="title" type="text" />
          <ErrorMessage name="title" component="div" className="errorMessage" />

          <Typography variant="h6">Author of product</Typography>
          <Field style={{ fontSize: '18px' }} id="author" name="author" type="text" />
          <ErrorMessage name="author" component="div" className="errorMessage" />

          <Typography variant="h6">Year of publication</Typography>
          <Field
            style={{ fontSize: '18px' }}
            id="yearOfPublication"
            name="yearOfPublication"
            type="number"
          />
          <ErrorMessage name="yearOfPublication" component="div" className="errorMessage" />

          <Typography variant="h6">Rating of product</Typography>
          <Field style={{ fontSize: '18px' }} id="rating" name="rating" type="number" />
          <ErrorMessage name="rating" component="div" className="errorMessage" />

          <Button sx={{ marginTop: '15px' }} variant="contained" color="success" type="submit">
            Add
          </Button>
          <Button sx={{ marginTop: '15px' }} variant="contained" color="warning" type="reset">
            reser
          </Button>
          <Link style={{ textDecoration: 'none' }} to="/">
            <Button sx={{ marginTop: '15px' }} variant="contained" color="error">
              Cancel
            </Button>
          </Link>
        </Form>
      </Formik>
    </Paper>
  );
};

export default AddForm;
