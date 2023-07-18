import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ReactNode, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import request, { RequestSuccessHandler } from "../../lib/request";
import { ClientData } from "../../mock/client/clientTable";
import clientIdState from "../../states/client/ClientIdState";

type Props = {
  rightButton?: ReactNode;
};

function ClientInfo({ rightButton }: Props) {
  const clientId = useRecoilValue(clientIdState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (typeof clientId !== "number") {
      // TODO
      return;
    }

    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const body: { data: ClientData } = res.data;
      const { data } = body;
      const { name, email } = data;
      setName(name);
      setEmail(email);
    };

    request("GET", `/clients/${clientId}`, {
      onSuccess: handleRequestSuccess,
    });
  }, [clientId]);

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <CardContent>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            {email}
          </Typography>
        </CardContent>
      </Box>
      <Box>{rightButton}</Box>
    </Card>
  );
}

export default ClientInfo;
