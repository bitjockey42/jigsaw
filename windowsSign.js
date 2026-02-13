export const windowsSign = {
  ...(process.env.SIGNTOOL_PATH
    ? { signToolPath: process.env.SIGNTOOL_PATH }
    : {}),
  signWithParams: `/v /debug /dlib ${process.env.AZURE_CODE_SIGNING_DLIB} /dmdf ${process.env.AZURE_METADATA_JSON}`,
  timestampServer: "http://timestamp.acs.microsoft.com",
  hashes: ["sha256"],
};