import React, { useEffect, useState } from "react";

import socketio from "socket.io-client";

import Order from "~/components/List/Order";

import notificationsound from "~/assets/notification.mp3";
import api from "~/services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const socket = socketio.connect(process.env.REACT_APP_BASE_URL, {});
    socket.on("orders", (data) => {
      let url = notificationsound;
      let audio = new Audio(url);
      audio.play();
      getOrders();
    });
    async function getOrders() {
      try {
        const response = await api.get("/orders");
        setOrders(response.data);
      } catch (error) {}
    }
    getOrders();
  }, []);
  return (
    <>
      {orders.map((val) => {
        return <Order data={val} />;
      })}
    </>
  );
}
