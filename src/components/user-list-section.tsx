import {
  BankOutlined,
  GlobalOutlined,
  MailOutlined,
  PhoneOutlined,
  PushpinOutlined,
} from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import {
  Avatar,
  Card,
  Col,
  Empty,
  Flex,
  Form,
  Layout,
  List,
  Row,
  Skeleton,
  Typography,
} from "antd";
import { useMemo } from "react";
import type { UserResponse } from "../types/user";

export function UserListSection() {
  const queryClient = useQueryClient();
  const status = queryClient.getQueryState(["users"])?.status;
  const users = queryClient.getQueryState(["users"])?.data as UserResponse[];

  const formFilter = Form.useFormInstance();
  const searchUsername = Form.useWatch("search", formFilter) as string;
  const city = Form.useWatch("city", formFilter) as string;
  const company = Form.useWatch("company", formFilter) as string;

  const filteredUsers = useMemo(
    () =>
      users?.filter(
        (user) =>
          (!searchUsername ||
            user.name.toLowerCase().includes(searchUsername.toLowerCase())) &&
          (!city || user.address.city.toLowerCase() === city.toLowerCase()) &&
          (!company ||
            user.company.name.toLowerCase() === company.toLowerCase())
      ) || [],
    [searchUsername, city, company, users]
  );

  return (
    <Layout.Content
      style={{
        padding: 16,
        height: "100vh",
        overflow: "scroll",
      }}
    >
      {status === "pending" ? (
        <Row gutter={[16, 16]}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Col span={24} md={12} key={index}>
              <Card>
                <Skeleton active />
                <Skeleton.Node active style={{ height: 16, width: 300 }} />
                <Skeleton.Node
                  active
                  style={{ height: 16, width: 350, marginTop: 16 }}
                />
                <Skeleton.Node
                  active
                  style={{ height: 16, width: 200, marginTop: 16 }}
                />
              </Card>
            </Col>
          ))}
        </Row>
      ) : status === "success" && filteredUsers?.length > 0 ? (
        <Row gutter={[16, 16]}>
          {filteredUsers?.map((user) => (
            <Col span={24} md={12} key={user.id}>
              <Card
                title={
                  <Flex align="center" gap={8}>
                    <Avatar>{user.name.slice(0, 1)}</Avatar>
                    <Typography.Text>{user.name}</Typography.Text>
                  </Flex>
                }
                styles={{ body: { padding: "0px 24px" } }}
              >
                <List
                  itemLayout="horizontal"
                  dataSource={[
                    { icon: <MailOutlined />, text: user.email },
                    { icon: <PushpinOutlined />, text: user.address.city },
                    { icon: <BankOutlined />, text: user.company.name },
                    { icon: <PhoneOutlined />, text: user.phone },
                    { icon: <GlobalOutlined />, text: user.website },
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      <Flex align="center" gap={8}>
                        {item.icon}
                        <Typography.Text type="secondary">
                          {item.text}
                        </Typography.Text>
                      </Flex>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          ))}
        </Row>
      ) : status === "error" ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Failed to get users"
          style={{ marginTop: 150 }}
        />
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{ marginTop: 150 }}
        />
      )}
    </Layout.Content>
  );
}
