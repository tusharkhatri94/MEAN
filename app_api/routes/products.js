var express = require('express');
var router = express.Router();

const ctrlProd=require('../controllers/product');
 
router
     .route('/products')
     .get(ctrlProd.getProduct)
     .post(ctrlProd.createProduct);
     
router
    .route('/products/:productid')
    .get(ctrlProd.getSingleProduct)
    .put(ctrlProd.updateProduct)
    .delete(ctrlProd.deleteProduct);

    module.exports=router;