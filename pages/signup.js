import React from "react";
import { Form, Input, Button } from "antd";
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import Axios from "../libs/axios";



const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isUserExist, setIsUserExist] = React.useState("");
   const formRef = React.useRef(null)
   const router = useRouter()
   const addUser = (values) => {
    setIsSubmitting(true);
    Axios
      .post("/tenants/register", values)
      .then(({data}) => {
        setIsSubmitting(false);
        router.push('/signin')
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

  return (
    <div className="login__page">
    <div className="login__page__cta">
        <h1>Seydel Apartments</h1>
        <p>Rent with no hustle!</p>
        <Link href="/">Go Back</Link>
      </div>
    <div className="login__page__form">
      <h2>Tenant Registration</h2>
        <div>
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
          <div className="account__btn">
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Sign up
            </Button>
            <span >Already have an account? <Link href="/signin">Sig in</Link></span>
            </div>
          </Form.Item>
        </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
