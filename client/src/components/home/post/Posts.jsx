import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { API } from '../../../service/api';
import Post from './Post';
import { useSearchParams, Link } from 'react-router-dom';

const Posts = () => {

    const [posts, getPosts] = useState([]);
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    try
    {
        useEffect(() => {
            const fetchData = async () => {
                let response = await API.getAllPosts({category: category || ''});
                console.log("Response from Post in home  is ", response);
                if(response.isSuccess)
                {
                    getPosts(response.data.data);
                }
            }
            fetchData();
        }, [category])
    }
    catch(error)
    {
        console.log("Error while fetching the posts in home page is ",error);
    }

    

  return (
    <Grid sx={{display:'grid', gridTemplateColumns: 'repeat(2,1fr)'}}>
        {
            posts && posts.length > 0 ? posts.map(post => (
                <div style={{margin: 20}}>
                    <Link to={`/details/${post._id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                        <Post key={post._id} post={post}/>
                    </Link>
                </div>
            )) : <Box style={{color:'#878787', margin:'30px 80px', fontSize: 18}}>No Post Available</Box>
        }
    </Grid>
  )
}

export default Posts