import { Form, Input, Button, Avatar, message, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React, {useState, useEffect} from 'react';

const SignUpPage = () => {
    const info = () => {
        message.info('This is a normal message');
      };

      const [isModalVisible, setIsModalVisible] = useState(false);

    //   控制頭像選取
      const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };



    const [avatarUrl, setAvatarUrl] = useState([]); //頭像選取清單
    // [avatar_id, uid,class]
    const [myAvatarUrl, setMyAvatarUrl] = useState("");  //我所選取的頭像

    const[userName, setUserName] = useState("");
    const[ID, setID] = useState("");
    const[password, setPassword] = useState("");
    const[email, setEmail] = useState("");
    return (
        <>
            <h1 className="login_title">Sign Up</h1>
            {/* 這邊放一個選取頭像的位置，點選可以開啟pop up */}
            <div className="login_page">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{remember: true, layout: 'vertical'}}

                >
                    {/* 這邊新增一個avatar */}
                    <Form.Item>
                    {
                        myAvatarUrl === ""
                        ?
                        // 可以點擊並且選取自己想要的avatar
                        <Avatar size={64} icon={<UserOutlined />} onClick={() => setIsModalVisible(true)}  />
                        :
                        // 可以點即並且選取自己想要的avatar
                        <Avatar size={64} src="https://joeschmoe.io/api/v1/random" onClick={() => setIsModalVisible(true)}  />
                    }
                    </Form.Item>
                    {/* 用戶姓名 */}
                    <Form.Item
                        name="username"
                        label="Name"
                        rules={[
                        {
                            required: true,
                            message: '請輸入帳號名稱!',
                        },
                        ]}
                    >
                        <Input  value = {userName} placeholder="Username" onChange={(e) => setUserName(e.target.value)}/>
                    </Form.Item>
                    {/* 用戶ID  */}
                    <Form.Item
                        name="ID"
                        label="ID"
                        rules={[
                        {
                            required: true,
                            message: '請輸入ID!',
                        },
                        ]}
                    >
                        <Input  value = {ID} placeholder="ID" onChange={(e) => setID(e.target.value)}/>
                    </Form.Item>
                    {/* 用戶信箱 */}
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                        {
                            type: 'email',
                            message: '信箱格式不正確!',
                        },
                        {
                            required: true,
                            message: '請輸入信箱!',
                        },
                        ]}
                    >
                        <Input value = {email} placeholder="E-mail" onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Item>
                    {/* 用戶密碼 */}
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                        {
                            required: true,
                            message: '請輸入密碼!',
                        },
                        ]}
                        hasFeedback
                    >
                        <Input.Password value = {password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Item>
                    {/* 用戶密碼確認 */}
                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                        {
                            required: true,
                            message: '請確認密碼!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('密碼不一致!'));
                            },
                        }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    {/* 送出按鈕 */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="wide-form-button">
                            Login
                        </Button>
                        Already have an Account?  <a href="/">Login</a>
                    </Form.Item>
                </Form>

                {/* 記得傳入ok的時候所使用的頭像url，並且在function中set他 */}
                <Modal title="請選取你想要的頭像" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>

            </div>
        </>
    );
}

export default SignUpPage