import React from 'react';
import { connect } from 'react-redux';
import UserForm from '../components/UserForm.jsx';
import { postUsersData, fetchUsersData, deleteUsersData, deleteUsersTodoData, fetchUsersTodoData, postUsersTodoData, } from '../actions/users';
import { Tabs, DatePicker, Modal, Button, Row, Col, Divider, Input, Spin, Pagination } from 'antd';

const { TabPane } = Tabs;

class LoginPage extends React.Component {
    state = {
        email: '',
        name: '',
        visible: false,
        edit: false,
        id: '',
        pageNo: 0,
        usersData: [],
        tabs: 'users',
        action: '',
        date: '',
        todosData: [],
    }

    componentDidMount() {
        this.props.fetchUsersData();
        this.props.fetchUsersTodoData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.usersData.length === 0 && this.props.usersData.length > 0 && this.props.type !== 'DELETE_USER_RECEIVED') {
            this.setState({
                usersData: this.props.usersData.slice(0, 10),
            });
        }
        if (this.props.type === 'SAVE_USER_RECEIVED' && !this.state.edit && (JSON.stringify(this.state.usersData) !== JSON.stringify(this.props.usersData.slice(this.state.pageNo, this.state.pageNo + 10)) || (prevProps.usersData.length !== this.props.usersData.length))) {
            this.setState({
                email: '',
                name: '',
                action: '',
                date: '',
                visible: false,
                usersData: this.props.usersData.slice(this.state.pageNo, this.state.pageNo + 10),
            })
        }
        if (this.props.type === 'DELETE_USER_RECEIVED' && !this.state.edit && (JSON.stringify(this.state.usersData) !== JSON.stringify(this.props.usersData.slice(this.state.pageNo, this.state.pageNo + 10)) || (prevProps.usersData.length !== this.props.usersData.length))) {
            this.setState({
                email: '',
                name: '',
                action: '',
                date: '',
                visible: false,
                usersData: this.props.usersData.slice(0, 10),
                pageNo: 0,
            })
        }
        if (this.props.type === 'UPDATE_USER_RECEIVED' && this.state.edit && JSON.stringify(this.state.usersData) !== JSON.stringify(this.props.usersData.slice(this.state.pageNo, this.state.pageNo + 10))) {
            this.setState({
                email: '',
                name: '',
                visible: false,
                edit: false,
                id: '',
                action: '',
                date: '',
                usersData: this.props.usersData.slice(this.state.pageNo, this.state.pageNo + 10),
            })
        }
        if (this.state.todosData.length === 0 && this.props.todosData.length > 0 && this.props.type !== 'DELETE_TODO_RECEIVED') {
            this.setState({
                todosData: this.props.todosData.slice(0, 10),
            });
        }
        if (this.props.type === 'SAVE_TODO_RECEIVED' && (JSON.stringify(this.state.todosData) !== JSON.stringify(this.props.todosData.slice(this.state.pageNo, this.state.pageNo + 10)) || (prevProps.todosData.length !== this.props.todosData.length))) {
            this.setState({
                email: '',
                name: '',
                action: '',
                date: '',
                visible: false,
                todosData: this.props.todosData.slice(this.state.pageNo, this.state.pageNo + 10),
            })
        }
        if (this.props.type === 'DELETE_TODO_RECEIVED' && (JSON.stringify(this.state.todosData) !== JSON.stringify(this.props.todosData.slice(this.state.pageNo, this.state.pageNo + 10)) || (prevProps.todosData.length !== this.props.todosData.length))) {
            this.setState({
                email: '',
                name: '',
                action: '',
                date: '',
                visible: false,
                todosData: this.props.todosData.slice(0, 10),
                pageNo: 0,
            })
        }
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    tabCallback = (key) => {
        this.setState({
            tabs: key === '1' ? 'todos' : 'users',
        });
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        if (this.state.tabs === 'todos') {
            const random = Math.floor(Math.random() * 1000000);
            this.props.postUsersTodoData({
                action: this.state.action,
                date: this.state.date,
                id: random,
            });
        } else {
            if (this.state.edit) {
                this.props.getSaveUserData({
                    id: this.state.id,
                    name: this.state.name,
                    email: this.state.email,
                    mode: 'edit',
                });
            } else {
                const random = Math.floor(Math.random() * 1000000);
                this.props.getSaveUserData({
                    id: random,
                    name: this.state.name,
                    email: this.state.email,
                });
            }
        }
    };

