import * as React from "react";
import TextField from "@mui/material/TextField";
import DateandTimePicker from "../TimePicker/DateTimePicker";
import { Button, FormGroup, Box } from "@mui/material";
import { useAppContext } from "../../store";
import { useRouter } from "next/router";
import { useState } from "react";

export default function PostNewForm() {
  const {
    store: { jwtToken },
  } = useAppContext();

  const history = useRouter();

  const [fieldErrors, setFieldErrors] = useState({});

  const onSubmit = async (fieldValues) => {
    const { exercise, title, description, date, location } = fieldValues;
    const formData = new FormData();
    formData.append("exercise", exercise);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("location", location);
    const headers = { Authorization: `JWT ${jwtToken}` };
    try {
      const response = await axiosInstance.post("/api/posts/", formData, {
        headers,
      });
      console.log("success response :", response);
      history.push("/");
    } catch (error) {
      if (error.response) {
        const { status, data: fieldsErrorMessages } = error.response;
        if (typeof fieldsErrorMessages === "string") {
          notification.open({
            message: "서버 오류",
            description: `에러) ${status} 응답을 받았습니다. 서버 에러를 확인해주세요.`,
            icon: <FrownOutlined style={{ color: "#ff3333" }} />,
          });
        } else {
          setFieldErrors(parseErrorMessages(fieldsErrorMessages));
        }
      }

      return (
        <>
          <FormGroup>
            <form onSubmit={onSubmit} method="post">
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-basic"
                  sx={{ marginBottom: 5 }}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  label="운동"
                  name="exercise"
                  {...fieldErrors.exercise}
                  {...fieldErrors.non_field_errors}
                />
              </Box>

              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  sx={{ marginBottom: 5 }}
                  id="outlined-multiline-static"
                  margin="normal"
                  fullWidth
                  required
                  name="title"
                  {...fieldErrors.title}
                  {...fieldErrors.non_field_errors}
                />
              </Box>

              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  sx={{ marginBottom: 5 }}
                  id="outlined-multiline-static"
                  margin="normal"
                  fullWidth
                  required
                  name="description"
                  {...fieldErrors.description}
                  {...fieldErrors.non_field_errors}
                />
              </Box>

              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <DateandTimePicker
                  name="date"
                  {...fieldErrors.date}
                  {...fieldErrors.non_field_errors}
                ></DateandTimePicker>
              </Box>

              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  sx={{ marginBottom: 5 }}
                  id="outlined-multiline-static"
                  margin="normal"
                  fullWidth
                  required
                  name="location"
                  multiline
                  {...fieldErrors.location}
                  {...fieldErrors.non_field_errors}
                />
              </Box>
              <Button variant="outlined" fullWidth type="submit">
                글쓰기
              </Button>
            </form>
          </FormGroup>
        </>
      );
    }
  };
}
