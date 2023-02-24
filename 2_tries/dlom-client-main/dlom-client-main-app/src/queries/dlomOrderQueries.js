import { gql } from "@apollo/client";

const GET_ORDERS = gql`
  query getOrders {
    orders {
      id
      client {
        id
        companyName
        contactPersonName
        address
        gst
      }
      salesperson
      salesOrder {
        distributorName
        distributorDetails
        voucherNo
        dated
        modeTermsOfPayment
        buyerRefOrderNo
        otherRef
        invoiceTo
        despatchThrough
        destination
        termsOfDelivery
        soTable {
          siNo
          descriptionOfGoods
          dueOn
          qty
          rate
          per
          amount
        }
        totalQty
        totalAmt
        amtInWords
      }
      invoice {
        distributorName
        distributorDetails
        invoiceNo
        dated
        deliveryNote
        supplierRef
        otherRef
        client
        despatchDocNo
        deliveryNoteDate
        despatchedThrough
        destination
        invTable {
          siNo
          descriptionOfGoods
          hsnSAC
          GSTRate
          qty
          rate
          per
          amount
        }
        totalQty
        totalAmount
        amtChargableInWords
        invTaxTable {
          hsnSAC
          taxableValue
          centralTaxRate
          centralTaxAmt
          stateTaxRate
          stateTaxAmt
        }
        totalTaxableValue
        totalCentralTaxAmt
        totalStateTaxAmt
        taxAmtInWords
        companyPAN
        companyBankDetails {
          bankName
          acNo
          BranchIFSCode
        }
        for
      }
      wareHouseReceipt {
        imgString
      }
      salesReceipt {
        distributorName
        distributorDetails
        soldBy
        date
        name
        address
        mode
        srTable {
          qty
          details
          price
          amount
        }
      }

      orderDelivery {
        history {
          timeStamp
          status
        }
      }

      orderCancel {
        timeStamp
        state
        desc
      }

      orderPayment {
        history {
          timeStamp
          amount
          method
          description
        }
      }
    }
  }
`;

export { GET_ORDERS };
