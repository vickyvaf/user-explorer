import {
  BarsOutlined,
  ClearOutlined,
  SearchOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Col,
  Form,
  Grid,
  Input,
  Layout,
  Row,
  Select,
  Typography,
} from "antd";
import { Fragment, useEffect, useState } from "react";
import type { UserResponse } from "../types/user";

export function FilterSection() {
  const formFilter = Form.useFormInstance();
  const { md, lg } = Grid.useBreakpoint();

  const [isCollapse, setIsCollapse] = useState(true);

  const queryClient = useQueryClient();
  const users = queryClient.getQueryData(["users"]) as UserResponse[];

  const cityOptions = users?.map((user) => ({
    value: user.address.city,
    label: user.address.city,
  }));

  const companyOptions = users?.map((user) => ({
    value: user.company.name,
    label: user.company.name,
  }));

  useEffect(() => {
    setIsCollapse(md || lg ? false : true);
  }, [md, lg]);

  const isMobileView = !md && !lg;

  const formContent = (
    <>
      {md ? (
        <Typography.Title level={4} style={{ marginBottom: 24 }}>
          Filter
        </Typography.Title>
      ) : null}
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Form.Item
            name="search"
            label="User name"
            style={{ marginBottom: 8 }}
          >
            <Input placeholder="John" suffix={<SearchOutlined />} />
          </Form.Item>
        </Col>
        {!isCollapse ? (
          <Fragment>
            <Col span={24}>
              <Form.Item
                name="city"
                label="Select city"
                style={{ marginBottom: 8 }}
              >
                <Select placeholder="Gwenborough" options={cityOptions} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="company"
                label="Select company"
                style={{ marginBottom: 16 }}
              >
                <Select placeholder="Keebler LLC" options={companyOptions} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item style={{ marginBottom: 0 }}>
                <Button
                  icon={<ClearOutlined />}
                  type="primary"
                  style={{ width: "100%" }}
                  onClick={() => formFilter.resetFields()}
                >
                  Clear all filter
                </Button>
              </Form.Item>
            </Col>
          </Fragment>
        ) : null}
        <Col span={24}>
          {isMobileView ? (
            isCollapse ? (
              <Button
                icon={<BarsOutlined />}
                style={{ width: "100%" }}
                onClick={() => {
                  setIsCollapse(!isCollapse);
                }}
              >
                Filter
              </Button>
            ) : (
              <Button
                icon={<UpOutlined />}
                style={{ width: "100%" }}
                onClick={() => {
                  setIsCollapse(!isCollapse);
                }}
              >
                Collapse
              </Button>
            )
          ) : null}
        </Col>
      </Row>
    </>
  );

  return lg || md ? (
    <Layout.Sider
      theme="light"
      width={lg ? 350 : md ? 250 : 0}
      style={{
        padding: md ? "0px 16px" : 0,
      }}
    >
      {formContent}
    </Layout.Sider>
  ) : (
    <Layout.Header
      style={{ background: "white", minHeight: "fit-content", padding: 16 }}
    >
      {formContent}
    </Layout.Header>
  );
}
