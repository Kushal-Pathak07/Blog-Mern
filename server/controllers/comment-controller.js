import Comment from '../models/Comment.js';


export const newComment = async (req, res) => {
    try
    {
        const comment = await Comment.create(req.body);

        return res.status(200).json({
            success: true,
            message: "Comment added successfully",
            data: comment
        })
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message: "Error while adding comment",
        })
    }
}

export const getAllComments = async (req, res) => {
    try
    {
        const comments = await Comment.find({postId: req.params.id});
        console.log("In comment controller");
        console.log(req.params.id);
        console.log(comments);

        return res.status(200).json({
            success: true,
            message: "Successfully fetched comments",
            comments: comments
        })
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: "Error while fetching commets",
        })
    }
}

export const deleteComment = async (req, res) => {
    try
    {
        const comment = await Comment.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
        })
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: "Error while deleting comment",
            error: error.message
        })
    }
}