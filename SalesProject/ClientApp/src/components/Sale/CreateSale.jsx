import axios from "axios";
import { update, values, valuesIn } from "lodash";
import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Select } from "semantic-ui-react";
const CreateSale = (props) => {
  const {
    open,
    toggleCreateCustomerModel,
    customerList,
    productList,
    storeList,
    currentDate,
    fetchSalesJoinTable,
  } = props;
  const [saledate, setsaledate] = useState("");

  const [customerid, setcustomerId] = useState(0);
  const [productid, setproductid] = useState(0);
  const [storeid, setstoreid] = useState(0);
  const [handleSubmit, setHandleSubmit] = useState(false);

  console.log("date:" + currentDate);
  //  console.log("customerList: "+customerList.key)

  const createNewSale = () => {
    var date = ""
    if (!handleSubmit) {
      date = currentDate;
    }else{
      date = saledate
    }
    console.log("saledate" + saledate);
    axios
      .post("Sales/PostSales", {
        ProductId: productid,
        CustomerId: customerid,
        StoreId: storeid,
        DateSold: date,
      })
      .then(({ data }) => {
        console.log(data);
        toggleCreateCustomerModel(false);
        console.log("created");
        updateHandleSubmit(false);
        fetchSalesJoinTable();
        //props.fetchCustomers();
      })
      .catch((err) => {
        //console.log(err);
      });
  };
  const updateSaleDate = (value) => {
    updateHandleSubmit(true);
    setsaledate(value);
  };
  const updateCustomerId = (value) => {
    setcustomerId(value);
  };
  const updateProductId = (value) => {
    setproductid(value);
  };
  const updateStoreId = (value) => {
    setstoreid(value);
  };
  const updateHandleSubmit = (value) => {
    setHandleSubmit(value);
  };
  useEffect(() => {
    //console.log(customerAddress);
    return () => {};
  }, [saledate]);
  useEffect(() => {
    //console.log(customerAddress);
    return () => {};
  }, [customerid]);
  useEffect(() => {
    //console.log(customerAddress);
    return () => {};
  }, [productid]);
  useEffect(() => {
    //console.log(customerAddress);
    return () => {};
  }, [storeid]);
  useEffect(() => {
    //console.log("handlesubmit"+handleSubmit);
    return () => {};
  }, [handleSubmit]);
  const handleCustomer = (e, { value }) => {
    var keyvalue = 0;
    customerList.filter(function (item) {
      if (item.value == value) {
        console.log(" customerkey" + item.key);
        keyvalue = item.key;
      }
    });
    updateCustomerId(keyvalue);
  };
  const handleProduct = (e, { value }) => {
    var keyvalue = 0;
    productList.filter(function (item) {
      if (item.value == value) {
        console.log("productkey" + item.key);
        keyvalue = item.key;
      }
    });
    updateProductId(keyvalue);
  };
  const handleStore = (e, { value }) => {
    var keyvalue = 0;
    storeList.filter(function (item) {
      if (item.value == value) {
        console.log("storekey" + item.key);
        keyvalue = item.key;
      }
    });
    updateStoreId(keyvalue);
  };

  return (
    <div>
      <Modal
        open={open}
        //trigger={<Button>Show Modal</Button>}
      >
        <Modal.Header>Create a new Sale</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Date sold</label>
              <Form.Field inline>
                <div>
                  <input
                    type="text"
                    defaultValue={currentDate}
                    onChange={(e) => updateSaleDate(e.target.value)}
                  />
                  {/* <button className="ui icon button">
                    <i className="calendar alternate icon"/>
                  </button> */}
                </div>
              </Form.Field>
            </Form.Field>
            <Form.Select
              fluid
              label="Customer"
              placeholder="Select a Customer"
              options={customerList}
              onChange={handleCustomer}
            />

            <Form.Select
              fluid
              label="Product"
              options={productList}
              placeholder="Select a Product"
              onChange={handleProduct}
            />

            <Form.Select
              fluid
              label="Store"
              options={storeList}
              placeholder="Select a Store"
              onChange={handleStore}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          {/* <Button color="black" onClick={() => setOpen(false)}> */}
          <Button color="red" onClick={() => toggleCreateCustomerModel(false)}>
            Cancel
          </Button>
          <Button color="green" onClick={createNewSale}>
            Create
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};
export default CreateSale;
