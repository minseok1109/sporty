import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Card, CardContent, CardHeader, Avatar } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 1,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

export default function PostModal(props) {
  const {
    title,
    date,
    location,
    level,
    cruit,
    gameinfo,
    description,
    purpose,
    avatar,
  } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>더 보기</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card sx={{ minWidth: 275 }}>
            <CardHeader
              title={title}
              avatar={<Avatar src={avatar} />}
              subheader={date}
            />

            <CardContent>
              <Box>난이도: {level}</Box>
              <Box>장소: {location}</Box>
              <Box>모집인원: {cruit}</Box>
              {gameinfo && <Box>게임 정보: {gameinfo}</Box>}
              {purpose && <Box>목표 거리: {purpose}</Box>}
              <Box>설명: {description}</Box>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </div>
  );
}
