import { gql } from "@apollo/client";

const GET_CLIENTS = gql`
  query getClients {
    clients {
      id
      companyName
      contactPersonName
      address
      gst
      phoneNumber
      discountRate
      salesPersonAssigned
      clientSocialMedia {
        title
        link
      }
      typeOfCustomer
      crm {
        msg
        personType
        timestamp
      }
    }
  }
`;

export { GET_CLIENTS };