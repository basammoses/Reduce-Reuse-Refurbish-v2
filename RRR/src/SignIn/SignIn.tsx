
import React, { useState } from 'react'
import { Input, Button, Grid, Text, ThemeUIStyleObject, Alert } from 'theme-ui'
import { Link } from 'react-router-dom'
import { redirect,useNavigate } from "react-router-dom"
import { Form, Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { DASHBOARD_PAGE_PATH, SIGN_UP_PAGE_PATH } from '../config/paths'
import { signInUser } from '../firebaseAuth/auth'
import { FormGroup } from '../FormGroup/FormGroup'
import { BorderWrapper } from '../BorderWrapper/BorderWrapper'



export interface SignInProps {
  sx?: ThemeUIStyleObject
}

interface SignInFormValues {
  email: string
  password: string
}

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required').min(8).max(200),
})

export const SignIn = ({ sx }: SignInProps): JSX.Element => {
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false)
  const [formError, setFormError] = useState<string>('')
  

  return (
    <BorderWrapper title="Welcome back" sx={{ ...sx }}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async (values: SignInFormValues) => {
          setFormSubmitting(true)
          try {
            const result = await signInUser(values.email, values.password)
            console.log(result)
            redirect(DASHBOARD_PAGE_PATH)

          } catch (error: unknown) {
            let errorMessage = 'error.unknown'
            if (typeof error === 'string') {
              errorMessage = error.toUpperCase()
            } else if (error instanceof Error) {
              errorMessage = error.message
            }
            setFormError(errorMessage)
            setFormSubmitting(false)
          }
        }}
        validationSchema={SignInSchema}
      >
        {({ getFieldProps }) => (
          <Form>
            <FormGroup label="You email address" name="email">
              <Input
                sx={{ borderColor: 'rgb(209, 218, 230)' }}
                {...getFieldProps('email')}
                id="email"
              />
            </FormGroup>
            <FormGroup label="Password" name="password">
              <Input
                sx={{ width: '400px', borderColor: 'rgb(209, 218, 230)' }}
                {...getFieldProps('password')}
                type="password"
                id="password"
              />
            </FormGroup>
            <Grid>
              <Button type="submit" sx={{ mt: 1 }} variant="buttons.primary">
                Log in
              </Button>
              <Link to={SIGN_UP_PAGE_PATH}>
                <Text
                  sx={{
                    display: 'inline-block',
                    color: 'brand',
                    textDecoration: 'none',
                    fontSize: 2,
                  }}
                >
                  Dont have an account? Please Sign up here.
                </Text>
              </Link>
            </Grid>
            <br />
            {formError && <Alert variant="error">{formError}</Alert>}
          </Form>
        )}
      </Formik>
    </BorderWrapper>
  )
}