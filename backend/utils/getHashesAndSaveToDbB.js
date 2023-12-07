import Hash from "../model/Hash.model.js";

export default async function getHashesAndSaveToDbB(
  dateBody,
  subjectBody,
  fromBody,
  toBody,
  emailBody
) {
  // FIXME: implement try catch

  // Regex pattern to match MD5, SHA-1, and SHA-256 hashes
  const hashRegex =
    /\b([A-Fa-f0-9]{32})\b|\b([A-Fa-f0-9]{40})\b|\b([A-Fa-f0-9]{64})\b/g;

  // Extract all hashes from the content body
  const matchedhash = emailBody.match(hashRegex);
  if (matchedhash?.length > 0) {
    // remove extra space from hashes from left and right.
    const normalizedHash = matchedhash.map((hash) => ({
      hash: hash.trim(),
    }));

    // Use Set to remove duplicate Hash addresses
    const uniqueHashSet = new Set(
      normalizedHash.map((hashObj) => hashObj.hash)
    );
    // Create an array of objects with unique Hashes
    const uniqueNormalizedhashArray = Array.from(uniqueHashSet).map((hash) => ({
      hash,
    }));

    // Check if the normalized Hash addresses already exist in the database
    const existingHashes = await Hash.find({
      hash: { $in: uniqueNormalizedhashArray.map((hash) => hash.hash) },
    });

    // Filter out hash addresses that are not already in the database
    const newHashes = uniqueNormalizedhashArray.filter(
      (hash) =>
        !existingHashes.some((existingHash) => existingHash.hash === hash.hash)
    );

    // Identify the hash types
    const hashWithTypes = newHashes?.map((hashItem) => {
      switch (hashItem?.hash.length) {
        case 32:
          return {
            hashType: "md5",
            hash: hashItem?.hash,
          };
        case 40:
          return {
            hashType: "sha1",
            hash: hashItem?.hash,
          };
        case 64:
          return {
            hashType: "sha256",
            hash: hashItem?.hash,
          };
        case 96:
          return {
            hashType: "sha384",
            hash: hashItem?.hash,
          };
        case 128:
          return {
            hashType: "sha512",
            hash: hashItem?.hash,
          };
        default:
          return "Unknown";
      }
    });

    // Regular expression to extract email details
    const emailRegex =
      /From: "(.+)" <(.+)>[\s\S]*?To: "(.+)" <(.+)>[\s\S]*?Sent: (.+)[\s\S]*?Subject: (?:Fwd: )?(.+)/;

    const emailMatch = emailBody.match(emailRegex);

    if (emailMatch) {
      const [from, fromEmail, to, toEmail, sent, subject] = emailMatch
        .slice(1)
        .map((value) => value.replace(/\n/g, ""));

      const finalHash = hashWithTypes.map((item) => ({
        ...item,
        from,
        fromEmail,
        to,
        toEmail,
        sent: new Date(`${sent}`),
        subject,
      }));
      //   console.log({ finalHash });

      if (hashWithTypes.length > 0) {
        // Save the new, non-duplicate HASHES to the MongoDB database
        await Hash.insertMany(finalHash);
        console.log(
          `Inserted ${hashWithTypes.length} new hashes into the database.`
        );
      } else {
        console.log("No new hashes to insert.");
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

      const finalHash = hashWithTypes.map((item) => ({
        ...item,
        from,
        fromEmail,
        to,
        toEmail,
        sent: dateBody,
        subject: subjectBody,
      }));
      //   console.log({ finalHash });

      if (hashWithTypes.length > 0) {
        // Save the new, non-duplicate HASHES to the MongoDB database
        await Hash.insertMany(finalHash);
        console.log(
          `Inserted ${hashWithTypes.length} new hashes into the database.`
        );
      } else {
        console.log("No new hashes to insert.");
      }
    }
  }
}
