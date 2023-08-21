import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { Box } from "@mui/material";

type EChartsOption = echarts.EChartsOption;

export default function EmployeeCaseChart() {
  const winRate_ChartRef = useRef<HTMLDivElement>(null);
  const incomePerMonth_ChartRef = useRef<HTMLDivElement>(null);
  const lawsuitType_ChartRef = useRef<HTMLDivElement>(null);
  const incomeType_ChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const winRateChart = echarts.init(winRate_ChartRef.current);
    const incomePerMonthChart = echarts.init(incomePerMonth_ChartRef.current);
    const lawsuitTypeChart = echarts.init(lawsuitType_ChartRef.current);
    const incomeTypeChart = echarts.init(incomeType_ChartRef.current);

    //승률 차트
    const winRateOption: EChartsOption = {
      title: {
        text: "월별 승률",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["전체", "민사", "형사"],
      },
      grid: {
        left: "3%",
        right: "3%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: [
          "2023.1",
          "2023.2",
          "2023.3",
          "2023.4",
          "2023.5",
          "2023.6",
          "2023.7",
        ],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "전체",
          type: "line",
          stack: "",
          data: [25.3, 55.6, 48.4, 98.4, 78.4, 11.4, 88.4],
        },
        {
          name: "민사",
          type: "line",
          stack: "",
          data: [48, 99, 12, 0, 55, 44, 66],
        },
        {
          name: "형사",
          type: "line",
          stack: "",
          data: [0, 55, 44, 88, 66, 33, 11],
        },
      ],
    };
    const incomePerMonthOption: EChartsOption = {
      title: {
        text: "월별 수익",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["전체", "민사", "형사"],
      },
      grid: {
        left: "3%",
        right: "3%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: [
          "2023.1",
          "2023.2",
          "2023.3",
          "2023.4",
          "2023.5",
          "2023.6",
          "2023.7",
        ],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "합계",
          type: "line",
          stack: "",
          data: [1300000, 600000, 300000, 600000, 800000, 1500000, 200000],
        },
        {
          name: "민사",
          type: "line",
          stack: "",
          data: [1000000, 500000, 300000, 200000, 700000, 800000, 200000],
        },
        {
          name: "형사",
          type: "line",
          stack: "",
          data: [300000, 100000, 0, 400000, 100000, 700000, 0],
        },
      ],
    };
    const lawsuitTypeOption: EChartsOption = {
      title: {
        text: "담당 사건",
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
            { value: 96, name: "민사" },
            { value: 60, name: "형사" },
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

    winRateChart.setOption(winRateOption);
    incomePerMonthChart.setOption(incomePerMonthOption);
    lawsuitTypeChart.setOption(lawsuitTypeOption);
    incomeTypeChart.setOption(incomeTypeOption);
    // 창 크기 조절 이벤트 핸들러 추가
    const handleResize = () => {
      winRateChart.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          margin: "0 0 50px 0",
        }}
      >
        <Box
          ref={winRate_ChartRef}
          sx={{ width: ["50%", "50%"], height: "300px" }}
        ></Box>

        <Box
          ref={incomePerMonth_ChartRef}
          sx={{ width: ["50%", "50%"], height: "300px" }}
        ></Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Box
          ref={lawsuitType_ChartRef}
          sx={{ width: ["50%", "50%"], height: "300px" }}
        ></Box>
        <Box
          ref={incomeType_ChartRef}
          sx={{ width: ["50%", "50%"], height: "300px" }}
        ></Box>
      </Box>
    </Box>
  );
}
