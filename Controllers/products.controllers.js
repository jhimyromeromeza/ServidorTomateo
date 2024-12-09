import Product from "../models/products.models.js";

export const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postProduct = async (req, res) => {
  try {
    const {
      nameProduct,
      marca,
      priceFactoryProduct,
      priceStoreProduct,
      imageProduct,
      imagePath,
    } = req.body;
    const product = await Product.findOne({ nameProduct });
    if (product) {
      return res.status(400).json({ error: "nameProduct already exists" });
    }

    const newProduct = new Product({
      nameProduct,
      marca,
      priceFactoryProduct,
      priceStoreProduct,
      imageProduct,
      imagePath,
    });
    if (newProduct) {
      const productSave = await newProduct.save();
      res.status(201).json({
        id: productSave._id,
        nameProduct: productSave.nameProduct,
        marca: productSave.marca,
        priceFactoryProduct: productSave.priceFactoryProduct,
        priceStoreProduct: productSave.priceStoreProduct,
        imageProduct: productSave.imageProduct,
        imagePath: productSave.imagePath,
      });
    } else {
      res.status(400).json({ error: "invalid product data" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params._id;
    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {new: true});
    return res.status(202).json(updateProduct);
  }catch (error) {
    res.status(500).json({error: error.message})
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id  = req.params._id;
    const deleteProduct = await Product.findByIdAndDelete(id);
    if (!deleteProduct) throw Error;
    return res.sendStatus(204);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
