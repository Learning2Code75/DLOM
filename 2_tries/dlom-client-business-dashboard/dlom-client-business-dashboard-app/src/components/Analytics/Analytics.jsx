import React, { useContext, useState } from "react";
import { TiArrowLeftThick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../App";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "./geoData/geoData";
import { useEffect } from "react";
import { getBillings } from "../../redux/actions/billings";
import { getSubscriptions } from "../../redux/actions/subscriptions";
import { getDlomClients } from "../../redux/actions/dlomclients";
import { ResponsiveLine } from "@nivo/line";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ResponsivePie } from "@nivo/pie";

const Analytics = () => {
  const dispatch = useDispatch();
  const tc = useContext(ThemeContext);
  const subscriptions = useSelector((state) => state.subscriptions);
  const billings = useSelector((state) => state.billings);
  const dlomclients = useSelector((state) => state.dlomclients);
  const [view, setView] = useState("sales");
  const [startDate, setStartDate] = useState(new Date("2023-02-01"));
  const [endDate, setEndDate] = useState(new Date("2023-03-01"));

  const columns = [
    { field: "name", headerName: " Name", flex: 0.5 },
    { field: "description", headerName: " Description", flex: 0.5 },
    { field: "cost", headerName: " Cost", flex: 0.5 },
    { field: "totSales", headerName: " Total Sales", flex: 0.5 },
    { field: "totUnits", headerName: " Total Units", flex: 0.5 },
  ];

  const columns1 = [
    { field: "companyName", headerName: " Company", flex: 0.5 },
    { field: "state", headerName: " State", flex: 0.5 },
    { field: "subName", headerName: " Sub", flex: 0.5 },
    { field: "totSales", headerName: "Total Sales(₹)", flex: 0.5 },
    { field: "totUnits", headerName: " Total Units", flex: 0.5 },

    // { field: "CliOps", headerName: " CliOps", flex: 0.5 },
    // { field: "UserOps", headerName: " UserOps", flex: 0.5 },
    // { field: "ProdOps", headerName: " ProdOps", flex: 0.5 },
    // { field: "OrderOps", headerName: " OrderOps", flex: 0.5 },
    // { field: "TaskOps", headerName: " TaskOps", flex: 0.5 },
  ];

  const columns2 = [
    { field: "_id", headerName: " ID", flex: 0.5 },
    { field: "date", headerName: " Date", flex: 0.5 },
    { field: "client", headerName: " Client", flex: 0.5 },
    { field: "subscription", headerName: " Sub", flex: 0.5 },
    { field: "cost", headerName: " Cost", flex: 0.5 },
  ];

  const findTotalSales = (s) => {
    let ans = 0;
    for (let i = 0; i < billings.length; i++) {
      if (billings[i].subscription._id === s._id) {
        ans += parseFloat(s.cost);
      }
    }
    return ans;
  };
  const findTotalUnits = (s) => {
    let ans = 0;
    for (let i = 0; i < billings.length; i++) {
      if (billings[i].subscription._id === s) {
        ans += 1;
      }
    }
    return ans;
  };

  const processSubs = () => {
    let processedSubs = subscriptions.map((s) => {
      let totSales = findTotalSales(s);
      let totUnits = findTotalUnits(s._id);
      return {
        ...s,
        totSales,
        totUnits,
      };
    });
    return processedSubs;
  };

  const findTotSalesCli = (c) => {
    let tot = 0;
    for (let i = 0; i < billings.length; i++) {
      if (billings[i]?.dlom_client?._id === c._id) {
        tot = parseFloat(tot) + parseFloat(billings[i].subscription.cost);
      }
    }
    return tot;
  };

  const findTotUnitsCli = (c) => {
    let tot = 0;
    for (let i = 0; i < billings.length; i++) {
      if (billings[i]?.dlom_client?._id === c._id) {
        tot += 1;
      }
    }
    return tot;
  };

  const processDlomClients = () => {
    let processedDlomClients = dlomclients.map((dc) => {
      let CliOps = dc.tracking.CliOps;
      let UserOps = dc.tracking.UserOps;
      let ProdOps = dc.tracking.ProdOps;
      let OrderOps = dc.tracking.OrderOps;
      let TaskOps = dc.tracking.TaskOps;
      let subName = dc.subscription.name;
      let totSales = findTotSalesCli(dc);
      let totUnits = findTotUnitsCli(dc);

      return {
        ...dc,
        CliOps,
        UserOps,
        ProdOps,
        OrderOps,
        TaskOps,
        subName,
        totSales,
        totUnits,
      };
    });
    return processedDlomClients;
  };

  const processBillings = () => {
    let processedBillings = billings.map((b) => {
      let date = new Date(b.timestamp).toDateString();
      let client = b?.dlom_client?.companyName;
      let subscription = b?.subscription?.name;
      let cost = "₹" + b?.subscription?.cost;

      return {
        ...b,
        date,
        client,
        subscription,
        cost,
      };
    });
    return processedBillings;
  };

  const processGeoClients = () => {
    let dataMap = [];
    for (let i = 0; i < dlomclients?.length; i++) {
      let found = false;
      for (let j = 0; j < dataMap?.length; j++) {
        if (dataMap[j]?.id === dlomclients[i]?.locationPin) {
          let newvalue = parseInt(dataMap[j]?.value) + 1;
          dataMap[j].value = newvalue.toString();
          found = true;
        }
      }
      if (!found) {
        dataMap.push({
          id: dlomclients[i].locationPin,
          value: "1",
        });
      }
    }
    // console.log(dataMap);
    return dataMap;
  };

  const processSalesOverviewTotal = (year = 2023) => {
    let dataMap = [
      {
        x: "Jan",
        y: 0,
      },
      {
        x: "Feb",
        y: 0,
      },
      {
        x: "Mar",
        y: 0,
      },
      {
        x: "Apr",
        y: 0,
      },
      {
        x: "May",
        y: 0,
      },
      {
        x: "Jun",
        y: 0,
      },
      {
        x: "Jul",
        y: 0,
      },
      {
        x: "Aug",
        y: 0,
      },
      {
        x: "Sept",
        y: 0,
      },
      {
        x: "Oct",
        y: 0,
      },
      {
        x: "Nov",
        y: 0,
      },
      {
        x: "Dec",
        y: 0,
      },
    ];
    for (let i = 1; i <= 12; i++) {
      for (let j = 0; j < billings.length; j++) {
        if (new Date(billings[j].timestamp).getMonth() + 1 === i) {
          dataMap[i - 1].y =
            parseFloat(dataMap[i - 1].y) +
            parseFloat(billings[j].subscription.cost);
        }
      }
    }

    for (let i = 1; i < dataMap.length; i++) {
      dataMap[i].y = parseFloat(dataMap[i - 1].y) + parseFloat(dataMap[i].y);
    }

    let lineData = [
      {
        id: "totalSales",
        color: "#008cff",
        data: dataMap,
      },
    ];
    // console.log(lineData);
    return lineData;
  };

  const processSalesOverviewUnits = (year = 2023) => {
    let dataMap = [
      {
        x: "Jan",
        y: 0,
      },
      {
        x: "Feb",
        y: 0,
      },
      {
        x: "Mar",
        y: 0,
      },
      {
        x: "Apr",
        y: 0,
      },
      {
        x: "May",
        y: 0,
      },
      {
        x: "Jun",
        y: 0,
      },
      {
        x: "Jul",
        y: 0,
      },
      {
        x: "Aug",
        y: 0,
      },
      {
        x: "Sept",
        y: 0,
      },
      {
        x: "Oct",
        y: 0,
      },
      {
        x: "Nov",
        y: 0,
      },
      {
        x: "Dec",
        y: 0,
      },
    ];
    for (let i = 1; i <= 12; i++) {
      for (let j = 0; j < billings.length; j++) {
        if (new Date(billings[j].timestamp).getMonth() + 1 === i) {
          dataMap[i - 1].y = parseFloat(dataMap[i - 1].y) + parseFloat(1);
        }
      }
    }

    for (let i = 1; i < dataMap.length; i++) {
      dataMap[i].y = parseFloat(dataMap[i - 1].y) + parseFloat(dataMap[i].y);
    }
    let lineData = [
      {
        id: "totalUnits",
        color: "hsl(30, 70%, 50%)",
        data: dataMap,
      },
    ];
    return lineData;
  };

  const processSalesDaily = () => {
    let dataMap = [];
    for (let i = 0; i < billings.length; i++) {
      let found = false;
      for (let j = 0; j < dataMap.length; j++) {
        if (
          dataMap[j].date ===
          new Date(billings[i].timestamp).toLocaleDateString()
        ) {
          let new_sales =
            parseFloat(dataMap[j].sales) +
            parseFloat(billings[i].subscription.cost);
          dataMap[j].sales = new_sales.toString();
          dataMap[j].units = dataMap[j].units + 1;
          found = true;
        }
      }
      if (!found) {
        dataMap.push({
          date: new Date(billings[i].timestamp).toLocaleDateString(),
          sales: billings[i].subscription.cost,
          units: 1,
        });
      }
    }

    let totalSalesLine = {
      id: "totalSales",
      color: "#008cff",
      data: [],
    };
    let totalUnitsLine = {
      id: "totalUnits",
      color: "hsl(30, 70%, 50%)",
      data: [],
    };

    for (let i = 0; i < dataMap.length; i++) {
      let date = dataMap[i].date;
      let totalSales = dataMap[i].sales;
      let totalUnits = dataMap[i].units;

      const dateFormatted = new Date(date);
      if (dateFormatted >= startDate && dateFormatted <= endDate) {
        const splitDate = date.substring(date.indexOf("-") + 1);

        totalSalesLine.data = [
          ...totalSalesLine.data,
          { x: splitDate, y: totalSales },
        ];

        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          { x: splitDate, y: totalUnits },
        ];
      }
    }
    const formattedData = [totalSalesLine, totalUnitsLine];
    // console.log(formattedData);
    return formattedData;

    // console.log(dataMap);
  };

  const processSalesMonthly = (year = 2023) => {
    let dataMap = [
      {
        x: "Jan",
        y: 0,
      },
      {
        x: "Feb",
        y: 0,
      },
      {
        x: "Mar",
        y: 0,
      },
      {
        x: "Apr",
        y: 0,
      },
      {
        x: "May",
        y: 0,
      },
      {
        x: "Jun",
        y: 0,
      },
      {
        x: "Jul",
        y: 0,
      },
      {
        x: "Aug",
        y: 0,
      },
      {
        x: "Sept",
        y: 0,
      },
      {
        x: "Oct",
        y: 0,
      },
      {
        x: "Nov",
        y: 0,
      },
      {
        x: "Dec",
        y: 0,
      },
    ];
    for (let i = 1; i <= 12; i++) {
      for (let j = 0; j < billings.length; j++) {
        if (new Date(billings[j].timestamp).getMonth() + 1 === i) {
          dataMap[i - 1].y =
            parseFloat(dataMap[i - 1].y) +
            parseFloat(billings[j].subscription.cost);
        }
      }
    }

    let dataMap1 = [
      {
        x: "Jan",
        y: 0,
      },
      {
        x: "Feb",
        y: 0,
      },
      {
        x: "Mar",
        y: 0,
      },
      {
        x: "Apr",
        y: 0,
      },
      {
        x: "May",
        y: 0,
      },
      {
        x: "Jun",
        y: 0,
      },
      {
        x: "Jul",
        y: 0,
      },
      {
        x: "Aug",
        y: 0,
      },
      {
        x: "Sept",
        y: 0,
      },
      {
        x: "Oct",
        y: 0,
      },
      {
        x: "Nov",
        y: 0,
      },
      {
        x: "Dec",
        y: 0,
      },
    ];
    for (let i = 1; i <= 12; i++) {
      for (let j = 0; j < billings.length; j++) {
        if (new Date(billings[j].timestamp).getMonth() + 1 === i) {
          dataMap1[i - 1].y = parseFloat(dataMap1[i - 1].y) + parseFloat(1);
        }
      }
    }

    let totalSalesLine = {
      id: "totalSales",
      color: "#008cff",
      data: dataMap,
    };
    let totalUnitsLine = {
      id: "totalUnits",
      color: "hsl(30, 70%, 50%)",
      data: dataMap1,
    };
    const formattedData = [totalSalesLine, totalUnitsLine];
    // console.log(formattedData);
    return formattedData;
  };

  const processSalesBreakdown = (year = 2023) => {
    let dataMap = [];
    let psubs = processSubs();
    for (let i = 0; i < psubs.length; i++) {
      dataMap.push({
        id: psubs[i].name,
        label: psubs[i].name,
        value: psubs[i].totSales,
        color: `${i % 2 === 0 ? "#008cff" : "hsl(30, 70%, 50%)"}`,
      });
    }
    // console.log(psubs);
    // console.log(dataMap);
    return dataMap;
  };

  const processSalesBreakdownTotal = (year = 2023) => {
    let tot = 0;
    let psubs = processSubs();
    for (let i = 0; i < psubs.length; i++) {
      tot = parseFloat(psubs[i].totSales) + parseFloat(tot);
    }
    return tot;
  };

  const processSalesUnitsBreakdown = (year = 2023) => {
    let dataMap = [];
    let psubs = processSubs();
    for (let i = 0; i < psubs.length; i++) {
      dataMap.push({
        id: psubs[i].name,
        label: psubs[i].name,
        value: psubs[i].totUnits,
        color: `${i % 2 === 0 ? "#008cff" : "hsl(30, 70%, 50%)"}`,
      });
    }
    // console.log(psubs);
    // console.log(dataMap);
    return dataMap;
  };
  const processSalesUnitsBreakdownTotal = (year = 2023) => {
    let tot = 0;
    let psubs = processSubs();
    for (let i = 0; i < psubs.length; i++) {
      tot = parseFloat(psubs[i].totUnits) + parseFloat(tot);
    }
    return tot;
  };

  const processDlomClientTracking = (s) => {
    let dataMap = [];
    dataMap.push({
      id: "CliOps",
      label: "CliOps",
      value:
        s?.subscription?.tracking?.CliOps +
        s?.carryForward.CliOps -
        s?.tracking.CliOps,
      color: "#008cff",
    });

    dataMap.push({
      id: "UserOps",
      label: "UserOps",
      value:
        s?.subscription?.tracking?.UserOps +
        s?.carryForward.UserOps -
        s?.tracking.UserOps,
      color: "hsl(30, 70%, 50%)",
    });
    dataMap.push({
      id: "ProdOps",
      label: "ProdOps",
      value:
        s?.subscription?.tracking?.ProdOps +
        s?.carryForward.ProdOps -
        s?.tracking.ProdOps,
      color: "#008cff",
    });
    dataMap.push({
      id: "OrderOps",
      label: "OrderOps",
      value:
        s?.subscription?.tracking?.OrderOps +
        s?.carryForward.OrderOps -
        s?.tracking.OrderOps,
      color: "hsl(30, 70%, 50%)",
    });
    dataMap.push({
      id: "TaskOps",
      label: "TaskOps",
      value:
        s?.subscription?.tracking?.TaskOps +
        s?.carryForward.TaskOps -
        s?.tracking.TaskOps,
      color: "#008cff",
    });
    // console.log(dataMap);

    return dataMap;
  };

  useEffect(() => {
    dispatch(getBillings());
    dispatch(getSubscriptions());
    dispatch(getDlomClients());
  }, [dispatch]);

  return (
    <div
      style={{
        marginBottom: "5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          className="openStylesButton1"
          style={{
            marginRight: "1rem",
            borderRadius: ".64rem",
            padding: ".6rem",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: tc.theme === "light" ? "#232427" : "#ebecf0",
          }}
        >
          <TiArrowLeftThick
            style={{
              margin: "0",
              padding: "0",
            }}
          />
        </Link>
        <h2>Dashboard</h2>
      </div>

      <h2>Analytics</h2>

      <div className="css9BasicGrid1">
        <div
          style={{
            margin: ".5rem 0",
          }}
        >
          <h3>Subscriptions</h3>
          <Box
            height={"50vh"}
            sx={{
              "& .MuiDataGrid-root": {
                // border: "none",
              },
              "& .MuiSvgIcon-root": {
                backgroundColor: `${
                  tc.theme === "light" ? "#ebecf0" : "#232427"
                } !important`,
                color: `${
                  tc.theme === "light" ? "#232427" : "#ebecf0"
                } !important`,
              },
              "& .MuiTablePagination-toolbar": {
                backgroundColor: `${
                  tc.theme === "light" ? "#ebecf0" : "#232427"
                } !important`,
                color: `${
                  tc.theme === "light" ? "#232427" : "#ebecf0"
                } !important`,
              },
              "& .MuiDataGrid-cell": {
                backgroundColor: `${
                  tc.theme === "light" ? "#ebecf0" : "#232427"
                } !important`,
                color: `${
                  tc.theme === "light" ? "#232427" : "#ebecf0"
                } !important`,

                borderBottom: "1px solid lightgrey",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: `${
                  tc.theme === "light" ? "#ebecf0" : "#232427"
                } !important`,
                color: `${
                  tc.theme === "light" ? "#232427" : "#ebecf0"
                } !important`,
                borderBottom: "1px solid lightgrey",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: `${
                  tc.theme === "light" ? "#ebecf0" : "#232427"
                } !important`,
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: `${
                  tc.theme === "light" ? "#ebecf0" : "#232427"
                } !important`,
                color: `${
                  tc.theme === "light" ? "#232427" : "#ebecf0"
                } !important`,
                borderTop: "none",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${
                  tc.theme === "light" ? "#232427" : "#ebecf0"
                } !important`,
              },
            }}
          >
            <DataGrid
              loading={!subscriptions}
              getRowId={(row) => row._id}
              rows={processSubs() || []}
              columns={columns}
            />
          </Box>
        </div>

        <div
          style={{
            margin: ".5rem 0",
          }}
        >
          <h3>Dlom Clients</h3>
          <Box
            height={"50vh"}
            sx={{
              "& .MuiDataGrid-root": {
                // border: "none",
              },
              "& .MuiSvgIcon-root": {
                backgroundColor: `${
                  tc.theme === "light" ? "#ebecf0" : "#232427"
                } !important`,
                color: `${
                  tc.theme === "light" ? "#232427" : "#ebecf0"
                } !important`,
              },
              "& .MuiTablePagination-toolbar": {
                backgroundColor: `${
                  tc.theme === "light" ? "#ebecf0" : "#232427"
                } !important`,
                color: `${
                  tc.theme === "light" ? "#232427" : "#ebecf0"
                } !important`,
              },
              "& .MuiDataGrid-cell": {
                backgroundColor: `${
                  tc.theme === "light" ? "#ebecf0" : "#232427"
                } !important`,
                color: `${
                  tc.theme === "light" ? "#232427" : "#ebecf0"
                } !important`,

                borderBottom: "1px solid lightgrey",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: `${
                  tc.theme === "light" ? "#ebecf0" : "#232427"
                } !important`,
                color: `${
                  tc.theme === "light" ? "#232427" : "#ebecf0"
                } !important`,
                borderBottom: "1px solid lightgrey",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: `${
                  tc.theme === "light" ? "#ebecf0" : "#232427"
                } !important`,
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: `${
                  tc.theme === "light" ? "#ebecf0" : "#232427"
                } !important`,
                color: `${
                  tc.theme === "light" ? "#232427" : "#ebecf0"
                } !important`,
                borderTop: "none",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${
                  tc.theme === "light" ? "#232427" : "#ebecf0"
                } !important`,
              },
            }}
          >
            <DataGrid
              loading={!dlomclients}
              getRowId={(row) => row._id}
              rows={processDlomClients() || []}
              columns={columns1}
            />
          </Box>
        </div>

        <div
          style={{
            margin: ".5rem 0",
          }}
        >
          <h3>Transactions</h3>
          <Box
            height={"50vh"}
            sx={{
              "& .MuiDataGrid-root": {
                // border: "none",
              },
              "& .MuiSvgIcon-root": {
                backgroundColor: `${
                  tc.theme === "light" ? "#ebecf0" : "#232427"
                } !important`,
                color: `${
                  tc.theme === "light" ? "#232427" : "#ebecf0"
                } !important`,
              },
              "& .MuiTablePagination-toolbar": {
                backgroundColor: `${
                  tc.theme === "light" ? "#ebecf0" : "#232427"
                } !important`,
                color: `${
                  tc.theme === "light" ? "#232427" : "#ebecf0"
                } !important`,
              },
              "& .MuiDataGrid-cell": {
                backgroundColor: `${
                  tc.theme === "light" ? "#ebecf0" : "#232427"
                } !important`,
                color: `${
                  tc.theme === "light" ? "#232427" : "#ebecf0"
                } !important`,

                borderBottom: "1px solid lightgrey",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: `${
                  tc.theme === "light" ? "#ebecf0" : "#232427"
                } !important`,
                color: `${
                  tc.theme === "light" ? "#232427" : "#ebecf0"
                } !important`,
                borderBottom: "1px solid lightgrey",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: `${
                  tc.theme === "light" ? "#ebecf0" : "#232427"
                } !important`,
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: `${
                  tc.theme === "light" ? "#ebecf0" : "#232427"
                } !important`,
                color: `${
                  tc.theme === "light" ? "#232427" : "#ebecf0"
                } !important`,
                borderTop: "none",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${
                  tc.theme === "light" ? "#232427" : "#ebecf0"
                } !important`,
              },
            }}
          >
            <DataGrid
              loading={!billings}
              getRowId={(row) => row._id}
              rows={processBillings() || []}
              columns={columns2}
            />
          </Box>
        </div>

        <div
          style={{
            margin: ".5rem 0",
          }}
        >
          <h3>Geography Clients</h3>
          {/* {JSON.stringify(processGeoClients(), null, 2)} */}
          <Box height="75vh" border={`1px solid lightgrey`} borderRadius="4px">
            {dlomclients && (
              <ResponsiveChoropleth
                theme={{
                  axis: {
                    domain: {
                      line: {
                        stroke: "#808080",
                      },
                    },
                    legend: {
                      text: {
                        fill: "#808080",
                      },
                    },
                    ticks: {
                      line: {
                        stroke: "#808080",
                        strokeWidth: 1,
                      },
                      text: {
                        fill: "#808080",
                      },
                    },
                  },
                  legends: {
                    text: {
                      fill: "#808080",
                    },
                  },
                  tooltip: {
                    container: {
                      color: "#808080",
                    },
                  },
                }}
                data={processGeoClients()}
                features={geoData.features}
                margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
                domain={[0, 60]}
                colors="nivo"
                unknownColor="#706868"
                label="properties.name"
                valueFormat=".2s"
                projectionScale={150}
                projectionTranslation={[0.45, 0.6]}
                projectionRotation={[0, 0, 0]}
                borderWidth={1.3}
                borderColor="#ffffff"
                graticuleLineColor="#dddddd"
                legends={[
                  {
                    anchor: "bottom-right",
                    direction: "column",
                    justify: true,
                    translateX: 0,
                    translateY: -125,
                    itemsSpacing: 0,
                    itemWidth: 94,
                    itemHeight: 18,
                    itemDirection: "left-to-right",
                    itemTextColor: `black`,
                    itemOpacity: 0.85,
                    symbolSize: 18,
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemTextColor: `black`,
                          itemOpacity: 0,
                        },
                      },
                    ],
                  },
                ]}
              />
            )}
          </Box>
        </div>

        <div
          style={{
            margin: ".5rem 0",
          }}
        >
          <h3>Sales - overview</h3>
          <div className="dialogOpenContainer">
            <select
              value={view}
              onChange={(e) => {
                setView(e.target.value);
              }}
              className="btn1"
            >
              <option value={"sales"}>Sales</option>
              <option value={"units"}>Units</option>
            </select>
          </div>
          <Box height="50vh">
            <ResponsiveLine
              data={
                view === "sales"
                  ? processSalesOverviewTotal()
                  : processSalesOverviewUnits()
              }
              theme={{
                axis: {
                  domain: {
                    line: {
                      stroke: "#808080",
                    },
                  },
                  legend: {
                    text: {
                      fill: "#808080",
                    },
                  },
                  ticks: {
                    line: {
                      stroke: "#808080",
                      strokeWidth: 1,
                    },
                    text: {
                      fill: "#808080",
                    },
                  },
                },
                legends: {
                  text: {
                    fill: "#808080",
                  },
                },
                tooltip: {
                  container: {
                    color: "#808080",
                  },
                },
              }}
              margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
              xScale={{ type: "point" }}
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: false,
                reverse: false,
              }}
              yFormat=" >-.2f"
              enableArea={true}
              curve="catmullRom"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Month",
                legendOffset: 36,
                legendPosition: "middle",
              }}
              axisLeft={{
                orient: "left",
                tickValues: 5,
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: `Total ${view === "sales" ? "Revenue" : "Units"}`,
                legendOffset: -60,
                legendPosition: "middle",
              }}
              enableGridX={false}
              pointSize={10}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              pointLabelYOffset={-12}
              useMesh={true}
              legends={[
                {
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 30,
                  translateY: -40,
                  itemsSpacing: 0,
                  itemDirection: "left-to-right",
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: "circle",
                  symbolBorderColor: "rgba(0, 0, 0, .5)",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemBackground: "rgba(0, 0, 0, .03)",
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
            />
          </Box>

          {/* {JSON.stringify(processSalesOverviewUnits(), null, 2)} */}
        </div>
        <div
          style={{
            margin: ".5rem 0",
          }}
        >
          <h3>Sales - daily</h3>
          <Box height="75vh">
            <Box display="flex" justifyContent="flex-end">
              <Box>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                />
              </Box>
              <Box>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                />
              </Box>
            </Box>
            {/* {JSON.stringify(processSalesDaily(), null, 2)} */}
            {billings ? (
              <ResponsiveLine
                data={processSalesDaily()}
                theme={{
                  axis: {
                    domain: {
                      line: {
                        stroke: "#808080",
                      },
                    },
                    legend: {
                      text: {
                        fill: "#808080",
                      },
                    },
                    ticks: {
                      line: {
                        stroke: "#808080",
                        strokeWidth: 1,
                      },
                      text: {
                        fill: "#808080",
                      },
                    },
                  },
                  legends: {
                    text: {
                      fill: "#808080",
                    },
                  },
                  tooltip: {
                    container: {
                      color: "#808080",
                    },
                  },
                }}
                color={{ datum: "color" }}
                margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{
                  type: "linear",
                  min: "auto",
                  max: "auto",
                  stacked: false,
                  reverse: false,
                }}
                yFormat=" >-.2f"
                curve="catmullRom"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  orient: "bottom",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 90,
                  legend: "Day",
                  legendOffset: 36,
                  legendPosition: "middle",
                }}
                axisLeft={{
                  orient: "left",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "total",
                  legendOffset: -50,
                  legendPosition: "middle",
                }}
                enableGridX={false}
                pointSize={10}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                  {
                    anchor: "top-right",
                    direction: "column",
                    justify: false,
                    translateX: 50,
                    translateY: -50,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: "circle",
                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemBackground: "rgba(0, 0, 0, .03)",
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]}
              />
            ) : (
              <>Loading...</>
            )}
          </Box>
        </div>

        <div
          style={{
            margin: ".5rem 0",
          }}
        >
          <h3>Sales - monthly</h3>
          <Box height="75vh">
            {billings ? (
              <ResponsiveLine
                data={processSalesMonthly()}
                theme={{
                  axis: {
                    domain: {
                      line: {
                        stroke: "#808080",
                      },
                    },
                    legend: {
                      text: {
                        fill: "#808080",
                      },
                    },
                    ticks: {
                      line: {
                        stroke: "#808080",
                        strokeWidth: 1,
                      },
                      text: {
                        fill: "#808080",
                      },
                    },
                  },
                  legends: {
                    text: {
                      fill: "#808080",
                    },
                  },
                  tooltip: {
                    container: {
                      color: "#808080",
                    },
                  },
                }}
                color={{ datum: "color" }}
                margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{
                  type: "linear",
                  min: "auto",
                  max: "auto",
                  stacked: false,
                  reverse: false,
                }}
                yFormat=" >-.2f"
                // curve="catmullRom"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  orient: "bottom",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 90,
                  legend: "Month",
                  legendOffset: 36,
                  legendPosition: "middle",
                }}
                axisLeft={{
                  orient: "left",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "total",
                  legendOffset: -50,
                  legendPosition: "middle",
                }}
                enableGridX={false}
                pointSize={10}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                  {
                    anchor: "top-right",
                    direction: "column",
                    justify: false,
                    translateX: 50,
                    translateY: -50,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: "circle",
                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemBackground: "rgba(0, 0, 0, .03)",
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]}
              />
            ) : (
              <>Loading...</>
            )}
          </Box>
          {/* {JSON.stringify(processSalesMonthly(),null,2)} */}
        </div>
        <div
          style={{
            margin: ".5rem 0",
          }}
        >
          <h3>Sales - breakdown</h3>
          <Box height="75vh">
            <Box height={"100%"} position="relative">
              <ResponsivePie
                data={processSalesBreakdown()}
                theme={{
                  axis: {
                    domain: {
                      line: {
                        stroke: "#808080",
                      },
                    },
                    legend: {
                      text: {
                        fill: "#808080",
                      },
                    },
                    ticks: {
                      line: {
                        stroke: "#808080",
                        strokeWidth: 1,
                      },
                      text: {
                        fill: "#808080",
                      },
                    },
                  },
                  legends: {
                    text: {
                      fill: "#808080",
                    },
                  },
                  tooltip: {
                    container: {
                      color: "#808080",
                    },
                  },
                }}
                colors={{ datum: "data.color" }}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                sortByValue={true}
                innerRadius={0.45}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{
                  from: "color",
                  modifiers: [["darker", 0.2]],
                }}
                enableArcLinkLabels={true}
                arcLinkLabelsTextColor={"#808080"}
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: "color" }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                  from: "color",
                  modifiers: [["darker", 2]],
                }}
                legends={[
                  {
                    anchor: "bottom",
                    direction: "row",
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: "#999",
                    itemDirection: "left-to-right",
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: "circle",
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemTextColor: "#808080",
                        },
                      },
                    ],
                  },
                ]}
              />
              <Box
                position="absolute"
                top="50%"
                left="50%"
                color={"#808080"}
                textAlign="center"
                pointerEvents="none"
                sx={{
                  transform: "translate(-50%,-100%)",
                }}
              >
                <Typography variant="h6">
                  {"Total:"} ₹{processSalesBreakdownTotal()}
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* {JSON.stringify(processSalesBreakdown(), null, 2)} */}
        </div>
        <div
          style={{
            margin: ".5rem 0",
          }}
        >
          <h3>Sales units - breakdown</h3>
          <Box height="75vh">
            <Box height={"100%"} position="relative">
              <ResponsivePie
                data={processSalesUnitsBreakdown()}
                theme={{
                  axis: {
                    domain: {
                      line: {
                        stroke: "#808080",
                      },
                    },
                    legend: {
                      text: {
                        fill: "#808080",
                      },
                    },
                    ticks: {
                      line: {
                        stroke: "#808080",
                        strokeWidth: 1,
                      },
                      text: {
                        fill: "#808080",
                      },
                    },
                  },
                  legends: {
                    text: {
                      fill: "#808080",
                    },
                  },
                  tooltip: {
                    container: {
                      color: "#808080",
                    },
                  },
                }}
                colors={{ datum: "data.color" }}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                sortByValue={true}
                innerRadius={0.45}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{
                  from: "color",
                  modifiers: [["darker", 0.2]],
                }}
                enableArcLinkLabels={true}
                arcLinkLabelsTextColor={"#808080"}
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: "color" }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                  from: "color",
                  modifiers: [["darker", 2]],
                }}
                legends={[
                  {
                    anchor: "bottom",
                    direction: "row",
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: "#999",
                    itemDirection: "left-to-right",
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: "circle",
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemTextColor: "#808080",
                        },
                      },
                    ],
                  },
                ]}
              />
              <Box
                position="absolute"
                top="50%"
                left="50%"
                color={"#808080"}
                textAlign="center"
                pointerEvents="none"
                sx={{
                  transform: "translate(-50%,-100%)",
                }}
              >
                <Typography variant="h6">
                  {"Total:"} {processSalesUnitsBreakdownTotal()}
                </Typography>
              </Box>
            </Box>
          </Box>
        </div>

        <div
          style={{
            margin: ".5rem 0",
          }}
        >
          <h3>Operations left tracking - breakdown</h3>
          {dlomclients.map((dc) => {
            return (
              <Box
                height="35vh"
                style={{
                  margin: "2em 0",
                }}
              >
                <div className="tag">{dc.companyName}</div>
                <Box className="info" height={"100%"} position="relative">
                  <ResponsivePie
                    data={processDlomClientTracking(dc)}
                    theme={{
                      axis: {
                        domain: {
                          line: {
                            stroke: "#808080",
                          },
                        },
                        legend: {
                          text: {
                            fill: "#808080",
                          },
                        },
                        ticks: {
                          line: {
                            stroke: "#808080",
                            strokeWidth: 1,
                          },
                          text: {
                            fill: "#808080",
                          },
                        },
                      },
                      legends: {
                        text: {
                          fill: "#808080",
                        },
                      },
                      tooltip: {
                        container: {
                          color: "#808080",
                        },
                      },
                    }}
                    colors={{ datum: "data.color" }}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    sortByValue={true}
                    innerRadius={0.45}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    borderColor={{
                      from: "color",
                      modifiers: [["darker", 0.2]],
                    }}
                    enableArcLinkLabels={true}
                    arcLinkLabelsTextColor={"#808080"}
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: "color" }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{
                      from: "color",
                      modifiers: [["darker", 2]],
                    }}
                    legends={[
                      {
                        anchor: "bottom",
                        direction: "row",
                        justify: false,
                        translateX: 0,
                        translateY: 56,
                        itemsSpacing: 0,
                        itemWidth: 100,
                        itemHeight: 18,
                        itemTextColor: "#999",
                        itemDirection: "left-to-right",
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: "circle",
                        effects: [
                          {
                            on: "hover",
                            style: {
                              itemTextColor: "#808080",
                            },
                          },
                        ],
                      },
                    ]}
                  />
                </Box>
              </Box>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
