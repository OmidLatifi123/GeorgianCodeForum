"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const hbs_1 = __importDefault(require("hbs"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = __importDefault(require("./db"));
mongoose_1.default.connect(db_1.default.DB_URI);
mongoose_1.default.connection.on('connected', () => {
    console.log('Connected to GeorgianCodeForum Database');
});
const Routes_1 = __importDefault(require("../Routes"));
const media_1 = __importDefault(require("../Routes/media"));
const app = (0, express_1.default)();
app.set('views', path_1.default.join(__dirname, '../Views'));
app.set('view engine', 'hbs');
hbs_1.default.registerPartials(path_1.default.join(__dirname, '../Views/components/'));
hbs_1.default.registerPartials(path_1.default.join(__dirname, '../Views/content/'));
hbs_1.default.registerHelper('loadPage', function (pageName) {
    console.log("pageName: " + pageName);
    return pageName;
});
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, '../../Client')));
app.use(express_1.default.static(path_1.default.join(__dirname, '../../node_modules')));
app.use('/', Routes_1.default);
app.use('/media', media_1.default);
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('index', { title: `Error: ${err.status}`, page: 'error' });
});
exports.default = app;
module.exports = app;
//# sourceMappingURL=app.js.map