import { React } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import Texterror from "./Texterror";
import { useState } from "react";
// import { Label } from "yum/lib/charts/Label";

const initialValues = {
  name: "prashant",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  contactnumbers: ["", ""],
  phNumbers: [""],
};

const savedValues = {
  name: "Ankit",
  email: "shiwakotiankit@gmail.com",
  channel: "world leading tech",
  comments: "this is awosome",
  address: "Santi tole 2342 birtamode",
  social: {
    facebook: "Ankit",
    twitter: "Ankeet",
  },
  contactnumbers: ["", ""],
  phNumbers: ["9824977469"],
};

const onSubmit = (values, onSubmitProps) => {
  console.log("submit value", values);
  onSubmitProps.setSubmitting(false);
};

//it was replaced by validationSchema throug yum

// const validate = (values) => {
//   const errors = {};

//   if (!values.name) {
//     errors.name = "Required!";
//   }
//   if (!values.email) {
//     errors.email = "Required!";
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = "Invalid email format !";
//   }
//   if (!values.channel) {
//     errors.channel = "Required!";
//   }

//   return errors;
// };

const validationSchema = Yup.object({
  name: Yup.string().required("Required!"),
  email: Yup.string().email("invalid email formate!").required("required"),
  channel: Yup.string().required("required"),
  comments: Yup.string().required("Required!"),
  social: Yup.object().shape({
    facebook: Yup.string().required("Required!"),
    twitter: Yup.string().required("Required!"),
  }),
});

//it was replayed by Formik
//
//   const formik = useFormik({
//     initialValues,
//     onSubmit,
//     // validate,
//     validationSchema,
//   });
//   console.log("values form", formik.values);
const Reyoutubeform = () => {
  const { formValues, setFormValues } = useState(null);
  return (
    <Formik
      initialValues={formValues || initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize
      // validateOnMount
    >
      {(Formik) => {
        return (
          <Form>
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <Field type="text" name="name" id="name" />
              <ErrorMessage name="name" component={Texterror} />
            </div>
            <div className="form-control">
              <label htmlFor="email">E-mail</label>
              <Field type="text" name="email" id="name" />
              <ErrorMessage name="email">
                {(errorMsg) => <div className="error">{errorMsg}</div>}
              </ErrorMessage>
            </div>
            <div className="form-control">
              <label htmlFor="channel">Channel</label>
              <Field type="text" id="channel" name="channel" />
              <ErrorMessage name="channel" component={Texterror} />
            </div>
            <div className="form-control">
              <label htmlFor="comments">Comments</label>
              <Field as="textarea" id="comments" name="comments" />
              <ErrorMessage name="comments" />
            </div>

            <div className="form-control">
              <label htmlFor="address">Address</label>
              <Field name="address">
                {(props) => {
                  const { field, form, meta } = props;
                  // console.log("rendeer props", props);
                  return (
                    <div>
                      <input type="text" id="address" {...field} />

                      {meta.touched && meta.error ? (
                        <div> {meta.error}</div>
                      ) : null}
                    </div>
                  );
                }}
              </Field>
            </div>

            <div className="form-control">
              <label htmlFor="facebook">Facebook</label>
              <Field type="text" id="facebook" name="social.facebook" />
              <ErrorMessage name="social.facebook" component={Texterror} />
              {/* {(errorMsg) => <div className="error">{errorMsg}</div>}
            </ErrorMessage> */}
            </div>
            <div className="form-control">
              <label htmlFor="twitter">Twitter</label>
              <Field type="text" id="twitter" name="social.twitter" />
              <ErrorMessage name="social.twitter">
                {(errorMsg) => <div className="error">{errorMsg}</div>}
              </ErrorMessage>
            </div>
            <div className="form-control">
              <label htmlFor="phoneno">Phone Number</label>
              <Field type="text" id="phoneno" name="contactnumbers[0]" />
            </div>
            <div className="form-control">
              <label htmlFor="mobileno">Mobile Number</label>
              <Field type="text" id="mobileno" name="contactnumbers[1]" />
            </div>

            {/* <div className="form-control">
            <label>List of phone numbers</label>
            <FieldArray name="phNumbers">
              {(fieldArrayProps) => {
                const { push, remove, form } = fieldArrayProps;
                const { values } = form;
                const { phNumbers } = values;
                // console.log('fieldArrayProps', fieldArrayProps)
                // console.log('Form errors', form.errors)
                return (
                  <div>
                    {phNumbers.map((phNumber, index) => (
                      <div key={index}>
                        <Field name={`phNumbers[${index}]`} />
                        {index > 0 && (
                          <button type="button" onClick={() => remove(index)}>
                            -
                          </button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={() => push("")}>
                      +
                    </button>
                  </div>
                );
              }}
            </FieldArray>
          </div> */}

            <div className="form-control">
              <label>List of Phone numbers</label>
              <FieldArray name="phNumbers">
                {(fieldArrayProps) => {
                  const { form, push, remove } = fieldArrayProps;
                  const { values } = form;
                  const { phNumbers } = values;

                  // console.log("field array props", fieldarrayprops);
                  return (
                    <div>
                      {phNumbers.map((phNumber, index) => (
                        <div key={index}>
                          <Field name={`phNumbers[${index}]`} />
                          {index > 0 && (
                            <button type="button" onClick={() => remove(index)}>
                              -
                            </button>
                          )}
                          <button type="button" onClick={() => push("")}>
                            +
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                }}
              </FieldArray>
            </div>

            <button type="button" onClick={() => setFormValues(savedValues)}>
              Load Saved Data
            </button>
            <button
              type="submit"
              disabled={Formik.isSubmitting || !Formik.isValid}
            >
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Reyoutubeform;
