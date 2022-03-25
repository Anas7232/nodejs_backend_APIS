const Cart = require('../models/cart');

exports.addToCart = (req, res) => {

    const cart = new Cart({
        user: req.user._id,
        cartItems: req.nody.cartItems
    })


    cart.save((error, cart) => {
        if(error) return res.status(400).json({ error });
        if(cart){
            return res.status(200).json({ cart })
        }
    })

}