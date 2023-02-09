import { Avatar, Badge, Button, Grid, TextField } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import * as Yup from "yup";
import React from "react";

function UploadProfile({ user }) {
  const formSchema = Yup.object().shape({
    nickname: Yup.string().required("닉네임 입력은 필수입니다."),
  });

  const formOptions = {
    resolver: yupResolver(formSchema),
    defaultValues: { nickname: "" },
  };
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm(formOptions);

  const router = useRouter();

  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  }));

  const onsubmit = (value) => {
    console.log(value);
  };

  return (
    <>
      <Grid container direction="row" alignItems="center" mt={1} py={2}>
        <Grid xs={2} textAlign="center" item>
          <Button onClick={() => router.back()} color="black">
            <ArrowBackIosIcon />
          </Button>
        </Grid>
        <Grid xs={8} fontSize={30} textAlign="center" item>
          프로필 수정
        </Grid>
        <Grid xs={12} textAlign="center" mt={5} item>
          {user?.avatar ? (
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <SmallAvatar>
                  <CameraAltOutlinedIcon />
                </SmallAvatar>
              }
            >
              <Avatar
                variant="square"
                src={user?.avatar}
                sx={{
                  border: "5px solid #00AD70",
                  width: 100,
                  height: 100,
                  borderRadius: 2,
                }}
              />
            </Badge>
          ) : (
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <SmallAvatar>
                  <CameraAltOutlinedIcon />
                </SmallAvatar>
              }
            >
              <Avatar
                sx={{
                  border: "5px solid #00AD70",
                  width: 100,
                  height: 100,
                  borderRadius: 2,
                }}
              />
            </Badge>
          )}
        </Grid>
        <Grid xs={12} textAlign="center" mt={5} item>
          <form
            id="nickname_edit"
            onSubmit={handleSubmit(onsubmit)}
            method="post"
            component="form"
          >
            <Controller
              name="nickname"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ marginBottom: 2, width: "80%" }}
                  margin="dense"
                  required
                  value={field.value || ""}
                  error={!!errors.nickname}
                  helperText={
                    errors.nickname
                      ? errors?.nickname?.message
                      : `닉네임으로 표시됩니다. ${watch("nickname").length}/10`
                  }
                />
              )}
            />
          </form>
        </Grid>
      </Grid>
    </>
  );
}

export default UploadProfile;
export async function getServerSideProps(ctx) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const { username, nickname, avatar } = await session.user;
  return {
    props: {
      user: { username, nickname, avatar },
    },
  };
}
