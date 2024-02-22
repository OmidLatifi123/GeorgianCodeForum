// Omid Latifi, Carlos DaSilva, Christian Schoenwiese, Tristan Schwekendiek
//     1199455, 1191123, 1186384 , 1207799

import express, { NextFunction, Request, Response, } from 'express';

export function DisplayHome(req: Request, res: Response, next: NextFunction)
{
  res.render('index', {title: 'Home', page: 'home'});
}

// Repeat above for all pages

export function DisplayAbout(req: Request, res: Response, next: NextFunction)
{
  res.render('index', {title: 'About Us', page: 'about'});
}

export function DisplayCreate(req: Request, res: Response, next: NextFunction)
{
  res.render('index', {title: 'Create Post', page: 'create'});
}

export function DisplayFind(req: Request, res: Response, next: NextFunction)
{
  res.render('index', {title: 'Find Post', page: 'find'});
}

export function DisplayContact(req: Request, res: Response, next: NextFunction)
{
  res.render('index', {title: 'Contact Us', page: 'contact'});
}

export function DisplayLogin(req: Request, res: Response, next: NextFunction)
{
  res.render('index', {title: 'Login', page: 'login'});
}

export function DisplayPrivacy(req: Request, res: Response, next: NextFunction)
{
  res.render('index', {title: 'Privacy Policy', page: 'privacy'});
}


// FUNCTIONS MUST BE EXPORTED HERE OR CANNOT BE ACCESSED BY ROUTES
module.exports = {
 DisplayHome: DisplayHome,
 DisplayAbout: DisplayAbout,
 DisplayCreate: DisplayCreate,
 DisplayFind: DisplayFind,
 DisplayLogin: DisplayLogin,
 DisplayPrivacy: DisplayPrivacy,
 DisplayContact: DisplayContact
}

  