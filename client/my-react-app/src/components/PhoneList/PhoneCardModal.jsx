import Modal from "react-modal";
import {useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {deletePhone, editPhone } from '../api';
import {PHONE_UPDATE_VALIDATION_SCHEMA} from "../../../schemas/index";

Modal.setAppElement("#root");

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


const PhoneCardModal = (props) => {
  const { selectedPhone, setSelectedPhone, isPhoneModalOpen, setIsPhoneModalOpen , brands} = props;

  const [isEditMode, setIsEditMode] = useState(false);


  const handleDeletePhone = async (id) => {
    try {
      const deletedPhone = await deletePhone(id);
      if (deletedPhone) {
        alert("Phone was deleted"); // or use toast
      }
      setSelectedPhone(null);
      setIsPhoneModalOpen(false);
    } catch (error) {
      console.error("Error deleting phone:", error);
      alert("Failed to delete phone");
    }
  };
  
 const handleEditPhone = async (id, values) =>{ 
  const formattedValues = {
    ...values,
    year: values.year,
    hasNFC: values.hasNFC === "true",
    ram: Number(values.ram),
    displaySize: Number(values.displaySize),
  };
  try {
      const updatedPhone = await editPhone(id, formattedValues);
      if (updatedPhone) {
        alert("Phone was updated"); 
      }
      setSelectedPhone(null);
      setIsPhoneModalOpen(false);
    } catch (error) {
      console.error("Error updating phone:", error);
      alert("Failed to updating phone");
    }
 }
  return (
    <Modal
      isOpen={isPhoneModalOpen}
      onRequestClose={() => setIsPhoneModalOpen(false)}
      style={customStyles}
    >
      {selectedPhone && (
        <div>
          {!isEditMode ? (
            <>
              <h1>{selectedPhone.model}</h1>
              <p>Brand: {selectedPhone.brandName}</p>
              <p>Year: {selectedPhone.year}</p>
              <p>NFC: {selectedPhone.hasNFC ? "Yes" : "No"}</p>
              <p>Display size: {selectedPhone.displaySize}</p>
              <p>CPU: {selectedPhone.cpu}</p>
              <p>Created at: {selectedPhone.createdAt}</p>
              <p>Updated at: {selectedPhone.updatedAt}</p>

              <button onClick={() => setIsPhoneModalOpen(false)}>Close</button>
              <button onClick={() => handleDeletePhone(selectedPhone.id)}>
                Delete phone
              </button>
              <button onClick={() => setIsEditMode(true)}>Edit phone</button>
            </>
          ) : (
            <Formik
              initialValues={{
                model: selectedPhone.model,
                year: selectedPhone.year,
                ram: selectedPhone.ram,
                cpu: selectedPhone.cpu,
                displaySize: selectedPhone.displaySize,
                hasNFC: selectedPhone.hasNFC.toString(),
                brandId: selectedPhone.brandId,
              }}
              validationSchema={PHONE_UPDATE_VALIDATION_SCHEMA}
              onSubmit={(values) => handleEditPhone(selectedPhone.id, values)}
            >
              <Form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <label>Model</label>
                <Field name="model" />
                <ErrorMessage name="model" component="div" />

                <label>Year</label>
                <Field name="year" type="date" />
                <ErrorMessage name="year" component="div" />

                <label>RAM</label>
                <Field name="ram" />
                <ErrorMessage name="ram" component="div" />

                <label>CPU</label>
                <Field name="cpu" />
                <ErrorMessage name="cpu" component="div" />

                <label>Display Size</label>
                <Field name="displaySize" />
                <ErrorMessage name="displaySize" component="div" />

                <label>NFC</label>
                <Field name="hasNFC" as="select">
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </Field>

                <label>Brand</label>
                <Field name="brandId" as="select">
                  <option value="">Select brand</option>
                  {brands.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </Field>

                <button type="submit">Save</button>
                <button type="button" onClick={() => setIsEditMode(false)}>
                  Cancel
                </button>
              </Form>
            </Formik>
          )}
        </div>
      )}
    </Modal>
  );
};

export default PhoneCardModal;
