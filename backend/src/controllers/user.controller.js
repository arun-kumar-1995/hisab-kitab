import { CatchAsyncError } from "../middleware/error.middleware.js";
import { User } from "../models/user.models.js";
import { APIError, APIResponse } from "../utils/api_response.utils.js";

export const completeProfile = CatchAsyncError(async (req, res, next) => {
  const { cid } = req.query;

  const user = await User.findOne({client_id : cid}).populate({path : "user_address" , select : "_id"}).lean();
  const user_address = await User
  return APIResponse(res, HTTP.STATUS.OK, "Profile completed", {
    isProfileComplete: true,
  });
});

export const profile = CatchAsyncError(async (req, res, next) => {
  const details = {};
  return APIResponse(res, HTTP.STATUS.OK, "Here is your profile details", {
    details,
  });
});
