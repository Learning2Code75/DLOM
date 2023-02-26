import { useQuery } from "@apollo/client";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ResponsiveChoropleth } from "@nivo/geo";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import React, { useContext, useEffect, useState } from "react";
import { TiArrowLeftThick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../App";
import { GET_CLIENTS } from "../../queries/dlomClientQueries";
import { GET_ORDERS } from "../../queries/dlomOrderQueries";
import { getOrderlogs } from "../../redux/actions/orderlogs";
import { getProducts } from "../../redux/actions/products";
import { getUsers } from "../../redux/actions/users";
import { geoData } from "../geoData/geoData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Analytics = () => {
  const dispatch = useDispatch();
  const tc = useContext(ThemeContext);
  const products = useSelector((state) => state.products);
  const users = useSelector((state) => state.users);
  const orderlogs = useSelector((state) => state.orderlogs);
  const [view, setView] = useState("sales");
  const [startDate, setStartDate] = useState(new Date("2022-12-31"));
  const [endDate, setEndDate] = useState(new Date("2023-03-01"));

  const {
    loading: loadingClients,
    error: errorClients,
    data: clients,
  } = useQuery(GET_CLIENTS);
  const {
    loading: loadingOrders,
    error: errorOrders,
    data: orders,
  } = useQuery(GET_ORDERS);

  const columns = [
    { field: "prodName", headerName: " Name", flex: 0.5 },
    { field: "prodSKU", headerName: " SKU", flex: 0.5 },
    { field: "damaged", headerName: " Damaged", flex: 0.5 },
    { field: "productUnitRate", headerName: " Rate(₹)", flex: 0.5 },
    { field: "totSales", headerName: " Total Sales(₹)", flex: 0.5 },
    { field: "totUnits", headerName: " Total Units", flex: 0.5 },
  ];

  const columns1 = [
    { field: "companyName", headerName: " Company", flex: 0.5 },
    { field: "contactPersonName", headerName: " Contact Person", flex: 0.5 },
    { field: "totSales", headerName: "Total Sales(₹)", flex: 0.5 },
    { field: "totUnits", headerName: " Total Units", flex: 0.5 },

    // { field: "CliOps", headerName: " CliOps", flex: 0.5 },
    // { field: "UserOps", headerName: " UserOps", flex: 0.5 },
    // { field: "ProdOps", headerName: " ProdOps", flex: 0.5 },
    // { field: "OrderOps", headerName: " OrderOps", flex: 0.5 },
    // { field: "TaskOps", headerName: " TaskOps", flex: 0.5 },
  ];

  const columns2 = [
    { field: "invNo", headerName: " Invoice #", flex: 0.5 },
    { field: "datesort", headerName: "#", flex: 0.1 },
    { field: "date", headerName: " Date", flex: 0.5 },
    { field: "time", headerName: " Time", flex: 0.5 },
    { field: "client", headerName: " Client", flex: 0.5 },
    { field: "cancel", headerName: " Cancel", flex: 0.3 },
    { field: "totAmt", headerName: " Total Sale(₹)", flex: 0.5 },
    { field: "totQty", headerName: " Total Qty", flex: 0.5 },
  ];

  const columns3 = [
    { field: "name", headerName: " Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "userRole", headerName: " Role", flex: 0.5 },
  ];
  const columns4 = [
    { field: "name", headerName: " Name", flex: 0.5 },
    { field: "userRole", headerName: " Role", flex: 0.5 },
    { field: "indivSales", headerName: "Total Sales(₹)", flex: 0.5 },
    { field: "indivUnits", headerName: "Total Units", flex: 0.5 },
  ];

  //   console.log(products, users, clients.clients, orders.orders);
  const findTotSalesProd = (p) => {
    let tot = 0;
    for (let i = 0; i < orders?.orders?.length; i++) {
      for (let j = 0; j < orders?.orders[i]?.invoice?.invTable?.length; j++) {
        if (
          orders?.orders[i]?.invoice?.invTable[j]?.descriptionOfGoods ===
          p.prodSKU
        ) {
          tot =
            parseFloat(tot) +
            parseFloat(orders?.orders[i]?.invoice?.invTable[j]?.amount);
        }
      }
    }
    return tot;
  };

  const findTotUnitsProd = (p) => {
    let tot = 0;
    for (let i = 0; i < orders?.orders?.length; i++) {
      for (let j = 0; j < orders?.orders[i]?.invoice?.invTable?.length; j++) {
        if (
          orders?.orders[i]?.invoice?.invTable[j]?.descriptionOfGoods ===
          p.prodSKU
        ) {
          tot =
            parseFloat(tot) +
            parseFloat(orders?.orders[i]?.invoice?.invTable[j]?.qty);
        }
      }
    }
    return tot;
  };

  const processProducts = () => {
    let processedProducts = products.map((p) => {
      let totSales = findTotSalesProd(p);
      let totUnits = findTotUnitsProd(p);
      delete p.prodImgUrl;
      return {
        ...p,
        totSales,
        totUnits,
      };
    });
    return processedProducts;
  };

  const findTotSalesCli = (c) => {
    let tot = 0;
    for (let i = 0; i < orders?.orders?.length; i++) {
      if (orders?.orders[i]?.client.id === c.id) {
        if (orders?.orders[i]?.invoice?.totalAmount) {
          tot =
            parseFloat(tot) +
            parseFloat(orders?.orders[i]?.invoice?.totalAmount);
        }
      }
    }

    return tot;
  };

  const findTotUnitsCli = (c) => {
    let tot = 0;
    for (let i = 0; i < orders?.orders?.length; i++) {
      if (orders?.orders[i]?.client.id === c.id) {
        tot =
          parseFloat(tot) + parseFloat(orders?.orders[i]?.invoice?.totalQty);
      }
    }

    return tot;
  };

  const processClients = () => {
    let processedClients = clients?.clients?.map((c) => {
      let totSales = findTotSalesCli(c);
      let totUnits = findTotUnitsCli(c);
      return {
        ...c,
        totSales,
        totUnits,
      };
    });
    return processedClients;
  };

  const findOrdLogDate = (invNo) => {
    let d = "";
    for (let i = 0; i < orderlogs.length; i++) {
      if (
        orderlogs[i].order.invoice.invoiceNo === invNo &&
        orderlogs[i].operation === "invoice"
      ) {
        d = orderlogs[i].createdAt;
        break;
      }
    }
    return new Date(d);
  };

  const processOrders = () => {
    let processedOrders = orders?.orders?.map((o) => {
      let ordlogDate = findOrdLogDate(o.invoice.invoiceNo);

      let date = ordlogDate.toDateString();
      let time = ordlogDate.toTimeString();
      let datesort = ordlogDate.getTime();
      //   console.log(datesort);
      let invNo = o.invoice.invoiceNo;
      let client = o.client.companyName;
      let totAmt = o.invoice.totalAmount;
      let totQty = o.invoice.totalQty;
      let cancel = o.orderCancel.state ? "cancelled" : "";
      return {
        ...o,
        date,
        time,
        invNo,
        client,
        totAmt,
        totQty,
        datesort,
        cancel,
        ordlogDate,
      };
    });
    return processedOrders;
  };

  const findCountryCode = (csm) => {
    let code = "";
    for (let i = 0; i < csm.length; i++) {
      if (csm[i].title === "country") {
        code = csm[i].link;
        break;
      }
    }
    return code;
  };

  const processClientGeography = () => {
    let dataMap = [];
    for (let i = 0; i < clients.clients?.length; i++) {
      let found = false;
      for (let j = 0; j < dataMap?.length; j++) {
        if (
          dataMap[j]?.id ===
          findCountryCode(clients.clients[i].clientSocialMedia)
        ) {
          let newvalue = parseInt(dataMap[j]?.value) + 1;
          dataMap[j].value = newvalue.toString();
          found = true;
        }
      }
      if (!found) {
        dataMap.push({
          id: findCountryCode(clients.clients[i].clientSocialMedia),
          value: "1",
        });
      }
    }
    // console.log(dataMap);
    return dataMap;
  };

  const processSalesOverview = () => {
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

    let processedOrders = processOrders();
    for (let i = 1; i <= 12; i++) {
      for (let j = 0; j < processedOrders?.length; j++) {
        if (
          processedOrders[j]?.ordlogDate &&
          processedOrders[j]?.invoice?.totalAmount
        ) {
          if (processedOrders[j]?.ordlogDate?.getMonth() + 1 === i) {
            dataMap[i - 1].y =
              parseFloat(dataMap[i - 1].y) +
              parseFloat(processedOrders[j].invoice.totalAmount);
          }
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
  const processUnitsOverview = () => {
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

    let processedOrders = processOrders();
    for (let i = 1; i <= 12; i++) {
      for (let j = 0; j < processedOrders?.length; j++) {
        if (processedOrders[j]?.ordlogDate) {
          if (processedOrders[j]?.ordlogDate?.getMonth() + 1 === i) {
            dataMap[i - 1].y =
              parseFloat(dataMap[i - 1].y) +
              parseFloat(processedOrders[j].invoice.totalQty);
          }
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
    // console.log(lineData);
    return lineData;
  };

  const processSalesMonthly = () => {
    let processedOrders = processOrders();

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
      for (let j = 0; j < processedOrders?.length; j++) {
        if (
          processedOrders[j]?.ordlogDate &&
          processedOrders[j]?.invoice?.totalAmount
        ) {
          if (processedOrders[j]?.ordlogDate?.getMonth() + 1 === i) {
            dataMap[i - 1].y =
              parseFloat(dataMap[i - 1].y) +
              parseFloat(processedOrders[j].invoice.totalAmount);
          }
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
      for (let j = 0; j < processedOrders?.length; j++) {
        if (
          processedOrders[j]?.ordlogDate &&
          processedOrders[j]?.invoice?.totalAmount
        ) {
          if (processedOrders[j]?.ordlogDate?.getMonth() + 1 === i) {
            dataMap1[i - 1].y =
              parseFloat(dataMap1[i - 1].y) +
              parseFloat(processedOrders[j].invoice.totalQty);
          }
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

  const damagedExistsIn = (dm, pp) => {
    let res = -1;
    for (let i = 0; i < dm.length; i++) {
      //   console.log(dm[i].id === `${pp.prodSKU} damaged`);
      //   console.log(dm[i].id, `${pp.prodSKU} damaged`);
      if (dm[i].id === `${pp.prodSKU} damaged`) {
        res = i;
        break;
      }
    }
    return res;
  };

  const processSalesBreakdown = () => {
    let dataMap = [];
    let pprods = processProducts();
    for (let i = 0; i < pprods.length; i++) {
      if (pprods[i].damaged === "normal") {
        dataMap.push({
          id: pprods[i].prodSKU,
          label: pprods[i].prodSKU,
          value: pprods[i].totSales,
          color: `${i % 2 === 0 ? "#008cff" : "hsl(30, 70%, 50%)"}`,
        });
      } else if (pprods[i].damaged === "damaged") {
        let res = damagedExistsIn(dataMap, pprods[i]);
        console.log(res);
        if (res >= 0) {
          dataMap[res].value += pprods[i].totSales;
        } else {
          dataMap.push({
            id: pprods[i].prodSKU + " damaged",
            label: pprods[i].prodSKU + " damaged",
            value: pprods[i].totSales,
            color: `${i % 2 === 0 ? "#008cff" : "hsl(30, 70%, 50%)"}`,
          });
        }
      }
    }
    // console.log(psubs);
    // console.log(dataMap);
    return dataMap;
  };

  const processSalesBreakdownTotal = () => {
    let tot = 0;
    let pprods = processProducts();
    for (let i = 0; i < pprods.length; i++) {
      tot = parseFloat(pprods[i].totSales) + parseFloat(tot);
    }
    return tot;
  };

  const processSalesUnitsBreakdown = () => {
    let dataMap = [];
    let pprods = processProducts();
    for (let i = 0; i < pprods.length; i++) {
      if (pprods[i].damaged === "normal") {
        dataMap.push({
          id: pprods[i].prodSKU,
          label: pprods[i].prodSKU,
          value: pprods[i].totUnits,
          color: `${i % 2 === 0 ? "#008cff" : "hsl(30, 70%, 50%)"}`,
        });
      } else if (pprods[i].damaged === "damaged") {
        let res = damagedExistsIn(dataMap, pprods[i]);
        if (res >= 0) {
          dataMap[res].value += pprods[i].totUnits;
        } else {
          dataMap.push({
            id: pprods[i].prodSKU + " damaged",
            label: pprods[i].prodSKU + " damaged",
            value: pprods[i].totUnits,
            color: `${i % 2 === 0 ? "#008cff" : "hsl(30, 70%, 50%)"}`,
          });
        }
      }
    }

    // console.log(psubs);
    // console.log(dataMap);
    return dataMap;
  };
  const processSalesBreakdownTotalUnits = () => {
    let tot = 0;
    let pprods = processProducts();
    for (let i = 0; i < pprods.length; i++) {
      tot = parseFloat(pprods[i].totUnits) + parseFloat(tot);
    }
    return tot;
  };

  const processSalesDaily = () => {
    let dataMap = [];
    let processedOrders = processOrders();
    let sortedOrders = processedOrders.sort((a, b) => {
      return a.datesort - b.datesort;
    });

    for (let i = 0; i < sortedOrders.length; i++) {
      //   console.log(sortedOrders[i].invoice.totalAmount !== "" && true);

      let found = false;

      if (
        sortedOrders[i].invoice.totalAmount !== "" &&
        sortedOrders[i].invoice.totalQty !== ""
      ) {
        for (let j = 0; j < dataMap.length; j++) {
          if (
            dataMap[j].date === sortedOrders[i].ordlogDate.toLocaleDateString()
          ) {
            let new_sales =
              parseFloat(dataMap[j].sales) +
              parseFloat(sortedOrders[i].invoice.totalAmount);
            dataMap[j].sales = new_sales.toString();
            dataMap[j].units =
              dataMap[j].units + sortedOrders[i].invoice.totalQty;
            found = true;
          }
        }
        if (!found) {
          dataMap.push({
            date: sortedOrders[i].ordlogDate.toLocaleDateString(),
            sales: sortedOrders[i].invoice.totalAmount,
            units: sortedOrders[i].invoice.totalQty,
          });
        }
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
  };

  const processUserPerformance = () => {
    let pords = processOrders();
    let pusers = [];
    for (let i = 0; i < users.length; i++) {
      let indivSales = 0;
      let indivUnits = 0;
      for (let j = 0; j < pords.length; j++) {
        if (pords[j].salesperson === users[i]._id) {
          if (
            pords[j].invoice.totalAmount !== "" &&
            pords[j].invoice.totalQty !== ""
          ) {
            indivSales =
              parseFloat(indivSales) + parseFloat(pords[j].invoice.totalAmount);
            indivUnits =
              parseFloat(indivUnits) + parseFloat(pords[j].invoice.totalQty);
          }
        }
      }
      pusers.push({
        ...users[i],
        indivSales,
        indivUnits,
      });
    }
    console.log(pusers);
    return pusers;
  };

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getUsers());
    dispatch(getOrderlogs());
  }, [dispatch]);
  return (
    <>
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
          <h3>Products</h3>

          {/* {JSON.stringify(processProducts(), null, 2)} */}

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
              loading={loadingOrders}
              getRowId={(row) => row._id}
              rows={processProducts() || []}
              columns={columns}
            />
          </Box>
        </div>
        <div
          style={{
            margin: ".5rem 0",
          }}
        >
          <h3>Clients</h3>
          {/* {JSON.stringify(processClients(), null, 2)} */}
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
              loading={loadingClients}
              getRowId={(row) => row.id}
              rows={processClients() || []}
              columns={columns1}
            />
          </Box>
        </div>
        <div
          style={{
            margin: ".5rem 0",
          }}
        >
          <h3>Orders</h3>
          {/* {JSON.stringify(processOrders(),null,2)} */}
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
              loading={loadingOrders}
              getRowId={(row) => row.id}
              rows={processOrders() || []}
              columns={columns2}
            />
          </Box>
        </div>
        <div
          style={{
            margin: ".5rem 0",
          }}
        >
          <h3>Client Geography</h3>
          {/* {JSON.stringify(processClientGeography(), null, 2)} */}
          <Box height="75vh" border={`1px solid lightgrey`} borderRadius="4px">
            {clients?.clients && (
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
                data={processClientGeography()}
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
          {/* {JSON.stringify(processSalesOverview(), null, 2)} */}
          {/* {JSON.stringify(processUnitsOverview(), null, 2)} */}
          <Box height="50vh">
            {orders?.orders && (
              <ResponsiveLine
                data={
                  view === "sales"
                    ? processSalesOverview()
                    : processUnitsOverview()
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
            )}
          </Box>
        </div>

        <div
          style={{
            margin: ".5rem 0",
          }}
        >
          <h3>Sales - daily</h3>
          {/* {JSON.stringify(processSalesDaily(),null,2)} */}
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
            {orders?.orders ? (
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
          {/* {JSON.stringify(processSalesMonthly(), null, 2)} */}
          <Box height="75vh">
            {orders?.orders ? (
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
        </div>

        <div
          style={{
            margin: ".5rem 0",
          }}
        >
          <h3>Sales - breakdown</h3>
          {/* {JSON.stringify(processSalesBreakdown(), null, 2)} */}
          <Box height="75vh">
            {products && (
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
            )}
          </Box>
        </div>

        <div
          style={{
            margin: ".5rem 0",
          }}
        >
          <h3>Sales units - breakdown</h3>
          {/* {JSON.stringify(processSalesUnitsBreakdown(), null, 2)} */}
          <Box height="75vh">
            {products && (
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
                    {"Total:"} {processSalesBreakdownTotalUnits()}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </div>

        <div
          style={{
            margin: ".5rem 0",
          }}
        >
          <h3>Admin table - all users</h3>
          {users && (
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
                loading={loadingOrders}
                getRowId={(row) => row._id}
                rows={users || []}
                columns={columns3}
              />
            </Box>
          )}
        </div>

        <div
          style={{
            margin: ".5rem 0",
          }}
        >
          <h3>Performance table</h3>
          {/* {JSON.stringify(processUserPerformance(),null,2)} */}
          {users && (
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
                loading={loadingOrders}
                getRowId={(row) => row._id}
                rows={processUserPerformance() || []}
                columns={columns4}
              />
            </Box>
          )}
        </div>
      </div>
    </>
  );
};

export default Analytics;
