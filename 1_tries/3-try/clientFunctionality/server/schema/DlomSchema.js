const DlomClient = require("../models/DlomClient");
const DlomDistributor = require("../models/DlomDistributor");

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
const DlomClientCRMType = new GraphQLObjectType({
  name: "CRMChatItem",
  fields: () => ({
    msg: { type: GraphQLString },
    personType: { type: GraphQLString },
    timestamp: { type: GraphQLString },
  }),
});
const DlomClientSocialMediaItemInputType = new GraphQLInputObjectType({
  name: "SocialMediaInputItem",
  fields: () => ({
    title: { type: GraphQLString },
    link: { type: GraphQLString },
  }),
});

const DlomClientCRMInputType = new GraphQLInputObjectType({
  name: "CRMChatInputItem",
  fields: () => ({
    msg: { type: GraphQLString },
    personType: { type: GraphQLString },
    timestamp: { type: GraphQLString },
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
    crm: { type: new GraphQLList(DlomClientCRMType) },
  }),
});

const DlomDistributorType = new GraphQLObjectType({
  name: "DlomDistributor",
  fields: () => ({
    id: { type: GraphQLID },
    companyName: {
      type: GraphQLString,
    },
    address: {
      type: GraphQLString,
    },
    gst: {
      type: GraphQLString,
    },
    phoneNumber: {
      type: GraphQLString,
    },
    accountNumber: {
      type: GraphQLString,
    },
    bankIfsc: {
      type: GraphQLString,
    },
    socialMedia: { type: new GraphQLList(DlomClientSocialMediaItemType) },
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
    distributor: {
      type: new GraphQLList(DlomDistributorType),
      resolve(parent, args) {
        return DlomDistributor.find();
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
    updateClientCRM: {
      type: DlomClientType,
      args: {
        id: { type: GraphQLID },
        crm: {
          type: new GraphQLList(DlomClientCRMInputType),
        },
      },
      resolve(parent, args) {
        return DlomClient.findByIdAndUpdate(
          args.id,
          {
            $set: {
              crm: args.crm,
            },
          },
          { new: true }
        );
      },
    },
    addDistributor: {
      type: DlomDistributorType,
      args: {
        companyName: {
          type: GraphQLString,
        },
        address: {
          type: GraphQLString,
        },
        gst: {
          type: GraphQLString,
        },
        phoneNumber: {
          type: GraphQLString,
        },
        accountNumber: {
          type: GraphQLString,
        },
        bankIfsc: {
          type: GraphQLString,
        },
        socialMedia: {
          type: new GraphQLList(DlomClientSocialMediaItemInputType),
        },
      },
      resolve(parent, args) {
        const distributor = new DlomDistributor({
          companyName: args.companyName,
          address: args.address,
          gst: args.gst,
          phoneNumber: args.phoneNumber,
          accountNumber: args.accountNumber,
          bankIfsc: args.bankIfsc,
          socialMedia: args.socialMedia,
        });
        return distributor.save();
      },
    },
    updateDistributor: {
      type: DlomDistributorType,
      args: {
        id: { type: GraphQLID },
        companyName: {
          type: GraphQLString,
        },
        address: {
          type: GraphQLString,
        },
        gst: {
          type: GraphQLString,
        },
        phoneNumber: {
          type: GraphQLString,
        },
        accountNumber: {
          type: GraphQLString,
        },
        bankIfsc: {
          type: GraphQLString,
        },
        socialMedia: {
          type: new GraphQLList(DlomClientSocialMediaItemInputType),
        },
      },
      resolve(parent, args) {
        return DlomDistributor.findByIdAndUpdate(
          args.id,
          {
            $set: {
              companyName: args.companyName,
              address: args.address,
              gst: args.gst,
              phoneNumber: args.phoneNumber,
              accountNumber: args.accountNumber,
              bankIfsc: args.bankIfsc,
              socialMedia: args.socialMedia,
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
