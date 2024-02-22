"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    author: { type: mongoose_1.default.Schema.Types.ObjectId, refPath: 'type' },
    date: { type: String },
    likes: Number,
    code: String,
    description: String,
    language: String
}, {
    collection: 'post'
});
const Post = mongoose_1.default.model('Post', postSchema);
exports.default = Post;
//# sourceMappingURL=post.js.map