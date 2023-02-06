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

const GET_CLIENT_IDS = gql`
query getClientIds{
	clients{
		id
		companyName
		contactPersonName
		address
	}
}
`

export { GET_CLIENTS , GET_CLIENT_IDS };
