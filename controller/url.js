const shortid = require("shortid");
const URL = require("../models/url");
async function handleGenerateNewShortUrl(message) {
  const url = message.content.split("create")[1];
  const urlEntry = await URL.findOne({ redirectUrl: url });
  if (urlEntry) {
    return { shortenedurl: `http://localhost:8001/${urlEntry.shortId}` };
  }
  const shortId = shortid();
  const entry = await URL.create({
    shortId: shortId,
    redirectUrl: url,
  });
  return { shortenedurl: `http://localhost:8001/${shortId}` };
}
async function handleRedirectToOriginalUrl(req, res) {
  const shortId = req.params.shortId;
  const urlEntry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: [{ timestamp: Date.now() }],
      },
    }
  );
  if (!urlEntry) {
    return res.status(404).json({ error: "URL not found" });
  }
  return res.redirect(urlEntry.redirectUrl);
}
module.exports={
    handleGenerateNewShortUrl,
    handleRedirectToOriginalUrl
}