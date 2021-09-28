import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "semantic-ui-react";

const CreateProduct = (props) => {
  const { open, toggleCreateProductModel } = props;
  const [productName, setProductName] = useState("");
  const [productAddress, setProductAddress] = useState(0);

  const createNewProduct = () => {
    axios
      .post("Products/PostProduct", {
        name: productName,
        price: productAddress,
      })
      .then(({ data }) => {
        //console.log(data);
        toggleCreateProductModel(false)
        props.fetchProducts();
      })
      .catch((err) => {
        //console.log(err);
      });
  };
  const updateProductName = (value) => {
    setProductName(value);
  };
  const updateProductAddress = (value) => {
    setProductAddress(value);
  };
  useEffect(() => {
    //render
    //componentdidmount
    //console.log(customerName);
    return () => {
      //component will unmount
    };
  }, [productName]);

  useEffect(() => {
    //console.log(customerAddress);
    return () => {};
  }, [productAddress]);

  return (
    <Modal
      open={open}
      //trigger={<Button>Show Modal</Button>}
    >
      <Modal.Header>Create a new product</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Product Name</label>
            <input
              placeholder="Enter a new product name"
              onChange={(e) => updateProductName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Price</label>
            <input
              placeholder="Enter the price"
              onChange={(e) => updateProductAddress(parseFloat(e.target.value))}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        {/* <Button color="black" onClick={() => setOpen(false)}> */}
        <Button color="red" onClick={() => toggleCreateProductModel(false)}>
          Cancel
        </Button>
        <Button color="green" onClick={createNewProduct}>
          Create
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CreateProduct;
