import React, { Component } from "react";
import { Icon, Label, Menu, Table, Button } from "semantic-ui-react";
import _ from "lodash";
const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  //console.log("currentpage" + currentPage);
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <Menu floated="right" pagination>
      {pages.map((page) => (
        <Menu.Item
          as="a"
          key={page}
          className={page === currentPage ? "page-item active" : "page-item"}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Menu.Item>
      ))}
      {/* <Menu.Item as="a">1</Menu.Item>
      <Menu.Item as="a">2</Menu.Item>
      <Menu.Item as="a">3</Menu.Item>
      <Menu.Item as="a">4</Menu.Item> */}
    </Menu>
  );
};

export default Pagination;
