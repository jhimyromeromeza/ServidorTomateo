import mongoose from "mongoose";

const productsSchema = mongoose.Schema({
    nameProduct: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    marca: {
        type: String,
        required: true,
        trim: true,
    },
    priceFactoryProduct: {
        type: Number,
        required: true
    },
    priceStoreProduct: {
        type: Number,
        required: true
    },
    imageProduct: {
        type: String,
        default: "",
    },
    imagePath: {
        type: String,
        default: "",
    }
}, {timestamps: true});

const Product = mongoose.model('Product', productsSchema)

export default Product;