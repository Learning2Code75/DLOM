import { gql } from "@apollo/client";


const UPDATE_DISTRIBUTOR_DETAILS = gql`
  mutation updateDistributor($id:ID,$companyName: String,$address: String,$gst: String,$phoneNumber: String,$accountNumber:String, $bankIfsc: String,$socialMedia: [SocialMediaInputItem]){
	updateDistributor(id:$id,companyName: $companyName,address: $address,gst: $gst,phoneNumber: $phoneNumber,accountNumber:$accountNumber,bankIfsc: $bankIfsc,socialMedia: $socialMedia){
	 id
    companyName
    address
    gst
    phoneNumber
    accountNumber
    bankIfsc
    socialMedia{
      title
      link
    }
	}  
}
`;

export { UPDATE_DISTRIBUTOR_DETAILS};
