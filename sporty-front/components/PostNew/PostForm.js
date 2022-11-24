import * as React from 'react';
import { Button } from "@mui/material";
import { useAppContext } from '../../store';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { parseErrorMessages } from "../../utils/forms";
import Axios from 'axios';
import { DatePicker, Form, Input } from 'antd';


export default function PostForm() {
    const {
        store: { jwtToken }
    } = useAppContext();

    const history = useRouter();

    const [fieldErrors, setFieldErrors] = useState({});

    const handleFinish = async (fieldValues) => {
        const { exercise, title, description, date, location } = fieldValues;
        const formData = new FormData();
        formData.append("exercise", exercise);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("date", date);
        formData.append("location", location);
        const headers = { Authorization: `JWT ${jwtToken}` };
        try {
            const response = await Axios.post("http://localhost:8000/api/posts/", formData, {
                headers
            });
            console.log("success response :", response);
            history.push("http://localhost:3000/PostNew");
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
                label="exercise"
                name="exercise"
                rules={[{ required: true, message: "exercise을 입력해주세요." }]}
                hasFeedback
                {...fieldErrors.exercise}
                {...fieldErrors.non_field_errors}
            >
                <Input.TextArea />
            </Form.Item>
            <Form.Item
                label="title"
                name="title"
                rules={[{ required: true, message: "title 입력해주세요." }]}
                hasFeedback
                {...fieldErrors.title}
                {...fieldErrors.non_field_errors}
            >
                <Input.TextArea />
            </Form.Item>
            <Form.Item
                label="description"
                name="description"
                rules={[{ required: true, message: "description 입력해주세요." }]}
                hasFeedback
                {...fieldErrors.description}
                {...fieldErrors.non_field_errors}
            >
                <Input.TextArea />
            </Form.Item>
            <Form.Item
                label="date"
                name="date"
                rules={[{ required: true, message: "date 입력해주세요." }]}
                hasFeedback
                {...fieldErrors.date}
                {...fieldErrors.non_field_errors}
            >
                <DatePicker />
            </Form.Item>
            <Form.Item
                label="location"
                name="location"
                rules={[{ required: true, message: "location 입력해주세요." }]}
                hasFeedback
                {...fieldErrors.location}
                {...fieldErrors.non_field_errors}
            >
                <Input.TextArea />
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary">
                    Submit
                </Button>
            </Form.Item>
            <hr />
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