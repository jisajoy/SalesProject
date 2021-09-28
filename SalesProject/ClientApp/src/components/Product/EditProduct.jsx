import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "semantic-ui-react";

const EditProduct = (props) => {
  const { open, toggleEditProductModel, fetchProducts, id, name, price } =
    props;
  const [productname, setproductname] = useState(name);
  const [productprice, setproductprice] = useState(price.toString());

  const [handleSubmit, setHandleSubmit] = useState(false);

  const editProduct = () => {
    var proName = "";
    var cusPrice = 0.0;
    if (!handleSubmit) {
      toggleEditProductModel(false);
    } else {
      if (productname.trim() === "") {
        proName = name;
      } else {
        proName = productname;
      }
      if (productprice.trim() === "") {
        cusPrice = price;
      } else {
        cusPrice = parseFloat(productprice);
      }
      console.log("cus values:" + proName + " " + cusPrice);
      editProductHandle(proName, cusPrice);
    }
  };
  const editProductHandle = async (proName, cusPrice) => {
    await axios
      .put(`Products/PutProduct/${id}`, {
        id: id,
        name: proName,
        price: cusPrice,
      })
      .then(({ data }) => {
        console.log(data);
        toggleEditProductModel(false);
        updateHandleSubmit(false);
        props.fetchProducts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateProductName = (value) => {
    updateHandleSubmit(true);
    setproductname(value);
  };
  const updateProductPrice = (value) => {
    updateHandleSubmit(true);
    setproductprice(value);
  };
  const updateHandleSubmit = (value) => {
    setHandleSubmit(value);
  };
  useEffect(() => {
    return () => {};
  }, [productname]);

  useEffect(() => {
    return () => {};
  }, [productprice]);

  useEffect(() => {
    //console.log("handlesubmit"+handleSubmit);
    return () => {};
  }, [handleSubmit]);

  return (
    <Modal
      open={open}
      productname={name}
      productprice={price.toString()}
      handleSubmit={false}
      //trigger={<Button>Show Modal</Button>}
    >
      <Modal.Header>Edit the customer</Modal.Header>
      <Modal.Content>
        <Form>
          <div className="field">
            <Form.Field>
              <label>Product Name</label>
              <input
                name="name"
                defaultValue={name}
                placeholder="Enter a new product name"
                onChange={(e) => updateProductName(e.target.value)}
              />
            </Form.Field>

            <Form.Field>
              <label>Address</label>
              <input
                name="price"
                defaultValue={price.toString()}
                placeholder="Enter the price"
                onChange={(e) => updateProductPrice(e.target.value)}
              />
            </Form.Field>
          </div>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        {/* <Button color="black" onClick={() => setOpen(false)}> */}
        <Button color="red" onClick={() => toggleEditProductModel(false)}>
          Cancel
        </Button>
        <Button color="green" onClick={editProduct}>
          Submit
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EditProduct;
