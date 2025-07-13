const FIRST_NAME_REGEX = /^[a-zA-Z]{3,25}$/;
const LAST_NAME_REGEX = /^[a-zA-Z]{3,25}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^[6-9]\d{9}$/;
const PHONE_CODE_REGEX = /^\+[1-9]\d{0,2}$/;
const OTP_REGEX = /^\d{6}$/;

export const REGEX = {
  NAME: {
    FIRST_NAME: FIRST_NAME_REGEX,
    LAST_NAME: LAST_NAME_REGEX,
  },
  EMAIL: EMAIL_REGEX,
  PHONE: PHONE_REGEX,
  COUNTRY_CODE: PHONE_CODE_REGEX,
  OTP: OTP_REGEX,
};
