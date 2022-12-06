import * as React from 'react';
import { Button, TextField } from "@mui/material";
import { useAppContext } from '../../store';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function BasketPostNewForm() {
    const [value, setValue] = useState(dayjs('2022-04-07'));
    const router = useRouter();
    const {
        handleSubmit,
        control,
        formState: { isSubmitting, errors },
    } = useForm();


    const {
        store: { jwtToken }
    } = useAppContext();


    const onSubmit = async (values) => {
        const headers = { Authorization: `JWT ${jwtToken}` };

        const { title, date, location, level, cruit, gameinfo, description, } = values;
        const data = { title, date, location, level, cruit, gameinfo, description, };
        await axios
            .post("http://localhost:8000/api/basketposts/", data, { headers })
            .then(() => {
                router.push("http://localhost:3000/");
            })
            .catch((error) => {
                console.log("failed");
                console.log(error);
            });
    };


    return (

        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            sx={{ marginBottom: 5 }}
                            margin="dense"
                            fullWidth
                            required
                            label="제목"
                            value={field.value || ""}
                            error={!!errors.title}
                            helperText={errors.title ? errors?.title?.message : ""}
                        />
                    )}
                />
                <Controller
                    name="date"
                    defaultValue={value}
                    control={control}
                    render={
                        ({ field: { onChange, ...restField } }) =>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label="Request Date"
                                    onChange={(event) => { onChange(event); setValue(event); }}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                        />}
                                    {...restField}
                                />
                            </LocalizationProvider>
                    }
                />


                <Controller
                    name="location"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            sx={{ marginBottom: 5 }}
                            margin="dense"
                            fullWidth
                            required
                            label="장소"
                            value={field.value || ""}
                            error={!!errors.location}
                            helperText={errors.location ? errors?.location?.message : ""}
                        />
                    )}
                />

                <Controller
                    name="level"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            sx={{ marginBottom: 5 }}
                            margin="dense"
                            fullWidth
                            required
                            label="난이도"
                            value={field.value || ""}
                            error={!!errors.level}
                            helperText={errors.level ? errors?.level?.message : ""}
                        />
                    )}
                />

                <Controller
                    name="cruit"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            sx={{ marginBottom: 5 }}
                            margin="dense"
                            fullWidth
                            required
                            label="인원 수"
                            value={field.value || ""}
                            error={!!errors.cruit}
                            helperText={errors.cruit ? errors?.cruit?.message : ""}
                        />
                    )}
                />

                <Controller
                    name="gameinfo"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            sx={{ marginBottom: 5 }}
                            margin="dense"
                            fullWidth
                            required
                            label="게임 정보"
                            value={field.value || ""}
                            error={!!errors.gameinfo}
                            helperText={errors.gameinfo ? errors?.gameinfo?.message : ""}
                        />
                    )}
                />

                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            sx={{ marginBottom: 5 }}
                            margin="dense"
                            fullWidth
                            required
                            label="추가 설명"
                            value={field.value || ""}
                            error={!!errors.description}
                            helperText={errors.description ? errors?.description?.message : ""}
                        />
                    )}
                />

                <Button type="submit" variant='outlined' disabled={isSubmitting}>
                    작성하기
                </Button>
            </form>
        </>

    );
}

