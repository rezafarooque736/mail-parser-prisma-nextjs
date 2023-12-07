// library imports
import Imap from "node-imap";
import { inspect } from "util";
import { simpleParser } from "mailparser";

// custom imports
import getEmailsAndSaveToDbB from "./getEmailsAndSaveToDbB.js";
import getHashesAndSaveToDbB from "./getHashesAndSaveToDbB.js";
import getURLsAndSaveToDbB from "./getURLsAndSaveToDbB.js";

export default function msgBody(stream, info, prefix) {
  if (info.which === "TEXT")
    var buffer = "",
      count = 0;

  console.log(prefix + "Body");

  stream.on("data", async function (chunk) {
    count += chunk.length;
    buffer += chunk.toString("utf8");
  });

  stream.once("end", async function () {
    let attach = null;

    if ((await simpleParser(buffer)).attachments.length != 0) {
      attach = (await simpleParser(buffer)).attachments[0].content; //to get attachments
    }

    // email handling code:
    if (info.which !== "TEXT") {
      let dataheader = Imap.parseHeader(buffer);

      //start -> set data, that you want to save on your DB
      let emails_data = {
        date: dataheader?.date[0],
        subject: dataheader?.subject[0],
        from: dataheader?.from[0],
        to: dataheader?.to[0],
        content: (await simpleParser(buffer)).text,
        attachment: attach,
      };

      // get emails from the email body content.
      getEmailsAndSaveToDbB(emails_data?.content);
      getHashesAndSaveToDbB(emails_data?.content);
      getURLsAndSaveToDbB(emails_data?.content);

      // console.log("\n\nline no 139", emails_data?.content);

      //end -> set data
    } else console.log(prefix + "Body [%s] Finished", inspect(info.which));
  });
}
