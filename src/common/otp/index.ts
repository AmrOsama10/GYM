export const generateOtp = () => {
  return Math.ceil(Math.random() * 9999 + 10000)as unknown as string
};

export const generateOtpExpiry = () => {
  return new Date(Date.now() + 5 * 60 * 1000);
};