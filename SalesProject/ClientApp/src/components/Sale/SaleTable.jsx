import axios from "axios";
import React, { Component, useState, useEffect } from "react";
import { Icon, Label, Menu, Table, Button, TableCell } from "semantic-ui-react";
import CustomerHome from "./SaleHome";
import Pagination from "./Pagination";
import Paginate from "./Paginate";
const SaleTable = (props) => {
  const {
    joinTableData,
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
    //console.log("handlecustomeredit" + customer.name);
    toggleEditCustomerModel(true);
    editCustomerDataFunction(
      customer.saleId,
      customer.customerId,
      customer.productId,
      customer.storeId,
      customer.datesold,
      customer.customerName,
      customer.productName,
      customer.storeName
    );
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
            <Table.HeaderCell>Customer</Table.HeaderCell>
            <Table.HeaderCell>Product</Table.HeaderCell>
            <Table.HeaderCell>Store</Table.HeaderCell>
            <Table.HeaderCell>Date Sold</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Paginate(joinTableData, currentPage, pageSize).map((r) => {
            return (
              <Table.Row>
                <Table.Cell>{r.customerName}</Table.Cell>
                <Table.Cell>{r.productName}</Table.Cell>
                <Table.Cell>{r.storeName}</Table.Cell>
                <Table.Cell>{r.datesold}</Table.Cell>
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
                    onClick={() => handleCustomerDelete(r.saleId)}
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
            <Table.HeaderCell colSpan="6">
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

export default SaleTable;
