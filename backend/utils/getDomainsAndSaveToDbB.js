import Domain from "../model/Domain.model.js";

export default async function getDomainsAndSaveToDB(
  dateBody,
  subjectBody,
  fromBody,
  toBody,
  emailBody
) {
  // FIXME: implement try catch
  // Define the domain name regex excluding DOMAINs
  // const domainRegex = /^(?!https?:\/\/|hxxps?:\/\/)(?:www\.)?([^\s/]+)$/gm;
  const domainRegex =
    /^(?!https?:\/\/)(?:www\.)?([a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+)(?:\/.*)?$/gm;
  const matchedDomains = emailBody.match(domainRegex);

  if (matchedDomains?.length > 0) {
    // Normalize DOMAIN addresses and save them to the MongoDB database
    const normalizedDomain = matchedDomains.map((domain) => ({
      domain: domain.trim(), // trim spaces
    }));

    // Use Set to remove duplicate DOMAIN addresses
    const uniqueDomainSet = new Set(
      normalizedDomain.map((domainObj) => domainObj.domain)
    );

    // Create an array of objects with unique DOMAIN addresses
    const uniqueNormalizedDomainArray = Array.from(uniqueDomainSet).map(
      (domain) => ({
        domain,
      })
    );

    // Check if the normalized DOMAIN addresses already exist in the database
    const existingDomainAddresses = await Domain.find({
      domain: {
        $in: uniqueNormalizedDomainArray.map((domain) => domain.domain),
      },
    });

    // Filter out DOMAIN addresses that are not already in the database
    const newDomains = uniqueNormalizedDomainArray.filter(
      (domain) =>
        !existingDomainAddresses.some(
          (existingDomain) => existingDomain.domain === domain.domain
        )
    );

    // console.log({ newDomains });

    // Regular expression to extract email details
    const emailRegex =
      /From: "(.+)" <(.+)>[\s\S]*?To: "(.+)" <(.+)>[\s\S]*?Sent: (.+)[\s\S]*?Subject: (?:Fwd: )?(.+)/;

    const emailMatch = emailBody.match(emailRegex);

    if (emailMatch) {
      const [from, fromEmail, to, toEmail, sent, subject] = emailMatch
        .slice(1)
        .map((value) => value.replace(/\n/g, ""));

      const finalDomain = newDomains.map((item) => ({
        ...item,
        from,
        fromEmail,
        to,
        toEmail,
        sent: new Date(`${sent}`),
        subject,
      }));
      // console.log({ finalDomain });

      if (newDomains.length > 0) {
        // Save the new, non-duplicate DOMAIN to the MongoDB database
        await Domain.insertMany(finalDomain);
        console.log(
          `Inserted ${newDomains.length} new DOMAIN into the database.`
        );
      } else {
        console.log("No new DOMAIN to insert.");
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

      const finalDomain = newDomains.map((item) => ({
        ...item,
        from,
        fromEmail,
        to,
        toEmail,
        sent: dateBody,
        subject: subjectBody,
      }));
      // console.log({ finalDomain });

      if (newDomains.length > 0) {
        // Save the new, non-duplicate DOMAIN to the MongoDB database
        await Domain.insertMany(finalDomain);
        console.log(
          `Inserted ${newDomains.length} new DOMAIN into the database.`
        );
      } else {
        console.log("No new DOMAIN to insert.");
      }
    }
  }
}
