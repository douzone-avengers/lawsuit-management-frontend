import { useRecoilValue } from "recoil";
import clientIdState from "../../../states/client/ClientIdState.tsx";
import { useEffect, useState } from "react";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../../lib/requestDeprecated.ts";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { SvgIcon } from "@mui/material";
import { Email, LocationOn, PhoneIphone } from "@mui/icons-material";
import { ClientData } from "../../../type/ResponseType.ts";
import Box from "@mui/material/Box";

function ClientCaseStatisticsInfoCard() {
  const clientId = useRecoilValue(clientIdState);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (typeof clientId !== "number") {
      // TODO
      return;
    }

    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const clientData: ClientData = res.data;
      setName(clientData.name);
      setPhone(clientData.phone);
      setEmail(clientData.email);
      setAddress(clientData.address);
    };

    requestDeprecated("GET", `/clients/${clientId}`, {
      withToken: true,
      onSuccess: handleRequestSuccess,
    });
  }, [clientId]);

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Typography sx={{ display: "inline-block" }} variant="h4">
          {name}
        </Typography>
        <br />
        <hr />
        <br />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SvgIcon
            component={Email}
            sx={{ color: "#1976d2", marginBottom: "5px" }}
          />
          &nbsp;&nbsp;
          <Typography
            sx={{ display: "inline-block", fontSize: 18, fontWeight: "bold" }}
            color="text.secondary"
            gutterBottom
          >
            {email}
          </Typography>
        </Box>
        <br />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SvgIcon
            component={PhoneIphone}
            sx={{ color: "#1976d2", marginBottom: "10px" }}
          />{" "}
          &nbsp;&nbsp;
          <Typography
            sx={{ display: "inline-block", fontSize: 18, fontWeight: "bold" }}
            color="text.secondary"
            gutterBottom
          >
            {phone}
          </Typography>
        </Box>
        <br />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SvgIcon
            component={LocationOn}
            sx={{ color: "#1976d2", marginBottom: "8px" }}
          />{" "}
          &nbsp;&nbsp;
          <Typography
            sx={{ display: "inline-block", fontSize: 18, fontWeight: "bold" }}
            color="text.secondary"
            gutterBottom
          >
            {address}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ClientCaseStatisticsInfoCard;
