import bodyParser from "body-parser";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import cors from "cors";

const router = createRouter<NextApiRequest, NextApiResponse>();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors());

const paymentReturn = (req: NextApiRequest, res: NextApiResponse) => {
  console.log("-------------------------- 藍新金流 Return ---------------------------");
  console.log("--------- req.body: ", req.body);

  res.json("test");
};
export default paymentReturn;
