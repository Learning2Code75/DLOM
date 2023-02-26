const DlomClient = require("../models/DlomClient");
const DlomDistributor = require("../models/DlomDistributor");
const DlomOrder = require("../models/DlomOrder");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLInt,
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
const SOTableItemType = new GraphQLObjectType({
  name: "SOTableItem",
  fields: () => ({
    siNo: { type: GraphQLInt },
    descriptionOfGoods: { type: GraphQLString },
    dueOn: { type: GraphQLString },
    qty: { type: GraphQLInt },
    rate: { type: GraphQLString },
    per: { type: GraphQLString },
    amount: { type: GraphQLString },
  }),
});
const InvTableItemType = new GraphQLObjectType({
  name: "InvTableItem",
  fields: () => ({
    siNo: { type: GraphQLInt },
    descriptionOfGoods: { type: GraphQLString },
    hsnSAC: { type: GraphQLString },
    GSTRate: { type: GraphQLString },
    qty: { type: GraphQLInt },
    rate: { type: GraphQLString },
    per: { type: GraphQLString },
    amount: { type: GraphQLString },
  }),
});
const InvTaxTableItemType = new GraphQLObjectType({
  name: "InvTaxTableItem",
  fields: () => ({
    hsnSAC: { type: GraphQLString },
    taxableValue: { type: GraphQLString },
    centralTaxRate: { type: GraphQLString },
    centralTaxAmt: { type: GraphQLString },
    stateTaxRate: { type: GraphQLString },
    stateTaxAmt: { type: GraphQLString },
  }),
});

const SrTableItemType = new GraphQLObjectType({
  name: "SrTableItem",
  fields: () => ({
    qty: { type: GraphQLInt },
    details: { type: GraphQLString },
    price: { type: GraphQLString },
    amount: { type: GraphQLString },
  }),
});

const OrderDeliveryHistoryType = new GraphQLObjectType({
  name: "OrderDeliveryHistory",
  fields: () => ({
    timeStamp: { type: GraphQLString },
    status: { type: GraphQLString },
  }),
});

