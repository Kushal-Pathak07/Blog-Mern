import React, { useEffect, useState, useContext } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import Comments from './comments/Comments';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 500;
    text-align: center;
    margin: 50px 0 10px 0;
    word-break: break-word;
`;

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
    cursor: pointer;
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
    cursor: pointer;
`;

const Author = styled(Box)(({ theme }) => ({
    color: '#878787',
    display: 'flex',
    margin: '20px 0',
}));

const Description = styled(Typography)`
    word-break: break-word;
`
const DetailView = () => {

    const [post, setPost] = useState({});
    const [postFlag, setPostFlag] = useState(false);
    const {id} = useParams();
    const {acc} = useContext(DataContext);

    const navigate = useNavigate();

    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    useEffect(() => {
        // try
        // {
        //         API.getPostById(id)
        //         .then((response)=>{
        //             console.log("Response from detail is ", response);
        //             if(response.isSuccess)
        //             {
        //                 setPost(response.data.post);
        //             }
        //             console.log("Post in detail page is ", post);
        //         })
        //         .catch((error)=>{
        //             console.log("Error while fetching post in detail page is ",error);
        //         })
        //         console.log("post")
        //         console.log(post);
        //         // console.log("Response from detail is ", response);
        //         // if(response.isSuccess)
        //         // {
        //         //     setPost(response.data);
        //         //     console.log("Post in detail page is ", post);
        //         // }

        // }
        // catch(error)
        // {
        //     console.log("Error while fetching post in detail page is ",error);
        // }
        async function fetchData(){
            const response = await API.getPostById(id);
            if(response.isSuccess)
            {
                setPost(response.data.post);
                setPostFlag(true);
            }
            console.log("post");
            console.log(post);
        };
        fetchData();
    },[])

    const deleteBlog = async () => {
        let response = await API.deletePost(post._id);
        if(response.isSuccess)
        {
            navigate('/');
        }
    }

  return (
    postFlag && <Container>
        <Image src={url} alt='blog'/>

        <Box style={{display: 'flex', flexDirection: 'row-reverse'}}>
            {
                acc.username === post.username && <div>
                    <Link to={`/update/${post._id}`}><EditIcon color='primary'/></Link>
                    <DeleteIcon onClick={() => deleteBlog()} color='error'/>
                </div>
            }
        </Box>

        <Heading>{post.title}</Heading>

        <Author>
            <Typography>Author: <Box component="span" style={{fontWeight: 600}}>{post.username}</Box></Typography>
            <Typography style={{marginLeft: 'auto'}}>{new Date(post.createdDate).toDateString()}</Typography>
        </Author>

        <Description>{post.description}</Description>
        
        <Comments post={post}/>
    </Container>
  )
}

export default DetailView