import React from 'react'
import {Box, Typography, styled} from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useContext } from 'react'
import { DataContext } from '../../../context/DataProvider'
import { API } from '../../../service/api'

const Component = styled(Box)`
    margin-top: 30px;
    background: #F5F5F5;
    padding: 10px;
`;

const Container = styled(Box)`
    display: flex;
    margin-bottom: 5px;
`;

const Name = styled(Typography)`
    font-weight: 600;
    font-size: 15px;
    margin-right: 20px;
    color: gray;
`;

const StyledDate = styled(Typography)`
    font-size: 14px;
    color: #878787;
`;

const DeleteIcon = styled(Delete)`
    margin-left: auto;
`;
const Comment = ({comment , setToggle , toggle}) => {
    const {acc} = useContext(DataContext);

    const removeComment = async () => {
        const response = await API.deleteComment(comment._id);
        if(response.isSuccess)
        {
            setToggle(! toggle);
        }
    }

  return (
    <Component>
        <Container>
            <Name>{comment.name}</Name>
            <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
            {
                comment.name === acc.username && <DeleteIcon cursor={'pointer'} onClick={() => removeComment()}/>
            }
        </Container>
        <Box>
            <Typography>{comment.comments}</Typography>
        </Box>
    </Component>
  )
}

export default Comment