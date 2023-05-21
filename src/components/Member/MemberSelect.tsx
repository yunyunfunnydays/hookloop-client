import React, { useMemo, useRef, useState } from "react";
import { Select, Spin } from "antd";
import debounce from "lodash/debounce";
import { getUsers } from "@/service/api";

const MemberSelect = (props: any) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const fetchRef = useRef(0);
  const call_getUsers = async (value: string = "") => {
    const res: AxiosResponse = await getUsers(value);
    const { status, data } = res.data as IApiResponse;
    if (status === "success") {
      console.log(data);
    }
  };
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      call_getUsers(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, 800);
  }, []);
  console.log("fetching = ", fetching);
  return (
    <Select
      showSearch
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      // notFoundContent={<Spin size="small" />}
      {...props}
      options={options}
    />
  );
};

export default MemberSelect;
