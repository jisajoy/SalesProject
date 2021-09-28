import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "semantic-ui-react";

const DeleteStore = (props) => {
  const { open, toggleDeleteCustomerModel, fetchCustomers, cusId } = props;

  const deleteCustomer = (id) => {
    console.log("delete id: " + id);
    axios
      .delete(`Stores/DeleteStore/${id}`)
      .then(({ data }) => {
        console.log(data);
        props.fetchCustomers();
        toggleDeleteCustomerModel(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return(
    <Modal
    size={"mini"}
    open={open}
    //onClose={() => dispatch({ type: 'close' })}
  >
    <Modal.Header>Delete Your Store?</Modal.Header>
    <Modal.Content>
      <p>Are you sure you want to delete the store</p>
    </Modal.Content>
    <Modal.Actions>
      <Button negative onClick={() => toggleDeleteCustomerModel(false)}>
        No
      </Button>
      <Button positive onClick={() => deleteCustomer(cusId)}>
        Yes
      </Button>
    </Modal.Actions>
  </Modal>
  );
};

export default DeleteStore;
