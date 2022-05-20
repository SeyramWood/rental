import React, { useState } from "react";
import { useRouter } from "next/router";
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
  notification 
} from "antd";
import {
  EditOutlined,
  UserDeleteOutlined,
  SearchOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const { Column, ColumnGroup } = Table;
import Dashboard from "../../components/Dashboard";
import axios from "axios";
import Axios from "../../libs/axios";


const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record) => {
    if(record){
      return {
        disabled: record.name === "Disabled User",
        // Column configuration not to be checked
        name: record.name,
      }
    }
  },
};

const ManageUserPage = ({ users }) => {
  const [allUsers, setAllUsers] = useState(users);
  const [addUserModal, setAddUserModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUserExist, setIsUserExist] = useState("");
  const [fields, setFields] = useState([
    {
      name: ["firstName"],
      value: "",
    },
    {
      name: ["username"],
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

  // React.useEffect(() => {
  //   setUserData(users => users = [...allUsers])
  // }, [allUsers]);
  React.useEffect(() => {
    if (isUserExist) {
      setTimeout(() => {
        setIsUserExist("");
      }, 3000);
    }
  }, [isUserExist]);
  const openAddUserModal = () => {
    setAddUserModal(true);
  };
  const closeAddUserModal = () => {
    setAddUserModal(false);
    formRef.current.resetFields();
  };
  const openEditUserModal = (user) => {
    setFields(
      (state) => 
        (state = [
          {
            name: ["firstName"],
            value:  user.firstName,
          },
          {
            name: ["username"],
            value: user.username,
          },
          {
            name: ["id"],
            value: user._id,
          },
        ] )
    );
    setEditUserModal(true);
  };
  const closeEditUserModal = () => {
    setEditUserModal(false);
    editFormRef.current.resetFields();
  };
  const addUser = (values) => {
    setIsSubmitting(true);
    axios
      .post("/api/users/register", values)
      .then(({data}) => {
        closeAddUserModal();
        setIsSubmitting(false);
        notification.success({
          description: `${values.firstName} added successfully!`
        });
        setAllUsers(users => users = [{...data, key: data._id},...users])
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

  const editUser = (values) => {
    setIsSubmitting(true);
    axios
      .put(`/api/users/edit/${values.id}`, {firstName:values.firstName, username:values.username})
      .then(({data}) => {
        closeEditUserModal();
        setIsSubmitting(false);
        notification.success({
          description: `${values.firstName} updated successfully!`
        });
        setAllUsers((users) => users = users.map((user) => {
          if(user._id === data.user._id){
            return {...data.user, firstName:values.firstName, username:values.username, key: data.user._id}
          }
          return user
        }))
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

const deleteUser = (user) => {
    axios
      .delete(`/api/users/delete/${user._id}`)
      .then(({data}) => {
        notification.success({
          description: `${user.firstName} deleted successfully!`
        });
        let newUsers = allUsers
        newUsers.splice(newUsers.findIndex(u => u._id === user._id), 1)
        setAllUsers((users) => users = [...newUsers])
      })
      .catch((err) => {
        console.trace(err);
      });
  };


 

  return (
    <Dashboard pageHeader="User Management">
    
      <div className="table__header">
        <div className="table__header__left">
          <h4>Users</h4>
        </div>
        <div className="table__header__right" onClick={openAddUserModal}>
          <Button icon={<UserAddOutlined />}>Add New User</Button>
        </div>
      </div>

      <Modal
        title="Add New User"
        visible={addUserModal}
        onOk={openAddUserModal}
        onCancel={closeAddUserModal}
        footer={null}
      >
        {isUserExist && (
          <h3>
            <strong style={{ color: "red" }}>{isUserExist}</strong>
          </h3>
        )}
        <Form
          layout="vertical"
          onFinish={addUser}
          autoComplete="off"
          ref={formRef}
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please input your first name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
              {
                type: "email",
                message: "Please input a valid email address!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            initialValue="123456789"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="userType"
            initialValue="admin"
            hidden
          >
            <Input hidden/>
          </Form.Item>
          <Form.Item>
            <div className="form__button">
              <Button onClick={closeAddUserModal}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={isSubmitting}>
                Add
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit User"
        visible={editUserModal}
        onOk={openEditUserModal}
        onCancel={closeEditUserModal}
        footer={null}
      >
        {isUserExist && (
          <h3>
            <strong style={{ color: "red" }}>{isUserExist}</strong>
          </h3>
        )}
        <Form
          layout="vertical"
          onFinish={editUser}
          autoComplete="off"
          ref={editFormRef}
          fields={fields}
          onFieldsChange={(_, allFields) => {
            setFields(allFields);
          }}
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please input your first name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
              {
                type: "email",
                message: "Please input a valid email address!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="id"
            hidden
          >
            <Input  hidden/>
          </Form.Item>
          <Form.Item>
            <div className="form__button">
              <Button onClick={closeEditUserModal}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={isSubmitting}>
                Save
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      <Table
        dataSource={allUsers}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
      >
        <Column title="First Name" dataIndex="firstName" key="firstName"/>
        <Column title="Username" dataIndex="username" key="username" />

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
                  onClick={() => openEditUserModal(record)}
                />
              </Tooltip>
              <Tooltip title="Delete">
                <Button
                  type="dashed"
                  danger
                  shape="circle"
                  icon={<UserDeleteOutlined />}
                  onClick={() => deleteUser(record)}
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
  let users = [];
  try {
    let { data } = await Axios.get("/users");
    if (data && data.length) {
      users = data.map((user) => {
        return { ...user, key: user._id };
      });
    } else {
      users = [];
    }
  } catch (error) {
    throw Error("Could not fetch users");
  }
  return {
    props: { users },
  };
}

export default ManageUserPage;
