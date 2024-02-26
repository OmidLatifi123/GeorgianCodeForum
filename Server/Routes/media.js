"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const media_1 = require("../Controllers/media");
const router = express_1.default.Router();
router.get('/', (req, res, next) => { (0, media_1.DisplayPostList)(req, res, next); });
exports.default = router;
//# sourceMappingURL=media.js.map