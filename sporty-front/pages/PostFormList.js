import { Button, Grid, Stack } from "@mui/material";
import React from "react";

function PostFormList() {
  const style = { width: 1 };
  return (
    <Grid
      container
      direction="column"
      spacing={12}
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs>
        <Button variant="contained" href="/post/BasketPost" sx={style}>
          농구
        </Button>
      </Grid>
      <Grid item xs>
        <Button variant="contained" href="/post/WalkPost" sx={style}>
          걷기
        </Button>
      </Grid>
      <Grid item xs>
        <Button variant="contained" href="/post/FreePost" sx={style}>
          기타
        </Button>
      </Grid>
    </Grid>
  );
}

export default PostFormList;
