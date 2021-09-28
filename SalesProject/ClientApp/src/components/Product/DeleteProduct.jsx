import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "semantic-ui-react";

const DeleteProduct = (props) => {
  const { open, toggleDeleteProductModel, fetchproducts, cusId } = props;

  const deleteProduct = (id) => {
    console.log("delete id: " + id);
    axios
      .delete(`Products/DeleteProduct/${id}`)
      .then(({ data }) => {
        console.log(data);
        props.fetchProducts();
        toggleDeleteProductModel(false)
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
    <Modal.Header>Delete Your Product?</Modal.Header>
    <Modal.Content>
      <p>Are you sure you want to delete your product.</p>
    </Modal.Content>
    <Modal.Actions>
      <Button negative onClick={() => toggleDeleteProductModel(false)}>
        No
      </Button>
      <Button positive onClick={() => deleteProduct(cusId)}>
        Yes
      </Button>
    </Modal.Actions>
  </Modal>
  );
};

export default DeleteProduct;
