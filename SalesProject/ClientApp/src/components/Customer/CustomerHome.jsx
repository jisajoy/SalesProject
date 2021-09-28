import React, { Component } from "react";
import axios from "axios";
import CustomerTable from "./CustomerTable";
import { Button } from "semantic-ui-react";
import CreateCustomer from "./CreateCustomer";
import DeleteCustomer from "./DeleteCustomer";
import EditCustomer from "./EditCustomer";

export class CustomerHome extends React.Component {
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
          <CreateCustomer
            open={openCreateCustomerModel}
            toggleCreateCustomerModel={this.toggleCreateCustomerModel}
            fetchCustomers={this.fetchCustomers}
          />
          <Button
            color="blue"
            onClick={() => this.toggleCreateCustomerModel(true)}
          >
            New Customer
          </Button>
          <CustomerTable
            parent="CustomerHome"
            customers={customerList}
            deleteCustomerIdFunction={this.deleteCustomerIdFunction}
            toggleDeleteCustomerModel={this.toggleDeleteCustomerModel}
            editCustomerDataFunction={this.editCustomerDataFunction}
            toggleEditCustomerModel={this.toggleEditCustomerModel}
            customerCount={customerList.length}
          />
          <DeleteCustomer
            open={openDeleteCustomerModal}
            toggleDeleteCustomerModel={this.toggleDeleteCustomerModel}
            fetchCustomers={this.fetchCustomers}
            cusId={deleteCustomerId}
          />
          <EditCustomer
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
      .get("Customers/GetCustomer")
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

export default CustomerHome;
