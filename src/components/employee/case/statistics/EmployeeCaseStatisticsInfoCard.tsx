import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

type Props = {
  width?: string | number;
  height?: string | number;
  name?: string;
  winCnt: number;
  loseCnt: number;
  income: number;
};

function getWinRate(winCnt: number, loseCnt: number) {
  return Number((winCnt / (winCnt + loseCnt)).toFixed(3)) * 100;
}

function EmployeeCaseStatisticsInfoCard({
  width,
  height,
  name,
  winCnt,
  loseCnt,
  income,
}: Props) {
  return (
    <Card sx={{ width, height }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Box sx={{ display: "flex", justifyContent: "right", gap: 1 }}></Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          padding: "10px",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography sx={{ display: "inline-block" }} variant="h4">
            {name}
          </Typography>
        </Box>
      </Box>

      <Typography sx={{ display: "inline-block", fontSize: 20 }} gutterBottom>
        {income} 원 수익
      </Typography>
      <br />
      <Typography sx={{ display: "inline-block", fontSize: 20 }} gutterBottom>
        {winCnt} 승 {loseCnt} 패 ({getWinRate(winCnt, loseCnt)}%)
      </Typography>
      <br />
    </Card>
  );
}

export default EmployeeCaseStatisticsInfoCard;
