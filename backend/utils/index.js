import Imap from "node-imap";
import dotenv from "dotenv";
import getDomainsAndSaveToDB from "./getDomainsAndSaveToDbB.js";
import getHashesAndSaveToDbB from "./getHashesAndSaveToDbB.js";
import getIPsAndSaveToDbB from "./getIPsAndSaveToDbB.js";
import getURLAndSaveToDB from "./getURLsAndSaveToDbB.js";

dotenv.config();

const imapConfig = {
  user: process.env.IMAP_USER,
  password: process.env.IMAP_PASSWORD,
  host: process.env.IMAP_HOST,
  port: process.env.IMAP_PORT,
  tls: true,
  connTimeout: 110000, // Default by node-imap
  authTimeout: 15000, // Default by node-imap,
  debug: null, // Or your custom function with only one incoming argument. Default: null
  tlsOptions: { rejectUnauthorized: false },
  mailbox: "INBOX", // mailbox to monitor
  searchFilter: ["UNSEEN", "FLAGGED"], // the search filter being used after an IDLE notification has been retrieved
  markSeen: true, // all fetched email willbe marked as seen and not fetched next time
  fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
  mailParserOptions: { streamAttachments: true }, // options to be passed to mailParser lib.
  attachments: true, // download attachments as they are encountered to the project directory
  attachmentOptions: { directory: "attachments/" }, // specify a download directory for attachments
};

export async function getParsedEmailDataAndSaveToDB(
  dateBody,
  subjectBody,
  fromBody,
  toBody,
  emailBody
) {
  getIPsAndSaveToDbB(dateBody, subjectBody, fromBody, toBody, emailBody);
  getURLAndSaveToDB(dateBody, subjectBody, fromBody, toBody, emailBody);
  // getHashesAndSaveToDbB(dateBody, subjectBody, fromBody, toBody, emailBody);
  // getDomainsAndSaveToDB(dateBody, subjectBody, fromBody, toBody, emailBody);
}

export function handleImapError(res, err) {
  console.error("Error when handling IMAP:", err);
  res.status(500).json({ error: `Error when handling IMAP: ${err.message}` });
}

// Create and configure your IMAP connection here
export function createImapConnection() {
  const imap = new Imap(imapConfig);
  return imap;
}
