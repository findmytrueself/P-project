import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Chip,
  // Skeleton,
} from "@mui/material";
import React, { useState } from "react";
import { useBatteryContext } from "../../context/BatteryContext";
import BatteryInsideModal from "../BatteryInsideModal";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const DashboardPanel = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  const { batteryStatus } = useBatteryContext();
  const [open, setOpen] = useState(false);
  const [batteryMeasure, setBatteryMeasure] = useState({});

  const handleClickInsideModal = (batteryNumber) => {
    setOpen(true);
    setBatteryMeasure(batteryStatus.batteryMeasures[batteryNumber]);
  };

  return (
    <Box sx={{ p: "16px" }}>
      {open ? (
        <BatteryInsideModal
          open={open}
          setOpen={setOpen}
          batteryMeasure={batteryMeasure}
        />
      ) : null}

      <Card
        sx={{
          p: 0,
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
              총 알람상태
            </Typography>
          </Box>
          {batteryStatus &&
            batteryStatus?.batteryMeasures &&
            Object.values(batteryStatus?.alarmSummaries).length > 0 &&
            Object.values(batteryStatus?.alarmSummaries).map((alarm) => (
              <Stack
                key={alarm.batteryNumber}
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
                    {`배터리${alarm.batteryNumber}`}
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
                    {alarm.alarmCount}
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  sx={{
                    minWidth: isMobile ? "100px" : "150px",
                    maxHeight: "40px",
                    marginTop: "4px",
                  }}
                  onClick={() => handleClickInsideModal(alarm.batteryNumber)}
                >
                  내부보기
                </Button>
              </Stack>
            ))}
        </CardContent>
      </Card>

      <TableContainer
        sx={{
          mt: 4,
          border: "1px solid rgba(224, 224, 224, 1)",
          boxShadow: "none",
        }}
        component={Paper}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={columns.length} align="left">
                배터리 상태
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="left"
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {batteryStatus &&
              batteryStatus.batteryMeasures &&
              Object.values(batteryStatus.batteryMeasures).length > 0 &&
              Object.values(batteryStatus.batteryMeasures).map((battery) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={battery.batteryNumber}
                >
                  {columns.map((column) => (
                    <TableCell key={column.id} align="left">
                      {column.id === "communicationStatus" ? (
                        <Chip
                          label={battery[column.id] ? "연결됨" : "연결끊김"}
                          color={battery[column.id] ? "success" : "error"}
                        />
                      ) : (
                        battery[column.id]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DashboardPanel;

const columns = [
  { id: "batteryNumber", label: "배터리", minWidth: 80 },
  { id: "communicationStatus", label: "연결상태", minWidth: 120 },
  { id: "voltage", label: "전압(V)", minWidth: 100 },
  { id: "temperature", label: "온도(°C)", minWidth: 100 },
  { id: "resistance", label: "저항(mΩ)", minWidth: 100 },
  { id: "soc", label: "SOC(%)", minWidth: 100 },
  { id: "soh", label: "SOH(%)", minWidth: 100 },
];
