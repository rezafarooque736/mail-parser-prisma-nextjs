// library imports
import Imap from "node-imap";
import { inspect } from "util";
import { simpleParser } from "mailparser";
import PDFParser from "pdf2json";

// custom imports
import { getParsedEmailDataAndSaveToDB } from "./index.js";
import getDomainsAndSaveToDB from "./getDomainsAndSaveToDbB.js";
import getHashesAndSaveToDbB from "./getHashesAndSaveToDbB.js";

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
    // email handling code:
    if (info.which !== "TEXT") {
      const email = await simpleParser(buffer);
      const attachments = email.attachments;

      let dataheader = Imap.parseHeader(buffer);

      //start -> set data, that you want to save on your DB
      let emails_data = {
        date: dataheader?.date[0],
        subject: dataheader?.subject[0],
        from: dataheader?.from[0],
        to: dataheader?.to[0],
        content: (await simpleParser(buffer)).text,
        // attachment: attach,
      };

      if (attachments.length > 0) {
        // There are attachments in the email.
        console.log("There are attachments in the email.");
        for (const attachment of attachments) {
          if (attachment.contentType === "text/plain") {
            const textAttachment = attachment.content.toString("utf8");
            // Now 'textAttachment' contains the content of the text attachment.
            // console.log("Text Attachment Content:", textAttachment);
            getParsedEmailDataAndSaveToDB(
              emails_data?.date,
              emails_data?.subject,
              emails_data?.from,
              emails_data?.to,
              textAttachment
            );
            getDomainsAndSaveToDB(
              emails_data?.date,
              emails_data?.subject,
              emails_data?.from,
              emails_data?.to,
              textAttachment
            );
            getHashesAndSaveToDbB(
              emails_data?.date,
              emails_data?.subject,
              emails_data?.from,
              emails_data?.to,
              textAttachment
            );
          } else if (attachment.contentType === "application/pdf") {
            const pdfData = attachment.content;
            const pdfParser = new PDFParser(this, 1);

            pdfParser.on("pdfParser_dataError", (errData) => {
              console.log(errData.parserError);
            });

            pdfParser.on("pdfParser_dataReady", (pdfData) => {
              const text = pdfParser.getRawTextContent();
              getParsedEmailDataAndSaveToDB(
                emails_data?.date,
                emails_data?.subject,
                emails_data?.from,
                emails_data?.to,
                text
              );
            });

            pdfParser.parseBuffer(pdfData);
          }
        }
      }

      // get emails from the email body content.
      getParsedEmailDataAndSaveToDB(
        emails_data?.date,
        emails_data?.subject,
        emails_data?.from,
        emails_data?.to,
        emails_data?.content
      );

      // console.log("\n\nline no 88", emails_data?.content);
    } else console.log(prefix + "Body [%s] Finished", inspect(info.which));
  });
}
