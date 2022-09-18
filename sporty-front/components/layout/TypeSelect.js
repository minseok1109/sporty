import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function TypeSelect() {
    const [type, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-select-small">종목</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={type}
                    label="종목"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>축구</MenuItem>
                    <MenuItem value={20}>농구</MenuItem>
                    <MenuItem value={40}>배드민턴</MenuItem>
                    <MenuItem value={50}>볼링</MenuItem>
                    <MenuItem value={60}>탁구</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}