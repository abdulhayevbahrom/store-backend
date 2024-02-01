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
      msg: "Product are found",
      innerData: AllProducts,
    });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err, innerData: null });
  }
};

// CREATE DATA

const createData = async (req, res) => {
  try {
    let {
      title,
      size,
      orgPrice,
      price,
      quantity,
      color,
      brand,
      subcategory,
      category,
    } = await req.body;
    let proCategory = await productDB.find();
    let product = await productDB.create(req.body);
    let saved = await product.save();

    let findProcategory = await proCategory.find(
      (i) => i.category === category
    );
    if (findProcategory) {
      if (
        findProcategory.title === title &&
        findProcategory.size === size &&
        findProcategory.orgPrice === orgPrice &&
        findProcategory.price === price &&
        findProcategory.color === color &&
        findProcategory.brand === brand &&
        findProcategory.subcategory === subcategory
      ) {
        let addQuantity = (await findProcategory.quantity) + quantity;
        res.status(201).json({
          status: "success",
          msg: "Product is created",
          innerData: {
            proData: findProcategory,
            addProQuantity: addQuantity,
          },
        });
      } else {
        console.log("err");
      }
    } else {
      res.status(201).json({
        status: "success",
        msg: "Product is created",
        innerData: {
          proSavId: saved._id,
          proSaved: saved,
        },
      });
    }

    // console.log(category);
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
        msg: "Product not found",
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

module.exports = {
  getData,
  getSingle,
  createData,
  updateData,
  deleteData,
  search,
  category,
};
