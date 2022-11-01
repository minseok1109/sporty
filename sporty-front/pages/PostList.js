import React, { useEffect, useState } from "react";
import Axios from "axios";
import Post from "../components/PostList/Post";
//LayOut
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const apiUrl = "http://localhost:8000/api/posts/"
//LayOut 
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function PostList() {
    const [postList, setPostList] = useState([]);
    useEffect(() => {
        Axios.get(apiUrl)
            .then(response => {
                const { data } = response;
                console.log(response);
                setPostList(data);
            })
            .catch(error => {
            });
    }, []);
    return (
        <div>
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
            >
                {postList.map(post =>
                    <Item><Post post={post} key={post.id} /></Item>
                )}

            </Stack>
        </div>
    );
}
