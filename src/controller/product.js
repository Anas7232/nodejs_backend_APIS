const Category = require('../models/category');
const Product = require('../models/product');

exports.addProduct = (req, res) => {


    const { name, price, description, quantity, category, createdBy } = req.body;

    let productPicture = [];

    if(req.files.length > 0){
        productPicture = req.files.map(file => {
            return { img: file.filename }
        })
    }

    const product = new Product({
        name,
        price, description,
        quantity,
        productPicture,
        category,
        createdBy: req.user._id
    });

    product.save((error, product) => {
        if(error) return res.status(400).json({ error });
        if(product){
            return res.status(200).json({ product })
        }
    })

}


exports.getProductsBySlug = (req, res) => {
 
    const { slug } = req.params;
    Category.findOne({ slug: slug })
    .select('_id')
    .exec((error, category) => {
        if(error) return res.status(400).json({ error })
        if(category){

            Product.find({ category: category._id })
            .exec((error, products) => {
                if(error) return res.status(400).json({ error })
                if(products.length > 0){
                    return res.status(200).json({ 
                        products,
                        productByPrice: {
                            user5k: products.filter(product => product.price <= 5000),
                            under10k: products.filter(product => product.price > 5000 <= 10000),
                            under15k: products.filter(product => product.price > 10000 && product.price <= 15000),
                            under20k: products.filter(product => product.price > 15000 && product.price <= 20000),
                            under25k: products.filter(product => product.price > 20000 && product.price <= 25000),
                            under30k: products.filter(product => product.price > 25000 && product.price <= 30000),
                            under35: products.filter(product => product.price > 30000 && product.price <= 35000),
                            under40k: products.filter(product => product.price > 35000 && product.price <= 40000)
                        }
                    })
                }
            })

        }
    })
    
}