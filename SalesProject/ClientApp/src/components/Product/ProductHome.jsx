import React, { Component } from "react";
import axios from "axios";
import ProductTable from "./ProductTable";
import { Button } from "semantic-ui-react";
import CreateProduct from "./CreateProduct";
import DeleteProduct from "./DeleteProduct";
import EditProduct from "./EditProduct";

export class ProductHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      loading: true,
      openCreateProductModel: false,
      openDeleteProductModal: false,
      deleteProductId: 0,
      openEditProductModal: false,
      editProductId: 0,
      editProductName: "",
      editProductPrice: 0.0,
      productCount: 0,
    };
    this.toggleCreateProductModel = this.toggleCreateProductModel.bind(this);
  }
  render() {
    const {
      productList,
      loading,
      openCreateProductModel,
      openDeleteProductModal,
      deleteProductId,
      openEditProductModal,
      editProductId,
      editProductName,
      editProductPrice,
      productCount,
    } = this.state;

    if (loading) {
      return <div>Loading....</div>;
    } else {
      return (
        <div>
          <CreateProduct
            open={openCreateProductModel}
            toggleCreateProductModel={this.toggleCreateProductModel}
            fetchProducts={this.fetchProducts}
          />
          <Button
            color="blue"
            onClick={() => this.toggleCreateProductModel(true)}
          >
            New Product
          </Button>
          <ProductTable
            parent="ProductHome"
            products={productList}
            deleteProductIdFunction={this.deleteProductIdFunction}
            toggleDeleteProductModel={this.toggleDeleteProductModel}
            editProductDataFunction={this.editProductDataFunction}
            toggleEditProductModel={this.toggleEditProductModel}
            productCount={productList.length}
          />
          <DeleteProduct
            open={openDeleteProductModal}
            toggleDeleteProductModel={this.toggleDeleteProductModel}
            fetchProducts={this.fetchProducts}
            cusId={deleteProductId}
          />
          <EditProduct
            open={openEditProductModal}
            toggleEditProductModel={this.toggleEditProductModel}
            fetchProducts={this.fetchProducts}
            id={editProductId}
            name={editProductName}
            price={editProductPrice}
          />
        </div>
      );
    }
  }

  toggleCreateProductModel = (value) => {
    //console.log("togglecreatecustomer value" + value);
    this.setState({
      openCreateProductModel: value,
    });
  };

  toggleDeleteProductModel = (value) => {
    //console.log("toggledeletecustomer value" + value);
    this.setState({
      openDeleteProductModal: value,
    });
  };

  deleteProductIdFunction = (value) => {
    //console.log("deleteProductId" + value);
    this.setState({
      deleteProductId: value,
    });
  };

  toggleEditProductModel = (value) => {
    //console.log("toggleEditcustomer value" + value);
    this.setState({
      openEditProductModal: value,
    });
  };

  editProductDataFunction = (id, name, price) => {
    //console.log("editProductData" + value.name);
    this.setState({
      editProductId: id,
      editProductName: name,
      editProductPrice: price
    });
  };
  componentDidMount() {
    console.log("componentdidmount hit");
    this.fetchProducts();
  }

  fetchProducts = () => {
    axios
      .get("Products/GetProduct")
      .then((result) => {
        // handle success
        console.log("fetch success");
        console.log(result);
        this.setState({
          productList: result.data,
          loading: false,
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };
}

export default ProductHome;
