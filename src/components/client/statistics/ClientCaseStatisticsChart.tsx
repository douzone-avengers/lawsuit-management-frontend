import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import Box from "@mui/material/Box";
import { useRecoilValue } from "recoil";
import clientIdState from "../../../states/client/ClientIdState.tsx";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../../lib/requestDeprecated.ts";
import Card from "@mui/material/Card";
import { LawsuitInfo } from "../../case/type/LawsuitInfo.tsx";

type EChartsOption = echarts.EChartsOption;

function ClientCaseStatisticsChart() {
  const clientId = useRecoilValue(clientIdState);
  const [cases, setCases] = useState<LawsuitInfo[]>([]);
  const countTotalStatus = useRef<HTMLDivElement>(null);
  const countTotalFee = useRef<HTMLDivElement>(null);

  const [countRegistration, setCountRegistration] = useState(0); // countTotalLawsuitStatus("등록")
  const [countProceeding, setCountProceeding] = useState(0); // countTotalLawsuitStatus("진행")
  const [countClosing, setCountClosing] = useState(0); //countTotalLawsuitStatus("종결")

  useEffect(() => {
    if (typeof clientId !== "number") {
      // TODO
      return;
    }

    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const lawsuitData: LawsuitInfo[] = res.data.lawsuitList;
      setCases(lawsuitData);
    };

    requestDeprecated("GET", `/lawsuits/clients/${clientId}`, {
      withToken: true,
      params: {
        curPage: "0",
        rowsPerPage: "0",
        searchWord: "",
      },
      onSuccess: handleRequestSuccess,
    });
  }, [clientId]);

  useEffect(() => {
    if (!cases) {
      return;
    }
    setCountRegistration(countTotalLawsuitStatus("REGISTRATION"));
    setCountProceeding(countTotalLawsuitStatus("PROCEEDING"));
    setCountClosing(countTotalLawsuitStatus("CLOSING"));
  }, [cases]);

  // 상태별 총 개수 계산
  function countTotalLawsuitStatus(status: string): number {
    let count = 0;
    cases.filter((item) => (item.lawsuitStatus === status ? count++ : count));

    return count;
  }

  // 비용별 총 금액 계산
  function calculateCommissionAmount(): number {
    if (!cases) {
      return 0;
    }

    return cases.reduce((acc, item) => {
      return acc + item.commissionFee;
    }, 0);
  }

  function calculateSuccessAmount(): number {
    if (!cases) {
      return 0;
    }

    return cases.reduce((acc, item) => {
      return acc + item.contingentFee;
    }, 0);
  }

  // 데이터 배열 생성
  const lawsuitStatusData = [
    {
      value: countRegistration,
      name: "접수중",
      itemStyle: { color: "#BACDF4" },
    },
    {
      value: countProceeding,
      name: "진행중",
      itemStyle: { color: "#59B0F7" },
    },
    {
      value: countClosing,
      name: "종결",
      itemStyle: { color: "#5B73C9" },
    },
  ];

  const lawsuitFeeData = [
    {
      value: calculateCommissionAmount(),
      name: "의뢰비",
      itemStyle: { color: "#59B0F7" },
    },
    {
      value: calculateSuccessAmount(),
      name: "성공보수",
      itemStyle: { color: "#5B73C9" },
    },
  ];

  // value 값이 0인 데이터 필터링
  const filteredLawsuitStatusData = lawsuitStatusData.filter(
    (item) => item.value !== 0,
  );
  const filteredLawsuitFeeData = lawsuitFeeData.filter(
    (item) => item.value !== 0,
  );

  if (
    filteredLawsuitStatusData.length === 0 &&
    filteredLawsuitFeeData.length === 0
  ) {
    filteredLawsuitStatusData.push({
      value: 0,
      name: "사건없음",
      itemStyle: { color: "#CCCCCC" },
    });

    filteredLawsuitFeeData.push({
      value: 0,
      name: "사건없음",
      itemStyle: { color: "#CCCCCC" },
    });
  }

  useEffect(() => {
    const totalCountLawsuitStatusChart = echarts.init(countTotalStatus.current);
    const totalCountFeeChart = echarts.init(countTotalFee.current);

    // 사건 현황 차트 옵션 설정
    const totalCountLawsuitStatusOptions: EChartsOption = {
      title: {
        text: "사건 현황",
        left: "center",
      },
      grid: {
        width: "50%",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "사건 현황",
          type: "pie",
          radius: "70%",
          data: filteredLawsuitStatusData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    // 의뢰비 / 성공보수 차트 옵션 설정
    const unreceivedAmountChartOptions: EChartsOption = {
      title: {
        text: "의뢰비 / 성공보수",
        left: "center",
      },
      grid: {
        width: "50%",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "상세 금액",
          type: "pie",
          radius: "70%",
          data: filteredLawsuitFeeData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    // @ts-ignore
    totalCountLawsuitStatusChart.setOption(totalCountLawsuitStatusOptions);
    // @ts-ignore
    totalCountFeeChart.setOption(unreceivedAmountChartOptions);

    // 창 크기 조절 이벤트 핸들러 추가
    const handleResize = () => {
      totalCountLawsuitStatusChart.resize();
      totalCountFeeChart.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [countRegistration, countProceeding, countClosing]);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        flexDirection: "row",
      }}
    >
      <Card
        ref={countTotalStatus}
        sx={{ width: "100%", height: "400px" }}
      ></Card>
      <Card ref={countTotalFee} sx={{ width: "100%", height: "400px" }}></Card>
    </Box>
  );
}

export default ClientCaseStatisticsChart;
