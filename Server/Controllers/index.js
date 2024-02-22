"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayPrivacy = exports.DisplayLogin = exports.DisplayContact = exports.DisplayFind = exports.DisplayCreate = exports.DisplayAbout = exports.DisplayHome = void 0;
function DisplayHome(req, res, next) {
    res.render('index', { title: 'Home', page: 'home' });
}
exports.DisplayHome = DisplayHome;
function DisplayAbout(req, res, next) {
    res.render('index', { title: 'About Us', page: 'about' });
}
exports.DisplayAbout = DisplayAbout;
function DisplayCreate(req, res, next) {
    res.render('index', { title: 'Create Post', page: 'create' });
}
exports.DisplayCreate = DisplayCreate;
function DisplayFind(req, res, next) {
    res.render('index', { title: 'Find Post', page: 'find' });
}
exports.DisplayFind = DisplayFind;
function DisplayContact(req, res, next) {
    res.render('index', { title: 'Contact Us', page: 'contact' });
}
exports.DisplayContact = DisplayContact;
function DisplayLogin(req, res, next) {
    res.render('index', { title: 'Login', page: 'login' });
}
exports.DisplayLogin = DisplayLogin;
function DisplayPrivacy(req, res, next) {
    res.render('index', { title: 'Privacy Policy', page: 'privacy' });
}
exports.DisplayPrivacy = DisplayPrivacy;
module.exports = {
    DisplayHome: DisplayHome,
    DisplayAbout: DisplayAbout,
    DisplayCreate: DisplayCreate,
    DisplayFind: DisplayFind,
    DisplayLogin: DisplayLogin,
    DisplayPrivacy: DisplayPrivacy,
    DisplayContact: DisplayContact
};
//# sourceMappingURL=index.js.map