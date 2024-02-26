"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayPostList = void 0;
const post_1 = __importDefault(require("../Models/post"));
function DisplayPostList(req, res, next) {
    post_1.default.find()
        .then((postCollection) => {
        res.render('index', { title: 'Post List', page: 'find', posts: postCollection });
    })
        .catch((err) => {
        console.error(err);
    });
}
exports.DisplayPostList = DisplayPostList;
//# sourceMappingURL=media.js.map