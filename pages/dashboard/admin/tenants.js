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
import Dashboard from "../../../components/Dashboard";
import axios from "axios";
import Axios from "../../../libs/axios";


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

const ManageUsers = ({ tenants }) => {
  const [allTenants, setAllTenants] = useState(tenants);
  const [addUserModal, setAddUserModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUserExist, setIsUserExist] = useState("");
  const [fields, setFields] = useState([
    {
      name: ["fullName"],
      value: "",
    },
    {
      name: ["phone"],
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
            name: ["fullName"],
            value:  user.fullName,
          },
          {
            name: ["phone"],
            value:  user.phone,
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
      .post("/api/tenants/register", values)
      .then(({data}) => {
        closeAddUserModal();
        setIsSubmitting(false);
        notification.success({
          description: `${values.fullName} added successfully!`
        });
        setAllTenants(users => users = [{...data, key: data._id},...users])
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
      .put(`/api/tenants/edit/${values.id}`, {fullName:values.fullName, username:values.username})
      .then(({data}) => {
        closeEditUserModal();
        setIsSubmitting(false);
        notification.success({
          description: `${values.fullName} updated successfully!`
        });
        setAllTenants((landlords) => landlords = landlords.map((landlord) => {
          if(landlord._id === data.landlord._id){
            return {...data.landlord, fullName:values.fullName, username:values.username, key: data.landlord._id}
          }
          return landlord
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
      .delete(`/api/tenants/delete/${user._id}`)
      .then(({data}) => {
        notification.success({
          description: `${user.fullName} deleted successfully!`
        });
        let newUsers = allTenants
        newUsers.splice(newUsers.findIndex(u => u._id === user._id), 1)
        setAllTenants((users) => users = [...newUsers])
      })
      .catch((err) => {
        console.trace(err);
      });
  };



  const dashboardLinks = [
    {url:'/dashboard/admin', label:'Landlords'},
    {url:'/dashboard/admin/tenants', label:'Tenants'},
    {url:'/dashboard/admin/users', label:'Users'},
   ]
 
return(
<Dashboard pageHeader="Manage Tenants" links={dashboardLinks}>
    <div className="table__header">
      <div className="table__header__left">
        <h4>Tenants</h4>
      </div>
      {/* <div className="table__header__right" onClick={openAddUserModal}>
        <Button icon={<UserAddOutlined />}>Add New Landlord</Button>
      </div> */}
    </div>

    <Modal
      title="Add New Landlord"
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
          label="Full Name"
          name="fullName"
          rules={[
            {
              required: true,
              message: "Please input your full name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
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
      title="Edit Tenant"
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
          label="Full Name"
          name="fullName"
          rules={[
            {
              required: true,
              message: "Please input full name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input phone number!",
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
              message: "Please input username!",
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
      dataSource={allTenants}
      rowSelection={{
        type: "checkbox",
        ...rowSelection,
      }}
    >
      <Column title="Username" dataIndex="username" key="username" />
      <Column title="Full Name" dataIndex="fullName" key="fullName"/>
      <Column title="Phone" dataIndex="phone" key="phone" />

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
  </Dashboard>)
};

export async function getServerSideProps(ctx) {
    let tenants = [];
    try {
      let { data } = await Axios.get("/tenants");
      if (data && data.length) {
        tenants = data.map((tenant) => {
          return { ...tenant, key: tenant._id };
        });
      } else {
        tenants = [];
      }
    } catch (error) {
        
      throw Error("Could not fetch tenants");
    }
    return {
      props: { tenants },
    };
  }

export default ManageUsers;
