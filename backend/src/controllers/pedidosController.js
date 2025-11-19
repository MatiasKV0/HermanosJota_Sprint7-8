import Pedido from "../models/Pedido.js";

const obtenerPedidos = async (req, res, next) => {
  try {
    const usuario = req.usuario;
    const pedidos = await Pedido.find({ usuario: usuario._id });
    res.json({ pedidos });
  } catch (error) {
    next(error);
  }
};

const realizarPedido = async (req, res, next) => {
  try {
    const usuario = req.usuario;
    const nuevoPedido = new Pedido({
      ...req.body,
      usuario: usuario._id,
    });
    await nuevoPedido.save();
    res.status(201).json({ msg: "Pedido realizado con éxito", pedido: nuevoPedido });
  } catch (error) {
    next(error);
  }
};

export { obtenerPedidos, realizarPedido };