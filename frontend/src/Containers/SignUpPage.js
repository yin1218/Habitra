import { Form, Input, Button, Avatar, message, Modal, Collapse } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React, {useState, useEffect} from 'react';
import { useNavigate  } from "react-router-dom";
import { getAvatarClass, signUp, signUpCheckId, signUpCheckEmail } from '../axios';

const SignUpPage = () => {

    const navigate = useNavigate(); //In react-router-dom v6 useHistory() is replaced by useNavigate().
    var menAvatar = []; //@前端
    var womenAvatar = []; //@前端
    useEffect( async () => {
        const menResponse = await getAvatarClass({className: 'Men'});
        menResponse.map(e => {
            menAvatar.push(e.Uid);
        })
        const womenResponse = await getAvatarClass({className: 'Women'});
        womenResponse.map(e => {
            womenAvatar.push(e.Uid);
        })
    }, []); 

    let avatarTypeNum = 0;

    // avatar select related function
    const { Panel } = Collapse;
    function callback(key) {
        console.log(key);
      }
      const [isModalVisible, setIsModalVisible] = useState(false);
      const showModal = () => {
        setIsModalVisible(true);
      };  
      const handleOk = () => {
        setIsModalVisible(false);
      }; 
      const handleCancel = () => {
        setIsModalVisible(false);
      };

      const avatarPanel = (type) => {
        //   console.log(avatarTypeNum);
        avatarTypeNum += 1;
          return(
            <Panel header= {type} key={avatarTypeNum}>
                {/* 這邊要增加選取後的外框狀態 */}
                    {avatarUrl[type].map(url => (<Avatar size={64} src={url} onClick={(e) => {setMyAvatarUrl(e.target.src);}}/>))}
            </Panel>
          )
      }

    const [avatarUrl, setAvatarUrl] = useState({
        "Men": ["https://joeschmoe.io/api/v1/random","https://joeschmoe.io/api/v1/random","https://joeschmoe.io/api/v1/random"],
        "Women": ["https://joeschmoe.io/api/v1/random","https://joeschmoe.io/api/v1/random"]
    }); //頭像選取清單
    const [myAvatarUrl, setMyAvatarUrl] = useState("https://joeschmoe.io/api/v1/random");  //我所選取的頭像
    const[userName, setUserName] = useState("");
    const[ID, setID] = useState("");
    const[password, setPassword] = useState("");
    const[email, setEmail] = useState("");

    const handleSignUp = async () => {
        const checkId = await signUpCheckId({
            user_id: ID
        })
        const checkEmail = await signUpCheckEmail({
            email: email
        })
        if(checkId == 'existing'){
            console.log('ID exist'); //@前端 
            message.error('ID重複，請重新取名QQ');
        } else if(checkEmail == 'existing'){
            console.log('email exist'); //@前端
            message.error('email重複，請重新輸入QQ');
        } else{
            const response = await signUp({
                name: userName, 
                email: email, 
                user_id: ID, 
                password: password, 
                avatar: myAvatarUrl});
            console.log(response); //@前端 要不要設狀態 註冊成功(此response為success代表成功)
            // success
            
            // setTimeout(successMsg, 5000);
            console.log("status = ", response);
            if(response === 'success') {
                message.success('註冊成功，即將跳轉到登入頁面...');
                navigate("/login");
                // setLogin(true);
                // setName(userName);
                // setUserId(res.data);
            }
            else{
                message.error('失敗QQ...');
            }
            // history.push("/login");
            // 過幾秒直接到Sign in Page
        }
      }
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
                        <Avatar size={64} src={myAvatarUrl} onClick={() => setIsModalVisible(true)}  />
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
                        <Button type="primary" htmlType="submit" className="wide-form-button" onClick={handleSignUp}>
                            Sign Up
                        </Button>
                        Already have an Account?  <a href="/">Login</a>
                    </Form.Item>
                </Form>

                {/* 記得傳入ok的時候所使用的頭像url，並且在function中set他 */}
                <Modal title="請選取你想要的頭像" visible={isModalVisible} onCancel={() =>handleCancel()} footer={[
                    <Button key="back" onClick={() => {setMyAvatarUrl("");}}>
                    撤銷頭像
                    </Button>,
                    <Button key="back" type="primary" onClick={() => handleCancel()}>
                    完成
                    </Button>
                ]}
                >
                <Collapse defaultActiveKey={['1']} onChange={callback} accordion>
                    {Object.keys(avatarUrl).map(typeName => avatarPanel(typeName))}
                </Collapse>
                </Modal>

            </div>
        </>
    );
}

export default SignUpPage