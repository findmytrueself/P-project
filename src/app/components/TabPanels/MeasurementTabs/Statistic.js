import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { clientAxiosInstance } from "../../../api/axios";

const Statistic = ({ batteryStatus, batteryNumber }) => {
  const [stat, setStat] = useState([]);

  useEffect(() => {
    if (batteryStatus) {
      const { rruId, batteryMeasures } = batteryStatus;
      const getbatteryStats = async () => {
        try {
          const batteryStatsData = await clientAxiosInstance.get(
            `/rrus/${rruId}/${
              batteryMeasures[batteryNumber].stringNumber ?? 1
            }/${batteryMeasures[batteryNumber].batteryNumber}/stats`
          );
          setStat(batteryStatsData.data.stat);
        } catch (e) {
          console.error(e);
        }
      };
      getbatteryStats();
    }
  }, [batteryStatus, batteryNumber]);

  return (
    <>
      {cardArray.map((row, idx) => (
        <Card
          key={idx}
          sx={{
            p: 0,
            mb: 2,
            boxShadow: "none",
            border: "1px solid rgba(224, 224, 224, 1)",
            "& .MuiCardContent-root:last-child": {
              paddingBottom: 0,
            },
          }}
        >
          <CardContent sx={{ p: 0 }}>
            <Box
              sx={{
                padding: "0 12px",
                borderBottom: "1px solid rgba(224, 224, 224, 1)",
              }}
            >
              <Typography
                sx={{
                  p: 1,
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  lineHeight: "1.5rem",
                }}
                variant="h7"
                component="div"
              >
                {row.label}
              </Typography>
            </Box>

            <Stack
              key={row}
              direction="row"
              justifyContent="space-between"
              sx={{
                padding: "0 12px",
                borderBottom: "1px solid rgba(224, 224, 224, 1)",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Typography
                  sx={{
                    p: 1,
                    mr: 6,
                    fontWeight: 400,
                    fontSize: "0.875rem",
                    lineHeight: "2rem",
                  }}
                  variant="h7"
                  component="div"
                >
                  {row.min.label}
                </Typography>
                <Divider orientation="vertical" />
                <Typography
                  sx={{
                    p: 1,
                    fontWeight: 400,
                    fontSize: "0.875rem",
                    lineHeight: "2rem",
                  }}
                  variant="h7"
                  component="div"
                >
                  {stat[row.min.key]}
                </Typography>
              </Box>
            </Stack>

            <Stack
              key={row}
              direction="row"
              justifyContent="space-between"
              sx={{
                padding: "0 12px",
                borderBottom: "1px solid rgba(224, 224, 224, 1)",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Typography
                  sx={{
                    p: 1,
                    mr: 6,
                    fontWeight: 400,
                    fontSize: "0.875rem",
                    lineHeight: "2rem",
                  }}
                  variant="h7"
                  component="div"
                >
                  {row.max.label}
                </Typography>
                <Divider orientation="vertical" />
                <Typography
                  sx={{
                    p: 1,
                    fontWeight: 400,
                    fontSize: "0.875rem",
                    lineHeight: "2rem",
                  }}
                  variant="h7"
                  component="div"
                >
                  {stat[row.max.key]}
                </Typography>
              </Box>
            </Stack>

            <Stack
              key={row}
              direction="row"
              justifyContent="space-between"
              sx={{
                padding: "0 12px",
                borderBottom: "1px solid rgba(224, 224, 224, 1)",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Typography
                  sx={{
                    p: 1,
                    mr: row.avg.mr,
                    fontWeight: 400,
                    fontSize: "0.875rem",
                    lineHeight: "2rem",
                  }}
                  variant="h7"
                  component="div"
                >
                  {row.avg.label}
                </Typography>
                <Divider orientation="vertical" />
                <Typography
                  sx={{
                    p: 1,
                    fontWeight: 400,
                    fontSize: "0.875rem",
                    lineHeight: "2rem",
                  }}
                  variant="h7"
                  component="div"
                >
                  {stat[row.avg.key]}
                </Typography>
              </Box>
            </Stack>

            {/* {stat && Object.values(stat).length > 0 && (
              
            )} */}
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default Statistic;

const cardArray = [
  {
    label: "전압(V)",
    min: { key: "minVoltage", label: "최소값" },
    max: { key: "maxVoltage", label: "최대값" },
    avg: { key: "avrVoltage", label: "평균", mr: 7.75 },
  },
  {
    label: "온도(°C)",
    min: { key: "minTemperature", label: "최소값" },
    max: { key: "maxTemperature", label: "최대값" },
    avg: { key: "avrTemperature", label: "평균", mr: 7.75 },
  },
  {
    label: "저항(mΩ)",
    min: { key: "minResistance", label: "최소값" },
    max: { key: "maxResistance", label: "최대값" },
    avg: { key: "avrResistance", label: "평균", mr: 7.75 },
  },

  {
    label: "SOC(%)",
    min: { key: "minSoc", label: "최소값" },
    max: { key: "maxSoc", label: "최대값" },
    avg: { key: "avrSoc", label: "평균", mr: 7.75 },
  },
  {
    label: "SOH(%)",
    min: { key: "minSoh", label: "최소값" },
    max: { key: "maxSoh", label: "최대값" },
    avg: { key: "avrSoh", label: "평균", mr: 7.75 },
  },
];
