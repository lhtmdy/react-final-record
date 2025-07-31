import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams,useOutletContext } from "react-router-dom";
import {
  MessageContext,
  handleSuccessMessage,
  handleErrorMessage,
} from "../../store/message.store";
function ProductDetail() {
  const [product, setProduct] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [isLoading, setIsLodaing] = useState(false);
  const { id } = useParams();

  const {getCartData} = useOutletContext();

  const [, dispatch] = useContext(MessageContext);

  const getProduct = async (id) => {
    const productRes = await axios.get(
      `v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`
    );
    console.log(productRes);
    setProduct(productRes.data.product);
  };
  useEffect(() => {
    getProduct(id);
  }, [id]);

  const addToCart = async () => {
    setIsLodaing(true);
    try {
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`,
        {
          data: {
            product_id: id,
            qty: Number(cartQuantity),
          },
        }
      );
      console.log(res);
      handleSuccessMessage(dispatch, res);
      setIsLodaing(false);
      getCartData();
    } catch (error) {
      handleErrorMessage(dispatch, error.response);
      setIsLodaing(false);
    }
  };
  return (
    <>
      <div className="container">
        <div
          style={{
            minHeight: "400px",
            backgroundImage: `url(${product.imageUrl})`,
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="row justify-content-between mt-4 mb-7">
          <div className="col-md-7">
            <h2 className="mb-0">{product.title}</h2>
            <p className="fw-bold">NT${product.price}</p>
            <p>{product.description}</p>
            <div className="my-4">
              <img src={product.imageUrl} alt="" className="img-fluid mt-4" />
            </div>
            <div
              className="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3"
              id="accordionExample"
            ></div>
          </div>
          <div className="col-md-4">
            <div className="input-group mb-3 border mt-3">
              <div className="input-group-prepend">
                <button
                  className="btn btn-outline-dark rounded-0 border-0 py-3"
                  type="button"
                  id="button-addon1"
                  onClick={() =>
                    setCartQuantity((pre) => (pre === 1 ? pre : pre - 1))
                  }
                >
                  <i className="bi bi-dash"></i>
                </button>
              </div>
              <input
                readOnly
                type="number"
                className="form-control border-0 text-center my-auto shadow-none"
                placeholder=""
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                value={cartQuantity}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-dark rounded-0 border-0 py-3"
                  type="button"
                  id="button-addon2"
                  onClick={() => setCartQuantity((pre) => pre + 1)}
                >
                  <i className="bi bi-plus"></i>
                </button>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-dark btn-block rounded-0 py-3 w-100"
              onClick={addToCart}
              disabled={isLoading}
            >
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProductDetail;
