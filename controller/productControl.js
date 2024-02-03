const productDB = require("../models/productModel");

// GET DATA

const getData = async (req, res) => {
  try {
    let AllProducts = await productDB.find();
    if (!AllProducts.length) {
      return res.status(404).json({
        status: "warning",
        msg: "Products are not found",
        innerData: AllProducts,
      });
    }
    res.status(200).json({
      status: "success",
      msg: "Products are found",
      innerData: AllProducts,
    });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err, innerData: null });
  }
};

// CREATE DATA

const createData = async (req, res) => {
  try {
    let product = await productDB.create(req.body);
    let saved = await product.save();
    res.status(201).json({
      status: "success",
      msg: "Product is created",
      innerData: saved,
    });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err, innerData: null });
  }
};

// UPDATE DATA

const updateData = async (req, res) => {
  try {
    let { id } = req.params;
    let updatedpro = req.body;
    let updatePro = await productDB.findByIdAndUpdate(id, updatedpro);
    if (!updatePro) {
      return res
        .status(404)
        .json({ msg: "product is not found", innerData: updatePro });
    }
    res.status(201).json({ msg: "product is updated ", innerData: updatePro });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err, innerData: null });
  }
};

//UPDATE MANY PRODUCTS QUANTITY
// const updateManyData = async (req, res) => {
//   try {
//     const array = req.body;
//     for (const item of array) {
//       const malumot = await productDB.findById(item._id);
//       if (malumot) {
//         malumot.quantity = malumot.quantity - item.quantity;
//         await malumot.save();
//       }
//     }
//   } catch (err) {
//     res.status(500).json({ status: "error", msg: err, innerData: null });
//   }
// };

const updateManyData = async (req, res) => {
  try {
    const array = req.body;
    // Basic input validation
    if (!Array.isArray(array)) {
      return res
        .status(400)
        .json({ status: "error", msg: "Noto'g'ri malumot yuborildi" });
    }

    for (const item of array) {
      // Check if the item has the required properties
      if (!item._id || !item.quantity) {
        return res
          .status(400)
          .json({ status: "error", msg: "_id va quantity topilmadi" });
      }

      const malumot = await productDB.findById(item._id);

      if (malumot) {
        malumot.quantity = malumot.quantity - item.quantity;
        await malumot.save();
      } else {
        return res.status(404).json({
          status: "error",
          msg: "Mahsulot topilmadi",
          innerData: item,
        });
      }
    }

    res.status(200).json({
      status: "success",
      msg: "Products updated successfully",
      innerData: null,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: "error", msg: "Internal server error", innerData: null });
  }
};

// DELETE DATA

const deleteData = async (req, res) => {
  try {
    let { id } = req.params;
    let deletedpro = await productDB.findByIdAndDelete(id);
    if (!deletedpro) {
      return res
        .status(404)
        .json({ msg: "product is not found", innerData: deletedpro });
    }
    res.send({ msg: "product is deleted", innerData: deletedpro });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err, innerData: null });
  }
};
// DELETE ALL DATA
const deleteAllData = async (req, res) => {
  try {
    let empty = await productDB.deleteMany({});
    if (!empty) {
      return res
        .status(404)
        .json({ msg: "Couldn't delete products", innerData: deletedpro });
    }
    res.send({ msg: "collection is cleared", innerData: deletedpro });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err, innerData: null });
  }
};
// SINGLE DATA

const getSingle = async (req, res) => {
  try {
    let { id } = req.params;
    let singlePro = await productDB.findById(id);
    if (!singlePro) {
      res.status(404).json({ status: "warning", innerData: singlePro });
    }
    res.status(200).json({ status: "success", innerData: singlePro });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err, innerData: null });
  }
};

// SEARCH DATA

const search = async (req, res) => {
  try {
    let { value } = req.body;
    let products = await productDB.find();
    let result = products.filter((i) =>
      i.title.toLowerCase().includes(value.toLowerCase())
    );
    if (result.length) {
      return res.status(200).json({
        status: "success",
        msg: "products are found",
        innerData: result,
      });
    }
    res.status(404).json({
      status: "warning",
      msg: "products are not found",
      innerData: null,
    });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err, innerData: null });
  }
};

// SEARCH CATEGORY
const category = async (req, res) => {
  try {
    let { category } = req.query;
    let filteredData = await productDB.find({ category });

    if (!filteredData.length) {
      return res.status(404).json({
        status: "warning",
        msg: "No products found",
        innerData: filteredData,
      });
    }

    res.status(200).json({
      status: "success",
      msg: "Product are found",
      innerData: filteredData,
    });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err, innerData: null });
  }
};

// SCANNED DATA

const scan = async (req, res) => {
  try {
    let { barcode } = req.body;
    let filteredData = await productDB.findOne({ barcode });
    if (filteredData) {
      return res.status(200).json({
        status: "success",
        msg: "product is found",
        innerData: filteredData,
      });
    }
    res.status(404).json({
      status: "warning",
      msg: "product is not found",
      innerData: null,
    });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err, innerData: null });
  }
};

module.exports = {
  getData,
  getSingle,
  createData,
  updateData,
  deleteData,
  search,
  category,
  scan,
  deleteAllData,
  updateManyData,
};
