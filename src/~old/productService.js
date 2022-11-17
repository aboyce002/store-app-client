import fakeStoreApi from '../../api/fakeStoreApi';
import serverApi from '../../api/serverApi';

class ProductDataService {
  getAll() {
    return fakeStoreApi.get('/products', {
      //use searchValue here
      //params: { query: this.state.term }
    });
  }

  get(id) {
    return fakeStoreApi.get(`/products/${id}`);
  }

  create(data) {
    return serverApi.post("/products", data);
  }

  update(id, data) {
    return serverApi.put(`/products/${id}`, data);
  }

  delete(id) {
    return serverApi.delete(`/products/${id}`);
  }

  deleteAll() {
    return serverApi.delete(`/products`);
  }

  findByTitle(title) {
    return serverApi.get(`/products?title=${title}`);
  }
}

export default new ProductDataService();