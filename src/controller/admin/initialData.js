const Category = require('../../models/category');
const Product = require('../../models/product');


function createCategories(categories, parentId = null){
    let myCategories = [];
    let category;

    if(parentId == null){
        category = categories.filter(cat => cat.parentId == undefined)
    }else{
        category = categories.filter(cat => cat.parentId == parentId)
    }

    for(let cate of category){
        myCategories.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            type: cate.type,
            children: createCategories(categories, cate._id)
        })
    }

    return myCategories;

}



exports.initialData = async (req, res) => {


    const categories = await Category.find({}).exec();
    const products = await Product.find({}).select('id name price description quantity category').exec();
    res.status(201).json({
        categories: createCategories(categories),
        products
        
    })


}