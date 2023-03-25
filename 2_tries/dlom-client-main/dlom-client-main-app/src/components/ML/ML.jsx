import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TiArrowLeftThick } from "react-icons/ti";
import { ThemeContext } from "../../App";
import { GET_CLIENTS } from "../../queries/dlomClientQueries";
import { useQuery } from "@apollo/client";
import { predArr, predM1, predM2, predM3, predM4, predM5 } from "../../api/ml";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/products";

const month = [
  { name: "Jan", value: "01" },
  { name: "Feb", value: "02" },
  { name: "Mar", value: "03" },
  { name: "Apr", value: "04" },
  { name: "May", value: "05" },
  { name: "Jun", value: "06" },
  { name: "July", value: "07" },
  { name: "Aug", value: "08" },
  { name: "Sep", value: "09" },
  { name: "Oct", value: "10" },
  { name: "Nov", value: "11" },
  { name: "Dec", value: "12" },
];
const day = [
  { name: "Sun", value: "0" },
  { name: "Mon", value: "1" },
  { name: "Tue", value: "2" },
  { name: "Wed", value: "3" },
  { name: "Thu", value: "4" },
  { name: "Fri", value: "5" },
  { name: "Sat", value: "6" },
];

const ML = () => {
  const tc = useContext(ThemeContext);
  const dispatch = useDispatch();
  const {
    loading: loadingClients,
    error: errorClients,
    data: clients,
  } = useQuery(GET_CLIENTS);
  const products = useSelector((state) => state.products);

  const [m1State, setM1State] = useState({
    qty: 4,
    cliAvgSenti: "0.6",
    spAvgSenti: "0.7",
    clientName: "",
    month: "",
    day: "",
  });
  const [m2State, setM2State] = useState({
    qty: 4,
    sales: "5000",
    cliAvgSenti: "",
    spAvgSenti: "",
    clientName: "",
    prodName: "",
    month: "",
    day: "",
  });
  const [m3State, setM3State] = useState({
    orderQty: 4,
    orderTotal: "5000",
    cliAvgSenti: 0.6,
    spAvgSenti: 0.7,
    sales: "8000",
    prodName: "",
    month: "",
    day: "",
  });
  const [m4State, setM4State] = useState({
    orderQty: 4,
    orderTotal: "5000",
    cliAvgSenti: 0.6,
    spAvgSenti: 0.7,
    sales: "8000",
    clientName: "",
    month: "",
    day: "",
  });
  const [m5State, setM5State] = useState({
    qty: 4,
    clientName: "",
    month: "",
    day: "",
  });

  const [m1Prediction, setM1Prediction] = useState(0);
  const [m2Prediction, setM2Prediction] = useState(0);
  const [m3Prediction, setM3Prediction] = useState("");
  const [m4Prediction, setM4Prediction] = useState("");
  const [m5Prediction, setM5Prediction] = useState("");

  const findCliName = (clientName) => {
    let client = {};
    for (let i = 0; i < clients?.clients?.length; i++) {
      if (clients.clients[i].id === clientName) {
        client = clients.clients[i];
        break;
      }
    }
    return { client: client.companyName };
  };

  const findCliAvgSentiment = async (clientName) => {
    let client = {};
    for (let i = 0; i < clients?.clients?.length; i++) {
      if (clients.clients[i].id === clientName) {
        client = clients.clients[i];
        break;
      }
    }

    let preds = [];
    let ipTextArr = [];
    let avgpred = 0;
    for (let i = 0; i < client.crm.length; i++) {
      if (client.crm[i].personType === "client") {
        ipTextArr.push(client.crm[i].msg);
      }
    }
    let payload = {
      textArr: [...ipTextArr],
    };
    // console.log(payload);

    if (ipTextArr.length > 0) {
      preds = await predArr(payload);
      // console.log(preds);
      for (let i = 0; i < preds.data.length; i++) {
        avgpred = parseFloat(avgpred) + parseFloat(preds.data[i].pred);
      }
      avgpred = parseFloat(avgpred) / preds.data.length;
    }

    // setM1State({ ...m1State, cliAvgSenti: avgpred });
    return { client: client.companyName, avgpred: parseFloat(avgpred) };
  };

  const findSpAvgSentiment = async (clientName) => {
    let client = {};
    for (let i = 0; i < clients?.clients?.length; i++) {
      if (clients.clients[i].id === clientName) {
        client = clients.clients[i];
        break;
      }
    }
    let preds = [];
    let ipTextArr = [];
    let avgpred = 0;
    for (let i = 0; i < client.crm.length; i++) {
      if (client.crm[i].personType === "sp") {
        ipTextArr.push(client.crm[i].msg);
      }
    }
    let payload = {
      textArr: [...ipTextArr],
    };
    // console.log(client.crm);
    // console.log(payload);
    if (ipTextArr.length > 0) {
      preds = await predArr(payload);
      for (let i = 0; i < preds.data.length; i++) {
        avgpred = parseFloat(avgpred) + parseFloat(preds.data[i].pred);
      }
      avgpred = parseFloat(avgpred) / preds.data.length;
    }

    // setM1State({ ...m1State, spAvgSenti: avgpred });

    return { avgpred: parseFloat(avgpred) };
  };

  const predictM1 = async () => {
    let new_state = { ...m1State };
    const { client, avgpred: cliAvgSenti } = await findCliAvgSentiment(
      m1State.clientName
    );
    const { avgpred: spAvgSenti } = await findSpAvgSentiment(
      m1State.clientName
    );

    new_state.clientName = client;
    new_state.cliAvgSenti = `${cliAvgSenti}`;
    new_state.spAvgSenti = `${spAvgSenti}`;

    let m1_res = await predM1(new_state);
    console.log(m1_res.data.orderwise_sales_pred);
    setM1Prediction(m1_res.data.orderwise_sales_pred);
  };
  const predictM2 = async () => {
    let new_state = { ...m2State };
    const { client, avgpred: cliAvgSenti } = await findCliAvgSentiment(
      m2State.clientName
    );
    const { avgpred: spAvgSenti } = await findSpAvgSentiment(
      m2State.clientName
    );

    new_state.clientName = client;
    new_state.cliAvgSenti = `${cliAvgSenti}`;
    new_state.spAvgSenti = `${spAvgSenti}`;

    let m2_res = await predM2(new_state);
    console.log(m2_res.data.prodwise_sales_pred);
    setM2Prediction(m2_res.data.prodwise_sales_pred);
  };
  const predictM3 = async () => {
    let new_state = { ...m3State };
    //  find avgsenti for cli , sp chats of clients buying for product selected
    // new_state.cliAvgSenti = `${cliAvgSenti}`;
    // new_state.spAvgSenti = `${spAvgSenti}`;

    let m3_res = await predM3(new_state);
    // console.log(m3_res);
    console.log(m3_res.data.prodwise_client_pred);
    setM3Prediction(m3_res.data.prodwise_client_pred);
  };
  const predictM4 = async () => {
    let new_state = { ...m4State };
    const { client, avgpred: cliAvgSenti } = await findCliAvgSentiment(
      m4State.clientName
    );
    const { avgpred: spAvgSenti } = await findSpAvgSentiment(
      m4State.clientName
    );

    new_state.clientName = client;
    new_state.cliAvgSenti = `${cliAvgSenti}`;
    new_state.spAvgSenti = `${spAvgSenti}`;

    let m4_res = await predM4(new_state);
    // console.log(m3_res);
    console.log(m4_res.data.prodwise_product_pred);
    setM4Prediction(m4_res.data.prodwise_product_pred);
  };
  const predictM5 = async () => {
    let new_state = { ...m5State };

    const { client } = findCliName(m5State.clientName);

    new_state.clientName = client;

    let m5_res = await predM5(new_state);
    console.log(m5_res.data.clientwise_sales_pred);
    setM5Prediction(m5_res.data.clientwise_sales_pred);
  };
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div
      style={{
        margin: "0 0 5rem 0",
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
      <h2
        style={{
          margin: "1rem 0",
        }}
      >
        ML
      </h2>
      <div
        style={{
          margin: ".5rem",
          marginBottom: "5rem",
        }}
        className="css9BasicGrid"
      >
        <div className="css5Form">
          <div>
            <h3>Predict Orderwise Sales</h3>
          </div>
          <div
            className="css1Card"
            style={{
              margin: "1rem 0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            ₹{m1Prediction}
          </div>
          <div className="formLabel">Order Qty</div>
          <input
            type="number"
            value={m1State.qty}
            onChange={(e) => {
              setM1State({ ...m1State, qty: e.target.value });
            }}
            className="formControl"
            placeholder="Order Qty"
          />
          <div className="formLabel">Client Name</div>
          <select
            value={m1State.clientName}
            onChange={(e) => {
              setM1State({ ...m1State, clientName: e.target.value });
            }}
            className="btn1"
          >
            <option value="">Select Client Name</option>
            {clients?.clients?.map((c) => (
              <option value={c.id}>{c.companyName}</option>
            ))}
          </select>
          <div className="formLabel">Month</div>
          <select
            value={m1State.month}
            onChange={(e) => {
              setM1State({ ...m1State, month: e.target.value });
            }}
            className="btn1"
          >
            <option value="">Select Month</option>
            {month.map((m) => (
              <option value={m.value}>{m.name}</option>
            ))}
          </select>
          <div className="formLabel">Day</div>
          <select
            value={m1State.day}
            onChange={(e) => {
              setM1State({ ...m1State, day: e.target.value });
            }}
            className="btn1"
          >
            <option value="">Select Day</option>
            {day.map((d) => (
              <option value={d.value}>{d.name}</option>
            ))}
          </select>

          <div className="btn2" onClick={predictM1}>
            Predict
          </div>
        </div>
        <div className="css5Form">
          <div>
            <h3>Predict Productwise Sales</h3>
          </div>
          <div
            className="css1Card"
            style={{
              margin: "1rem 0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            ₹{m2Prediction}
          </div>
          <div className="formLabel">Order Qty</div>
          <input
            type="number"
            value={m2State.qty}
            onChange={(e) => {
              setM2State({ ...m2State, qty: e.target.value });
            }}
            className="formControl"
            placeholder="Order Qty"
          />
          <div className="formLabel">Order Value</div>
          <input
            type="text"
            value={m2State.sales}
            onChange={(e) => {
              setM2State({ ...m2State, sales: e.target.value });
            }}
            className="formControl"
            placeholder="Order Value"
          />
          <div className="formLabel">Client Name</div>
          <select
            value={m2State.clientName}
            onChange={(e) => {
              setM2State({ ...m2State, clientName: e.target.value });
            }}
            className="btn1"
          >
            <option value="">Select Client Name</option>
            {clients?.clients?.map((c) => (
              <option value={c.id}>{c.companyName}</option>
            ))}
          </select>
          <div className="formLabel">Product Name</div>
          <select
            value={m2State.prodName}
            onChange={(e) => {
              setM2State({ ...m2State, prodName: e.target.value });
            }}
            className="btn1"
          >
            <option value="">Select Product Name</option>
            {products
              ?.filter((p) => p.damaged === "normal")
              .map((p) => (
                <option value={p.prodSKU}>
                  {p.prodName}|{p.prodSKU}
                </option>
              ))}
          </select>
          <div className="formLabel">Month</div>
          <select
            value={m2State.month}
            onChange={(e) => {
              setM2State({ ...m2State, month: e.target.value });
            }}
            className="btn1"
          >
            <option value="">Select Month</option>
            {month.map((m) => (
              <option value={m.value}>{m.name}</option>
            ))}
          </select>
          <div className="formLabel">Day</div>
          <select
            value={m2State.day}
            onChange={(e) => {
              setM2State({ ...m2State, day: e.target.value });
            }}
            className="btn1"
          >
            <option value="">Select Day</option>
            {day.map((d) => (
              <option value={d.value}>{d.name}</option>
            ))}
          </select>

          <div className="btn2" onClick={predictM2}>
            Predict
          </div>
        </div>
        <div className="css5Form">
          <div>
            <h3>Predict Productwise Client</h3>
          </div>
          <div
            className="css1Card"
            style={{
              margin: "1rem 0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {m3Prediction}
          </div>
          <div className="formLabel">Order Qty</div>
          <input
            type="number"
            value={m3State.orderQty}
            onChange={(e) => {
              setM3State({ ...m3State, orderQty: e.target.value });
            }}
            className="formControl"
            placeholder="Order Qty"
          />
          <div className="formLabel">Order Value</div>
          <input
            type="text"
            value={m3State.orderTotal}
            onChange={(e) => {
              setM3State({ ...m3State, orderTotal: e.target.value });
            }}
            className="formControl"
            placeholder="Order Value"
          />
          <div className="formLabel">Client Avg Sentiment [0-1]</div>
          <input
            type="number"
            value={m3State.cliAvgSenti}
            onChange={(e) => {
              setM3State({ ...m3State, cliAvgSenti: e.target.value });
            }}
            className="formControl"
            placeholder="Client Avg Sentiment [0-1]"
          />
          <div className="formLabel">Salesperson Avg Sentiment [0-1]</div>
          <input
            type="number"
            value={m3State.spAvgSenti}
            onChange={(e) => {
              setM3State({ ...m3State, spAvgSenti: e.target.value });
            }}
            className="formControl"
            placeholder="Salesperson Avg Sentiment [0-1]"
          />
          <div className="formLabel">Product Sales Value</div>
          <input
            type="text"
            value={m3State.sales}
            onChange={(e) => {
              setM3State({ ...m3State, sales: e.target.value });
            }}
            className="formControl"
            placeholder="Product Sales Value"
          />

          <div className="formLabel">Product Name</div>
          <select
            value={m3State.prodName}
            onChange={(e) => {
              setM3State({ ...m3State, prodName: e.target.value });
            }}
            className="btn1"
          >
            <option value="">Select Product Name</option>
            {products
              ?.filter((p) => p.damaged === "normal")
              .map((p) => (
                <option value={p.prodSKU}>
                  {p.prodName}|{p.prodSKU}
                </option>
              ))}
          </select>
          <div className="formLabel">Month</div>
          <select
            value={m3State.month}
            onChange={(e) => {
              setM3State({ ...m3State, month: e.target.value });
            }}
            className="btn1"
          >
            <option value="">Select Month</option>
            {month.map((m) => (
              <option value={m.value}>{m.name}</option>
            ))}
          </select>
          <div className="formLabel">Day</div>
          <select
            value={m3State.day}
            onChange={(e) => {
              setM3State({ ...m3State, day: e.target.value });
            }}
            className="btn1"
          >
            <option value="">Select Day</option>
            {day.map((d) => (
              <option value={d.value}>{d.name}</option>
            ))}
          </select>

          <div className="btn2" onClick={predictM3}>
            Predict
          </div>
        </div>
        <div className="css5Form">
          <div>
            <h3>Predict Productwise Product</h3>
          </div>
          <div
            className="css1Card"
            style={{
              margin: "1rem 0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {m4Prediction}
          </div>
          <div className="formLabel">Order Qty</div>
          <input
            type="number"
            value={m4State.orderQty}
            onChange={(e) => {
              setM4State({ ...m4State, orderQty: e.target.value });
            }}
            className="formControl"
            placeholder="Order Qty"
          />
          <div className="formLabel">Client Avg Sentiment [0-1]</div>
          <input
            type="number"
            value={m4State.cliAvgSenti}
            onChange={(e) => {
              setM4State({ ...m4State, cliAvgSenti: e.target.value });
            }}
            className="formControl"
            placeholder="Client Avg Sentiment [0-1]"
          />
          <div className="formLabel">Salesperson Avg Sentiment [0-1]</div>
          <input
            type="number"
            value={m4State.spAvgSenti}
            onChange={(e) => {
              setM4State({ ...m4State, spAvgSenti: e.target.value });
            }}
            className="formControl"
            placeholder="Salesperson Avg Sentiment [0-1]"
          />
          <div className="formLabel">Order Value</div>
          <input
            type="text"
            value={m4State.orderTotal}
            onChange={(e) => {
              setM4State({ ...m4State, orderTotal: e.target.value });
            }}
            className="formControl"
            placeholder="Order Value"
          />
          <div className="formLabel">Product Sales Value</div>
          <input
            type="text"
            value={m4State.sales}
            onChange={(e) => {
              setM4State({ ...m4State, sales: e.target.value });
            }}
            className="formControl"
            placeholder="Product Sales Value"
          />

          <div className="formLabel">Client Name</div>
          <select
            value={m4State.clientName}
            onChange={(e) => {
              setM4State({ ...m4State, clientName: e.target.value });
            }}
            className="btn1"
          >
            <option value="">Select Client Name</option>
            {clients?.clients?.map((c) => (
              <option value={c.id}>{c.companyName}</option>
            ))}
          </select>
          <div className="formLabel">Month</div>
          <select
            value={m4State.month}
            onChange={(e) => {
              setM4State({ ...m4State, month: e.target.value });
            }}
            className="btn1"
          >
            <option value="">Select Month</option>
            {month.map((m) => (
              <option value={m.value}>{m.name}</option>
            ))}
          </select>
          <div className="formLabel">Day</div>
          <select
            value={m4State.day}
            onChange={(e) => {
              setM4State({ ...m4State, day: e.target.value });
            }}
            className="btn1"
          >
            <option value="">Select Day</option>
            {day.map((d) => (
              <option value={d.value}>{d.name}</option>
            ))}
          </select>

          <div className="btn2" onClick={predictM4}>
            Predict
          </div>
        </div>
        <div className="css5Form">
          <div>
            <h3>Predict Clientwise Sales</h3>
          </div>
          <div
            className="css1Card"
            style={{
              margin: "1rem 0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            ₹{m5Prediction}
          </div>
          <div className="formLabel">Total Qty Ordered by client</div>
          <input
            type="number"
            value={m5State.qty}
            onChange={(e) => {
              setM5State({ ...m5State, qty: e.target.value });
            }}
            className="formControl"
            placeholder="Total Qty Ordered by client"
          />
          <div className="formLabel">Client Name</div>
          <select
            value={m5State.clientName}
            onChange={(e) => {
              setM5State({ ...m5State, clientName: e.target.value });
            }}
            className="btn1"
          >
            <option value="">Select Client Name</option>
            {clients?.clients?.map((c) => (
              <option value={c.id}>{c.companyName}</option>
            ))}
          </select>
          <div className="formLabel">Month</div>
          <select
            value={m5State.month}
            onChange={(e) => {
              setM5State({ ...m5State, month: e.target.value });
            }}
            className="btn1"
          >
            <option value="">Select Month</option>
            {month.map((m) => (
              <option value={m.value}>{m.name}</option>
            ))}
          </select>
          <div className="formLabel">Day</div>
          <select
            value={m5State.day}
            onChange={(e) => {
              setM5State({ ...m5State, day: e.target.value });
            }}
            className="btn1"
          >
            <option value="">Select Day</option>
            {day.map((d) => (
              <option value={d.value}>{d.name}</option>
            ))}
          </select>

          <div className="btn2" onClick={predictM5}>
            Predict
          </div>
        </div>
      </div>
    </div>
  );
};

export default ML;
