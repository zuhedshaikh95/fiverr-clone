import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { axiosFetch } from "../../utils";
import "./Orders.scss";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      axiosFetch
        .get(`/orders`)
        .then(({ data }) => {
          console.log(data);
          return data;
        })
        .catch(({ response }) => {
          console.log(response.data);
        }),
  });

  const handleContact = async (order) => {
    const sellerID = order.sellerID.hasOwnProperty("_id")
      ? order.sellerID._id
      : order.sellerID;
    const buyerID = order.buyerID.hasOwnProperty("_id")
      ? order.buyerID._id
      : order.buyerID;

    axiosFetch
      .get(`/conversations/single/${sellerID}/${buyerID}`)
      .then(({ data }) => {
        navigate(`/message/${data.conversationID}`);
      })
      .catch(async ({ response }) => {
        if (response.status === 404) {
          const { data } = await axiosFetch.post("/conversations", {
            to: currentUser.isSeller ? buyerID : sellerID,
            from: currentUser.isSeller ? sellerID : buyerID,
          });
          navigate(`/message/${data.conversationID}`);
        }
      });
  };

  return (
    <div className="orders">
      {isLoading ? (
        "...loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                <th>Title</th>
                <th>Price</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order) => (
                <tr key={order._id}>
                  <td>
                    <img className="img" src={order.image} alt="" />
                  </td>
                  <td>
                    {currentUser.isSeller
                      ? order.buyerID.username
                      : order.sellerID.username}
                  </td>
                  <td>{order.title.slice(0, 30)}...</td>
                  <td>
                    {order.price.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                      style: "currency",
                      currency: "INR",
                    })}
                  </td>
                  <td>
                    <img
                      className="message"
                      src="./media/message.png"
                      alt="message"
                      onClick={() => handleContact(order)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
