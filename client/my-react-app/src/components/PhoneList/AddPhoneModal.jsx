import React from "react";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createPhone } from "../api/index";
import {PHONE_VALIDATION_SCHEMA }from "../../../schemas";

  const phoneValues={
    model: "",
    year: "",
    ram: "",
    cpu: "",
    displaySize: "",
    hasNFC: "",
  };
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

const AddPhoneModal = (props) => {
  const handleSubmitToFormik = async (values, actions) => {
    const formattedValues = {
      ...values,
      year: values.year,
      hasNFC: values.hasNFC === "true",
      ram: Number(values.ram),
      displaySize: Number(values.displaySize),
    };
    console.log("Submitting values to server:", values);
    const serverResponse = await createPhone(formattedValues);
    console.log(serverResponse);
    props.setIsModalAddPhoneOpen(false);
    actions.resetForm();
  };

  return (
    <Modal
      isOpen={props.isModalAddPhoneOpen}
      onRequestClose={() => props.setIsModalAddPhoneOpen(false)}
      style={customStyles}
    >
      <h1>Add your phone</h1>
      <Formik
        initialValues={phoneValues}
        validationSchema={PHONE_VALIDATION_SCHEMA}
        onSubmit={handleSubmitToFormik}
      >
        {(formikProps) => (
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              width: "300px",
            }}
          >
            <label htmlFor="model">Model</label>
            <Field name="model" placeholder="Model" />
            <ErrorMessage
              name="model"
              component="div"
              style={{ color: "red" }}
            />

            <label htmlFor="year">Year</label>
            <Field name="year">
              {({ field }) => (
                <input
                  type="date"
                  {...field}
                  max={new Date().toISOString().split("T")[0]}
                />
              )}
            </Field>
            <ErrorMessage
              name="year"
              component="div"
              style={{ color: "red" }}
            />

            <label htmlFor="ram">RAM (GB)</label>
            <Field name="ram" placeholder="RAM" />
            <ErrorMessage name="ram" component="div" style={{ color: "red" }} />

            <label htmlFor="cpu">CPU</label>
            <Field name="cpu" placeholder="cpu" />
            <ErrorMessage name="cpu" component="div" style={{ color: "red" }} />

            <label htmlFor="displaySize">Display Size (inches)</label>
            <Field name="displaySize" placeholder="Display Size" />
            <ErrorMessage
              name="displaySize"
              component="div"
              style={{ color: "red" }}
            />
            <label htmlFor="hasNFC">NFC</label>
            <Field name="hasNFC" as="select">
              <option value="">Select...</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Field>

            <label htmlFor="brandId">Brand:</label>
            <Field as="select" name="brandId" id="brandId">
              <option value="">Select a brand</option>
              {props.brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="brandId"
              component="div"
              style={{ color: "red" }}
            />

            {/* <label htmlFor="image">Image URL</label>
            <Field name="image" placeholder="Image URL" />
            <ErrorMessage
              name="image"
              component="div"
              style={{ color: "red" }}
            /> */}

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>

      <button onClick={() => props.setIsModalAddPhoneOpen(false)}>Close</button>
    </Modal>
  );
};

export default AddPhoneModal;