const OrderPaymentHistoryType = new GraphQLObjectType({
  name: "OrderPaymentHistory",
  fields: () => ({
    timeStamp: { type: GraphQLString },
    amount: { type: GraphQLString },
    method: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});
const WarehouseReceiptItemType = new GraphQLObjectType({
  name: "WarehouseReceiptItem",
  fields: () => ({
    imgString: { type: GraphQLString },
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

const SOTableItemInputType = new GraphQLInputObjectType({
  name: "SOTableInputItem",
  fields: () => ({
    siNo: { type: GraphQLInt },
    descriptionOfGoods: { type: GraphQLString },
    dueOn: { type: GraphQLString },
    qty: { type: GraphQLInt },
    rate: { type: GraphQLString },
    per: { type: GraphQLString },
    amount: { type: GraphQLString },
  }),
});

const InvTableItemInputType = new GraphQLInputObjectType({
  name: "InvTableInputItem",
  fields: () => ({
    siNo: { type: GraphQLInt },
    descriptionOfGoods: { type: GraphQLString },
    hsnSAC: { type: GraphQLString },
    GSTRate: { type: GraphQLString },
    qty: { type: GraphQLInt },
    rate: { type: GraphQLString },
    per: { type: GraphQLString },
    amount: { type: GraphQLString },
  }),
});

const InvTaxTableItemInputType = new GraphQLInputObjectType({
  name: "InvTaxTableInputItem",
  fields: () => ({
    hsnSAC: { type: GraphQLString },
    taxableValue: { type: GraphQLString },
    centralTaxRate: { type: GraphQLString },
    centralTaxAmt: { type: GraphQLString },
    stateTaxRate: { type: GraphQLString },
    stateTaxAmt: { type: GraphQLString },
  }),
});

const WarehouseReceiptItemInputType = new GraphQLInputObjectType({
  name: "WarehouseReceiptInputItem",
  fields: () => ({
    imgString: { type: GraphQLString },
  }),
});

const SrTableItemInputType = new GraphQLInputObjectType({
  name: "SrTableInputItem",
  fields: () => ({
    qty: { type: GraphQLInt },
    details: { type: GraphQLString },
    price: { type: GraphQLString },
    amount: { type: GraphQLString },
  }),
});

const OrderDeliveryHistoryInputType = new GraphQLInputObjectType({
  name: "OrderDeliveryHistoryInput",
  fields: () => ({
    timeStamp: { type: GraphQLString },
    status: { type: GraphQLString },
  }),
});

const OrderPaymentHistoryInputType = new GraphQLInputObjectType({
  name: "OrderPaymentHistoryInput",
  fields: () => ({
    timeStamp: { type: GraphQLString },
    amount: { type: GraphQLString },
    method: { type: GraphQLString },
    description: { type: GraphQLString },
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

const DlomOrderType = new GraphQLObjectType({
  name: "DlomOrder",
  fields: () => ({
    id: { type: GraphQLID },
    client: {
      type: DlomClientType,
      resolve(parent, args) {
        return DlomClient.findById(parent.clientId);
      },
    },
    salesperson: {
      type: GraphQLString,
    },
    salesOrder: {
      type: new GraphQLObjectType({
        name: "salesOrderObject",
        fields: () => ({
          distributorName: { type: GraphQLString },
          distributorDetails: { type: GraphQLString },
          voucherNo: { type: GraphQLString },
          dated: { type: GraphQLString },
          modeTermsOfPayment: { type: GraphQLString },
          buyerRefOrderNo: { type: GraphQLString },
          otherRef: { type: GraphQLString },
          invoiceTo: { type: GraphQLString },
          despatchThrough: { type: GraphQLString },
          destination: { type: GraphQLString },
          termsOfDelivery: { type: GraphQLString },
          soTable: { type: new GraphQLList(SOTableItemType) },
          totalQty: { type: GraphQLInt },
          totalAmt: { type: GraphQLString },
          amtInWords: { type: GraphQLString },
        }),
      }),
    },
    invoice: {
      type: new GraphQLObjectType({
        name: "invoiceObject",
        fields: () => ({
          distributorName: { type: GraphQLString },
          distributorDetails: { type: GraphQLString },
          invoiceNo: { type: GraphQLString },
          dated: { type: GraphQLString },
          deliveryNote: { type: GraphQLString },
          supplierRef: { type: GraphQLString },
          otherRef: { type: GraphQLString },
          client: { type: GraphQLString },
          despatchDocNo: { type: GraphQLString },
          deliveryNoteDate: { type: GraphQLString },
          despatchedThrough: { type: GraphQLString },
          destination: { type: GraphQLString },
          invTable: { type: new GraphQLList(InvTableItemType) },
          totalQty: { type: GraphQLInt },
          totalAmount: { type: GraphQLString },
          amtChargableInWords: { type: GraphQLString },
          invTaxTable: { type: new GraphQLList(InvTaxTableItemType) },
          totalTaxableValue: { type: GraphQLString },
          totalCentralTaxAmt: { type: GraphQLString },
          totalStateTaxAmt: { type: GraphQLString },
          taxAmtInWords: { type: GraphQLString },
          companyPAN: { type: GraphQLString },
          companyBankDetails: {
            type: new GraphQLObjectType({
              name: "companyBankDetailsObject",
              fields: () => ({
                bankName: { type: GraphQLString },
                acNo: { type: GraphQLString },
                BranchIFSCode: { type: GraphQLString },
              }),
            }),
          },
          for: { type: GraphQLString },
        }),
      }),
    },
    wareHouseReceipt: { type: new GraphQLList(WarehouseReceiptItemType) },
    salesReceipt: {
      type: new GraphQLObjectType({
        name: "salesReceiptObject",
        fields: () => ({
          distributorName: { type: GraphQLString },
          distributorDetails: { type: GraphQLString },
          soldBy: { type: GraphQLString },
          date: { type: GraphQLString },
          name: { type: GraphQLString },
          address: { type: GraphQLString },
          mode: { type: GraphQLString },
          srTable: { type: new GraphQLList(SrTableItemType) },
        }),
      }),
    },
    orderDelivery: {
      type: new GraphQLObjectType({
        name: "orderDeliveryObject",
        fields: () => ({
          history: { type: new GraphQLList(OrderDeliveryHistoryType) },
        }),
      }),
    },
    orderCancel: {
      type: new GraphQLObjectType({
        name: "orderCancelObject",
        fields: () => ({
          timeStamp: { type: GraphQLString },
          state: { type: GraphQLString },
          desc: { type: GraphQLString },
        }),
      }),
    },
    orderPayment: {
      type: new GraphQLObjectType({
        name: "orderPaymentObject",
        fields: () => ({
          history: { type: new GraphQLList(OrderPaymentHistoryType) },
        }),
      }),
    },
    createdAt: { type: GraphQLString },
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
    orders: {
      type: new GraphQLList(DlomOrderType),
      resolve(parent, args) {
        return DlomOrder.find();
      },
    },
    order: {
      type: DlomOrderType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return DlomOrder.findById(args.id);
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
    addOrder: {
      type: DlomOrderType,
      args: {
        clientId: { type: GraphQLID },
        salesperson: { type: GraphQLString },
        salesOrder: {
          type: new GraphQLInputObjectType({
            name: "salesOrderInputObject",
            fields: () => ({
              distributorName: { type: GraphQLString },
              distributorDetails: { type: GraphQLString },
              voucherNo: { type: GraphQLString },
              dated: { type: GraphQLString },
              modeTermsOfPayment: { type: GraphQLString },
              buyerRefOrderNo: { type: GraphQLString },
              otherRef: { type: GraphQLString },
              invoiceTo: { type: GraphQLString },
              despatchThrough: { type: GraphQLString },
              destination: { type: GraphQLString },
              termsOfDelivery: { type: GraphQLString },
              soTable: { type: new GraphQLList(SOTableItemInputType) },
              totalQty: { type: GraphQLInt },
              totalAmt: { type: GraphQLString },
              amtInWords: { type: GraphQLString },
            }),
          }),
        },
        invoice: {
          type: new GraphQLInputObjectType({
            name: "invoiceInputObject",
            fields: () => ({
              distributorName: { type: GraphQLString },
              distributorDetails: { type: GraphQLString },
              invoiceNo: { type: GraphQLString },
              dated: { type: GraphQLString },
              deliveryNote: { type: GraphQLString },
              supplierRef: { type: GraphQLString },
              otherRef: { type: GraphQLString },
              client: { type: GraphQLString },
              despatchDocNo: { type: GraphQLString },
              deliveryNoteDate: { type: GraphQLString },
              despatchedThrough: { type: GraphQLString },
              destination: { type: GraphQLString },
              invTable: { type: new GraphQLList(InvTableItemInputType) },
              totalQty: { type: GraphQLInt },
              totalAmount: { type: GraphQLString },
              amtChargableInWords: { type: GraphQLString },
              invTaxTable: { type: new GraphQLList(InvTaxTableItemInputType) },
              totalTaxableValue: { type: GraphQLString },
              totalCentralTaxAmt: { type: GraphQLString },
              totalStateTaxAmt: { type: GraphQLString },
              taxAmtInWords: { type: GraphQLString },
              companyPAN: { type: GraphQLString },
              companyBankDetails: {
                type: new GraphQLInputObjectType({
                  name: "companyBankDetailsInputObject",
                  fields: () => ({
                    bankName: { type: GraphQLString },
                    acNo: { type: GraphQLString },
                    BranchIFSCode: { type: GraphQLString },
                  }),
                }),
              },
              for: { type: GraphQLString },
            }),
          }),
        },
        wareHouseReceipt: {
          type: new GraphQLList(WarehouseReceiptItemInputType),
        },
        salesReceipt: {
          type: new GraphQLInputObjectType({
            name: "salesReceiptInputObject",
            fields: () => ({
              distributorName: { type: GraphQLString },
              distributorDetails: { type: GraphQLString },
              soldBy: { type: GraphQLString },
              date: { type: GraphQLString },
              name: { type: GraphQLString },
              address: { type: GraphQLString },
              mode: { type: GraphQLString },
              srTable: { type: new GraphQLList(SrTableItemInputType) },
            }),
          }),
        },
        orderDelivery: {
          type: new GraphQLInputObjectType({
            name: "orderDeliveryInputObject",
            fields: () => ({
              history: { type: new GraphQLList(OrderDeliveryHistoryInputType) },
            }),
          }),
        },
        orderCancel: {
          type: new GraphQLInputObjectType({
            name: "orderCancelInputObject",
            fields: () => ({
              timeStamp: { type: GraphQLString },
              state: { type: GraphQLString },
              desc: { type: GraphQLString },
            }),
          }),
        },
        orderPayment: {
          type: new GraphQLInputObjectType({
            name: "orderPaymentInputObject",
            fields: () => ({
              history: { type: new GraphQLList(OrderPaymentHistoryInputType) },
            }),
          }),
        },
      },
      resolve(parent, args) {
        const order = new DlomOrder({
          clientId: args.clientId,
          salesperson: args.salesperson,
          salesOrder: args.salesOrder,
          invoice: args.invoice,
          wareHouseReceipt: args.wareHouseReceipt,
          salesReceipt: args.salesReceipt,
          orderDelivery: args.orderDelivery,
          orderCancel: args.orderCancel,
          orderPayment: args.orderPayment,
        });
        return order.save();
      },
    },
    updateOrder: {
      type: DlomOrderType,
      args: {
        id: { type: GraphQLID },
        clientId: { type: GraphQLID },
        salesperson: { type: GraphQLString },
        salesOrder: {
          type: new GraphQLInputObjectType({
            name: "salesOrderUpdateInputObject",
            fields: () => ({
              distributorName: { type: GraphQLString },
              distributorDetails: { type: GraphQLString },
              voucherNo: { type: GraphQLString },
              dated: { type: GraphQLString },
              modeTermsOfPayment: { type: GraphQLString },
              buyerRefOrderNo: { type: GraphQLString },
              otherRef: { type: GraphQLString },
              invoiceTo: { type: GraphQLString },
              despatchThrough: { type: GraphQLString },
              destination: { type: GraphQLString },
              termsOfDelivery: { type: GraphQLString },
              soTable: { type: new GraphQLList(SOTableItemInputType) },
              totalQty: { type: GraphQLInt },
              totalAmt: { type: GraphQLString },
              amtInWords: { type: GraphQLString },
            }),
          }),
        },
        invoice: {
          type: new GraphQLInputObjectType({
            name: "invoiceUpdateInputObject",
            fields: () => ({
              distributorName: { type: GraphQLString },
              distributorDetails: { type: GraphQLString },
              invoiceNo: { type: GraphQLString },
              dated: { type: GraphQLString },
              deliveryNote: { type: GraphQLString },
              supplierRef: { type: GraphQLString },
              otherRef: { type: GraphQLString },
              client: { type: GraphQLString },
              despatchDocNo: { type: GraphQLString },
              deliveryNoteDate: { type: GraphQLString },
              despatchedThrough: { type: GraphQLString },
              destination: { type: GraphQLString },
              invTable: { type: new GraphQLList(InvTableItemInputType) },
              totalQty: { type: GraphQLInt },
              totalAmount: { type: GraphQLString },
              amtChargableInWords: { type: GraphQLString },
              invTaxTable: { type: new GraphQLList(InvTaxTableItemInputType) },
              totalTaxableValue: { type: GraphQLString },
              totalCentralTaxAmt: { type: GraphQLString },
              totalStateTaxAmt: { type: GraphQLString },
              taxAmtInWords: { type: GraphQLString },
              companyPAN: { type: GraphQLString },
              companyBankDetails: {
                type: new GraphQLInputObjectType({
                  name: "companyBankDetailsUpdateInputObject",
                  fields: () => ({
                    bankName: { type: GraphQLString },
                    acNo: { type: GraphQLString },
                    BranchIFSCode: { type: GraphQLString },
                  }),
                }),
              },
              for: { type: GraphQLString },
            }),
          }),
        },
        wareHouseReceipt: {
          type: new GraphQLList(WarehouseReceiptItemInputType),
        },
        salesReceipt: {
          type: new GraphQLInputObjectType({
            name: "salesReceiptUpdateInputObject",
            fields: () => ({
              distributorName: { type: GraphQLString },
              distributorDetails: { type: GraphQLString },
              soldBy: { type: GraphQLString },
              date: { type: GraphQLString },
              name: { type: GraphQLString },
              address: { type: GraphQLString },
              mode: { type: GraphQLString },
              srTable: { type: new GraphQLList(SrTableItemInputType) },
            }),
          }),
        },
        orderDelivery: {
          type: new GraphQLInputObjectType({
            name: "orderDeliveryUpdateInputObject",
            fields: () => ({
              history: { type: new GraphQLList(OrderDeliveryHistoryInputType) },
            }),
          }),
        },
        orderCancel: {
          type: new GraphQLInputObjectType({
            name: "orderCancelUpdateInputObject",
            fields: () => ({
              timeStamp: { type: GraphQLString },
              state: { type: GraphQLString },
              desc: { type: GraphQLString },
            }),
          }),
        },
        orderPayment: {
          type: new GraphQLInputObjectType({
            name: "orderPaymentUpdateInputObject",
            fields: () => ({
              history: { type: new GraphQLList(OrderPaymentHistoryInputType) },
            }),
          }),
        },
      },
      resolve(parent, args) {
        return DlomOrder.findByIdAndUpdate(
          args.id,
          {
            $set: {
              clientId: args.clientId,
              salesperson: args.salesperson,
              salesOrder: args.salesOrder,
              invoice: args.invoice,
              wareHouseReceipt: args.wareHouseReceipt,
              salesReceipt: args.salesReceipt,
              orderDelivery: args.orderDelivery,
              orderCancel: args.orderCancel,
              orderPayment: args.orderPayment,
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
