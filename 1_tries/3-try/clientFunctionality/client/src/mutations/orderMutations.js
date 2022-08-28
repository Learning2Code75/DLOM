import { gql } from "@apollo/client";

const ADD_ORDER = gql`
  mutation addOrder(
    $name: String!,
    $description: String!,
    $status: OrderStatus!,
    $clientId: ID!
  ) {
    addOrder(
      name: $name,
      description: $description,
      status: $status,
      clientId: $clientId
    ) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;


const DELETE_ORDER = gql`
  mutation deleteOrder($id:ID!){
  	deleteOrder(id:$id){
  		name
  		description
  		client{
  			name
  		}
  	}
  }

`;

const UPDATE_ORDER = gql`
  mutation updateOrder(
  $id:ID!,
    $name: String!,
    $description: String!,
    $status: OrderUpdateStatus!,
    
  ) {
    updateOrder(
    id:$id,
      name: $name,
      description: $description,
      status: $status,
      
    ) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

export { ADD_ORDER ,DELETE_ORDER , UPDATE_ORDER };
