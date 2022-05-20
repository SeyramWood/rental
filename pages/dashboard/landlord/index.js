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

const ManageTasksPage = ({ properties }) => {
  const { data: session, status } = useSession();
  const [allApartments, setAllApartments] = useState(properties);
  
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
    }, {
      name: ["region"],
      value: "",
    }, {
      name: ["city"],
      value: "",
    }, {
      name: ["type"],
      value: "",
    },{
      name: ["price"],
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
            name: ["title"],
            value: task.title,
          },
          {
            name: ["description"],
            value: task.description,
          },
          {
            name: ["region"],
            value: task.region,
          },{
            name: ["city"],
            value: task.city,
          },{
            name: ["type"],
            value: task.type,
          },{
            name: ["price"],
            value: task.price,
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
    let data = new FormData()
    data.append("title", values.title);
    data.append("description", values.description);
    data.append("region", values.region);
    data.append("city", values.city);
    data.append("type", values.type);
    data.append("price", values.price);
    data.append("landlord", session.user.id);
    data.append(`images`, values.images[0])
    values.images.forEach((image) => {
      data.append(`images`, image.originFileObj)
    });

    setIsSubmitting(true);

    Axios
      .post("/apartments/create", data, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      .then(({ data }) => {
        closeAddTaskModal();
        console.log(data);
        setIsSubmitting(false);
        notification.success({
          description: `Property added successfully!`,
        });
        setAllApartments(
          (properties) => (properties = [{ ...data, key: data._id }, ...properties])
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
    Axios
      .put(`/apartments/edit/${values.id}`, values)
      .then(({ data }) => {
        closeEditTaskModal();
        setIsSubmitting(false);
        notification.success({
          description: `Property updated successfully!`,
        });
        setAllApartments(
          (properties) =>
            (properties = properties.map((property) => {
              if (property._id === data.property._id) {
                return {
                  ...data.property,
                  price:values.price,
                  title:values.title,
                  city:values.city,
                  region:values.region,
                  key: data.property._id,
                };
              }
              return property;
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
    Axios
      .delete(`/apartments/delete/${task._id}`)
      .then(({ data }) => {
        notification.success({
          description: `Property deleted successfully!`,
        });
        let newTasks = allApartments;
        newTasks.splice(
          newTasks.findIndex((t) => t._id === task._id),
          1
        );
        setAllApartments((tasks) => (tasks = [...newTasks]));
      })
      .catch((err) => {
        console.trace(err);
      });
  };

 
  const onGenderChange = (value) => {
    const result = cities.find((r) => r.region === value);
    setSelectedCities((state) => (state = result.cities));
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
    <Dashboard pageHeader="My Properties" links={dashboardLinks}>
      <div className="table__header">
        <div className="table__header__left">
          <h4>Properties</h4>
        </div>
        <div className="table__header__right" onClick={openAddTaskModal}>
          <Button icon={<CarryOutOutlined />}>Add New Property</Button>
        </div>
      </div>

      <Modal
        title="Add New Property"
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
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input property title!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input description!",
              },
            ]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item name="region" label="Region" rules={[{ required: true }]}>
            <Select
              placeholder="Select a region"
              onChange={onGenderChange}
              allowClear
            >
              {cities.map((city) => (
                <Option value={city.region} key={city.region}>
                  {city.region}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="city" label="City" rules={[{ required: true }]}>
            <Select placeholder="Select a city" allowClear>
              {selectedCities.map((city) => (
                <Option value={city} key={city}>
                  {city}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Select placeholder="Select a type" allowClear>
              <Option value="Single Room">Single Room</Option>
              <Option value="Chamber and Hall">Chamber and Hall</Option>
              <Option value="Apartment and Flat">Apartment and Flat</Option>
              <Option value="Townhouse">Townhouse</Option>
              <Option value="Semi-Detached">Semi-Detached</Option>
              <Option value="Self-Contained">Self-Contained</Option>
              <Option value="Mansion">Mansion</Option>
            </Select>
          </Form.Item>
          <Form.Item 
          label="Price (Month)"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Please input price!",
                  },
                ]}>
          <InputNumber addonBefore="GHS" min={1} />
          </Form.Item>
          <Form.Item
        name="images"
        label="Images"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        
      >
        <Upload name="image" listType="picture" multiple>
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>
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
        title="Edit Property"
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
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input property title!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input description!",
              },
            ]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item name="region" label="Region" rules={[{ required: true }]}>
            <Select
              placeholder="Select a region"
              onChange={onGenderChange}
              allowClear
            >
              {cities.map((city) => (
                <Option value={city.region} key={city.region}>
                  {city.region}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="city" label="City" rules={[{ required: true }]}>
            <Select placeholder="Select a city" allowClear>
              {selectedCities.map((city) => (
                <Option value={city} key={city}>
                  {city}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Select placeholder="Select a type" allowClear>
              <Option value="Single Room">Single Room</Option>
              <Option value="Chamber and Hall">Chamber and Hall</Option>
              <Option value="Apartment and Flat">Apartment and Flat</Option>
              <Option value="Townhouse">Townhouse</Option>
              <Option value="Semi-Detached">Semi-Detached</Option>
              <Option value="Self-Contained">Self-Contained</Option>
              <Option value="Mansion">Mansion</Option>
            </Select>
          </Form.Item>
          <Form.Item 
          label="Price (Month)"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Please input price!",
                  },
                ]}>
          <InputNumber addonBefore="GHS" min={1} />
          </Form.Item>
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
        dataSource={allApartments}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
      >
        <Column title="Price/Month GHS" dataIndex="price" key="price" />
        <Column title="Title" dataIndex="title" key="title" />
        <Column title="City" dataIndex="city" key="city" />
        <Column title="Region" dataIndex="region" key="region" />

        <Column
          title="Status"
          key="status"
          render={(text, record) => (
            <Space size="middle">
              {record.status? (
                <Tag color="green" key={status}>
                  Occupied
                </Tag>
              ) : (
                <Tag color="geekblue" key={status}>
                  Not Occupied
                </Tag>
              )}
            </Space>
          )}
        />
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
  try {
    const {user} = await getSession(ctx)

    let { data } = await Axios.get(`/apartments/index/${user.id}`); //get user from session
    if (data && data.length) {
      properties = data.map((property) => {
        return { ...property, key: property._id };
      });
    } else {
      properties = [];
    }
  } catch (error) {
    console.log(error)
    throw Error("Could not fetch properties");
  }
  return {
    props: { properties },
  };
}

export default ManageTasksPage;
