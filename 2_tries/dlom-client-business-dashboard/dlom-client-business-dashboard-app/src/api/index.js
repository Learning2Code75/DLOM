import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:9000" });
const MUS1_API = axios.create();
// const API = axios.create();

// API.interceptors.request.use((req) => {
//   if (localStorage.getItem("profile")) {
//     req.headers.Authorization = `Bearer ${
//       JSON.parse(localStorage.getItem("profile")).token
//     }`;
//   }
//   return req;
// });
//products
export const fetchProducts = () => API.get("/products");
// export const fetchProducts = () => API.get("http://localhost:8003/products");
export const createProduct = (newProd) => API.post("/products", newProd);
// export const createProduct = (newProd) =>
//   API.post("http://localhost:8003/products", newProd);

export const updateProduct = (pId, pData) =>
  API.patch(`/products/${pId}`, pData);
// export const updateProduct = (pId, pData) =>
//   MUS1_API.patch(`http://localhost:8003/products/${pId}`, pData);

export const deleteProduct = (pId) => API.delete(`/products/${pId}`);
// export const deleteProduct = (pId) =>
//   MUS1_API.delete(`http://localhost:8003/products/${pId}`);

//user
export const signIn = (fData) => API.post("/users/signin", fData);
// export const signIn = (fData) =>
//   API.post("http://localhost:8004/users/signin", fData);

export const signUp = (fData) => API.post("/users/signup", fData);
// export const signUp = (fData) =>
//   API.post("http://localhost:8004/users/signup", fData);

//inventory logs
export const fetchProductlogs = () => API.get("/productlogs");
// export const fetchProductlogs = () =>
//   API.get("http://localhost:8002/productlogs");

export const createProductlog = (prodlog) => API.post("/productlogs", prodlog);
// export const createProductlog = (prodlog) =>
//   API.post("http://localhost:8002/productlogs", prodlog);

//order logs
export const fetchOrderlogs = () => API.get("/orderlogs");
// export const fetchOrderlogs = () => API.get("http://localhost:8001/orderlogs");

export const createOrderlog = (ordlog) => API.post("/orderlogs", ordlog);
// export const createOrderlog = (ordlog) =>
//   API.post("http://localhost:8001/orderlogs", ordlog);

//user crud :
export const fetchUsers = () => API.get("/users");

export const updateUser = (uid, udata) =>
  API.patch(`/users/`, { id: uid, data: udata });

export const deleteUser = (usid) => API.delete(`/users/${usid}`);

//user taskboard
export const fetchTasks = () => API.get("/users/tasks");
export const createTask = (t) => API.post("/users/tasks", t);

export const updateTask = (tid, tdata) =>
  API.patch(`/users/tasks`, { task_id: tid, data: tdata });

// subscriptions

export const fetchSubscriptions = () => API.get("/subscriptions");
export const createSubscription = (s) => API.post("/subscriptions", s);
export const updateSubscription = (sid, sdata) =>
  API.patch(`/subscriptions/${sid}`, sdata);
export const deleteSubscription = (sid) => API.delete(`/subscriptions/${sid}`);

// trackings
export const fetchTrackings = () => API.get("/trackings");

// dlom clients
export const fetchDlomClients = () => API.get("/dlomclients");
export const createDlomClient = (s) => API.post("/dlomclients", s);
export const updateDlomClient = (dcid, dcdata) =>
  API.patch(`/dlomclients/${dcid}`, dcdata);
export const deleteDlomClient = (dcid) => API.delete(`/dlomclients/${dcid}`);

// billings
export const fetchBillings = () => API.get("/billings");
export const createBilling = (s) => API.post("/billings", s);
export const updateBilling = (bid, bdata) =>
  API.patch(`/billings/${bid}`, bdata);
