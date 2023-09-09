import useSWR from "swr";
import { Sort } from "./useTable";

const removeEmpty = (obj: any) => {
  let newObj: any = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] === Object(obj[key])) {
      newObj[key] = removeEmpty(obj[key]);
    } else if (obj[key] !== undefined && obj[key] !== "" && obj[key] !== null) {
      newObj[key] = obj[key];
    }
  });

  return newObj;
};

const useIntegration = ({
  route,
  page,
  perPage,
  sort,
  filter,
}: {
  route: string;
  page?: number;
  perPage?: number;
  sort?: Sort;
  filter?: object;
}) => {
  const host = "/api/";
  const fetchUrl = `${route}?${page ? `&page=${page}` : ""}${
    perPage ? `&perPage=${perPage}` : ""
  }${sort?.field ? `&sort=${sort?.field}` : ""}${
    sort?.order ? `&order=${sort?.order}` : ""
  }${filter ? `&filter=${JSON.stringify(removeEmpty(filter))}` : ""}`;

  const fetchInfo = useSWR(host + fetchUrl, async (...args) => {
    const response = await fetch(...args);
    return response.json();
  });

  return fetchInfo;
};

export default useIntegration;
