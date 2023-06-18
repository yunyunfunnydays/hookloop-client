import CryptoJS from "crypto-js";
import bodyParser from "body-parser";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import cors from "cors";

const router = createRouter<NextApiRequest, NextApiResponse>();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors());

const paymentReturn = (req: NextApiRequest, res: NextApiResponse) => {
  const { PAY_HASH_IV, PAY_HASH_KEY } = process.env;
  console.log("-------------------------- 藍新金流 Return ---------------------------");

  // 解密資料，核對 產品編號是否一致
  const key = CryptoJS.enc.Utf8.parse(PAY_HASH_KEY!); // 先轉成 CryptoJS 可接受加密格式：WordArray
  const iv = CryptoJS.enc.Utf8.parse(PAY_HASH_IV!);
  const ciphertext = CryptoJS.enc.Hex.parse(`${req.body.TradeInfo}`);
  const decrypted = CryptoJS.AES.decrypt({ ciphertext } as CryptoJS.lib.CipherParams, key, {
    iv,
    padding: CryptoJS.pad.Pkcs7,
  });
  const decryptedWithoutPadding = CryptoJS.enc.Utf8.stringify(decrypted).replace(/\0+$/, "");
  const returnInfo = JSON.parse(decodeURIComponent(decryptedWithoutPadding));
  const url = `/plan?Status=${returnInfo.Status}&MerchantOrderNo=${returnInfo.Result.MerchantOrderNo}&PaymentType=${returnInfo.Result.PaymentType}&PayTime=${returnInfo.Result.PayTime}&Amt=${returnInfo.Result.Amt}&ItemDesc=${returnInfo.Result.ItemDesc}`;
  res.redirect(encodeURI(url));

  // 完成後進行重定向
  res.writeHead(302, {
    Location: encodeURI(url), // 指定前端頁面的路徑
    "Content-Type": "text/html",
  });
  res.end();
};
export default paymentReturn;

/**
 * {
    "Status": "SUCCESS",
    "Message": "模擬付款成功",
    "Result": {
        "MerchantID": "MS149136378",
        "Amt": 250,
        "TradeNo": "23061800540647123",
        "MerchantOrderNo": "S1687020834968",
        "RespondType": "JSON",
        "IP": "223.137.227.209",
        "EscrowBank": "HNCB",
        "PaymentType": "WEBATM",
        "PayTime": "2023-06-18 00:54:06",
        "PayerAccount5Code": "12345",
        "PayBankCode": "809"
    }
  }
 * 
 * 
 */
