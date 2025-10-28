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
      <div className="px-4">
        <div className="grid grid-cols-4 gap-4">
          {products.map((item) => {
            return (
                <div className="  shadow rounded-t-[20px] overflow-hidden rounded-b-[12px]" key={item.id}>
                  <img
                    src={item.imageUrl}
                    className="w-full h-60 object-cover"
                    alt={item.title}
                  />
                  <div className="p-4 flex flex-col justify-between gap-y-4">
                    <h4 className=" mt-2 text-h4 text-blue-07 mb-2 line-clamp-1">
                      <Link to={`/product/${item.id}`}>{item.title}</Link>
                    </h4>
                    <p className="line-clamp-2 text-gray-06">
                      {item.description}
                    </p>
                    <p className="font-blod text-h5 text-pink-06">NT$ {item.price}</p>
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
