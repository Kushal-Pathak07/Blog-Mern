import express from 'express';
const router = express.Router();

import {signupUser, loginUser} from '../controllers/user-controller.js';
import { uploadImage, getImage } from '../controllers/image-controller.js';
import { createPost , getAllPosts, getPost, updatePost, deletePost} from '../controllers/post-controller.js';
import { authenticateToken } from '../controllers/jwt-controller.js';
import { newComment , getAllComments , deleteComment} from '../controllers/comment-controller.js';

import upload from '../utils/upload.js'; //this upload is middleware

router.post('/signup', signupUser);
router.post('/login', loginUser);

router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);

router.post('/create', authenticateToken,createPost);
router.get('/posts', authenticateToken, getAllPosts);
router.get('/post/:id', authenticateToken, getPost);
router.post('/update/:id', authenticateToken,updatePost);
router.delete('/delete/:id', authenticateToken, deletePost);
router.post('/comment/new', newComment);
router.get('/comments/:id', getAllComments);
router.delete('/comment/delete/:id', deleteComment);

export default router;