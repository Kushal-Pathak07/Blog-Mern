import React, { useState, useEffect, useContext } from 'react';
import { Box, styled, FormControl, InputBase, Button, TextareaAutosize } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataProvider';
import { API } from '../service/api';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0,
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date(),
};

const CreatePost = () => {
    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');

    const { acc } = useContext(DataContext);
    const location = useLocation();
    const navigate = useNavigate();

    const url = post.picture
        ? post?.picture
        : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    useEffect(() => {
        const getImage = async () => {
                if (file) {
                    // console.log(file);
                    console.log(file);
                    const formdata = new FormData();
                    formdata.append('name', file.name);
                    formdata.append('file', file);

                    const response = await API.uploadFile(formdata);
                    post.picture = response.data;
                    // setPost((prevPost) => ({ ...prevPost, picture: response.data }));
                }
        };

        getImage();
        post.categories = location.search?.split('=')[1] || 'All';
        post.username = acc.username;

    }, [file]);


    const changeHandler = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const savePost = async () => {
        try {
            const response = await API.createPost(post);
            if (response.isSuccess) {
                navigate('/');
            } else {
                console.error('Error creating post:', response.error);
                // Handle the error appropriately
            }
        } catch (error) {
            console.error('Error creating post:', error);
            // Handle the error appropriately
        }
    };

    return (
        <Container>
            <Image src={url} alt="banner" />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action"/>
                </label>
                <input
                    id="fileInput"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <InputTextField
                    placeholder="Title"
                    onChange={(e) => changeHandler(e)}
                    name="title"
                />
                <Button variant="contained" onClick={() => savePost()}>
                    Publish
                </Button>
            </StyledFormControl>

            <Textarea minRows={5} placeholder="Tell what's in your mind...!" onChange={(e) => changeHandler(e)} name="description" />
        </Container>
    );
};

export default CreatePost;
