import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { ROOT } from "../constant/url";
import { clientIdState } from "../state/clientIdState";

type ClientProfile = {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
};

export default function ClientProfilePage() {
  const [clientId, setClientId] = useRecoilState(clientIdState);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${ROOT}/clients/${clientId}`);
      const data: ClientProfile = response.data;
      setClientId(data.id);
      setName(data.name);
      setPhone(data.phone);
      setEmail(data.email);
      setAddress(data.address);
    })();
  }, [clientId]);

  return (
    <div>
      <div>
        <div>이름</div>
        <div>{name}</div>
      </div>
      <div>
        <div>전화번호</div>
        <div>{phone}</div>
      </div>
      <div>
        <div>이메일</div>
        <div>{email}</div>
      </div>
      <div>
        <div>주소</div>
        <div>{address}</div>
      </div>
    </div>
  );
}
