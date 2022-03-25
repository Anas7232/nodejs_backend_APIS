const express = require('express');
const app = express();
const env = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors')

const authRuter = require('./routes/auth');
const categoryRouter = require('./routes/category');
const adminRouter = require('./routes/admin/auth');
const productRouter = require('./routes/product');
const initialDataRouter = require('./routes/admin/initialData');
const pageRouter = require('./routes/admin/page');

env.config();
app.use(cors());
app.use(express.json());
app.use('/api', authRuter);
app.use('/api', categoryRouter);
app.use('/api', adminRouter);
app.use('/api', productRouter);
app.use('/api', initialDataRouter);
app.use('/api', pageRouter)

mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.pped4.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`)
.then(() => {
    console.log('DataBase Conected...!!')
})


app.listen(process.env.PORT, () => {
    console.log(`server Runing On Port ${process.env.PORT}`)
})