import React, { useState } from "react";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";

import {
  Table,
  Tag,
  Space,
  Button,
  Tooltip,
  Modal,
  Form,
  Input,
  Checkbox,
  notification,
  Select,
  DatePicker,
  Row,
  Col,
  InputNumber,
  Upload,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CarryOutOutlined,
  CheckCircleOutlined,
  UploadOutlined 
} from "@ant-design/icons";
const { Option } = Select;

const { Column, ColumnGroup } = Table;
import Dashboard from "../../../components/Dashboard";
import axios from "axios";
import Axios from "../../../libs/axios";
import TextArea from "antd/lib/input/TextArea";
import Link from "next/link";

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record) => {
    if (record) {
      return {
        disabled: record.name === "Disabled User",
        // Column configuration not to be checked
        name: record.name,
      };
    }
  },
};

const ManageTasksPage = ({ properties, tenants, advances }) => {
  const { data: session, status } = useSession();
  const [allAdvances, setAdvances] = useState(advances);
  const [allProperties, setAllProperties] = useState(properties);
  const [allTenants, setTenants] = useState(tenants);
  const [allSelectedTenant, setSelectedTenant] = useState(null);
  const [allSelectedProperty, setSelectedProperty] = useState(null);

  const [addTaskModal, setAddTaskModal] = useState(false);
  const [editTaskModal, setEditTaskModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUserExist, setIsUserExist] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [images, setImages] = useState('');
  const [fields, setFields] = useState([
    {
      name: ["title"],
      value: "",
    },
    {
      name: ["description"],
      value: "",
    },
    {
      name: ["id"],
      value: "",
    },
  ]);

  const formRef = React.useRef(null);
  const editFormRef = React.useRef(null);
  const router = useRouter();

  React.useEffect(() => {
    if (isUserExist) {
      setTimeout(() => {
        setIsUserExist("");
      }, 3000);
    }
  }, [isUserExist]);
  const openAddTaskModal = () => {
    setAddTaskModal(true);
  };
  const closeAddTaskModal = () => {
    setAddTaskModal(false);
    formRef.current.resetFields();
  };
  const openEditTaskModal = (task) => {
    setFields(
      (state) =>
        (state = [
          {
            name: ["property"],
            value: task.property,
          },
          {
            name: ["description"],
            value: task.description,
          },
          {
            name: ["id"],
            value: task._id,
          },
        ])
    );
    setEditTaskModal(true);
  };
  const closeEditTaskModal = () => {
    setEditTaskModal(false);
    editFormRef.current.resetFields();
  };
  const addTask = async (values) => {
    const data = {
        tenant: {
            fullName: allSelectedTenant.fullName,
            phone: allSelectedTenant.phone,
            username: allSelectedTenant.username,
          },
        landlord: {
            fullName: session.user.name,
            phone: session.user.phone,
            username: session.user.username,
          },
        property: {
            title: allSelectedProperty.title,
            description: allSelectedProperty.description,
            region: allSelectedProperty.region,
            city: allSelectedProperty.city,
            price: allSelectedProperty.price,
            type: allSelectedProperty.type,
          },
          startDate: values.startDate,
          endDate: values.endDate,
          tenantId: allSelectedTenant._id,
          landlordId: session.user.id,
    }
    setIsSubmitting(true);
    Axios
      .post("/advances/create", data)
      .then(({ data }) => {
        closeAddTaskModal();
        setIsSubmitting(false);
        notification.success({
          description: `Advance added successfully!`,
        });
        setAllProperties(
          (addvances) => (addvances = [{ ...data, key: data._id }, ...addvances])
        );
      })
      .catch((err) => {
        setIsSubmitting(false);
        if (err["response"]) {
          if (err.response.status == 400) {
            setIsUserExist(err.response.data.message);
          } else {
            console.trace(err);
          }
        } else {
          console.trace(err);
        }
      });
  };

  const editTask = (values) => {
    setIsSubmitting(true);
    axios
      .put(`/api/tasks/edit/${values.id}`, {
        title: values.title,
        description: values.description,
      })
      .then(({ data }) => {
        closeEditTaskModal();
        setIsSubmitting(false);
        notification.success({
          description: `Tasks updated successfully!`,
        });
        setAllTasks(
          (tasks) =>
            (tasks = tasks.map((task) => {
              if (task._id === data.task._id) {
                return {
                  ...data.task,
                  title: values.title,
                  description: values.description,
                  key: data.task._id,
                };
              }
              return task;
            }))
        );
      })
      .catch((err) => {
        setIsSubmitting(false);
        if (err["response"]) {
          if (err.response.status == 401) {
            setIsUserExist(err.response.data.message);
          } else {
            console.trace(err);
          }
        } else {
          console.trace(err);
        }
      });
  };
  const markTaskCompleted = (value) => {
    const status = !value.started
      ? { started: true }
      : !value.completed
      ? { completed: true }
      : "";
    if (status) {
      axios
        .put(`/api/tasks/status/${value._id}`, status)
        .then(({ data }) => {
          notification.success({
            description: `Status updated successfully!`,
          });
          setAllTasks(
            (tasks) =>
              (tasks = tasks.map((task) => {
                if (task._id === data.task._id) {
                  return { ...data.task, key: data.task._id };
                }
                return task;
              }))
          );
          router.push("/dashboard");
        })
        .catch((err) => {
          setIsSubmitting(false);
          if (err["response"]) {
            if (err.response.status == 401) {
              setIsUserExist(err.response.data.message);
            } else {
              console.trace(err);
            }
          } else {
            console.trace(err);
          }
        });
    }
  };

  const deleteTask = (task) => {
    axios
      .delete(`/api/tasks/delete/${task._id}`)
      .then(({ data }) => {
        notification.success({
          description: `Task deleted successfully!`,
        });
        let newTasks = allProperties;
        newTasks.splice(
          newTasks.findIndex((t) => t._id === task._id),
          1
        );
        setAllTasks((tasks) => (tasks = [...newTasks]));
      })
      .catch((err) => {
        console.trace(err);
      });
  };

 
  const onPropertyChange = (value) => {
    setSelectedProperty((state) => (state = allProperties.find((a) => a._id === value)));
  };
  const onTenantChange = (value) => {
    setSelectedTenant((state) => (state = allTenants.find((t) => t._id === value)));
  };

  React.useEffect(() => {
    Axios.get("/cities")
      .then((res) => {
        setCities((c) => (c = [...res.data]));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const normFile = (e) => {
    console.log(e)
    if (Array.isArray(e)) {
      return e;
    }
  
    return e && e.fileList;
  };
  const dashboardLinks = [
    { url: "/dashboard/landlord", label: "Properties" },
    { url: "/dashboard/landlord/advances", label: "Advances" },
  ];

  return (
    <Dashboard pageHeader="My Advances" links={dashboardLinks}>
      <div className="table__header">
        <div className="table__header__left">
          <h4>Advances</h4>
        </div>
        <div className="table__header__right" onClick={openAddTaskModal}>
          <Button icon={<CarryOutOutlined />}>Add New Advance</Button>
        </div>
      </div>

      <Modal
        title="Add New Advance"
        visible={addTaskModal}
        onOk={openAddTaskModal}
        onCancel={closeAddTaskModal}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={addTask}
          autoComplete="off"
          ref={formRef}
        >
          <Form.Item name="property" label="Property" rules={[{ required: true }]}>
            <Select
              placeholder="Select a property"
              onChange={onPropertyChange}
              allowClear
            >
              {allProperties.map((property) => (
                <Option value={property._id} key={property.title}>
                  {`${property.title} - GHS${property.price}/month` }
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="tenant" label="Tenant" rules={[{ required: true }]}>
            <Select placeholder="Select a city" onChange={onTenantChange} allowClear>
              {allTenants.map((tenant) => (
                <Option value={tenant._id} key={tenant.fullName}>
                  {tenant.fullName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <Form.Item
                label="Advance (Start)"
                name="startDate"
                rules={[
                  {
                    required: true,
                    message: "Please select date!",
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item
                label="Advance (End)"
                name="endDate"
                rules={[
                  {
                    required: true,
                    message: "Please select date!",
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>
            </Col>
          </Row>
           <Form.Item>
            <div className="form__button">
              <Button onClick={closeAddTaskModal}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={isSubmitting}>
                Add
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Advance"
        visible={editTaskModal}
        onOk={openEditTaskModal}
        onCancel={closeEditTaskModal}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={editTask}
          autoComplete="off"
          ref={editFormRef}
          fields={fields}
          onFieldsChange={(_, allFields) => {
            setFields(allFields);
          }}
        >
          <Form.Item name="Property" label="Property" rules={[{ required: true }]}>
            <Select
              placeholder="Select a property"
              allowClear
            >
              {allProperties.map((property) => (
                <Option value={property._id} key={property.title}>
                  {`${property.title} - GHS${property.price}/month` }
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="tenant" label="Tenant" rules={[{ required: true }]}>
            <Select placeholder="Select a city" allowClear>
              {allTenants.map((tenant) => (
                <Option value={tenant._id} key={tenant.fullName}>
                  {tenant.fullName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <Form.Item
                label="Advance (Start)"
                name="startDate"
                rules={[
                  {
                    required: true,
                    message: "Please select date!",
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item
                label="Advance (End)"
                name="endDate"
                rules={[
                  {
                    required: true,
                    message: "Please select date!",
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="id" hidden>
            <Input hidden />
          </Form.Item>
          <Form.Item>
            <div className="form__button">
              <Button onClick={closeEditTaskModal}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={isSubmitting}>
                Save
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      <Table
        dataSource={allAdvances}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
      >
        <Column title="Tenant" dataIndex="tenant" key="tenant" render={(text, record) => (
           <Space size="3">
            <p>{`Name: ${record.tenant.fullName}`}</p>
            <p>{`Email: ${record.tenant.username}`}</p>
            <p>{`Phone: ${record.tenant.phone}`}</p>
           </Space>
        )} />
        <Column title="Title" dataIndex="property" key="property" render={(text, record) => (
           <Space size="left">
            {record.property.title}
           </Space>
        )} />
        <Column title="City" dataIndex="city" key="city" render={(text, record) => (
           <Space size="left">
            {record.property.city}
           </Space>
        )} />
        <Column title="Type" dataIndex="type" key="type" render={(text, record) => (
           <Space size="left">
            {record.property.type}
           </Space>
        )} />
        <Column title="Price (GHS)" dataIndex="price" key="price" render={(text, record) => (
           <Space size="left">
            {record.property.price}
           </Space>
        )} />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Tooltip title="Edit">
                <Button
                  type="dashed"
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={() => openEditTaskModal(record)}
                />
              </Tooltip>
              <Tooltip title="Delete">
                <Button
                  type="dashed"
                  danger
                  shape="circle"
                  icon={<DeleteOutlined />}
                  onClick={() => deleteTask(record)}
                />
              </Tooltip>
            </Space>
          )}
        />
      </Table>
    </Dashboard>
  );
};

export async function getServerSideProps(ctx) {
    let properties = [];
    let tenants = [];
    let advances = [];
    try {
      const {user} = await getSession(ctx)
  
      let { data:propertyData } = await Axios.get(`/apartments/index/${user.id}`); //get user from session
      if (propertyData && propertyData.length) {
        properties = propertyData.map((property) => {
          return { ...property, key: property._id };
        });
      } else {
        properties = [];
      }
      let { data:tenantData } = await Axios.get("/tenants");
      if (tenantData && tenantData.length) {
        tenants = tenantData.map((tenant) => {
          return { ...tenant, key: tenant._id };
        });
      } else {
        tenants = [];
      }
      let { data:advanceData } = await Axios.get(`/advances/index/${user.id}`);
      if (advanceData && advanceData.length) {
        advances = advanceData.map((advance) => {
          return { ...advance, key: advance._id };
        });
      } else {
        advances = [];
      }
    } catch (error) {
      console.log(error)
      throw Error("Could not fetch page data");
    }
    return {
      props: { properties, tenants, advances },
    };
}

export default ManageTasksPage;
