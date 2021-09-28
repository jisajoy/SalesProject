import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "semantic-ui-react";

const EditCustomer = (props) => {
  const { open, toggleEditCustomerModel, fetchCustomers, id, name, address } =
    props;
  const [customerName, setCustomerName] = useState(name);
  console.log("editcustomervalue"+name+" "+address);
  const [customerAddress, setCustomerAddress] = useState(address);

  const [handleSubmit, setHandleSubmit] = useState(false);

  const editCustomer = () => {
   var cusName = "";
   var cusAddress = "";
    if (!handleSubmit) {
      toggleEditCustomerModel(false);
    }else{
      if(customerName.trim() === ""){
        cusName = name
      }else{
        cusName = customerName;
      }
      if(customerAddress.trim() === ""){
        cusAddress = address
      }else{
        cusAddress = customerAddress;
      }
      console.log("cus values:"+cusName+" "+cusAddress);
      editCustomerHandle(cusName,cusAddress)
  };
  }
  const editCustomerHandle = async (cusName, cusAddress) => {
    await axios
    .put(`Customers/PutCustomer/${id}`, {
      id: id,
      name: cusName,
      address: cusAddress,
    })
    .then(({ data }) => {
      console.log(data);
      toggleEditCustomerModel(false);
      updateHandleSubmit(false);
      props.fetchCustomers();
    })
    .catch((err) => {
      console.log(err);
    });
  }
  
  const updateCustomerName = (value) => {
    updateHandleSubmit(true);
    setCustomerName(value);
  };
  const updateCustomerAddress = (value) => {
    updateHandleSubmit(true);
    setCustomerAddress(value);
  };
  const updateHandleSubmit = (value) =>{
    setHandleSubmit(value);
  }
  useEffect(() => {
    return () => {};
  }, [customerName]);

  useEffect(() => {
    return () => {};
  }, [customerAddress]);

  useEffect(() => {
    //console.log("handlesubmit"+handleSubmit);
    return () => {};
  }, [handleSubmit]);


  return (
    <Modal
      open={open}
      customerName={name}
      customerAddress={address}
      handleSubmit={false}
      //trigger={<Button>Show Modal</Button>}
    >
      <Modal.Header>Edit the customer</Modal.Header>
      <Modal.Content>
        <Form>
          <div className="field">
            <Form.Field>
              <label>Customer Name</label>
              <input
                name="name"
                defaultValue={name}
                placeholder="Enter a new customer name"
                onChange={(e) => updateCustomerName(e.target.value)}
                onLoadedData={(e) => updateCustomerName(e.target.value)}
              />
            </Form.Field>
         
          <Form.Field>
            <label>Address</label>
            <input
              name="address"
              defaultValue={address}
              placeholder="Enter the address"
              onChange={(e) => updateCustomerAddress(e.target.value)}
            />
          </Form.Field>
          </div>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        {/* <Button color="black" onClick={() => setOpen(false)}> */}
        <Button color="red" onClick={() => toggleEditCustomerModel(false)}>
          Cancel
        </Button>
        <Button color="green" onClick={editCustomer}>
          Submit
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EditCustomer;
