# Learning

# 1_CRUD MERN
Video Link : [[1]](https://youtube.com/playlist?list=PL6QREj8te1P7VSwhrMf3D3Xt4V6_SRkhu)
## Create read
Link : create read:[[2]](https://youtu.be/ngc9gnGgUdA)  (done-28mins)
Watching this to implement :
1. 4 - Client Add , Read nicely with avatar
2. 5 - Product Add, Read nicely as [catalogue, qty modified catalogue to be downloaded as pdf]
3. 6 - Order Add, Read nicely as kanban



## update delete:
Link : [[3]](https://youtu.be/aibtHnbeuio)
Watching this to implement :
1. 4 - client update data added
2. 7 - inventory:
  - either update qty directly or
  - update qty when dispatch takes place(automatic from orders when warehouser inputs) or

3. 8 - update order data : approval workflow : generate all PDF docs taking inputs from all user types
  - when shipment done , update inventory
  - use data from client collection , product collection to autocomplete in inputs of order


## login auth:
Link : [[4]](https://youtu.be/LKlO8vLvUao)
Watching this to implement:
1. 1 - user Registration with different user roles
2. 2 - login for users
3. 3 - authentication for users


## pagination , search:
Link : [[5]](https://youtu.be/LYWgPSbPDfQ)
1. 4 - view client nicely
2. 5 - view product nicely
3. 6 - view order nicely

## comments :
Link : [[6]](https://youtu.be/46NRrn4xi5Y)
1. 4 - suggested updates on client info
2. 5 - suggested updates on product info
3. 6 - suggested updates, tasks on orders

# 2_ecommerce MERN
Link :ecommerce MERN : [[7i]](https://youtu.be/AN3t-OmdyKA?list=PLt5mNkGuWcuXpkXwmXwTU6i1kjwnLomhy)

[[7ii]](https://youtu.be/TNV0_7QRDwY)
[[7iii]](https://youtu.be/rltfdjcXjmk)


Watching this to implement :




# 3_Databases (MongoDB, Postgresql)
Link : mongodb : [[8i]](https://youtu.be/2QQGWYe7IDU) [[8ii]](https://youtube.com/playlist?list=PLuGe-XRWqbNQHhIJXq5UfkzCB98vvw1m7) [[8iii]](https://youtube.com/playlist?list=PLaxxQQak6D_dHXuCYHwgyHwhs225vUX6d) [[8iv]](https://youtube.com/playlist?list=PL4cUxeGkcC9h77dJ-QJlwGlZlTd4ecZOA) [[8v]](https://www.youtube.com/c/MongoDBofficial) [[8vi]](https://youtube.com/playlist?list=PL4RCxklHWZ9tuPwPaJva48FQIzJYhusSJ)
Link : postgresql : [[9]](https://www.youtube.com/watch?v=J01rYl9T3BU)

# 4_GMERN
Link : gmern :
- graphql client , server :[[10]](https://youtu.be/yqWzCV0kU_c)  
- Apollo server :[[11]](https://youtube.com/playlist?list=PLpGo-Y3em4SXceWj-OOEFcJmN0MO05vs7)
- Apollo server , apollo client fullstack:[[12]](https://youtube.com/playlist?list=PLASldBPN_pkDUuOzyPotAkKmvwqyDoA0g)
- [[13i]](https://youtu.be/n1mdAPFq2Os)  (GMERN full1)
- [[13ii]](https://youtu.be/BcLNfwF04Kw) (GMERN full2) -- done
- Apollo client:[[14]](https://youtu.be/4smsVPgZDOo) , [[15]](https://youtu.be/DAiXXdGJjvQ)

# CSS_Snippets
1. css playlist: [[16]](https://m.youtube.com/playlist?list=PLhoNfB3WZFScWKvVE-_wdqe6_PH9LctiG)

# Authentication , Authorization : JWT
1. [[17]](https://www.youtube.com/watch?v=enopDSs3DRw)
2. [[18]](https://www.youtube.com/watch?v=F-sFp_AvHc8)
3. [[19]](https://www.youtube.com/watch?v=Yh5Lil03tpI)

# Blockchain
1. [[20i]](https://www.youtube.com/watch?v=gyMwXuJrbJQ)
2. [[20ii]](https://www.youtube.com/watch?v=Wn_Kb3MR_cU)
3. [[20iii]](https://www.youtube.com/watch?v=kDo_MdyNJzI)
4. [[20iv]](https://www.youtube.com/watch?v=6aF6p2VUORE)

# ML
1. [[21i]](https://youtube.com/playlist?list=PLyMom0n-MBrq-KvGy4TSEa3PQnZ03OoM6)
2. [[21ii]](https://youtube.com/playlist?list=PLKnIA16_Rmvbr7zKYQuBfsVkjoLcJgxHH)

# Microservices Deployment
1. [[22i]](https://youtu.be/9zUHg7xjIqQ)
1. [[22ii]](https://youtube.com/playlist?list=PLaLqLOj2bk9ZV2RhqXzABUP5QSg42uJEs)
2. [[22iii]](https://youtube.com/playlist?list=PLrwNNiB6YOA0KmfliJoSuZzEN6tjSdEXc)
3. [[22iv]](https://youtube.com/playlist?list=PLIGDNOJWiL182j1bD_nQm-SxARR5s977O)
4. [[22v]](https://youtube.com/playlist?list=PL9gnSGHSqcnoqBXdMwUTRod4Gi3eac2Ak)




<hr/>

# Tries

## Try 1

### Architectural Design:
1. React 1 - Distributor Operations
2. React 2 - CRM
3. React 3 - Analytics ,(Table displays) CSV downloads , ML
4. node server -1
5. node server -2
5. apollo server -

### React 1 :Distributor Operations MERN
1. User Registration
2. Login
3. Authentication (JWT)
4. Client
5. Product
6. Order
7. Inventory $[Product]
8. PDF - Order docs $[Order]
9. chat - (distributor chats with client )
10. social - (distributor shows their products for the  clients)

### React 2 : CRM GMERN
1. crm $[Client]
  - tool to maintain contact[through social of react1 or whatsapp , insta , facebook, linked in] with potential clients and current clients
  - CRUD :pull data of current clients from db of React 1
  - CRUD: take data of potential clients here
  - Operation : convert potential clients to current client

### React3 + R Shiny + Jupyter: data science
1. (table displays) CSV downloads
  - own data display based on mongodb data
  - parse own data from mongodb and store in Postgresql
  - show postgresql data as tables in the react 3
2. Analytics
    - R analytics for current datasets on sales data
    - graphs plotted in r for own data from Postgresql to show here using ggplot2 and R Shiny
3. ML results
  - 15 research papers on sales prediction algorithm
  - implement 1 algorithm in Python Jupyter notebook for those datasets
  - show colab notebook results for own data inputs in the implemented algo in react3 as screenshots



## Try 2

### Client CRUD
- addClient Mutation :
```js
mutation{
  addClient(companyName:"Company1",
  	clientSocialMedia:[{title:"gmail",link:"company1@gmail.com"},{title:"linkedin",link:"company1.linkedin.com"}],
    contactPersonName:"cp1",
    address:"addr1",
    gst:"gst1",
    phoneNumber:"phno1",
    discountRate:"5",
    salesPersonAssigned:"sp1",
    typeOfCustomer:"permanent"
  ){
    id
    companyName
    contactPersonName
    address
    gst
    phoneNumber
    discountRate
    salesPersonAssigned

    clientSocialMedia{title,link}
    typeOfCustomer
  }
}
```

- view Clients query :
```js
{
  clients{
    id
    companyName
    contactPersonName
    address
    gst
    phoneNumber
    discountRate
    salesPersonAssigned
    clientSocialMedia{title,link}
    typeOfCustomer
   }
}
```
- view client query :
```js
{
  client(id:"6319cf896dfda39aa7147307"){
    id
    companyName
    contactPersonName
    address
    gst
    phoneNumber
    discountRate
    salesPersonAssigned
    clientSocialMedia{title,link}
    typeOfCustomer
   }
}
```
- delete client mutation :
```js
mutation{
  deleteClient(id:"6319db516dfda39aa714730e"){
    id
    companyName
    contactPersonName
    address
    gst
    phoneNumber
    discountRate
    salesPersonAssigned
    clientSocialMedia{title,link}
    typeOfCustomer

  }
}
```

- update client mutation :
```js
mutation{
  updateClient(id:"6319cf896dfda39aa7147307",
  companyName:"Company3331",
    clientSocialMedia:[{title:"gmail",link:"company1@gmail.com"},{title:"linkedin",link:"company1.linkedin.com"}],
  contactPersonName:"cp1",
  address:"addr1",
  gst:"gst1",
  phoneNumber:"phno1",
  discountRate:"5",
  salesPersonAssigned:"sp1",
  typeOfCustomer:"permanent"

  ){
    id
    companyName
    contactPersonName
    address
    gst
    phoneNumber
    discountRate
    salesPersonAssigned
    clientSocialMedia{title,link}
    typeOfCustomer

  }
}
```




# References
1.  JavsScript Mastery MERN playlist. https://youtube.com/playlist?list=PL6QREj8te1P7VSwhrMf3D3Xt4V6_SRkhu
2. Create and Read . https://youtu.be/ngc9gnGgUdA
3. update delete: https://youtu.be/aibtHnbeuio
4. login auth:https://youtu.be/LKlO8vLvUao
5. pagination , search: https://youtu.be/LYWgPSbPDfQ
6. comments : https://youtu.be/46NRrn4xi5Y
7. ecommerce MERN : https://youtu.be/AN3t-OmdyKA?list=PLt5mNkGuWcuXpkXwmXwTU6i1kjwnLomhy
8.
9.
10.
11.
12.
13.
14.
15.
16.
17.
18.
19.
20. mongodb datatypes : https://www.mongodb.com/docs/manual/reference/bson-types/
21. mongoose schema definition: https://mongoosejs.com/docs/schematypes.html#objectids
22. rest api status codes : https://www.restapitutorial.com/httpstatuscodes.html
23.
