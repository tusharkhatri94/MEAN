const mongoose = require('mongoose');
const Product = mongoose.model('products');


const getProduct = function (req, res) {
    Product.find().exec(function (err, productdata) {
        if (err) {
            res.status(404)
                .json(err);
            return;
        }
        res.status(200).json(productdata);

    });
}

const createProduct = function (req, res) {
    Product.create({
        productName: req.body.productName,
        type: req.body.type,
        price: req.body.price,
        benefit:req.body.benefit
        
    }, (err, productdata) => {
        if (err) {
            res.status(400)
                .json(err);
        } else {
            res.status(201)
                .json(productdata);
        }
    });
}
const getSingleProduct = function (req, res) {
    if (req.params && req.params.productid) {
        Product.findById(req.params.productid)
            .exec((err, productdata) => {
                if (!productdata) {
                    res.status(404)
                        .json({
                            "message": "Productid not found"
                        });
                    return;
                } else if (err) {
                    res.status(404)
                        .json(err);
                    return;
                }
                res.status(200)
                    .json(productdata);
            });
    } else {
        res.status(404)
            .json({
                "message": "no Productid in request"
            });
    }
}
const updateProduct = function (req, res) {
    if (!req.params.productid) {
        res.
        status(404)
            .json({
                "message": "Not found, Productlist is required"
            });
        return;
    }
    Product.findById(req.params.productid)
        .exec((err, productdata) => {
            if (!productdata) {
                res
                    .json(404)
                    .status({
                        "message": "Productid not found"
                    });
                return;
            } else if (err) {
                res.status(400)
                    .json(err);
                return;
            }

            productdata.productName = req.body.productName;
            productdata.type = req.body.type;
            productdata.price = req.body.price;
            productdata.benefit = req.body.benefit;
            productdata.save((err, productdata) => {
                if (err) {
                    res.status(404)
                        .json(err);
                } else {
                    res.status(200)
                        .json(productdata);
                }

            });
        });
}
const deleteProduct = function (req, res) {
    const productid = req.params.productid;

    if (productid) {
        Product
            .findByIdAndRemove(productid)
            .exec((err, productdata) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                    return;
                }
                res.status(204)
                    .json(null);

            });
    } else {
        res.status(404)
            .json({
                "message": "No Productid"
            });
    }
}

module.exports = {
    getProduct,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
};
