import React from 'react'
import {Box, Typography, styled} from '@mui/material';
const Image = styled(Box)
`
    background: url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/55% repeat-x #000;
    width: 100%;
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Heading = styled(Typography)
`
    font-size: 60px;
    color: white;
    line-height: 1.5;
`
const SubHeading = styled(Typography)
`
    font-size: 20px;
    color: white;
`

const Banner = () => {
  return (
    <Image>
        <Heading>BLOG</Heading>
        <SubHeading>How was your day ?</SubHeading>
    </Image>
  )
}

export default Banner;