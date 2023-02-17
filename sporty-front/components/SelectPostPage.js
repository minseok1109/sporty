import { useRouter } from "next/router";
import { InputLabel, MenuItem, Paper, Select } from "@mui/material";

export default function SelectPostPage() {
  const router = useRouter();
  const handleChange = (event) => {
    router.push(`${event.target.value}`);
  };

  const urlName = {
    "/post/BasketPost": "농구",
    "/post/FreePost": "자유",
    "/post/WalkPost": "산책",
  };

  return (
    <Paper elevation={3} pt={2}>
      <Select
        onChange={handleChange}
        fullWidth
        label={urlName[router.pathname]}
        displayEmpty={true}
        renderValue={() => <InputLabel>{urlName[router.pathname]}</InputLabel>}
      >
        <MenuItem value="/post/BasketPost">농구</MenuItem>
        <MenuItem value="/post/WalkPost">산책</MenuItem>
        <MenuItem value="/post/FreePost">자유</MenuItem>
      </Select>
    </Paper>
  );
}