    handleCancel = () => {
        this.setState({
            visible: false,
            edit: false,
        });
    };

    handleDelete = (id) => {
        if (this.state.tabs === 'users') {
            this.props.deleteUsersData({ id });
        } else {
            this.props.deleteUsersTodoData({ id });
        }
    }

    handleEdit = (id, name, email) => {
        this.setState({
            visible: true,
            name,
            email,
            id,
            edit: true,
        });
    }

    handlePageChange = (page) => {
        if (this.state.tabs === 'users') {
            this.setState({
                pageNo: (page - 1) * 10,
                usersData: this.props.usersData.slice((page - 1) * 10, ((page - 1) * 10) + 10),
            });
        } else {
            this.setState({
                pageNo: (page - 1) * 10,
                todosData: this.props.todosData.slice((page - 1) * 10, ((page - 1) * 10) + 10),
            });
        }
    }

    handleDateOk = (value) => {
        // console.log('onOk: ', value);
    }

    handleDateChange = (value, dateString) => {
        this.setState({
            date: value,
        });
    }

    render() {
        const { visible, name, email, edit, usersData, todosData, action, tabs, date, } = this.state;
        const { loading, pageLoading } = this.props;
        if (pageLoading) {
            return (
                <div className='page-loader'>
                    <Spin size="large" />
                </div>);
        }
        return (
            <div className='user-main'>
                <Tabs defaultActiveKey={this.state.tabs === 'users' ? "2" : '1'} onChange={this.tabCallback}>
                    <TabPane tab="Todos" key="1">
                        <div className='tab-body-custom'>
                            <Button onClick={this.showModal}>Create Todo</Button>
                            <Row>
                                <Col span={12}>Todo</Col>
                                <Col span={12}>Action</Col>
                            </Row>
                            <Divider />
                            {todosData.map(eachTodo => (
                                <UserForm tabs={this.state.tabs} key={eachTodo.id} id={eachTodo.id} date={eachTodo.date} action={eachTodo.action} handleDelete={this.handleDelete} />
                            ))}
                        </div>
                        <Pagination defaultCurrent={1} total={this.props.todosData.length} defaultPageSize={10} onChange={this.handlePageChange} />
                    </TabPane>
                    <TabPane tab="Users" key="2">
                        <div className='tab-body-custom'>
                            <Button onClick={this.showModal}>Create User</Button>
                            <Row>
                                <Col span={12}>Name</Col>
                                <Col span={12}>Action</Col>
                            </Row>
                            <Divider />
                            {usersData.map(eachUser => (
                                <UserForm tabs={this.state.tabs} key={eachUser.id} id={eachUser.id} name={eachUser.name} email={eachUser.email} handleDelete={this.handleDelete} handleEdit={this.handleEdit} />
                            ))}
                        </div>
                        <Pagination defaultCurrent={1} total={this.props.usersData.length} defaultPageSize={10} onChange={this.handlePageChange} />
                    </TabPane>
                </Tabs>
                <Modal
                    title={tabs === 'users' ? 'Users' : 'Todos'}
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={loading}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            {edit ? 'Update' : 'Save'}
                        </Button>,
                    ]}
                >
                    <div className='form-inoouts'>
                        {tabs === 'users' ? <><Input placeholder="Name" name='name' value={name} onChange={this.handleInputChange} />
                            <Input placeholder="Email" name='email' value={email} onChange={this.handleInputChange} />
                        </> : <><Input placeholder="Action" name='action' value={action} onChange={this.handleInputChange} />
                                <DatePicker showTime placeholder="Select Time" onChange={this.handleDateChange} onOk={this.handleDateOk} value={date} />
                            </>}
                    </div>
                </Modal>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    getSaveUserData: (data) => dispatch(postUsersData(data)),
    fetchUsersData: () => dispatch(fetchUsersData()),
    deleteUsersData: (data) => dispatch(deleteUsersData(data)),
    fetchUsersTodoData: () => dispatch(fetchUsersTodoData()),
    postUsersTodoData: (data) => dispatch(postUsersTodoData(data)),
    deleteUsersTodoData: (data) => dispatch(deleteUsersTodoData(data)),
})

const mapStateToProps = (state) => {
    const { usersData, loading, pageLoading, type, todosData, } = state;
    return {
        usersData,
        loading,
        pageLoading,
        type,
        todosData,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
