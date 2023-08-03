import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import Box from "@mui/material/Box";
import { useRecoilValue } from "recoil";
import clientIdState from "../../../states/client/ClientIdState.tsx";
import { LawsuitData } from "../../../mock/lawsuit/lawsuitTable.ts";
import request, { RequestSuccessHandler } from "../../../lib/request.ts";
import Card from "@mui/material/Card";
import { produce } from "immer";

type EChartsOption = echarts.EChartsOption;

function ClientCaseStatisticsChart() {
  const memberId = useRecoilValue(clientIdState);
  const [cases, setCases] = useState<LawsuitData[]>([]);
  const totalAmountByStatusChartRef = useRef<HTMLDivElement>(null);
  const unreceivedAmountChartRef = useRef<HTMLDivElement>(null);
  // 의뢰비 차트 옵션 설정
  const [optionA, setOptionA] = useState<EChartsOption>({
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
            value: 0,
            name: "접수중",
            itemStyle: { color: "#BACDF4" },
          },
          {
            value: 0,
            name: "진행중",
            itemStyle: { color: "#59B0F7" },
          },
          {
            value: 0,
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
  });
  // 성공보수 차트 옵션 설정
  const [optionB, setOptionB] = useState<EChartsOption>({
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
            value: 0,
            name: "진행전 의뢰비",
            itemStyle: { color: "#59B0F7" },
          },
          {
            value: 0,
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
  });

  useEffect(() => {
    if (typeof memberId !== "number") {
      // TODO
      return;
    }
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const body: { data: LawsuitData[] } = res.data;
      const { data } = body;
      setCases(data);
    };

    request("GET", `/lawsuits/members/${memberId}`, {
      onSuccess: handleRequestSuccess,
    });
  }, [memberId]);

  useEffect(() => {
    const newOptionA = produce(optionA, (draft: any) => {
      draft.series[0].data[0].value = totalAmountByStatus("등록");
      draft.series[0].data[1].value = totalAmountByStatus("진행");
      draft.series[0].data[2].value = totalAmountByStatus("종결");
    });
    setOptionA(newOptionA);

    const newOptionB = produce(optionB, (draft: any) => {
      draft.series[0].data[0].value = unreceivedAmountByStatus("등록");
      draft.series[0].data[1].value = calculateSuccessAmount();
    });
    setOptionB(newOptionB);
  }, [cases]);

  useEffect(() => {
    const totalAmountByStatusChart = echarts.init(
      totalAmountByStatusChartRef.current,
    );
    const unreceivedAmountChart = echarts.init(
      unreceivedAmountChartRef.current,
    );

    // @ts-ignore
    totalAmountByStatusChart.setOption(optionA);
    // @ts-ignore
    unreceivedAmountChart.setOption(optionB);

    // 창 크기 조절 이벤트 핸들러 추가
    const handleResize = () => {
      totalAmountByStatusChart.resize();
      unreceivedAmountChart.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function totalAmountByStatus(status: string): number {
    const total = cases.reduce((acc, item) => {
      return item.lawsuitStatus === status ? acc + item.commissionFee : acc;
    }, 0);

    return total;
  }

  function unreceivedAmountByStatus(status: string): number {
    const total = cases.reduce((acc, item) => {
      return item.lawsuitStatus === status ? acc + item.commissionFee : acc;
    }, 0);

    return total;
  }

  function calculateSuccessAmount(): number {
    const total = cases.reduce((acc, item) => {
      return acc + item.contingentFee;
    }, 0);

    return total;
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
