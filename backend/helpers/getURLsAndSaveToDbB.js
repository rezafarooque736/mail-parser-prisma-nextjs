import Url from "../model/Url.model.js";

export default async function getURLsAndSaveToDbB(emailBody) {
  // Extract URLs  from the email content using a regular expression
  const urlRegex = /(hxxps?|https?):\/\/\S+/g;
  const matchedUrl = emailBody.match(urlRegex);
  console.log({ matchedUrl });
  if (matchedUrl?.length > 0) {
    // Normalize URL addresses and save them to the MongoDB database
    const normalizedUrl = matchedUrl.map((url) => ({
      url: url.trim(), // trim spaces
    }));

    // Use Set to remove duplicate URL addresses
    const uniqueUrlSet = new Set(normalizedUrl.map((urlObj) => urlObj.url));

    // Create an array of objects with unique URL addresses
    const uniqueNormalizedUrlArray = Array.from(uniqueUrlSet).map((url) => ({
      url,
    }));

    // Check if the normalized URL addresses already exist in the database
    const existingUrlAddresses = await Url.find({
      url: { $in: uniqueNormalizedUrlArray.map((url) => url.url) },
    });

    // Filter out URL addresses that are not already in the database
    const newUrls = uniqueNormalizedUrlArray.filter(
      (url) =>
        !existingUrlAddresses.some((existingUrl) => existingUrl.url === url.url)
    );

    console.log({ newUrls });

    // Regular expression to extract email details
    const emailRegex =
      /From: "(.+)" <(.+)>[\s\S]*?To: "(.+)" <(.+)>[\s\S]*?Sent: (.+)[\s\S]*?Subject: (?:Fwd: )?(.+)/;

    const emailMatch = emailBody.match(emailRegex);

    if (emailMatch) {
      const [from, fromEmail, to, toEmail, sent, subject] = emailMatch
        .slice(1)
        .map((value) => value.replace(/\n/g, ""));

      const finalUrl = newUrls.map((item) => ({
        ...item,
        from,
        fromEmail,
        to,
        toEmail,
        sent: new Date(`${sent}`),
        subject,
      }));
      console.log({ finalUrl });

      if (newUrls.length > 0) {
        // Save the new, non-duplicate URL to the MongoDB database
        await Url.insertMany(finalUrl);
        console.log(`Inserted ${newUrls.length} new URL into the database.`);
      } else {
        console.log("No new URL to insert.");
      }
    }
  }
}
