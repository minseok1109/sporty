import { Button, Grid } from "@mui/material";
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
        <Link href="/post/BasketPost">
          <Button variant="contained" sx={style} LinkComponent>
            농구
          </Button>
        </Link>
      </Grid>
      <Grid item xs>
        <Link href="/post/WalkPost">
          <Button variant="contained" sx={style} LinkComponent>
            걷기
          </Button>
        </Link>
      </Grid>
      <Grid item xs>
        <Link href="/post/FreePost">
          <Button variant="contained" sx={style} LinkComponent>
            기타
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}

export default PostFormList;
