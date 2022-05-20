import React from "react";
import { Form, Input, Button, notification } from "antd";
import { getCsrfToken, getSession } from "next-auth/react"
import { useRouter } from 'next/router';
import Link from 'next/link';
import Axios from "../../../libs/axios";


const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
   const formRef = React.useRef(null)

   const login = async (values) => {
    setIsSubmitting(true);
    try {
      const token = await getCsrfToken()
      await Axios.post(`auth/callback/credentials`, {...values, csrfToken:token, userType:'landlord'})
      const session = await getSession()
      if(session){
        window.location.assign(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/landlord`);
      }else{
        setIsSubmitting(false);
        notification.error({
          description: `Bad credentials`
        });
      }
    } catch (error) {
      setIsSubmitting(false);
      notification.error({
        description: `Bad credentials`
      });
    }
   
  };

  return (
    <div className="login__page">
    <div className="login__page__cta">
        <h1>Seydel Apartments</h1>
        <p>Manage your properties with no hustle!</p>
        <Link href="/">Go Back</Link>
      </div>
    <div className="login__page__form">
      <h2>Landlord Login Panel</h2>
        <div>
        <Form
          layout="vertical"
          onFinish={login}
          ref={formRef}
          autoComplete="off"
        >
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
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
           
          >
            <div className="account__btn">
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Sign in
            </Button>
            </div>
          </Form.Item>
        </Form>
        
        </div>
      </div>
    </div>
  );
};


export default SignIn;
