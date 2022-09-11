const DlomClient = require("../models/DlomClient");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLInputObjectType,
} = require("graphql");

const DlomClientSocialMediaItemType = new GraphQLObjectType({
  name: "SocialMediaItem",
  fields: () => ({
    title: { type: GraphQLString },
    link: { type: GraphQLString },
  }),
});

const DlomClientSocialMediaItemInputType = new GraphQLInputObjectType({
  name: "SocialMediaInputItem",
  fields: () => ({
    title: { type: GraphQLString },
    link: { type: GraphQLString },
  }),
});

const DlomClientType = new GraphQLObjectType({
  name: "DlomClient",
  fields: () => ({
    id: { type: GraphQLID },
    companyName: { type: GraphQLString },
    contactPersonName: { type: GraphQLString },
    address: { type: GraphQLString },
    gst: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    discountRate: { type: GraphQLString },
    salesPersonAssigned: { type: GraphQLString },
    clientSocialMedia: { type: new GraphQLList(DlomClientSocialMediaItemType) },
    typeOfCustomer: { type: GraphQLString },
  }),
});

//Queries
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    clients: {
      type: new GraphQLList(DlomClientType),
      resolve(parent, args) {
        return DlomClient.find();
      },
    },
    client: {
      type: DlomClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return DlomClient.findById(args.id);
      },
    },
  },
});
//Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addClient: {
      type: DlomClientType,
      args: {
        companyName: { type: GraphQLString },
        contactPersonName: { type: GraphQLString },
        address: { type: GraphQLString },
        gst: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        discountRate: { type: GraphQLString },
        salesPersonAssigned: { type: GraphQLString },
        clientSocialMedia: {
          type: new GraphQLList(DlomClientSocialMediaItemInputType),
        },
        typeOfCustomer: { type: GraphQLString },
      },
      resolve(parent, args) {
        const client = new DlomClient({
          companyName: args.companyName,
          contactPersonName: args.contactPersonName,
          address: args.address,
          gst: args.gst,
          phoneNumber: args.phoneNumber,
          discountRate: args.discountRate,
          salesPersonAssigned: args.salesPersonAssigned,
          clientSocialMedia: args.clientSocialMedia,
          typeOfCustomer: args.typeOfCustomer,
        });
        return client.save();
      },
    },
    deleteClient: {
      type: DlomClientType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return DlomClient.findByIdAndRemove(args.id);
      },
    },
    updateClient: {
      type: DlomClientType,
      args: {
        id: { type: GraphQLID },
        companyName: { type: GraphQLString },
        contactPersonName: { type: GraphQLString },
        address: { type: GraphQLString },
        gst: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        discountRate: { type: GraphQLString },
        salesPersonAssigned: { type: GraphQLString },
        clientSocialMedia: {
          type: new GraphQLList(DlomClientSocialMediaItemInputType),
        },
        typeOfCustomer: { type: GraphQLString },
      },
      resolve(parent, args) {
        return DlomClient.findByIdAndUpdate(
          args.id,
          {
            $set: {
              companyName: args.companyName,
              contactPersonName: args.contactPersonName,
              address: args.address,
              gst: args.gst,
              phoneNumber: args.phoneNumber,
              discountRate: args.discountRate,
              salesPersonAssigned: args.salesPersonAssigned,
              clientSocialMedia: args.clientSocialMedia,
              typeOfCustomer: args.typeOfCustomer,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
