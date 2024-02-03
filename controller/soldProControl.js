const soldProductDB = require("../models/soldProModel");
// GET DATA

const getData = async (req, res) => {
  try {
    let AllProducts = await soldProductDB.find();
    if (!AllProducts.length) {
      return res.status(404).json({
        status: "warning",
        msg: "Data are not found",
        innerData: AllProducts,
      });
    }
    res.status(200).json({
      status: "success",
      msg: "Data are found",
      innerData: AllProducts,
    });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err, innerData: null });
  }
};

// CREATE DATA

const createData = async (req, res) => {
  try {
    let product = await soldProductDB.create(req.body);
    let saved = await product.save();
    res.status(201).json({
      status: "success",
      msg: "Data is saved",
      innerData: saved,
    });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err, innerData: null });
  }
};

// UPDATE DATA

// const updateData = async (req, res) => {
//   try {
//     let { id } = req.params;
//     let updatedpro = req.body;
//     let updatePro = await productDB.findByIdAndUpdate(id, updatedpro);
//     if (!updatePro) {
//       return res
//         .status(404)
//         .json({ msg: "product is not found", innerData: updatePro });
//     }
//     res.status(201).json({ msg: "product is updated ", innerData: updatePro });
//   } catch (err) {
//     res.status(500).json({ status: "error", msg: err, innerData: null });
//   }
// };

// // DELETE DATA

// const deleteData = async (req, res) => {
//   try {
//     let { id } = req.params;
//     let deletedpro = await productDB.findByIdAndDelete(id);
//     if (!deletedpro) {
//       return res
//         .status(404)
//         .json({ msg: "product is not found", innerData: deletedpro });
//     }
//     res.send({ msg: "product is deleted", innerData: deletedpro });
//   } catch (err) {
//     res.status(500).json({ status: "error", msg: err, innerData: null });
//   }
// };
// // DELETE ALL DATA
// const deleteAllData = async (req, res) => {
//   try {
//     let empty = await productDB.deleteMany({});
//     if (!empty) {
//       return res
//         .status(404)
//         .json({ msg: "Couldn't delete products", innerData: deletedpro });
//     }
//     res.send({ msg: "collection is cleared", innerData: deletedpro });
//   } catch (err) {
//     res.status(500).json({ status: "error", msg: err, innerData: null });
//   }
// };

module.exports = {
  getData,
  createData,
  //   updateData,
  //   deleteData,
  //   deleteAllData,
};
