import Order from "../models/Order.js";

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
    const orders = await Order.find({customerId: userId});
    const list = await Promise.all(
      orders.map((order) => {
        return order
      })
    );

    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
export const createOrder = async (req, res, next) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
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
