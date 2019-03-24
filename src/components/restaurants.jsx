import React, { Component } from "react";
import { getRestaurants } from "../services/restaurantService";
import _ from "lodash";
import FileUpload from "./fileUpload";
import StoreSearch from "./storeSearch";
import StoresView from "./storesView";
import Pagination from "./pagination";

class Restaurants extends Component {
  state = {
    restaurants: [],
    cuisines: [],
    selectedCuisine: null,
    pageSize: 20,
    currentPage: 1,
    searchQuery: "",
    sortColumn: { type: "discountedPrice", order: "asc" }
  };

  componentDidMount() {
    this.setState({ restaurants: getRestaurants() });
  }

  initData = () => {
    const {
      restaurants: allrestaurants,
      searchQuery,
      sortColumn,
      currentPage,
      pageSize
    } = this.state;
    let filtered = allrestaurants;
    if (searchQuery)
      filtered = allrestaurants.filter(product => this.filterProduct(product));
    else filtered = allrestaurants;

    const sorted = _.orderBy(filtered, [sortColumn.type], [sortColumn.order]);
    const restaurants = this.paginate(sorted, currentPage, pageSize);
    return { totalCount: restaurants.length, restaurants };
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(e.target.files[0]);
  };

  paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    return _(items)
      .slice(startIndex)
      .take(pageSize)
      .value();
  }

  filterRestaurant(restaurant) {
    const query = this.state.searchQuery.toLowerCase();
    return (
      restaurant.restaurantName.toLowerCase().includes(query) ||
      restaurant.brand.toLowerCase().includes(query) ||
      restaurant.description.toLowerCase().includes(query)
    );
  }

  handlePageChange = currentPage => {
    this.setState({ page: currentPage });
  };

  render() {
    const { length: count } = this.state.restaurants;
    const { pageSize, currentPage, searchQuery, sortColumn } = this.state;
    const { totalCount, restaurants } = this.initData();
    if (count === 0)
      return (
        <div>
          <p>There are no restaurants avaialable to show.</p>
          <FileUpload handleSubmit={this.handleSubmit} />
        </div>
      );
    return (
      <div className="row">
        <div className="col">
          <FileUpload handleSubmit={this.handleSubmit} />
          <p>Hello, Showing {totalCount} restaurants</p>
          <StoreSearch value={searchQuery} onChange={this.handleSearch} />
          <Pagination
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
            itemsCount={totalCount}
            pageSize={pageSize}
          />
        </div>
      </div>
    );
  }
}

export default Restaurants;
