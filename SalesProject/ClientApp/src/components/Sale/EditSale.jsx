import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "semantic-ui-react";

const EditSale = (props) => {
  const {
    open,
    toggleEditCustomerModel,
    fetchSalesJoinTable,
    editSaleId,
    editCustomerId,
    editproductId,
    editStoreId,
    editDateSold,
    editCustomerName,
    editProductName,
    editStoreName,
    customerList,
    productList,
    storeList,
  } = props;
  const [saledate, setsaledate] = useState("");

  const [customerid, setcustomerId] = useState(0);
  const [productid, setproductid] = useState(0);
  const [storeid, setstoreid] = useState(0);
  const [handleSubmit, setHandleSubmit] = useState(false);

  const editSale = () => {
    var date = "";
    var cusId = 0;
    var proId = 0;
    var stoId = 0;
    if (!handleSubmit) {
      toggleEditCustomerModel(false);
    } else {
      if (saledate.trim() === "") {
        date = editDateSold;
      } else {
        date = saledate;
      }
      if (customerid === 0) {
          console.log("customerid"+customerid);
        cusId = editCustomerId;
      } else {
        cusId = customerid;
      }
      if (productid === 0) {
        proId = editproductId;
      } else {
        proId = productid;
      }
      if (storeid === 0) {
        stoId = editStoreId;
      } else {
        stoId = storeid;
      }
    }
    console.log("editdata:"+editSaleId+" "+date+" "+cusId+" "+proId+" "+stoId);
    editCustomerHandle(editSaleId, date, cusId, proId, stoId);
  };
  const editCustomerHandle = async (editSaleId, date, cusId, proId, stoId ) => {
    await axios
      .put(`Sales/PutSales/${editSaleId}`, {
        Id: editSaleId,
        ProductId: proId,
        CustomerId: cusId,
        StoreId: stoId,
        DateSold:date
      })
      .then(({ data }) => {
        console.log(data);
        toggleEditCustomerModel(false);
        updateHandleSubmit(false);
        //updateCustomerId(0);
       // updateProductId(0);
        //updateStoreId(0);
        props.fetchSalesJoinTable();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateSaleDate = (value) => {
    updateHandleSubmit(true);
    setsaledate(value);
  };
  const updateCustomerId = (value) => {
    updateHandleSubmit(true);
    setcustomerId(value);
  };
  const updateProductId = (value) => {
    updateHandleSubmit(true);
    setproductid(value);
  };
  const updateStoreId = (value) => {
    updateHandleSubmit(true);
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
        <Modal.Header>Edit Sale</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Date sold</label>
              <Form.Field inline>
                <div>
                  <input
                    type="text"
                    defaultValue={editDateSold}
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
              defaultValue={editCustomerName}
              onChange={handleCustomer}
            />

            <Form.Select
              fluid
              label="Product"
              options={productList}
              defaultValue={editProductName}
              placeholder="Select a Product"
              onChange={handleProduct}
            />

            <Form.Select
              fluid
              label="Store"
              options={storeList}
              defaultValue={editStoreName}
              placeholder="Select a Store"
              onChange={handleStore}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          {/* <Button color="black" onClick={() => setOpen(false)}> */}
          <Button color="red" onClick={() => toggleEditCustomerModel(false)}>
            Cancel
          </Button>
          <Button color="green" onClick={editSale}>Edit</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default EditSale;
