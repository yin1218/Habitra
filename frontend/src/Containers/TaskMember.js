// 可以看有哪些介面的那個介面

// isMgr = 是不是群主
import { Table, Space, Tooltip, Button, Modal, Input, message, Divider, List, Typography  } from 'antd';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { isDate } from 'moment';


const TaskMenber = ({taskId}) => {

    //default settings
    const { Search } = Input;
    const [showAddMemberModal, setShowAddMemberModal] = useState(false);
    const columns = [
        {
            title: '',
            key: 'isMgr',
            width: 50,
            dataIndex: 'isMgr',
            render: tag => tag === true ? <Tooltip placement="right" title="任務主人"><Icon icon="emojione:crown" color="black" height="20" /></Tooltip> : <></>,
          },
        {
          title: 'name',
          dataIndex: 'name',
          key: 'name',
        },
      ];
    const [openDelete, setOpenDelete] = useState(false);
    const [isSearching, setIsSearching] = useState(false);



    //要串的東西
    // 陳沛妤:格式盡量不要改QQ 表格吃這個
    //任務成員
    const [member, setMember] = useState([{
        key: 1, //陳沛妤: 幫我幫每一個資料都取一個id(from 1)
        id: '1',
        name: '陳沛妤',
        isMgr: true,
    },
    {
        key: 2,
        id: '2',
        name: '巫芊瑩',
        isMgr: false,
    }]); 
    //當前用戶是否是管理員
    const [isMgr, setIsMgr] = useState(true);
    //陳沛妤: 如果有新增成員的話，要傳送的list
    const [addMemberList, setAddMemberList] = useState([{"id": "巫芊瑩"},{"id": "陳沛妤"}]);
    //   陳沛妤: 這邊是按"刪除"之後要刪掉的清單的key
    const [state, setState] = useState({selectedRowKeys: [], });
    const { selectedRowKeys } = state;


    //functions
      const onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setState({ selectedRowKeys });
      };
      

    const handleDelete = () => {
        
        let deletedUserId = [];
        setOpenDelete(!openDelete);
        state.selectedRowKeys.map(
            memberKey => {
                // console.log(member.find(o => o.key === memberKey).id);
                // deletedUserId.push
                deletedUserId.push(member.find(o => o.key === memberKey).id);
            });
        console.log(deletedUserId);
        // 陳沛妤:deletedUserId 是所有需要刪除的成員ID，幫我送刪除!!!
    }

    const onSearch = value => {
        console.log(value)
        setIsSearching(true);
        //陳沛妤: 幫我看value(就是memberId)有沒有在資料庫裡面
        /*
        if(存在這個用戶):
            setAddMemberList([...AddMemberList, value] );
            setIsSearching(false);
        else:
            message.error('不存在該用戶，請重新輸入!');
            setIsSearching(false);
         */
    };

    //table settings
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        Table.SELECTION_NONE,
        ],
    };

    const handleSendAddMember = () => {

        // 陳沛妤：把addMemberList裡面的東西加到小組成員清單裡面
        setShowAddMemberModal(false);
    }


    return(
        <>
            <Table columns={columns} rowSelection={openDelete && isMgr ? rowSelection : undefined}  dataSource={member} size='small' title={isMgr ? !openDelete ? () => <Button onClick={() => setOpenDelete(!openDelete)}>編輯</Button> : () => <Button type='primary' onClick={() => setShowAddMemberModal(true)}>新增成員</Button> : undefined} footer={openDelete ? () => (<><Button onClick={() => {setOpenDelete(!openDelete)}}>取消</Button><Button danger type='primary' onClick={() => handleDelete()}>刪除</Button></>) : undefined}/>
            <Modal title="新增成員" visible={showAddMemberModal} onCancel={() => setShowAddMemberModal(false)} onOk={() => handleSendAddMember()} >
            {/* <Text >寫下任何的想法都可以喔！</Text> */}
            <Search placeholder="input search text"  style={{ width: 200 }} onSearch={onSearch} loading={isSearching}  enterButton />
            <Divider ></Divider>
            <List
                bordered
                dataSource={addMemberList}
                renderItem={item => (
                    <List.Item>
                    <Typography.Text mark></Typography.Text> {Object.values(item)}
                    </List.Item>
                )}
                />
        </Modal>
        </>
        
    )
}

export default TaskMenber;





