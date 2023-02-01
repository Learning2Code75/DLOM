import jwt from "jsonwebtoken";
// action requested by user : add product ==> auth middleware to verify jwt token ==> next()==> add products

const auth = async (req, res, next) => {
  try {
    // console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    let decodedData;
    decodedData = jwt.verify(token, "test");
    req.userId = decodedData?.id;

    next();
  } catch (err) {
    console.log(err);
  }
};
export default auth;
