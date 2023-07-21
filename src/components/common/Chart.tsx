import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { Box } from "@mui/material";
import { LawsuitData } from "../../mock/lawsuit/lawsuitTable.ts";

type EChartsOption = echarts.EChartsOption;
type Props = {
  cases: LawsuitData[];
};
export default function Chart({ cases }: Props) {
  const commissionFee_ChartRef = useRef<HTMLDivElement>(null);
  const successFee_ChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(cases);
    const commissionFeeChart = echarts.init(commissionFee_ChartRef.current);
    const successFeeChart = echarts.init(successFee_ChartRef.current);

    // 의뢰비 차트 옵션 설정
    const commissionFeeOptions: EChartsOption = {
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
              value: 1000000,
              name: "접수중",
              itemStyle: { color: "#BACDF4" },
            },
            {
              value: 1500000,
              name: "진행중",
              itemStyle: { color: "#59B0F7" },
            },
            {
              value: 2000000,
              name: "종결",
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
    const successFeeOptions: EChartsOption = {
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
              value: 1000000,
              name: "진행전 의뢰비",
              itemStyle: { color: "#59B0F7" },
            },
            {
              value: 12000000,
              name: "기대 성공 보수",
              itemStyle: { color: "#4A75CC" },
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
    commissionFeeChart.setOption(commissionFeeOptions);
    // @ts-ignore
    successFeeChart.setOption(successFeeOptions);

    // 창 크기 조절 이벤트 핸들러 추가
    const handleResize = () => {
      commissionFeeChart.resize();
      successFeeChart.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      <Box
        ref={commissionFee_ChartRef}
        sx={{ width: ["100%", "50%"], height: "400px" }}
      ></Box>
      <Box
        ref={successFee_ChartRef}
        sx={{ width: ["100%", "50%"], height: "400px" }}
      ></Box>
    </Box>
  );
}
