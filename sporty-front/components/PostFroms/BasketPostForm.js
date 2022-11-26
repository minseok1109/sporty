import * as React from 'react';
import { Button } from "@mui/material";
import { useAppContext } from '../../store';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { parseErrorMessages } from "../../utils/forms";
import Axios from 'axios';
import { Form, Input } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function BasketPostForm() {
    const [value, setValue] = useState(dayjs('2022-04-07'));

    const {
        store: { jwtToken }
    } = useAppContext();

    const history = useRouter();

    const [fieldErrors, setFieldErrors] = useState({});

    const handleFinish = async (fieldValues) => {
        const { title, date, location, level, cruit, gameinfo, description, } = fieldValues;
        const formData = new FormData();
        formData.append("title", title);
        formData.append("date", date);
        formData.append("location", location);
        formData.append("level", level);
        formData.append("cruit", cruit);
        formData.append("gameinfo", gameinfo);
        formData.append("description", description);


        const headers = { Authorization: `JWT ${jwtToken}` };
        try {
            const response = await Axios.post("http://localhost:8000/api/basketposts/", formData, {
                headers
            });
            console.log("success response :", response);
            history.push("http://localhost:3000/");
        } catch (error) {
            if (error.response) {
                const { status, data: fieldsErrorMessages } = error.response;
                if (typeof fieldsErrorMessages === "string") {
                    console.error(`에러) ${status} 응답을 받았습니다`);
                } else {
                    setFieldErrors(parseErrorMessages(fieldsErrorMessages));
                }
            }
        }
    }

    return (
        <Form {...layout} onFinish={handleFinish} autoComplete={"false"}>

            <Form.Item
                label="모집 글 제목"
                name="title"
                rules={[{ required: true, message: "글 제목을 입력해주세요." }]}
                hasFeedback
                {...fieldErrors.title}
                {...fieldErrors.non_field_errors}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                label="진행 날짜"
                name="date"
                rules={[{ required: true, message: "날짜를 입력해주세요." }]}
                hasFeedback
                {...fieldErrors.date}
                {...fieldErrors.non_field_errors}
            >


                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="날짜"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                    >



                    </DateTimePicker >

                </LocalizationProvider>


            </Form.Item>




            <Form.Item
                label="진행 장소"
                name="location"
                rules={[{ required: true, message: "장소를 입력해주세요." }]}
                hasFeedback
                {...fieldErrors.location}
                {...fieldErrors.non_field_errors}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                label="진행 경기 난이도"
                name="level"
                rules={[{ required: true, message: "경기 난이도를 입력해주세요." }]}
                hasFeedback
                {...fieldErrors.level}
                {...fieldErrors.non_field_errors}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                label="모집 인원 수"
                name="cruit"
                rules={[{ required: true, message: "모집 인숸수를 입력해주세요." }]}
                hasFeedback
                {...fieldErrors.cruit}
                {...fieldErrors.non_field_errors}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                label="경기 정보"
                name="gameinfo"
                rules={[{ required: true, message: "경기에 대한 정보를 입력해주세요." }]}
                hasFeedback
                {...fieldErrors.gameinfo}
                {...fieldErrors.non_field_errors}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                label="추가 설명"
                name="description"
                rules={[{ required: true, message: "추가설명을 입력해주세요." }]}
                hasFeedback
                {...fieldErrors.description}
                {...fieldErrors.non_field_errors}
            >
                <Input.TextArea />
            </Form.Item>


            <Form.Item {...tailLayout}>
                <Button type="primary" variant='outlined'>
                    작성하기
                </Button>
            </Form.Item>
        </Form>
    );
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
};