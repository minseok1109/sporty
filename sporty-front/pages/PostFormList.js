import { Button, Grid, Stack } from "@mui/material";
import Link from "next/link";
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
        <Button variant="contained" sx={style}>
          <Link href="/post/BasketPost">농구</Link>
        </Button>
      </Grid>
      <Grid item xs>
        <Button variant="contained" sx={style}>
          <Link href="/post/WalkPost">걷기</Link>
        </Button>
      </Grid>
      <Grid item xs>
        <Button variant="contained" sx={style}>
          <Link href="/post/FreePost">기타</Link>
        </Button>
      </Grid>
    </Grid>
  );
}

export default PostFormList;
