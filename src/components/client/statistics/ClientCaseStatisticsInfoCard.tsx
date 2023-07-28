import { useRecoilValue } from "recoil";
import clientIdState from "../../../states/client/ClientIdState.tsx";
import { useEffect, useState } from "react";
import request, { RequestSuccessHandler } from "../../../lib/request.ts";
import { ClientData } from "../../../mock/client/clientTable.ts";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { SvgIcon } from "@mui/material";
import { Email, LocationOn, PhoneIphone } from "@mui/icons-material";

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
      const body: { data: ClientData } = res.data;
      const { data } = body;
      const { name, email, phone, address } = data;
      setName(name);
      setPhone(phone);
      setEmail(email);
      setAddress(address);
    };

    request("GET", `/clients/${clientId}`, {
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
        <Typography
          sx={{ display: "inline-block", fontSize: 20 }}
          color="text.secondary"
          gutterBottom
        >
          <SvgIcon component={Email} /> &nbsp;
          {email}
        </Typography>
        <br />
        <Typography
          sx={{ display: "inline-block", fontSize: 20 }}
          color="text.secondary"
          gutterBottom
        >
          <SvgIcon component={PhoneIphone} /> &nbsp;
          {phone}
        </Typography>
        <br />
        <Typography
          sx={{ display: "inline-block", fontSize: 20 }}
          color="text.secondary"
          gutterBottom
        >
          <SvgIcon component={LocationOn} /> &nbsp;
          {address}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ClientCaseStatisticsInfoCard;
