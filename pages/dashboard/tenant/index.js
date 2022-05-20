import React, { useState } from "react";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react"

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
  DeleteOutlined,
  CarryOutOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";

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
    if(record){
      return {
        disabled: record.name === "Disabled User",
        // Column configuration not to be checked
        name: record.name,
      }
    }
  },
};

const ManageTasksPage = ({ tasks }) => {
  const { data: session, status } = useSession()
  const [allTasks, setAllTasks] = useState(tasks);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [editTaskModal, setEditTaskModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUserExist, setIsUserExist] = useState("");
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
            name: ["title"],
            value:  task.title,
          },
          {
            name: ["description"],
            value: task.description,
          },
          {
            name: ["id"],
            value: task._id,
          },
        ] )
    );
    setEditTaskModal(true);
  };
  const closeEditTaskModal = () => {
    setEditTaskModal(false);
    editFormRef.current.resetFields();
  };
  const addTask = (values) => {
    setIsSubmitting(true);
    axios
      .post("/api/tasks/create", {...values, user: session.user.id})
      .then(({data}) => {
        closeAddTaskModal();
        setIsSubmitting(false);
        notification.success({
          description: `Task added successfully!`
        });
        setAllTasks(tasks => tasks = [{...data, key: data._id},...tasks])
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
      .put(`/api/tasks/edit/${values.id}`, {title:values.title, description:values.description})
      .then(({data}) => {
        closeEditTaskModal();
        setIsSubmitting(false);
        notification.success({
          description: `Tasks updated successfully!`
        });
        setAllTasks((tasks) => tasks = tasks.map((task) => {
          if(task._id === data.task._id){
            return {...data.task, title:values.title, description:values.description, key: data.task._id}
          }
          return task
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
  const markTaskCompleted = (value) => {
    const status = !value.started?{started:true}: !value.completed ? {completed:true} :'' 
    if(status){
      axios
      .put(`/api/tasks/status/${value._id}`, status)
      .then(({data}) => {
        notification.success({
          description: `Status updated successfully!`
        });
        setAllTasks((tasks) => tasks = tasks.map((task) => {
          if(task._id === data.task._id){
            return {...data.task, key: data.task._id}
          }
          return task
        }))
        router.push('/dashboard')
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
      .then(({data}) => {
        notification.success({
          description: `Task deleted successfully!`
        });
        let newTasks = allTasks
        newTasks.splice(newTasks.findIndex(t => t._id === task._id), 1)
        setAllTasks((tasks) => tasks = [...newTasks])
      })
      .catch((err) => {
        console.trace(err);
      });
  };


  const dashboardLinks = [
    {url:'/dashboard', label:'Advances'},
   ]
 

  return (
    <Dashboard 
    pageHeader="My Advances" 
    links={dashboardLinks}
    >
    
      <div className="table__header">
        <div className="table__header__left">
          <h4>Tasks</h4>
        </div>
        <div className="table__header__right" onClick={openAddTaskModal}>
          <Button icon={<CarryOutOutlined />}>Add New Task</Button>
        </div>
      </div>

      <Modal
        title="Add New Task"
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
                message: "Please input task title!",
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
                message: "Please input task description!",
              },
            ]}
          >
            <TextArea />
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
        title="Edit User"
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
                message: "Please input task title!",
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
                message: "Please input task description!",
              },
            ]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            name="id"
            hidden
          >
            <Input  hidden/>
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
        dataSource={allTasks}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
      >
        <Column title="Title" dataIndex="title" key="title"/>
        <Column title="Description" dataIndex="description" key="description" />

        <Column
          title="Status"
          key="status"
          render={(text, record) => (
            <Space size="middle">
              {record.started && record.completed?<Tag color="green" key={status}>Completed</Tag>:record.started && !record.completed?<Tag color="geekblue" key={status}>Inprogress</Tag>:<Tag color="volcano" key={status}>Not Started</Tag>}
            </Space>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Tooltip title={`${!record.completed && !record.started ? 'Start Task': record.completed && record.started ?'Task Completed': 'Mark as completed'}`}>
                <Button
                  type="dashed"
                  shape="circle"
                  icon={<CheckCircleOutlined />}
                  onClick={() => markTaskCompleted(record)}
                />
              </Tooltip>
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
  let tasks = [];
  // try {
  //   const {user} = await getSession(ctx)

  //   let { data } = await Axios.get(`/tasks/index/${user.id}`); //get user from session
  //   if (data && data.length) {
  //     tasks = data.map((task) => {
  //       return { ...task, key: task._id };
  //     });
  //   } else {
  //     tasks = [];
  //   }
  // } catch (error) {
  //   console.log(error)
  //   throw Error("Could not fetch tasks");
  // }
  return {
    props: { tasks },
  };
}

export default ManageTasksPage;
