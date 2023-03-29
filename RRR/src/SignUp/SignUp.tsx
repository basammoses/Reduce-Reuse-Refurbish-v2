import React, { useState } from "react";
import {
  Input,
  ThemeUIStyleObject,
  Grid,
  Button,
  Text,
  Container
} from "theme-ui";
import { Form, Formik } from "formik";
import * as Yup from "yup";
// import { useHistory } from "react-router-dom";
import { FormGroup } from "../FormGroup/FormGroup";
import { DASHBOARD_PAGE_PATH } from "../config/paths";
import { passwordValidation } from "../passwordValidation";
import { BorderWrapper } from "../BorderWrapper/BorderWrapper";
import { redirect, useNavigate } from "react-router";
import { signUp, signInUser } from "../firebaseAuth/auth";
import { Link } from "react-router-dom";
import axios from "axios";
interface SignupFormValues {
  email: string;
  password: string;
  repeatPassword: string;
}

const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
};
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000'
});

// const SignUpSchema = Yup.object().shape({
//   email: Yup.string().email('Invalid email').required('Required'),
//   password: passwordValidation,
//   repeatPassword: Yup.string().when('password', {
//     is: (val: string) => val && val.length > 0,
//     then: Yup.string()
//       .oneOf([Yup.ref('password')], 'Both passwords need to be the same')
//       .required('Required'),
//   }),
// })

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: passwordValidation,
  


});

export interface SignupProps {
  sx?: ThemeUIStyleObject;
}

interface GoogleUser {
  email: string;
  uid: string;
}

export const SignUp = ({ sx }: SignupProps): JSX.Element => {
  const [formError, setFormError] = useState<string>("");
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);
 


  return (
    <Container sx={{ ...sx }}>
      <BorderWrapper title="Create account">
        <Formik
          initialValues={{
            email: "",
            password: "",
            repeatPassword: ""
          }}
          onSubmit={async (values: SignupFormValues) => {
            setFormSubmitting(true);
            try {
              const result = await signUp(values.email, values.password)
                console.log(`🚀 ~ signup result`, result);
              try {
                redirect(DASHBOARD_PAGE_PATH);
              } catch (error) {
                console.log(`🚀 ~ signup error`, error);
              }
            } catch (error) {
              console.log(error);
              setFormError(formError);
              setFormSubmitting(false);
            }
            try {
              const result = await signInUser(values.email, values.password);
              console.log(`🚀 ~ signin result`, result);
              redirect(DASHBOARD_PAGE_PATH);
            } catch (error) {
              console.log(`🚀 ~ signin error`, error);

            }

          }}
          validationSchema={SignUpSchema}
        >
          {({ getFieldProps }) => (
            <Form>
              <FormGroup label="Email address" name="email">
                <Input
                  sx={{ borderColor: "rgb(209, 218, 230)" }}
                  {...getFieldProps("email")}
                  id="email"
                />
              </FormGroup>
              <FormGroup label="Password" name="password">
                <Input
                  sx={{
                    borderColor: "rgb(209, 218, 230)"
                  }}
                  {...getFieldProps("password")}
                  type="password"
                  id="password"
                />
              </FormGroup>
              <Grid>
                <Button type="submit" sx={{ mt: 1, bg: "#3F88F5" }}>
                  Sign up
                </Button>
                <Link to="/sign-in">
                <Text 
                  sx={{
                    display: "inline-block",
                    textDecoration: "none",
                    textAlign: "center",
                    margin: "0 auto",
                    fontSize: 1,
                    color: "#3F88F5",
                    fontFamily: "sans-serif"
                  }}
                >
                  Do you already have an account? Please login in here.
                  </Text>
                  </Link>
              </Grid>
            </Form>
          )}
        </Formik>
      </BorderWrapper>
    </Container>
  );
};
