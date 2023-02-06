import { gql } from "@apollo/client";

const ADD_CLIENT = gql`
  mutation addClient($companyName: String,$contactPersonName: String,$address: String,$gst: String,$phoneNumber: String,$discountRate: String, $salesPersonAssigned: String,$clientSocialMedia: [SocialMediaInputItem],$typeOfCustomer: String){
    addClient(companyName: $companyName,contactPersonName: $contactPersonName,address: $address,gst: $gst,phoneNumber: $phoneNumber,discountRate: $discountRate,salesPersonAssigned: $salesPersonAssigned,clientSocialMedia: $clientSocialMedia,typeOfCustomer: $typeOfCustomer) {
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
    }
  }
`;

const UPDATE_CLIENT = gql`
  mutation updateClient($id:ID,$companyName: String,$contactPersonName: String,$address: String,$gst: String,$phoneNumber: String,$discountRate: String, $salesPersonAssigned: String,$clientSocialMedia: [SocialMediaInputItem],$typeOfCustomer: String){
	updateClient(id:$id,companyName: $companyName,contactPersonName: $contactPersonName,address: $address,gst: $gst,phoneNumber: $phoneNumber,discountRate: $discountRate,salesPersonAssigned: $salesPersonAssigned,clientSocialMedia: $clientSocialMedia,typeOfCustomer: $typeOfCustomer){
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
	}  
}
`;
const DELETE_CLIENT = gql`
mutation deleteClient($id:ID){
	deleteClient(id:$id){
		companyName
	}
}
`;
const UPDATE_CLIENT_CRM = gql`
  mutation updateClientCRM($id:ID,$crm:[CRMChatInputItem]){
	updateClientCRM(id:$id,crm: $crm){
	 id
	 crm {
		 msg
      personType
      timestamp
     	 }
     	 }
 
}
`;
export { ADD_CLIENT ,UPDATE_CLIENT,DELETE_CLIENT,UPDATE_CLIENT_CRM};
