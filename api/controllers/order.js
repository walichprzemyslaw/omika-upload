import Order from "../models/Order.js";
import md5 from "js-md5";
import axios from "axios";

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};
export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const getOrdersByUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const orders = await Order.find({ customerId: userId });
    const list = await Promise.all(
      orders.map((order) => {
        return order;
      })
    );

    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const getOrdersByDate = async (req, res, next) => {
  try {
    const date = new Date();
    date.setUTCMonth(req.params.month);
    date.setUTCDate(req.params.day);
    date.setFullYear(req.params.year);
    // const date = new Date().setTime(time);
    console.log(date);
    // DODAĆ WYBÓR DATY
    // date.setUTCDate(14);
    // date.setUTCHours(0,0,0);
    // ROZJEŻDŻA SIĘ O GODZINĘ!!!!!!!
    // console.log(date);
    // date.setDate(21);
    const orders = await Order.find({
      createdAt: {
        $gte: date.setUTCHours(0, 0, 0),
        $lte: date.setUTCHours(23, 59, 59),
      },
    });
    const list = await Promise.all(
      orders.map((order) => {
        return order;
      })
    );

    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const getOrdersByStatus = async (req, res, next) => {
  try {
    const status = req.params.status;
    // const date = new Date();
    const date = new Date();
    date.setUTCMonth(req.params.month);
    date.setUTCDate(req.params.day);
    date.setFullYear(req.params.year);
    // date.setUTCDate(14);
    // date.setUTCHours(0,0,0);
    // ROZJEŻDŻA SIĘ O GODZINĘ!!!!!!!
    // console.log(date);
    const orders = await Order.find({
      createdAt: {
        $gte: date.setUTCHours(0, 0, 0),
        $lte: date.setUTCHours(23, 59, 59),
      },
      status: status,
    });
    const list = await Promise.all(
      orders.map((order) => {
        return order;
      })
    );

    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  const newOrder = new Order(req.body);
  console.log(req.body);

  const id = 32733;
  const crc = 3214;
  // const securityCode = "dEGbK36nmlo86MeQ";
  // crc wywalić?

  const hash = md5(
    id + `&` + req.body.totalPrice + `&` + crc + `&` + process.env.SECURITYCODE
  );
  console.log(hash);

  const transactionData = {
    id: 32733,
    amount: req.body.totalPrice,
    description: "zamówienie nr "+req.body._id,
    name: req.body.firstName + " " + req.body.lastName,
    email: req.body.email,
    crc: 3214,
    md5sum: hash,
    group: req.body.bankId,
    accept_tos: 1,
    // DODAĆ AKCEPTACJE REGULAMINU TPAY!!!!!
    api_password: process.env.APIPASSWORD,
  };
  const createTransaction = `https://secure.tpay.com/api/gw/${process.env.APIKEY}/transaction/create`;

  try {
    let url;
    if (req.body.paymentMethod === "online") {
      const resp = await axios.post(createTransaction, transactionData);
      console.log(resp.data);
      url = resp.data.url;
    }
    const savedOrder = await newOrder.save();
    const jsonData = Object.assign({}, savedOrder._doc, { url: url });
    res.status(200).json(jsonData);
  } catch (error) {
    next(error);
  }
};
export const updateOrder = async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
};
export const deleteOrder = async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order deleted.");
  } catch (error) {
    next(error);
  }
};
