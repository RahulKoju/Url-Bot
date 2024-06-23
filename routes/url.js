const express = require("express");
const { handleRedirectToOriginalUrl } = require("../controller/url");
const router = express.Router();

router.get("/:shortId", handleRedirectToOriginalUrl);

module.exports = router;
