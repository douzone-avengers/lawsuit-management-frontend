import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { ROOT } from "../../constant/url";
import { caseIdState } from "../../state/caseIdState";

type CaseProfile = {
  id: number;
  lawsuitType: string;
  name: string;
  courtName: string;
  lawsuitStatus: "등록" | "진행" | "종결";
  result: "원고승" | "원고패";
  commissionFee: number;
  contingentFee: number;
  lawsuitNum: string;
  judgementDate: Date;
};

export default function CaseProfile() {
  const [clientId, setClientId] = useRecoilState(caseIdState);

  const [lawsuitType, setLawsuitType] = useState("");
  const [name, setName] = useState("");
  const [courtName, setCourtName] = useState("");
  const [lawsuitStatus, setLawsuitStatus] = useState("");
  const [result, setResult] = useState("");
  const [commissionFee, setCommissionFee] = useState(0);
  const [contigentFee, setContigentFee] = useState(0);
  const [lawsuitNum, setLawsuitNum] = useState("");
  const [judgementDate, setJudgementDate] = useState<string>("");

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${ROOT}/lawsuits/${clientId}`);
      const data: CaseProfile = response.data;
      setClientId(data.id);
      setLawsuitType(data.lawsuitType);
      setName(data.name);
      setCourtName(data.courtName);
      setLawsuitStatus(data.lawsuitStatus);
      setResult(data.result);
      setCommissionFee(data.commissionFee);
      setContigentFee(data.contingentFee);
      setLawsuitNum(data.lawsuitNum);
      setJudgementDate(data.judgementDate.toString());
    })();
  }, [clientId]);

  return (
    <div>
      <div>
        <div>사건종류</div>
        <div>{lawsuitType}</div>
      </div>
      <div>
        <div>사건명</div>
        <div>{name}</div>
      </div>
      <div>
        <div>법원</div>
        <div>{courtName}</div>
      </div>
      <div>
        <div>의뢰비</div>
        <div>{commissionFee}</div>
      </div>
      <div>
        <div>성공보수비용</div>
        <div>{contigentFee}</div>
      </div>
      <div>
        <div>사건상태</div>
        <div>{lawsuitStatus}</div>
      </div>
      <div>
        <div>사건번호</div>
        <div>{lawsuitNum}</div>
      </div>
      <div>
        <div>결과</div>
        <div>{result}</div>
      </div>
      <div>
        <div>판결일</div>
        <div>{judgementDate?.toString()}</div>
      </div>
    </div>
  );
}
