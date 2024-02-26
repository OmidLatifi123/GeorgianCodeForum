import express, { NextFunction, Request, Response, } from 'express';

import Post from '../Models/post';

interface postType{
    title: String,
    author: String,
    date: String,
    likes: Number,
    code: String,
    description: String,
    language: String
}


export function DisplayPostList(req: Request, res: Response, next: NextFunction): void
{
    

    Post.find()
    .then((postCollection) => {
        res.render('index', {title: 'Post List', page: 'find', posts: postCollection});
    })
    .catch((err) => {
        console.error(err);
    });


}