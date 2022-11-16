import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Button, FormGroup } from '@mui/material';
import DateandTimePicker from '../TimePicker/DateTimePicker';
import { FormControl, InputLabel, Input, FormHelperText } from '@mui/material/FormControl';
import Axios from 'axios';


const exercises = [
    {
        value: '농구',
        label: '농구',
    },
    {
        value: '축구',
        label: '축구',
    },
    {
        value: '걷기',
        label: '걷기',
    },

];


export default function PostNewForm() {
    const [exercise, setExercise] = React.useState('EUR');

    const [fieldErrors, setFieldErrors] = React.useState({});

    const handleFinish = async fieldValues => {
        const {
            exercise,
            title,
            description
        } = fieldValues;

        const formData = new FormData();
        formData.append("exercise", exercise);
        formData.append("title", title);
        formData.append("description", description);


        try {
            const response = await Axios.post("http://localhost:8000/api/posts/", formData,);
            console.log("success response :", response);

        } catch (error) {
            if (error.response) {
                const { status, data: fieldsErrorMessages } = error.response;
                if (typeof fieldsErrorMessages === "string") {
                    notification.open({
                        message: "서버 오류",
                        description: `에러) ${status} 응답을 받았습니다. 서버 에러를 확인해주세요.`,

                    });
                } else {
                    setFieldErrors(parseErrorMessages(fieldsErrorMessages));
                }
            }
        }
    };





    return (
        <>

            <form onSubmit={handleFinish}>
                <FormGroup>

                    <TextField
                        id="outlined-select-exercise-native"
                        select
                        label="운동"
                        name='exercise'
                        value={exercise}
                        margin="normal"
                        SelectProps={{
                            native: true,
                        }}
                        helperText="운동 종목을 골라주세요"

                    >
                        {exercises.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}


                    </TextField>



                    <TextField
                        id="outlined-basic"
                        label="제목"
                        variant="outlined"
                        margin="normal"
                        name='title'>

                    </TextField>


                    <TextField
                        id="outlined-multiline-static"
                        label="설명"
                        name='description'
                        multiline
                        margin="normal"
                        rows={4}
                        defaultValue="만나는 사람:"



                    >
                    </TextField>






                    <DateandTimePicker>
                    </DateandTimePicker>

                    <Button type="submit" variant='outlined'>
                        작성
                    </Button>
                </FormGroup>

            </form>

        </>);
}