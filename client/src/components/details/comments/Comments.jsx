import React, { useState, useContext, useEffect } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';
import { DataContext } from '../../../context/DataProvider';
import { API } from '../../../service/api';
import Comment from './Comment';

const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%',
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%;
    margin: 0 20px;
`;

const initialValues = {
    name: '',
    postId: '',
    comments: '',
    date: new Date(),
};

const Comments = ({ post }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png';

    const [comment, setComment] = useState(initialValues);
    const [comments, setComments] = useState([]); // Use an array to store comments
    const { acc } = useContext(DataContext);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        // Fetch comments and update the state
        const fetchComments = async () => {
            try {
                console.log("post id");
                console.log(post);
                const response = await API.getAllComments(post._id);
                if (response.isSuccess) {
                    setComments(response.data.comments); // Assuming the response.data is an array of comments
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [post, toggle]);

    const changeHandler = (e) => {
        setComment({
            ...comment,
            name: acc.username,
            postId: post._id, // Assuming post._id is the correct postId
            date: new Date().toDateString(),
            comments: e.target.value,
        });
    };

    const addComment = async () => {
        try {
            let response = await API.newComment(comment);
            if (response.isSuccess) {
                setComments([...comments, response.data.data]); // Update the state with the new comment
            }
            setToggle(!toggle);
        } catch (error) {
            console.error('Error while adding comment:', error);
        }
    };

    return (
        <Box>
            <Container>
                <Image src={url} alt='dp' />
                <StyledTextArea
                    minRows={5}
                    placeholder='Add your comment here'
                    value={comment.comments}
                    onChange={(e) => changeHandler(e)}
                />
                <Button variant='outlined' color= 'secondary' size='medium' sx={{"height": "40"}} onClick={() => addComment()}>
                    Add Comment
                </Button>
            </Container>

            <Box>
                {comments.map((comment) => (
                    <div>
                        <Comment comment={comment} setToggle={setToggle} toggle={toggle} key={comment._id} />
                    </div>
                ))}
            </Box>
        </Box>
    );
};

export default Comments;
