import Tracking from "../models/tracking.js";
import mongoose from "mongoose";
import DlomClient from "../models/dlomclient.js";

export const getTrackings = async (req, res) => {
  try {
    const trackings = await Tracking.find().populate("dlom_client");
    res.status(200).json(trackings);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createTracking = async (req, res) => {
  try {
    const tracking = req.body;
    const newTracking = new Tracking(tracking);
    console.log(tracking.dlom_client._id);
    let client_info = await DlomClient.findById(
      tracking.dlom_client._id
    ).populate("subscription");
    if (tracking.operation_type === "client create") {
      client_info.tracking.CliOps = client_info.tracking.CliOps + 1;
    } else if (tracking.operation_type === "user create") {
      client_info.tracking.UserOps = client_info.tracking.UserOps + 1;
    } else if (tracking.operation_type === "product create") {
      client_info.tracking.ProdOps = client_info.tracking.ProdOps + 1;
    } else if (tracking.operation_type === "order create") {
      client_info.tracking.OrderOps = client_info.tracking.OrderOps + 1;
    } else if (tracking.operation_type === "task create") {
      client_info.tracking.TaskOps = client_info.tracking.TaskOps + 1;
    }
    console.log(client_info);

    if (
      client_info.tracking.CliOps > client_info.subscription.tracking.CliOps
    ) {
      if (client_info.carryForward.CliOps > 1) {
        client_info.carryForward.CliOps = client_info.carryForward.CliOps - 1;
      } else {
        client_info.operations.CliOps = "not allowed";
      }
    }
    if (
      client_info.tracking.UserOps > client_info.subscription.tracking.UserOps
    ) {
      if (client_info.carryForward.UserOps > 1) {
        client_info.carryForward.UserOps = client_info.carryForward.UserOps - 1;
      } else {
        client_info.operations.UserOps = "not allowed";
      }
    }
    if (
      client_info.tracking.ProdOps > client_info.subscription.tracking.ProdOps
    ) {
      if (client_info.carryForward.ProdOps > 1) {
        client_info.carryForward.ProdOps = client_info.carryForward.ProdOps - 1;
      } else {
        client_info.operations.ProdOps = "not allowed";
      }
    }
    if (
      client_info.tracking.OrderOps > client_info.subscription.tracking.OrderOps
    ) {
      if (client_info.carryForward.OrderOps > 1) {
        client_info.carryForward.OrderOps =
          client_info.carryForward.OrderOps - 1;
      } else {
        client_info.operations.OrderOps = "not allowed";
      }
    }
    if (
      client_info.tracking.TaskOps > client_info.subscription.tracking.TaskOps
    ) {
      if (client_info.carryForward.TaskOps > 1) {
        client_info.carryForward.TaskOps = client_info.carryForward.TaskOps - 1;
      } else {
        client_info.operations.TaskOps = "not allowed";
      }
    }

    await DlomClient.findByIdAndUpdate(
      tracking.dlom_client._id,
      { ...client_info },
      { new: true }
    );

    await newTracking.save();
    res.status(201).json(newTracking);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
