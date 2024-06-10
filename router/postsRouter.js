const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postController");
const validator = require("../middlewares/validator");
const { slugChecker, bodyChecker } = require("../validations/posts");
const tokenAuthenticator = require("../middlewares/tokenAuthenticator");
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "public/postPic",
  filename: (req, file, cf) => {
    const fileType = path.extname(file.originalname);
    cf(null, String(Date.now()) + fileType);
  }
});
const upload = multer({storage});


// router.use(tokenAuthenticator);

router.post("/", upload.single("image"), tokenAuthenticator, validator(bodyChecker), postsController.store);

router.get("/", postsController.index);

router.get("/:slug", validator(slugChecker), postsController.show);

router.put(
  "/:slug",
  validator(slugChecker),
  validator(bodyChecker),
  postsController.update
);

router.delete("/:slug", validator(slugChecker), postsController.destroy);



module.exports = router;
