import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import Box from "@mui/material/Box";
import { useRecoilValue } from "recoil";
import clientIdState from "../../../states/client/ClientIdState.tsx";
import request, { RequestSuccessHandler } from "../../../lib/request.ts";
import Card from "@mui/material/Card";
import { LawsuitInfo } from "../../case/type/LawsuitInfo.tsx";

type EChartsOption = echarts.EChartsOption;

function ClientCaseStatisticsChart() {
  const clientId = useRecoilValue(clientIdState);
  const [cases, setCases] = useState<LawsuitInfo[]>([]);
  const totalAmountByStatusChartRef = useRef<HTMLDivElement>(null);
  const unreceivedAmountChartRef = useRef<HTMLDivElement>(null);

  const [valueA, setValueA] = useState(0); // totalAmountByStatus("등록")
  const [valueB, setValueB] = useState(0); // totalAmountByStatus("진행")
  const [valueC, setValueC] = useState(0); //totalAmountByStatus("종결")

  useEffect(() => {
    if (typeof clientId !== "number") {
      // TODO
      return;
    }

    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const lawsuitData: LawsuitInfo[] = res.data.lawsuitList;
      setCases(lawsuitData);
    };

    request("GET", `/lawsuits/clients/${clientId}`, {
      useMock: false,
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
    setValueA(totalAmountByStatus("REGISTRATION"));
    setValueB(totalAmountByStatus("PROCEEDING"));
    setValueC(totalAmountByStatus("CLOSING"));
  }, [cases]);

  useEffect(() => {
    const totalAmountByStatusChart = echarts.init(
      totalAmountByStatusChartRef.current,
    );
    const unreceivedAmountChart = echarts.init(
      unreceivedAmountChartRef.current,
    );

    // 의뢰비 차트 옵션 설정
    const totalAmountByStatusChartOptions: EChartsOption = {
      title: {
        text: "사건 상태별 총 금액",
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
          data: [
            {
              value: valueA,
              name: "접수중",
              itemStyle: { color: "#BACDF4" },
            },
            {
              value: valueB,
              name: "진행중",
              itemStyle: { color: "#59B0F7" },
            },
            {
              value: valueC,
              name: "종결",
              itemStyle: { color: "#5B73C9" },
            },
          ],
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

    // 성공보수 차트 옵션 설정
    const unreceivedAmountChartOptions: EChartsOption = {
      title: {
        text: "미수령 금액",
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
          data: [
            {
              value: unreceivedAmountByStatus("등록"),
              name: "진행전 의뢰비",
              itemStyle: { color: "#59B0F7" },
            },
            {
              value: calculateSuccessAmount(),
              name: "기대 성공 보수",
              itemStyle: { color: "#5B73C9" },
            },
          ],
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
    totalAmountByStatusChart.setOption(totalAmountByStatusChartOptions);
    // @ts-ignore
    unreceivedAmountChart.setOption(unreceivedAmountChartOptions);

    // 창 크기 조절 이벤트 핸들러 추가
    const handleResize = () => {
      totalAmountByStatusChart.resize();
      unreceivedAmountChart.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [valueA, valueB, valueC]);

  function totalAmountByStatus(status: string): number {
    if (!cases) {
      return 0;
    }

    return cases.reduce((acc, item) => {
      return item.lawsuitStatus === status ? acc + item.commissionFee : acc;
    }, 0);
  }

  function unreceivedAmountByStatus(status: string): number {
    if (!cases) {
      return 0;
    }

    return cases.reduce((acc, item) => {
      return item.lawsuitStatus === status ? acc + item.commissionFee : acc;
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

  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        flexDirection: "row",
      }}
    >
      <Card
        ref={totalAmountByStatusChartRef}
        sx={{ width: "100%", height: "400px" }}
      ></Card>
      <Card
        ref={unreceivedAmountChartRef}
        sx={{ width: "100%", height: "400px" }}
      ></Card>
    </Box>
  );
}

export default ClientCaseStatisticsChart;
