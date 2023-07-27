import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Business, Email, LocationOn, PhoneIphone } from "@mui/icons-material";
import { SvgIcon } from "@mui/material";
import { MemberInfo } from "../../../mock/member/memberHandlers";

type Props = {
  width?: string | number;
  height?: string | number;
  memberInfo?: MemberInfo;
};

function EmployeeInfoCard({ width, height, memberInfo }: Props) {
  if (!memberInfo) {
    return;
  }
  // useEffect(() => {
  //   if (!memberInfo) {
  //     return;
  //   }
  //
  // }, []);
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
            {memberInfo.name}
          </Typography>
        </Box>
      </Box>

      <hr />
      <Typography
        sx={{ display: "inline-block", fontSize: 20 }}
        color="text.secondary"
        gutterBottom
      >
        <SvgIcon component={Email} /> &nbsp;
        {memberInfo.email}
      </Typography>
      <br />
      <Typography
        sx={{ display: "inline-block", fontSize: 20 }}
        color="text.secondary"
        gutterBottom
      >
        <SvgIcon component={PhoneIphone} /> &nbsp;
        {memberInfo.phone}
      </Typography>

      <Typography
        sx={{ display: "inline-block", fontSize: 20 }}
        color="text.secondary"
        gutterBottom
      >
        <SvgIcon component={LocationOn} /> &nbsp;
        {memberInfo.address}
      </Typography>
      <br />
      <Typography
        sx={{ display: "inline-block", fontSize: 20 }}
        color="text.secondary"
        gutterBottom
      >
        <SvgIcon component={Business} /> &nbsp;
        {memberInfo.hierarchy}
      </Typography>
      <br />
      <Typography
        sx={{ display: "inline-block", fontSize: 20 }}
        color="text.secondary"
        gutterBottom
      >
        <SvgIcon component={Business} /> &nbsp;
        {memberInfo.role}
      </Typography>
    </Card>
  );
}

export default EmployeeInfoCard;
