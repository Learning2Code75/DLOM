import { gql } from "@apollo/client";

const GET_DISTRIBUTOR_DETAILS = gql`
  query getDistributor {
    distributor {
      id
      companyName
      address
      gst
      phoneNumber
      accountNumber
      bankIfsc
      socialMedia {
        title
        link
      }
    }
  }
`;

export { GET_DISTRIBUTOR_DETAILS };
