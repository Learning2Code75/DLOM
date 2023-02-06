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

const GET_DISTRIBUTOR_DETAILS_ORD = gql`
query getDistributorOrd{
	distributor{
		companyName
		address
	}
	
}
`;

export { GET_DISTRIBUTOR_DETAILS , GET_DISTRIBUTOR_DETAILS_ORD};
