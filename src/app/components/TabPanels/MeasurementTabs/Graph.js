import React, { useCallback, useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts";
import { Tab, Tabs } from "@mui/material";
import { utcToKrTime } from "../../../utils/utils";

const timeFormatter = (utc) => `${utcToKrTime(utc)}`;
const valueFormatter = (value, format) => `${value}${format}`;

const Graph = ({ batteryHistory, batteryNumber }) => {
  const [tab2, setTab2] = useState(0);
  const [convertedTab2, setConvertedTab2] = useState({
    key: "",
    label: "",
    color: "",
    time: "",
    format: "",
  });
  const [chartSetting, setChartSetting] = useState({});

  const getTab2ChartKey = useCallback((tab2Value) => {
    switch (tab2Value) {
      case 0:
        return {
          key: "voltage",
          label: "전압(V)",
          format: "V",
          color: "#4e79a7",
          time: "measuredAt",
        };
      case 1:
        return {
          key: "temperature",
          label: "온도(°C)",
          format: "°C",
          color: "#f28e2c",
          time: "measuredAt",
        };
      case 2:
        return {
          key: "resistance",
          label: "저항(mΩ)",
          format: "mΩ",
          color: "#e15759",
          time: "measuredAt",
        };
      case 3:
        return {
          key: "soc",
          label: "SOC(%)",
          format: "%",
          color: "#76b7b2",
          time: "measuredAt",
        };
      case 4:
        return {
          key: "soh",
          label: "SOH(%)",
          format: "%",
          color: "#59a14f",
          time: "measuredAt",
        };
      default:
    }
  }, []);

  useEffect(() => {
    setConvertedTab2(getTab2ChartKey(tab2));
  }, [tab2]);

  useEffect(() => {
    const chartKey = getTab2ChartKey(tab2);

    const newChartSetting = {
      axisHighlight: { x: "none" },
      yAxis: [
        {
          label: `배터리${batteryNumber} ${chartKey.label} 그래프`,
        },
      ],
      series: [
        {
          dataKey: chartKey.key,
          label: chartKey.label,
          color: chartKey.color,
          valueFormatter: (value) => valueFormatter(value, chartKey.format),
        },
      ],
      height: 300,
    };

    // chartSetting 상태를 업데이트
    setChartSetting(newChartSetting);
  }, [tab2, batteryNumber]);

  return (
    <>
      <Tabs
        value={tab2}
        onChange={(e, newValue) => setTab2(newValue)}
        TabIndicatorProps={{
          style: {
            display: "none",
          },
        }}
      >
        <Tab
          sx={{
            border: "1px solid rgba(224, 224, 224, 1)",
            minWidth: "150px",
            minHeight: "40px",
          }}
          label="전압(V)"
          value={0}
        />
        <Tab
          sx={{
            border: "1px solid rgba(224, 224, 224, 1)",
            minWidth: "150px",
            minHeight: "40px",
          }}
          label="온도(°C)"
          value={1}
        />
        <Tab
          sx={{
            border: "1px solid rgba(224, 224, 224, 1)",
            minWidth: "150px",
            minHeight: "40px",
            textTransform: "none",
          }}
          label="저항(mΩ)"
          value={2}
        />
        <Tab
          sx={{
            border: "1px solid rgba(224, 224, 224, 1)",
            minWidth: "150px",
            minHeight: "40px",
          }}
          label="SOC(%)"
          value={3}
        />
        <Tab
          sx={{
            border: "1px solid rgba(224, 224, 224, 1)",
            minWidth: "150px",
            minHeight: "40px",
          }}
          label="SOH(%)"
          value={4}
        />
      </Tabs>
      {batteryHistory.length > 0 && (
        <BarChart
          dataset={batteryHistory}
          xAxis={[
            {
              scaleType: "band",
              dataKey: convertedTab2.time,
              valueFormatter: timeFormatter,
              tickPlacement: "middle",
              tickLabelPlacement: "middle",
            },
          ]}
          {...chartSetting}
        />
      )}
    </>
  );
};

export default Graph;
