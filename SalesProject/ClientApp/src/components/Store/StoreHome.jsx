import React, { Component } from "react";
import axios from "axios";
import StoreTable from "./StoreTable";
import { Button } from "semantic-ui-react";
import CreateStore from "./CreateStore";
import DeleteStore from "./DeleteStore";
import EditStore from "./EditStore";

export class StoreHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerList: [],
      loading: true,
      openCreateCustomerModel: false,
      openDeleteCustomerModal: false,
      deleteCustomerId: 0,
      openEditCustomerModal: false,
      editCustomerId: 0,
      editCustomerName: "",
      editCustomerAddress: "",
      customerCount:0
    };
    this.toggleCreateCustomerModel = this.toggleCreateCustomerModel.bind(this);
  }
  render() {
    const {
      customerList,
      loading,
      openCreateCustomerModel,
      openDeleteCustomerModal,
      deleteCustomerId,
      openEditCustomerModal,
      editCustomerId,
      editCustomerName,
      editCustomerAddress,
      customerCount,
    } = this.state;

    if (loading) {
      return <div>Loading....</div>;
    } else {
      return (
        <div>
          <CreateStore
            open={openCreateCustomerModel}
            toggleCreateCustomerModel={this.toggleCreateCustomerModel}
            fetchCustomers={this.fetchCustomers}
          />
          <Button
            color="blue"
            onClick={() => this.toggleCreateCustomerModel(true)}
          >
            New Store
          </Button>
          <StoreTable
            parent="CustomerHome"
            customers={customerList}
            deleteCustomerIdFunction={this.deleteCustomerIdFunction}
            toggleDeleteCustomerModel={this.toggleDeleteCustomerModel}
            editCustomerDataFunction={this.editCustomerDataFunction}
            toggleEditCustomerModel={this.toggleEditCustomerModel}
            customerCount={customerList.length}
          />
          <DeleteStore
            open={openDeleteCustomerModal}
            toggleDeleteCustomerModel={this.toggleDeleteCustomerModel}
            fetchCustomers={this.fetchCustomers}
            cusId={deleteCustomerId}
          />
          <EditStore
            open={openEditCustomerModal}
            toggleEditCustomerModel={this.toggleEditCustomerModel}
            fetchCustomers={this.fetchCustomers}
            id={editCustomerId}
            name={editCustomerName}
            address={editCustomerAddress}
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

  editCustomerDataFunction = (id, name, address) => {
    console.log("editCustomerDat" + name);
    this.setState({
      editCustomerId: id,
      editCustomerName:name,
      editCustomerAddress:address
    });
  };
  componentDidMount() {
    console.log("componentdidmount hit");
    this.fetchCustomers();
  }

  fetchCustomers = () => {
    axios
      .get("Stores/GetStore")
      .then((result) => {
        // handle success
        console.log("fetch success");
        console.log(result);
        this.setState({
          customerList: result.data,
          loading: false,
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };
}

export default StoreHome;
