import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

const theme = createTheme({
    palette: {
        neutral: {
            main: '#A56100',
            contrastText: '#fff',
        },
    },
});

export default function BasketButton() {
    return (
        <ThemeProvider theme={theme}>
            <Button color="neutral" variant="contained">
                농구
            </Button>
        </ThemeProvider>
    );
}