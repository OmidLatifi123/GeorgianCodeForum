import Posts from "../Models/post";
import express, { NextFunction, Request, Response, } from 'express';

export async function index(req: Request, res: Response, next: NextFunction){
    let posts = await Posts.find();

    res.render('/find', { 
        posts: posts
    });
}

export function displayCreateForm(req: Request, res: Response, next: NextFunction){
    res.render('/create', {title: 'Create a Post', page: 'create'});
}

export async function  createPosts(req: Request, res: Response, next: NextFunction){
    await Posts.create(req.body);

    res.redirect('/find');
}

export async function  displayEditForm(req: Request, res: Response, next: NextFunction){
    let posts = await Posts.findById(req.params._id);

    res.render('/edit', { 
        posts: posts
    });
}

export async function  updatePosts(req: Request, res: Response, next: NextFunction){
    await Posts.findByIdAndUpdate(req.params._id, req.body);
    res.redirect('/find');
}

export async function  deletePost(req: Request, res: Response, next: NextFunction){await Posts.findByIdAndDelete(req.params._id);
    res.redirect('/find');}

module.exports = {
    index:index,
    displayCreateForm:displayCreateForm,
    createPosts:createPosts,
    displayEditForm:displayEditForm,
    updatePosts:updatePosts,
    deletePost:deletePost
};