import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import CreateSale from "./CreateSale";
import axios from "axios";
import SaleTable from "./SaleTable";
import DeleteSale from "./DeleteSale";
import EditSale from "./EditSale";
export class SaleHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      openCreateCustomerModel: false,
      customerList: [],
      productList: [],
      storeList: [],
      deleteCustomerId: 0,
      openDeleteCustomerModal: false,
      openEditCustomerModal: false,
      editSaleId: 0,
      editCustomerId:0,
      editproductId:0,
      editStoreId:0,
      editDateSold:"",
      editCustomerName: "",
      editProductName:"",
      editStoreName:"",
      currentDate:
        new Date().toLocaleString().substring(6, 10) +
        "-" +
        new Date().toLocaleString().substring(3, 5) +
        "-" +
        new Date().toLocaleString().substring(0, 2),
      joinTableData: [],
    };
    this.toggleCreateCustomerModel = this.toggleCreateCustomerModel.bind(this);
  }

  render() {
    const {
      loading,
      openCreateCustomerModel,
      customerList,
      productList,
      storeList,
      currentDate,
      joinTableData,
      openDeleteCustomerModal,
      deleteCustomerId,
      openEditCustomerModal,
      editCustomerId,
      editCustomerName,
      editSaleId,
      editproductId,
      editStoreId,
      editDateSold,
      editProductName,
      editStoreName,
    } = this.state;

    if (loading) {
      return <div>Loading....</div>;
    } else {
      return (
        <div>
          <CreateSale
            open={openCreateCustomerModel}
            toggleCreateCustomerModel={this.toggleCreateCustomerModel}
            customerList={customerList}
            productList={productList}
            storeList={storeList}
            currentDate={currentDate}
            fetchSalesJoinTable={this.fetchSalesJoinTable}
          />
          <Button
            color="blue"
            onClick={() => this.toggleCreateCustomerModel(true)}
          >
            New Sale
          </Button>

          <SaleTable
            parent="SaleHome"
            joinTableData={joinTableData}
            deleteCustomerIdFunction={this.deleteCustomerIdFunction}
            toggleDeleteCustomerModel={this.toggleDeleteCustomerModel}
            editCustomerDataFunction={this.editCustomerDataFunction}
            toggleEditCustomerModel={this.toggleEditCustomerModel}
            customerCount={joinTableData.length}
          />
          <DeleteSale
            open={openDeleteCustomerModal}
            toggleDeleteCustomerModel={this.toggleDeleteCustomerModel}
            fetchSalesJoinTable={this.fetchSalesJoinTable}
            cusId={deleteCustomerId}
          />

          <EditSale
            open={openEditCustomerModal}
            toggleEditCustomerModel={this.toggleEditCustomerModel}
            fetchSalesJoinTable={this.fetchSalesJoinTable}

            editSaleId={editSaleId}
            editCustomerId={editCustomerId}
            editproductId={editproductId}
            editStoreId={editStoreId}
            editDateSold={editDateSold}

            editCustomerName={editCustomerName}
            editProductName={editProductName}
            editStoreName={editStoreName}

            customerList={customerList}
            productList={productList}
            storeList={storeList}
           // currentDate={currentDate}
          />
        </div>
      );
    }
  }
  toggleCreateCustomerModel = (value) => {
    //console.log("togglecreatecustomer value" + value);
    this.setState({
      openCreateCustomerModel: value,
    });
  };
  toggleDeleteCustomerModel = (value) => {
    //console.log("toggledeletecustomer value" + value);
    this.setState({
      openDeleteCustomerModal: value,
    });
  };

  deleteCustomerIdFunction = (value) => {
    //console.log("deleteCustomerId" + value);
    this.setState({
      deleteCustomerId: value,
    });
  };

  toggleEditCustomerModel = (value) => {
    //console.log("toggleEditcustomer value" + value);
    this.setState({
      openEditCustomerModal: value,
    });
  };

  editCustomerDataFunction = (saleId, cusId, proId, stoId, date, cusName, proName, stoName) => {
//    console.log("editCustomerDat" + name);
    this.setState({
      editSaleId: saleId,
      editCustomerId:cusId,
      editproductId:proId,
      editStoreId:stoId,
      editDateSold:date.substring(0,10),
      editCustomerName:cusName,
      editProductName:proName,
      editStoreName:stoName
    });
  };
  componentDidMount() {
    console.log("componentdidmount hit");
    this.fetchCustomer();
  }

  fetchCustomer = async () => {
    await axios
      .get("Customers/GetSelectCustomer")
      .then((result) => {
        // handle success
        console.log("fetch customer success");
        //console.log(result.data.0)
        var cusData = this.arrayManager(result.data);
        console.log(cusData);
        this.setState({
          customerList: cusData,
        });

        this.fetchProduct();
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };
  arrayManager = (data) => {
    let technologyList = [];
    for (let i = 0; i < data.length; i++) {
      technologyList.push({
        key: data[i].id,
        text: data[i].name,
        value: data[i].name,
      });
    }
    return technologyList;
  };
  fetchProduct = async () => {
    await axios
      .get("Products/GetProduct")
      .then((result) => {
        // handle success
        console.log("fetch product success");
        var cusData = this.arrayManager(result.data);
        this.setState({
          productList: cusData,
        });
        this.fetchStore();
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  fetchStore = async () => {
    await axios
      .get("Stores/GetStore")
      .then((result) => {
        // handle success
        console.log("fetch store success");
        var cusData = this.arrayManager(result.data);
        this.setState({
          storeList: cusData,
        });
        this.fetchSalesJoinTable();
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  fetchSalesJoinTable = async () => {
    await axios
      .get("Sales/getJoinTableData")
      .then((result) => {
        // handle success
        console.log("fetch join success");
        console.log(result);
        this.setState({
          joinTableData: result.data,
          loading: false,
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };
}
export default SaleHome;
