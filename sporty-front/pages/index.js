import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { CardContent, Grid } from "@mui/material";

export default function Home() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={0}
    >
      <Grid xs={4}>
        <Card
          variant="outlined"
          sx={{ maxWidth: 50, maxHeight: 50, textAlign: "center" }}
        >
          <CardContent>
            <SportsBasketballIcon />
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={4}>
        <Card
          variant="outlined"
          sx={{ maxWidth: 50, maxHeight: 50, textAlign: "center" }}
        >
          <CardContent>
            <SportsSoccerIcon />
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={4}>
        <Card
          variant="outlined"
          sx={{ maxWidth: 50, maxHeight: 50, textAlign: "center" }}
        >
          <CardContent>
            <DirectionsRunIcon />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
