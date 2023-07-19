import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import request, { RequestSuccessHandler } from "../../lib/request";
import { ClientData } from "../../mock/client/clientTable";
import clientIdState from "../../states/client/ClientIdState";
import Placeholder from "../common/Placeholder.tsx";
import Box from "@mui/material/Box";

function ClientProfileTab() {
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
      const { name, phone, email, address } = data;
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
    <Box sx={{ display: "flex", gap: 3, flexDirection: "column" }}>
      <Card sx={{ minWidth: 480 }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5" component="div" contentEditable={editMode}>
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
              <Button variant="contained" size="small">
                삭제
              </Button>
            </Box>
          </Box>
          <Typography
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
            contentEditable={editMode}
          >
            {email}
          </Typography>
          <Typography
            sx={{ mb: 1.5 }}
            color="text.secondary"
            contentEditable={editMode}
          >
            {phone}
          </Typography>
          <Typography variant="body2" contentEditable={editMode}>
            {address}
          </Typography>
        </CardContent>
      </Card>
      <Box sx={{ flexGrow: 1, height: 480 }}>
        <Placeholder />
      </Box>
    </Box>
  );
}

export default ClientProfileTab;
