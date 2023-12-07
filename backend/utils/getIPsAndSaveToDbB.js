import Ip from "../model/Ip.model.js";

export default async function getIPsAndSaveToDbB(
  dateBody,
  subjectBody,
  fromBody,
  toBody,
  emailBody
) {
  // FIXME: implement try catch

  // Extract IP addresses from the email content using a regular expression
  const ipRegex = /\b\d{1,3}(\.\d{1,3}){3}\b|\b\d{1,3}(\[\.\]\d{1,3}){3}\b/g;
  const matchedIp = emailBody.match(ipRegex);

  if (matchedIp?.length > 0) {
    // Normalize IP addresses and save them to the MongoDB database
    const normalizedIp = matchedIp.map((ip) => ({
      ip: ip.replace(/\[\.\]/g, ".").trim(), // Replace '[.]' with '.' and trim spaces
    }));

    // Use Set to remove duplicate IP addresses
    const uniqueIpSet = new Set(normalizedIp.map((ipObj) => ipObj.ip));

    // Create an array of objects with unique IP addresses
    const uniqueNormalizedIpArray = Array.from(uniqueIpSet).map((ip) => ({
      ip,
    }));

    // Check if the normalized IP addresses already exist in the database
    const existingIpAddresses = await Ip.find({
      ip: { $in: uniqueNormalizedIpArray.map((ip) => ip.ip) },
    });

    // Filter out IP addresses that are not already in the database
    const newIpAddresses = uniqueNormalizedIpArray.filter(
      (ip) => !existingIpAddresses.some((existingIp) => existingIp.ip === ip.ip)
    );

    // Regular expression to extract email details
    const emailRegex =
      /From: "(.+)" <(.+)>[\s\S]*?To: "(.+)" <(.+)>[\s\S]*?Sent: (.+)[\s\S]*?Subject: (?:Fwd: )?(.+)/;

    const emailMatch = emailBody.match(emailRegex);

    if (emailMatch) {
      const [from, fromEmail, to, toEmail, sent, subject] = emailMatch
        .slice(1)
        .map((value) => value.replace(/\n/g, ""));

      const finalIp = newIpAddresses.map((item) => ({
        ...item,
        from,
        fromEmail,
        to,
        toEmail,
        sent: new Date(`${sent}`),
        subject,
      }));
      console.log({ finalIp });

      if (newIpAddresses.length > 0) {
        // Save the new, non-duplicate IP addresses to the MongoDB database
        await Ip.insertMany(finalIp);
        console.log(
          `Inserted ${newIpAddresses.length} new IP addresses into the database.`
        );
      } else {
        console.log("No new IP addresses to insert.");
      }
    } else {
      // if there is email which does not contains from, fromEmail, to, toEmail, sent, subject in body.
      const fromRegex = /([^<]+)<([^>]+)>/;
      const toRegex = /([^<]+)<([^>]+)>/;

      // date,
      // subject,

      const fromMatch = fromBody.match(fromRegex);
      const toMatch = toBody.match(toRegex);

      const from = fromMatch[1].trim();
      const fromEmail = fromMatch[2].trim();
      const to = toMatch[1].trim();
      const toEmail = toMatch[2].trim();

      const finalIp = newIpAddresses.map((item) => ({
        ...item,
        from,
        fromEmail,
        to,
        toEmail,
        sent: dateBody,
        subject: subjectBody,
      }));
      console.log({ finalIp });

      if (newIpAddresses.length > 0) {
        // Save the new, non-duplicate IP addresses to the MongoDB database
        await Ip.insertMany(finalIp);
        console.log(
          `Inserted ${newIpAddresses.length} new IP addresses into the database.`
        );
      } else {
        console.log("No new IP addresses to insert.");
      }
    }
  }
}
