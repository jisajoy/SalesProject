import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "semantic-ui-react";

const CreateStore = (props) => {
  const { open, toggleCreateCustomerModel } = props;
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  const createNewCustomer = () => {
    axios
      .post("Stores/PostStore", {
        name: customerName,
        address: customerAddress,
      })
      .then(({ data }) => {
        //console.log(data);
        toggleCreateCustomerModel(false)
        props.fetchCustomers();
      })
      .catch((err) => {
        //console.log(err);
      });
  };
  const updateCustomerName = (value) => {
    setCustomerName(value);
  };
  const updateCustomerAddress = (value) => {
    setCustomerAddress(value);
  };
  useEffect(() => {
    //render
    //componentdidmount
    //console.log(customerName);
    return () => {
      //component will unmount
    };
  }, [customerName]);

  useEffect(() => {
    //console.log(customerAddress);
    return () => {};
  }, [customerAddress]);

  return (
    <Modal
      open={open}
      //trigger={<Button>Show Modal</Button>}
    >
      <Modal.Header>Create a new customer</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Store Name</label>
            <input
              placeholder="Enter a new store name"
              onChange={(e) => updateCustomerName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Address</label>
            <input
              placeholder="Enter the address"
              onChange={(e) => updateCustomerAddress(e.target.value)}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        {/* <Button color="black" onClick={() => setOpen(false)}> */}
        <Button color="red" onClick={() => toggleCreateCustomerModel(false)}>
          Cancel
        </Button>
        <Button color="green" onClick={createNewCustomer}>
          Create
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CreateStore;
