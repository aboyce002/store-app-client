import serverApi from '../../api/serverApi';
import { useParams, useSearchParams } from "react-router-dom";
import React, { Component } from 'react';

//const [ searchParams ] = useSearchParams();
//const { title, availibility, category } = useParams();

class ProductDataService extends Component {

  getById(id) {
    return serverApi.get(`/products/${id}`);
  }

  getAll(title, availability, category) {
    return serverApi.get('/products', {
      //use searchValue here
      //params: { searchParams }
    });
  }

  create(data) {
    return serverApi.post("/products", data);
  }

  updateById(id, data) {
    return serverApi.put(`/products/${id}`, data);
  }

  deleteById(id) {
    return serverApi.delete(`/products/${id}`);
  }

  deleteAll() {
    return serverApi.delete(`/products`);
  }

  findByTitle(title) {
    return serverApi.get(`/products?title=${title}`);
  }
}

export default ProductDataService;
