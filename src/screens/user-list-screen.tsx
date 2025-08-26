import { Flex, Form, Grid, Layout } from "antd";
import { FilterSection } from "../components/filter-section";
import { UserListSection } from "../components/user-list-section";
import { useQuery } from "@tanstack/react-query";
import type { UserResponse } from "../types/user";

const apiUrl = import.meta.env.VITE_API_URL;

export function UserListScreen() {
  const [form] = Form.useForm();
  const { md, lg } = Grid.useBreakpoint();

  useQuery<UserResponse[]>({
    queryKey: ["users"],
    queryFn: () => fetch(`${apiUrl}/users`).then((res) => res.json()),
  });

  return (
    <Layout style={{ maxWidth: 1400, margin: "0 auto" }}>
      <Form form={form} layout="vertical" style={{ width: "100%" }}>
        <Flex vertical={md || lg ? false : true}>
          <FilterSection />
          <UserListSection />
        </Flex>
      </Form>
    </Layout>
  );
}
