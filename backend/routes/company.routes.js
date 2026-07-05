const router = require("express").Router();
const ctrl = require("../controllers/company.controller");
const auth = require("../middlewares/auth.middleware");

router.get("/", ctrl.getAll);
router.get("/popular", ctrl.getPopular);
router.get("/recommended", auth, ctrl.getRecommended);
router.get("/search", ctrl.search);
router.get("/home-search", ctrl.homeSearch);
router.get("/:id", ctrl.getOne);
router.post("/", auth, ctrl.create);

module.exports = router;