import { Router } from "express";
import {
  emailHandle,
  readDomainFromDB,
  readHashFromDB,
  readIpFromDB,
  readUrlFromDB,
} from "../controller/email.controller.js";

const EmailRouter = Router();

EmailRouter.get("/parse-email", emailHandle);
EmailRouter.get("/ip", readIpFromDB);
EmailRouter.get("/hash", readHashFromDB);
EmailRouter.get("/url", readUrlFromDB);
EmailRouter.get("/domain", readDomainFromDB);

export default EmailRouter;
