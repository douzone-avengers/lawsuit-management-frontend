import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { Box, Card } from "@mui/material";
import { LawsuitCountStatus } from "../../type/LawsuitCountStatus";
import { RevenueStatus } from "../../type/RevenueStatus";

type EChartsOption = echarts.EChartsOption;

type Props = {
  lawsuitCountStatus: LawsuitCountStatus;
  revenueStatus: RevenueStatus;
};

export default function EmployeeCaseChart({
  lawsuitCountStatus,
  revenueStatus,
}: Props) {
  const lawsuitType_ChartRef = useRef<HTMLDivElement>(null);
  const revenueType_ChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.dir(revenueStatus);
    const lawsuitTypeChart = echarts.init(lawsuitType_ChartRef.current);
    const revenueTypeChart = echarts.init(revenueType_ChartRef.current);

    const lawsuitData = [
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
    ];

    const filteredLawsuitData = lawsuitData.filter((it) => it.value !== 0);
    if (filteredLawsuitData.length === 0) {
      filteredLawsuitData.push({
        value: 0,
        name: "사건없음",
        itemStyle: { color: "#CCCCCC" },
      });
    }

    const lawsuitTypeOption: EChartsOption = {
      title: {
        text: "사건 현황",
        left: "center",
        subtext: `총 사건: ${lawsuitCountStatus.total} 건`,
        top: "5%",
      },
      grid: {
        width: "50%",
      },
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c}건",
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
          center: ["50%", "55%"],
          label: {
            show: true,
            formatter: function (params) {
              return `${params.name}`;
            },
          },
          data: filteredLawsuitData,
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

    const revenueData = [
      {
        value: revenueStatus.contingentFee,
        name: " 의뢰비 수익",
        itemStyle: { color: "#BACDF4" },
      },
      {
        value: revenueStatus.commissionFee,
        name: " 성공보수 수익",
        itemStyle: { color: "#59B0F7" },
      },
    ];

    const filteredRevenueData = revenueData.filter((it) => it.value !== 0);
    if (filteredRevenueData.length === 0) {
      filteredRevenueData.push({
        value: 0,
        name: "사건없음",
        itemStyle: { color: "#CCCCCC" },
      });
    }

    const revenueTypeOption: EChartsOption = {
      title: {
        text: "수익 현황",
        left: "center",
        subtext: `총수익: ${revenueStatus.localeTotal} 원`,
        top: "5%",
      },
      grid: {
        width: "50%",
      },
      tooltip: {
        trigger: "item",
        formatter: function (
          params: echarts.TooltipComponentFormatterCallbackParams,
        ) {
          if (Array.isArray(params)) {
            // 여러 데이터 포맷 처리
            return params
              .map((item) => {
                if (typeof item.value === "number") {
                  const formattedValue = item.value.toLocaleString();
                  return item.name + ": " + formattedValue + "원";
                }
                return item.name + ": " + item.value + "원";
              })
              .join("<br>");
          } else {
            // 단일 데이터 포맷 처리
            if (typeof params.value === "number") {
              const formattedValue = params.value.toLocaleString();
              return params.name + ": " + formattedValue + "원";
            }
            return params.name + ": " + params.value + "원";
          }
        },
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "수익 현황",
          type: "pie",
          radius: "70%",
          center: ["50%", "55%"],
          label: {
            show: true,
            formatter: function (params) {
              return `${params.name}`;
            },
          },
          data: filteredRevenueData,
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
    revenueTypeChart.setOption(revenueTypeOption);
    const handleResize = () => {
      lawsuitTypeChart.resize();
      revenueTypeChart.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [lawsuitCountStatus, revenueStatus]);

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
          sx={{
            width: "100%",
            height: "400px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></Card>

        <Card
          ref={revenueType_ChartRef}
          sx={{
            width: "100%",
            height: "400px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></Card>
      </Box>
    </Box>
  );
}
