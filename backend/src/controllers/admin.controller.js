import { HTTP } from "../constants/http.constants.js";
import { CatchAsyncError } from "../middleware/error.middleware.js";
import { User } from "../models/user.models.js";
import { APIError, APIResponse } from "../utils/api_response.utils.js";
import { Paginate } from "../utils/paginate.utils.js";

export const pendingAccounts = CatchAsyncError(async (req, res, next) => {
  
    // get all account id 
   
  const records = await Paginate( User);
  return APIResponse(res, HTTP.STATUS.OK, "Here are the records", { ...records });
});
