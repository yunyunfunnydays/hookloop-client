import React, { useMemo, useRef, useState } from "react";
import { Select, Spin, Avatar } from "antd";
// eslint-disable-next-line import/no-extraneous-dependencies
import debounce from "lodash/debounce";
import { getMember } from "@/service/api";

const MemberSelect = (props: any) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const fetchRef = useRef(0);
  const call_getMember = async (value: string = "") => {
    const res: AxiosResponse = await getMember(value);
    const { status, data } = res.data as IApiResponse;
    if (status === "success") {
      const _data =
        data.members?.map((member: IUser) => ({
          ...member,
          key: member.email,
          label: (
            <span className="flex gap-1">
              <Avatar size="small" className="bg-gray-200" src={member.avatar.length > 0 && member.avatar}>
                {member.username[0]}
              </Avatar>
              {member.username}
            </span>
          ),
          value: member.userId,
        })) || [];
      return _data;
    }

    return [];
  };
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: any) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      call_getMember(value).then((newOptions) => {
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
  return (
    <Select
      showSearch
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
};

export default MemberSelect;
