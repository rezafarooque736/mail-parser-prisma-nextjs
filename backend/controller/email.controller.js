import { createImapConnection, handleImapError } from "../utils/index.js";
import connectToDB from "../database/db.js";
import msgBody from "../utils/msg-body.js";
import Hash from "../model/Hash.model.js";
import Ip from "../model/Ip.model.js";
import Url from "../model/Url.model.js";
import Domain from "../model/Domain.model.js";

const maxRetries = 3;
let retries = 0;

export const emailHandle = async (req, res) => {
  try {
    const imap = createImapConnection(); // Create and configure IMAP connection

    function openInbox(cb) {
      imap.openBox("INBOX", false, cb);
    }

    await connectToDB(); // Connect to MongoDB

    imap.once("ready", () => {
      console.log("start open inbox");
      try {
        openInbox((err, box) => {
          if (err) {
            handleImapError(res, err);
            return;
          }

          imap.search(
            // [
            //   "UNSEEN",
            //   ["FROM", "farooque-socsupport@railtelindia.com"],
            //   ["SINCE", new Date()],
            // ],
            ["UNSEEN", ["FROM", "farooque-socsupport@railtelindia.com"]],

            (err, results) => {
              if (err) {
                handleImapError(res, err);
                return;
              }
              console.log(results);

              if (!results?.length) {
                imap.end();
                return res.status(200).json({
                  message:
                    "No emails found from farooque-socsupport@railtelindia.com sender",
                });
              }

              const fetch = imap.fetch(results, {
                //you can set amount range like '1:2' or 'results' for all results
                bodies: "",
                struct: true,
              });

              fetch.on("message", (msg, seqno) => {
                console.log(`Message #${seqno}`);
                const prefix = `(#${seqno}) `;

                msg.on("body", (stream, info) => {
                  msgBody(stream, info, prefix);
                  // Your message body handling code here
                });

                //mark attributes email as read
                msg.once("attributes", function (attrs) {
                  // Mark email as read
                  let uid = attrs.uid;
                  imap.addFlags(uid, ["\\Seen"], function (err) {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log("Done, marked email as read!");
                    }
                  });
                });
                msg.once("end", function () {
                  console.log(prefix + "Finished");
                });
              });

              fetch.once("error", function (err) {
                handleImapError(res, err);
              });

              fetch.once("end", function () {
                imap.end();
                console.log("end fetch");
                return res
                  .status(200)
                  .json({ message: "Emails fetched successfully" });
              });
            }
          );
        });
      } catch (err) {
        console.error("Error when request open inbox mail", err);
        return res
          .status(500)
          .json({ error: `Error when request open inbox mail ${err}` });
      }
    });

    imap.once("error", function (err) {
      console.error("Error when connection to IMAP", err);
      if (retries < maxRetries) {
        console.log(`Retrying connection (Retry ${retries + 1})...`);
        setTimeout(() => imap.connect(), 5000); // Retry connection after a delay
        retries++;
      } else {
        handleImapError(res, err);
      }
    });

    imap.once("close", function () {
      console.log("Connection ended");
    });

    imap.connect();
  } catch (err) {
    console.error("An error occurred while fetching emails", err);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching emails." });
  }
};

export const readIpFromDB = async (req, res) => {
  try {
    // connect to database
    await connectToDB();
    const data = await Ip.find({}).sort({ sent: -1 }).lean().exec();
    return res.status(200).json({ data });
  } catch (err) {
    console.error("An error occurred while fetching data from database", err);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching data from database." });
  }
};

export const readHashFromDB = async (req, res) => {
  try {
    // connect to database
    await connectToDB();
    const data = await Hash.find({}).sort({ sent: -1 }).lean().exec();
    return res.status(200).json({ data });
  } catch (err) {
    console.error("An error occurred while fetching data from database", err);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching data from database." });
  }
};

export const readUrlFromDB = async (req, res) => {
  try {
    // connect to database
    await connectToDB();
    const data = await Url.find({}).sort({ sent: -1 }).lean().exec();
    return res.status(200).json({ data });
  } catch (err) {
    console.error("An error occurred while fetching data from database", err);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching data from database." });
  }
};
export const readDomainFromDB = async (req, res) => {
  try {
    // connect to database
    await connectToDB();
    const data = await Domain.find({}).sort({ sent: -1 }).lean().exec();
    return res.status(200).json({ data });
  } catch (err) {
    console.error("An error occurred while fetching data from database", err);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching data from database." });
  }
};
