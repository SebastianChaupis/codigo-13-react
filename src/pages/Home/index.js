import { Container, Grid } from "@mui/material";
import Chart from "react-apexcharts";

const Home = () => {
  const chartData = {
    series: [
      {
        name: "Tech Development",
        data: [10, 30, 20, 14, 66, 32, 16],
      },
    ],
    options: {
      xaxis: {
        categories: ["JS", "CSS", "HTML", "Firebase", "NodeJS", "React", "Vue"],
      },
    },
  };
  return (
    <Container>
      <Grid>
        <h1>Home</h1>
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={400}
        />
      </Grid>
    </Container>
  );
};

export default Home;