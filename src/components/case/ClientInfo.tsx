import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import request, { RequestSuccessHandler } from "../../lib/request.ts";
import { ClientData } from "../../mock/client/clientTable.ts";
import clientIdState from "../../states/client/ClientIdState.tsx";
import Button from "@mui/material/Button";
import ClientRemovePopUpButton from "../layout/ClientRemovePopUpButton.tsx";

function ClientInfo() {
  const clientId = useRecoilValue(clientIdState);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [editMode, setEditMode] = useState(false);

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
    <Card sx={{ minWidth: 480 }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{ display: "inline-block" }}
            variant="h5"
            contentEditable={editMode}
          >
            {name}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "right", gap: 1 }}>
            {editMode ? (
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  setEditMode(false);
                }}
              >
                확인
              </Button>
            ) : (
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  setEditMode(true);
                }}
              >
                수정
              </Button>
            )}
            <ClientRemovePopUpButton />
          </Box>
        </Box>
        <Typography
          sx={{ display: "inline-block", fontSize: 14 }}
          color="text.secondary"
          gutterBottom
          contentEditable={editMode}
        >
          {email}
        </Typography>
        <br />
        <Typography
          sx={{ display: "inline-block", fontSize: 14 }}
          color="text.secondary"
          gutterBottom
          contentEditable={editMode}
        >
          {phone}
        </Typography>
        <br />
        <Typography
          sx={{ display: "inline-block", fontSize: 14 }}
          color="text.secondary"
          gutterBottom
          contentEditable={editMode}
        >
          {address}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ClientInfo;
