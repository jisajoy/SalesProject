import axios from "axios";
import React, { Component, useState, useEffect } from "react";
import { Icon, Label, Menu, Table, Button } from "semantic-ui-react";
import CustomerHome from "./CustomerHome";
import Pagination from "./Pagination";
import Paginate from "./Paginate";
const CustomerTable = (props) => {
  const {
    customers,
    deleteCustomerIdFunction,
    toggleDeleteCustomerModel,
    editCustomerDataFunction,
    toggleEditCustomerModel,
    customerCount,
  } = props;
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  //const customerHome = new CustomerHome();

  useEffect(() => {
    return () => {};
  }, [pageSize]);

  useEffect(() => {
    return () => {};
  }, [currentPage]);

  const handleCustomerDelete = (cusId) => {
    toggleDeleteCustomerModel(true);
    deleteCustomerIdFunction(cusId);
  };

  const handleCustomerEdit = (customer) => {
    console.log("handlecustomeredit" + customer.name);
    toggleEditCustomerModel(true);
    editCustomerDataFunction(customer.id, customer.name, customer.address);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div>
{/* { const customerData = paginate(customers, currentPage, pageSize);} */}
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Paginate(customers, currentPage, pageSize).map((r) => {
            return (
              <Table.Row>
                <Table.Cell>{r.name}</Table.Cell>
                <Table.Cell>{r.address}</Table.Cell>
                <Table.Cell>
                  {" "}
                  <Button color="yellow" onClick={() => handleCustomerEdit(r)}>
                    Edit
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  {" "}
                  <Button
                    color="red"
                    onClick={() => handleCustomerDelete(r.id)}
                  >
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="4">
              <Pagination
                itemsCount={customerCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
};

export default CustomerTable;
{
  /* <Menu floated="right" pagination>
<Menu.Item as="a" icon>
  <Icon name="chevron left" />
</Menu.Item>
<Menu.Item as="a">1</Menu.Item>
<Menu.Item as="a">2</Menu.Item>
<Menu.Item as="a">3</Menu.Item>
<Menu.Item as="a">4</Menu.Item>
<Menu.Item as="a" icon>
  <Icon name="chevron right" />
</Menu.Item>
</Menu> */
}
