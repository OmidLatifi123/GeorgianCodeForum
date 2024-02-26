"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    author: String,
    date: String,
    likes: Number,
    code: String,
    description: String,
}, {
    collection: 'comment'
});
const Comment = mongoose_1.default.model('Comment', commentSchema);
exports.default = Comment;
//# sourceMappingURL=comment.js.map