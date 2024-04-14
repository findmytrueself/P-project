import {
  Box,
  Tab,
  Tabs,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect, useState, useCallback } from "react";
import { useBatteryContext } from "../../context/BatteryContext";
import { clientAxiosInstance } from "../../api/axios";
import { utcToKrTime } from "../../utils/utils";
// import Graph from './MeasurementTabs/Graph'
import List from "./MeasurementTabs/List";
import Statistic from "./MeasurementTabs/Statistic";
import { BarChart } from "@mui/x-charts";

const MeasurementPanel = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  const { batteryStatus } = useBatteryContext();
  const [tab1, setTab1] = useState(0);

  const [tab2, setTab2] = useState(0);
  const [batteryNumber, setBatteryNumber] = useState(1);
  const [batteryHistory, setBatteryHistory] = useState([]);
  const [convertedTab2, setConvertedTab2] = useState({
    key: "",
    label: "",
    color: "",
    time: "",
    format: "",
  });
  const [chartSetting, setChartSetting] = useState({});

  useEffect(() => {
    const fetchData = () => {
      if (batteryStatus) {
        const { rruId, batteryMeasures } = batteryStatus;
        const getbatteryMeasureList = async () => {
          try {
            let url = `/rrus/${rruId}/${
              batteryMeasures[batteryNumber].stringNumber ?? 1
            }/${batteryMeasures[batteryNumber].batteryNumber}/list`;
            if (isMobile) {
              url += "?limit=8";
            }
            const batteryMeasureData = await clientAxiosInstance.get(url);
            setBatteryHistory(batteryMeasureData.data.list);
          } catch (e) {
            console.error(e);
          }
        };
        getbatteryMeasureList();
      }
    };

    // 초기 호출
    fetchData();

    // 10초마다 호출
    const intervalId = setInterval(fetchData, 30000);

    // 컴포넌트가 언마운트될 때 clearInterval로 인터벌 제거
    return () => clearInterval(intervalId);
  }, [batteryStatus, batteryNumber, isMobile]);

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
      height: 480,
    };

    // chartSetting 상태를 업데이트
    setChartSetting(newChartSetting);
  }, [tab2, batteryNumber]);

  return (
    <Box sx={{ pt: "16px" }}>
      <Tabs
        value={tab1}
        onChange={(e, newValue) => setTab1(newValue)}
        TabIndicatorProps={{
          style: {
            display: "none",
          },
        }}
      >
        <Tab
          sx={{
            border: "1px solid rgba(224, 224, 224, 1)",
            minWidth: "120px",
            minHeight: "40px",
          }}
          label="그래프"
          value={0}
        />
        <Tab
          sx={{
            border: "1px solid rgba(224, 224, 224, 1)",
            minWidth: "120px",
            minHeight: "40px",
          }}
          label="리스트"
          value={1}
        />
        <Tab
          sx={{
            border: "1px solid rgba(224, 224, 224, 1)",
            minWidth: "120px",
            minHeight: "40px",
          }}
          label="통계"
          value={2}
        />
      </Tabs>

      <FormControl sx={{ m: 1 }}>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          defaultValue={1}
        >
          {batteryStatus &&
            batteryStatus.batteryMeasures &&
            Object.values(batteryStatus.batteryMeasures).length > 0 &&
            Object.values(batteryStatus.batteryMeasures).map((battery) => (
              <FormControlLabel
                key={battery.batteryNumber}
                value={battery.batteryNumber}
                control={<Radio />}
                label={`배터리${battery.batteryNumber}`}
                onChange={(e) => setBatteryNumber(e.target.value)}
                disabled={!batteryStatus}
              />
            ))}
        </RadioGroup>
      </FormControl>

      {tab1 === 0 && (
        <>
          <Tabs
            sx={{ overflowX: "auto" }}
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
                minWidth: isMobile ? "80px" : "100px",
                minHeight: "40px",
              }}
              label="전압(V)"
              value={0}
            />
            <Tab
              sx={{
                border: "1px solid rgba(224, 224, 224, 1)",
                minWidth: isMobile ? "80px" : "100px",
                minHeight: "40px",
              }}
              label="온도(°C)"
              value={1}
            />
            <Tab
              sx={{
                border: "1px solid rgba(224, 224, 224, 1)",
                minWidth: isMobile ? "80px" : "100px",
                minHeight: "40px",
                textTransform: "none",
              }}
              label="저항(mΩ)"
              value={2}
            />
            <Tab
              sx={{
                border: "1px solid rgba(224, 224, 224, 1)",
                minWidth: isMobile ? "80px" : "100px",
                minHeight: "40px",
              }}
              label="SOC(%)"
              value={3}
            />
            <Tab
              sx={{
                border: "1px solid rgba(224, 224, 224, 1)",
                minWidth: isMobile ? "80px" : "100px",
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
        // <Graph
        //   tab1={tab1}
        //   batteryHistory={batteryHistory}
        //   batteryNumber={batteryNumber}
        // />
      )}

      {tab1 === 1 && batteryHistory.length > 0 && (
        <List batteryHistory={batteryHistory} />
      )}

      {tab1 === 2 && batteryHistory.length > 0 && (
        <Statistic
          batteryStatus={batteryStatus}
          batteryNumber={batteryNumber}
        />
      )}
    </Box>
  );
};

export default MeasurementPanel;

const timeFormatter = (utc) => `${utcToKrTime(utc)}`;
const valueFormatter = (value, format) => `${value}${format}`;
