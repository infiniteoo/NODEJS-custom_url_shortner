# NODE.JS - Custom URL Shortner w/Express & MongoDB

## About

This really cool project recreates popular URL shortening websites such as Bit.ly which inputs long website URLs and condenses them into a few characters so that they may be easily shared via social media or text messages without hundreds of overwhelming - seemingly random - collections of numbers and characters, which can confuse, or make weary some users from clicking them.

POST ROUTE

```
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get("baseUrl");

  // Check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base url");
  }

  // Create url code
  const urlCode = shortid.generate();

  // Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + "/" + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });

        await url.save();

        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Server error");
    }
  } else {
    res.status(401).json("Invalid long url");
  }
});
```

GET ROUTE

```
router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("no url found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("server error");
  }
});
```
