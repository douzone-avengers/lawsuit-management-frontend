import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import request, { RequestSuccessHandler } from "../../lib/request";
import { ClientData } from "../../mock/client/clientTable";
import clientIdState from "../../states/client/ClientIdState";

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
    <Card sx={{ minWidth: 480 }}>
      <CardActions sx={{ justifyContent: "right" }}>
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
      </CardActions>
      <CardContent>
        <Typography variant="h5" component="div" contentEditable={editMode}>
          {name}
        </Typography>
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
        <ImageNotSupportedIcon sx={{ width: "100%", minHeight: 240 }} />
      </CardContent>
    </Card>
  );
}

export default ClientProfileTab;
