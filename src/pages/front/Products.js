import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../components/Pagination";
import { Link } from "react-router-dom";
function Products() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const getProducts = async (page = 1) => {
    const productRes = await axios.get(
      `v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`
    );
    console.log(productRes);
    setProducts(productRes.data.products);
    setPagination(productRes.data.pagination);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="container mt-md-5 mt-3 mb-7">
        <div className="row">
          {products.map((item) => {
            return (
              <div className="col-md-3" key={item.id}>
                <div className="card border-0 mb-4 position-relative position-relative">
                  <img
                    src={item.imageUrl}
                    className="card-img-top rounded-0 object-cover"
                    alt={item.title}
                    style={{ height: "200px" }}
                  />
                  <div className="card-body p-0">
                    <h4 className="mb-0 mt-2">
                      <Link to={`/product/${item.id}`}>{item.title}</Link>
                    </h4>
                    <p className="card-text text-muted mb-0">
                      {item.description}
                    </p>
                    <p className="text-muted mt-3">NT$ {item.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <nav className="d-flex justify-content-center">
          <Pagination changePage={getProducts} pagination={pagination} />
        </nav>
      </div>
    </>
  );
}

export default Products;
