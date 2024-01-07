import Post from '../models/Post.js';

export const createPost = async (req, res) => {
    try
    {
        const post = await new Post(req.body);
        await post.save();

        return res.status(200).json({
            success: true,
            message: 'Post saved successfully',
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error while saving post',
        })
    }
}

export const getAllPosts = async (req, res) => {
    const category = req.query.category;
    let posts;
    try
    {
        if(category)
        {
            posts = await Post.find({categories: category});
            console.log("Posts are ", posts);
        }
        else
        {
            posts = await Post.find({});
        }
       
        return res.status(200).json({
            success: true,
            message: 'Posts fetched successfully',
            data: posts,
        })
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: "Error while getting all posts",
        })
    }
}

export const getPost = async (req, res) => {
    try
    {
        const post = await Post.findById(req.params.id);
        console.log("Post is in detail page is ", post);


        return res.status(200).json({
            success: true,
            message: 'Post fetched successfully',
            post,
        })
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: "Error while getting post",
        })
    }
}

export const updatePost = async (req, res) => {
    console.log("in update post block");
    try
    {
        console.log("in try block");
        const post = await Post.findById(req.params.id);

        if(! post)
        {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            })
        }
        console.log("till here");
        await Post.findByIdAndUpdate(req.params.id, {$set: req.body}); //$set replaces the body and $addToSet appends in array 
        return res.status(200).json({
            success: true,
            message: "Post updated successfully",
        })
    }
    catch(error)
    {
        console.log("in error block")
        return res.status(500).json({
            success: false,
            message: "Error while updating post",
        })
    }
}

export const deletePost = async (req,res) => {
    try
    {
        const post = await Post.findById(req.params.id);
        if(! post)
        {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            })
        }
        await Post.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Post deleted successfully",
        })
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: "Error while deleting the post",
            error:error.message
        })
    }
}