import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function Success() {
  const { orderId } = useParams();
  const [orderItem, setOrderItem] = useState({});
  const getOrder = async (orderId) => {
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/order/${orderId}`
      );
      setOrderItem(res.data.order);
      console.log(Object.values(orderItem?.products || {}))
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };
  useEffect(() => {
    getOrder(orderId);
  }, [orderId]);
  return (
    <>
      <div className="container">
        <div
          style={{
            minHeight: "400px",
            backgroundImage:
              "url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)",
            backgroundPosition: "center center",
          }}
        ></div>
        <div className="mt-5 mb-7">
          <div className="row">
            <div className="col-md-6">
              <h2>Checkout Success</h2>
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea
              </p>
              <a
                href="./index.html"
                className="btn btn-outline-dark me-2 rounded-0 mb-4"
              >
                Back To Home
              </a>
            </div>
            <div className="col-md-6">
              <div className="card rounded-0 py-4">
                <div className="card-header border-bottom-0 bg-white px-4 py-0">
                  <h2>Order Detail</h2>
                </div>
                <div className="card-body px-4 py-0">
                  <ul className="list-group list-group-flush">
                    {Object.values(orderItem?.products || {}).map(item =>{
                         return (
                            <li className="list-group-item px-0">
                            <div className="d-flex mt-2">
                                <img
                                src={item.product.imageUrl}
                                alt={item.product.title}
                                className="me-2"
                                style={{
                                    width: "60px",
                                    height: "60px",
                                    objectFit: "cover",
                                }}
                                />
                                <div className="w-100 d-flex flex-column">
                                <div className="d-flex justify-content-between fw-bold">
                                    <h5>{item.product.title}</h5>
                                    <p className="mb-0">x{item.qty}</p>
                                </div>
                                <div className="d-flex justify-content-between mt-auto">
                                    <p className="text-muted mb-0">
                                    <small>NT${item.product.price}</small>
                                    </p>
                                    <p className="mb-0">NT${item.total}</p>
                                </div>
                                </div>
                            </div>
                            </li>

                        )
                    }) }
                   
                 
                    <li className="list-group-item px-0 pb-0">
                      <table className="table text-muted">
                        <tbody>
                          <tr>
                            <th
                              scope="row"
                              className="border-0 px-0 font-weight-normal"
                            >
                              合計
                            </th>
                            <td className="text-end border-0 px-0">NT${orderItem.total}</td>
                          </tr>
                         
                        </tbody>
                      </table>
                     
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Success;
