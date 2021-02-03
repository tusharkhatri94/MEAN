

const display=function(req,res){    
    res.render('display_product',{title:'Display'});
};



const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
};

const _renderHomepage = function (req, res, responseBody) {
    res.render('list_display', {
        products: responseBody
    });
};

const prodlist = function (req, res) {
    const path = '/api/products';
    const requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {}
    };

    request(
        requestOptions,
        (err, response, body) => {
            _renderHomepage(req, res, body);
        }
    );
};

const _renderDetailPage = function (req, res, responseBody) {
    res.render('product-info', {
        currentProduct: responseBody
    });
};

const productInfo = function (req, res) {
    const path = `/api/products/${req.params.productid}`;
    const requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {}
    };
    request(
        requestOptions,
        (err, response, body) => {
            _renderDetailPage(req, res, body);
        }
    );
};


const _renderCreatePage = function (req, res) {
    res.render('create-new-product', {
        title: "Create New Product"
    });
};

const addNewProduct = function (req, res) {
    _renderCreatePage(req, res);
};
const doAddNewProduct = function (req, res) {

    const path = '/api/products';
    const postdata = {
      ProductName: req.body.productName,
       type: req.body.type,
       price:req.body.price,
       benefit:req.body.benefit
    };
    const requestOptions = {
        url: apiOptions.server + path,
        method: 'POST',
        json: postdata
    };
    request(
        requestOptions, (err, response, body) => {
            if (response.statusCode === 201) {
                res.redirect('/');
            } else {
                console.log(response)
            }
        }
    );
};

const deleteProduct = function (req, res) {
    _renderdetailPage(req, res);
};
const dodeleteProduct = function (req, res) {

    const path = `/api/products/${req.params.productid}`;
//    const postdata = {
//        customerName: req.body.customerName,
//        emailid: req.body.emailid,
//        appointmentDate: req.body.appointmentDate,
//        contactNo: req.body.contactNo,
//        treatment:req.body.treatment
//
//    };
    const requestOptions = {
        url: apiOptions.server + path,
        method: 'DELETE',
        json: {}
    };
    request(
        requestOptions, (err, response, body) => {
            if (response.statusCode === 201) {
                res.redirect('/list');
            } else {
                console.log(response)
            }
        }
    );
};

module.exports = {
    
    _renderHomepage,
    prodlist,
    _renderDetailPage,
    productInfo,
    _renderCreatePage,
    addNewProduct,
    doAddNewProduct,
    display,
    deleteProduct,
    dodeleteProduct
};
