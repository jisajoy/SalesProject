import axios from "axios";
import React, { Component, useState, useEffect } from "react";
import { Icon, Label, Menu, Table, Button } from "semantic-ui-react";
import ProductHome from "./ProductHome";
import Pagination from "./Pagination";
import Paginate from "./Paginate";
const ProductTable = (props) => {
  const {
    products,
    deleteProductIdFunction,
    toggleDeleteProductModel,
    editProductDataFunction,
    toggleEditProductModel,
    productCount,
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

  const handleProductDelete = (cusId) => {
    toggleDeleteProductModel(true);
    deleteProductIdFunction(cusId);
  };

  const handleProductEdit = (product) => {
    console.log("handleproductedit" + product.name);
    toggleEditProductModel(true);
    editProductDataFunction(product.id, product.name, product.price);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Paginate(products, currentPage, pageSize).map((r) => {
            return (
              <Table.Row>
                <Table.Cell>{r.name}</Table.Cell>
                <Table.Cell>{"$"+r.price}</Table.Cell>
                <Table.Cell>
                  {" "}
                  <Button color="yellow" onClick={() => handleProductEdit(r)}>
                    Edit
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  {" "}
                  <Button
                    color="red"
                    onClick={() => handleProductDelete(r.id)}
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
                itemsCount={productCount}
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

export default ProductTable;
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
