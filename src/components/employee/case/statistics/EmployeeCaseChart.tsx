import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { Box, Card } from "@mui/material";
import { LawsuitCountStatus } from "../../type/LawsuitCountStatus";

type EChartsOption = echarts.EChartsOption;

type Props = {
  lawsuitCountStatus: LawsuitCountStatus;
};

export default function EmployeeCaseChart({ lawsuitCountStatus }: Props) {
  const lawsuitType_ChartRef = useRef<HTMLDivElement>(null);
  const incomeType_ChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lawsuitTypeChart = echarts.init(lawsuitType_ChartRef.current);
    const incomeTypeChart = echarts.init(incomeType_ChartRef.current);

    //승률 차트

    const lawsuitTypeOption: EChartsOption = {
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
          name: "사건 수",
          type: "pie",
          radius: "70%",
          data: [
            {
              value: lawsuitCountStatus.registration,
              name: "접수중",
              itemStyle: { color: "#BACDF4" },
            },
            {
              value: lawsuitCountStatus.proceeding,
              name: "진행중",
              itemStyle: { color: "#59B0F7" },
            },
            {
              value: lawsuitCountStatus.closing,
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
    const incomeTypeOption: EChartsOption = {
      title: {
        text: "수익 비율",
        left: "left",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "horizontal",
        left: "center",
      },
      series: [
        {
          type: "pie",
          radius: "50%",
          data: [
            { value: 1000000, name: "기본 의뢰비" },
            { value: 2000000, name: "성공보수" },
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

    lawsuitTypeChart.setOption(lawsuitTypeOption);
    incomeTypeChart.setOption(incomeTypeOption);
    // 창 크기 조절 이벤트 핸들러 추가
    const handleResize = () => {
      lawsuitTypeChart.resize();
      incomeTypeChart.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [lawsuitCountStatus]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexDirection: "row",
        }}
      >
        <Card
          ref={lawsuitType_ChartRef}
          sx={{ width: "100%", height: "400px" }}
        ></Card>

        <Card
          ref={incomeType_ChartRef}
          sx={{ width: "100%", height: "400px" }}
        ></Card>
      </Box>
    </Box>
  );
}
