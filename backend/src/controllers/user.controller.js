import { HTTP } from "../constants/http.constants.js";
import { CatchAsyncError } from "../middleware/error.middleware.js";
import { User } from "../models/user.models.js";
import { UserAddress } from "../models/user_address.models.js";
import { APIError, APIResponse } from "../utils/api_response.utils.js";

export const completeProfile = CatchAsyncError(async (req, res, next) => {
  const { cid } = req.query;
  const { address, city, landmark, pincode } = req.body;

  const user = await User.findOne({ client_id: cid }).select(
    "isProfileComplete , user_details"
  );
  if (!user)
    return APIError(
      res,
      HTTP.STATUS.NOT_FOUND,
      "Invalid client id",
      HTTP.ERROR_TYPES.NOT_FOUND
    );

  const user_address = await UserAddress.findOneAndUpdate(
    {
      client_id: cid,
      user_details: user.user_details._id,
    },
    { $set: { address, landmark, city, pincode } },
    { new: true }
  );
  if (!user_address)
    return APIError(
      res,
      HTTP.STATUS.NOT_FOUND,
      "User address doesn't exists",
      HTTP.ERROR_TYPES.NOT_FOUND
    );

  user.isProfileComplete = true;
  await user.save();
  return APIResponse(res, HTTP.STATUS.OK, "Profile completed", {
    isProfileComplete: user.isProfileComplete,
  });
});

export const uploadProfileImage = CatchAsyncError(async (req, res, next) => {
  const { cid } = req.query;
  const file = req.file;

  if (!file)
    return APIError(
      res,
      HTTP.STATUS.BAD_REQUEST,
      "Choose file to upload",
      HTTP.ERROR_TYPES.BAD_REQUEST
    );

  const user = await User.findOneAndUpdate(
    { client_id: cid },
    {
      $set: {
        profile_image: {
          image_url: file.path,
          public_id: file.filename,
        },
      },
    },
    { new: true }
  );
  if (!user)
    return APIError(
      res,
      HTTP.STATUS.BAD_REQUEST,
      "Invalid client id, User doesn't exist",
      HTTP.ERROR_TYPES.BAD_REQUEST
    );

  return APIResponse(res, HTTP.STATUS.OK, "Image uploaded successfullt");
});

export const profile = CatchAsyncError(async (req, res, next) => {
  const details = {};
  return APIResponse(res, HTTP.STATUS.OK, "Here is your profile details", {
    details,
  });
});
