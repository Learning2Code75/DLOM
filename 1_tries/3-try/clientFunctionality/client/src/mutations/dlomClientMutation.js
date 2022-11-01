import { gql } from "@apollo/client";

const ADD_CLIENT = gql`
  mutation addClient($companyName:String,$contactPersonName:String,$address:String,$gst:String,$phoneNumber:String,$discountRate:String,$salesPersonAssigned:String,$clientSocialMedia:[SocialMediaInputItem],$typeOfCustomer:String) {
    addClient(companyName:$companyName,contactPersonName:$contactPersonName,address:$address,gst:$gst,phoneNumber:$phoneNumber,discountRate:$discountRate,salesPersonAssigned:$salesPersonAssigned,clientSocialMedia:$clientSocialMedia,typeOfCustomer:$typeOfCustomer) {
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
export { ADD_CLIENT };
