const dotenv = require("dotenv");

dotenv.config();
const MongoClient = require("mongodb").MongoClient;

const url = process.env.DB_URL;
const createProduct = async (req, res, next) => {
  // add product to mongo
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db();
    const result = db.collection("products").insertOne(newProduct);
  } catch (error) {
    return res.json({ message: "Could not store data." });
  }
  setTimeout(() => {
    client.close();
  }, 1500);

  res.json(newProduct);
};

const getProducts = async (req, res, next) => {
  const client = new MongoClient(url);
  let products;
  try {
    await client.connect();
    const db = client.db();
    products = await db.collection("products").find().toArray();
  } catch (error) {
    return res.json({ message: "Could not retrieve products." });
  }
  setTimeout(() => {
    client.close();
  }, 1500);

  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
