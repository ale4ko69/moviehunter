import { httpAPI } from "../../service/httpService";

export const getTreeAPI = async ({
  url = "productline/getTree",
  producLineId = null,
  objectTypeId = "",
  profileType = "",
  getList = ""
}) => {
  let fullUrl = `${url}`;
  if (!producLineId && (objectTypeId || profileType || getList)) {
    throw new Error("Product Line Id is required");
  }

  if (producLineId) {
    fullUrl = `${fullUrl}?productLineId=${producLineId}`;

    if (objectTypeId) {
      fullUrl = `${fullUrl}&objectTypeId=${objectTypeId}`;
    } else if (profileType) {
      fullUrl = `${fullUrl}&profileType=${profileType}`;
    } else if (getList) {
      fullUrl = `${fullUrl}&profileType=${getList}`;
    }
  }
  const response = await httpAPI().get(`${fullUrl}`);
  return response.data;
};
