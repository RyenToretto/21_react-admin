import React, { Component } from 'react';

import {Card, Button, Icon, Table, message, Modal, Form, Input, Select} from "antd";
import {requestAddClass, requestQueryClass, requestUpadteClass} from "../../../api/requestAPI";

import "./css/Category.css";

export default class Category extends Component {
    constructor(props){
        super(props);
        this.state = {
            columns: [{
                title: '品类名称',
                className: 'goods_class',
                dataIndex: 'goods_class',
            }, {
                title: '操作',
                className: 'goods_id',
                dataIndex: 'goods_id',
                render: thisId => (
                    <div>
                        <a href="javascript:" onClick={()=>this.setState({isShowUpdate: true, updateId: thisId})}>修改名称</a>
                        <a href="javascript:" onClick={()=>{this.handleQueryClass(thisId)}}>查看其子品类</a>
                    </div>
                )
            }],
            dataSource: [],
            classTitle: {
                ids: [0],
                path: ["一级品类"]
            },
            isShowAdd: false,
            isShowUpdate: false
        }
    }
    
    addClass = async (parentId, categoryName)=>{
        try{
            const result = await requestAddClass(parentId, categoryName);
            if(result.status === 0){
                message.info("添加分类"+result.data.name+"成功")
            }else{
                message.error("Ajax addClass 错误: "+result)
            }
        }catch(e){
            message.error("Ajax addClass 错误 catch: "+e)
        }
    };
    
    updateClass = async (categoryId, categoryName)=>{
        try{
            const result = await requestUpadteClass(categoryId, categoryName);
            if(result.status === 0){
                message.info("成功修改了品类名称");
            }else{
                message.error("Ajax updateClass 错误: "+result.msg)
            }
        }catch(e){
            message.error("Ajax updateClass 错误 catch: "+e)
        }
    };
    
    queryClass = async (parentId)=>{
        try{
            const result = await requestQueryClass(parentId);
            if(result.status === 0) {
                let dataSource = result.data.map((each, index) => {
                    return {
                        key: each._id,
                        goods_class: each.name,
                        goods_id: each._id
                    }
                });
                this.setState({
                    dataSource
                });
            }else{
                message.error("Ajax queryClass 错误: "+result)
            }
        }catch(e){
            message.error("Ajax queryClass 错误 catch: "+e)
        }
    };
    
    handleQueryClass = (thisId)=>{
        let {classTitle, dataSource} = this.state;
        classTitle.ids.push(thisId);    // 更新 classTitle.ids
        this.queryClass(thisId);    // 根据 id 查找到 品类 [{key...},{}]
        
        // 更新 classTitle.path
        let newName = dataSource.find(obj => (obj.key === thisId)).goods_class;
        classTitle.path.push(newName);
        this.setState({
            classTitle
        })
    };
    
    handleClickClass = (thisName)=>{
        let {classTitle} = this.state;
    
        // 更新 classTitle.ids
        let index = classTitle.path.indexOf(thisName);
        classTitle.ids.splice(index + 1);
        this.queryClass(classTitle.ids[index]);    // 根据 id 查找到 品类 [{key...},{}]
        
        // 更新 classTitle.path
        let target = 0;
        for(let i=0; i<classTitle.path.length; i++){
            if(classTitle.path[i]===thisName){
                target = i+1;
                break;
            }
        }
        classTitle.path.splice(target);    // 如果不存在 target，就说明出错了
        
        this.setState({
            classTitle
        })
    };
    
    handleUpdateClass = ()=>{
        this.setState({
            isShowUpdate: false
        });
        const {newName} = this.updateForm.getFieldsValue();    // 获取 categroyName
        const {updateId:thisId} = this.state;    // 获取 id
        this.updateClass(thisId, newName);    // 请求修改品类名称
        
        const {dataSource} = this.state;
        dataSource.find((obj, index)=>{
            if(obj.key === thisId){    // 更新页面对应的 categoryName
                dataSource[index].goods_class = newName;
                return true;
            }
            return false;
        });
        
        this.setState({
            dataSource
        })
    };
    
    handleAddClass = ()=>{
        this.setState({isShowAdd: false});    // 隐藏对话框
        
        // 添加分类
        const {parentId, newName} = this.addForm.getFieldsValue();
        this.addClass(parentId, newName);
        
        // 更新页面相关信息
        const {classTitle} = this.state;
        this.queryClass(classTitle.ids[classTitle.ids.length-1]);
    };
    
    showTitle = (classTitle)=>{
        return (
            classTitle.path.map((each, index)=>{
                if(index === classTitle.path.length-1){
                    return (<span key={index}>{each}</span>);
                }else{
                    return (
                        <span key={index}>
                            <span onClick={()=>this.handleClickClass(each)}>{each}</span>
                            &nbsp;<Icon type='arrow-right' />&nbsp;
                        </span>
                    )
                }
            })
        )
    };
    
    componentDidMount(){
        this.queryClass(0);
    }
    
    render(){
        const {dataSource, columns, classTitle, isShowUpdate, isShowAdd} = this.state;
        const header = (
            <div className="category_title">
                <div className="c_title">{this.showTitle(classTitle)}</div>
                {/* 1. 点击显示对话框 */}
                <Button className="add_class_btn" onClick={()=>{this.setState({isShowAdd: true})}}>
                    <Icon type="plus"/>
                    添加品类
                </Button>
            </div>
        );
        return (
            <Card className="category_card" title={header} bordered={false}>
                <Table
                    className="category_table"
                    dataSource={dataSource}
                    columns={columns}
                    bordered={true}
                    pagination={{    /* 前台分页 */
                        defaultPageSize: 5,
                        pageSizeOptions: ["2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        showQuickJumper: true,
                        showSizeChanger: true
                    }}
                />
                <Modal
                    className="update_class_name"
                    title="修改品类名称"
                    visible={isShowUpdate}
                    onOk={this.handleUpdateClass}    /* Id 怎么传？？ */
                    onCancel={()=>this.setState({isShowUpdate:false})}
                    okText="提交修改"
                    cancelText="取消"
                >
                    <WrappedUpdate setUpdateForm={form=>this.updateForm=form} />
                </Modal>
                <Modal
                    className="add_class"
                    title="添加分类"
                    visible={isShowAdd}
                    onOk={this.handleAddClass}    /* 2. 点击 ok 进行添加 */
                    onCancel={()=>this.setState({isShowAdd:false})}
                    okText="提交修改"
                    cancelText="取消"
                >
                    <WrappedAdd
                        dataSource={dataSource}
                        classTitle={classTitle}
                        setAddForm={form=>this.addForm=form}    // 获取到子组件的 form，从而获取 id 和 name
                    />
                </Modal>
            </Card>
        )
    }
}

class UpdateForm extends Component{
    componentWillMount(){
        this.props.setUpdateForm(this.props.form)    // 将 子组件的 form 传给 父组件的 this.form
    }
    
    render(){
        const {getFieldDecorator} = this.props.form;
        return(
            <Form>
                <Form.Item>
                    {
                        getFieldDecorator("newName", {
                            initialValue: ""
                        })(
                            <Input type="text" placeholder="请输入分类的新名称" />
                        )
                    }
                </Form.Item>
            </Form>
        )
    }
}

class AddForm extends Component{
    componentWillMount(){
        this.props.setAddForm(this.props.form)    // 将 子组件的 form 传给 父组件的 this.form
    }
    
    render(){
        const {getFieldDecorator} = this.props.form;
        const {dataSource, classTitle} = this.props;
        return(
            <Form>
                <Form.Item label="所属分类：">
                    {
                        getFieldDecorator("parentId", {
                            initialValue: "0"    /* 会默认显示 key=0 的选项， 如果不写则不显示 */
                        })(
                            <Select>
                                {
                                    classTitle.path.map((each, index)=>{
                                        return(
                                            <Select.Option
                                                key={classTitle.ids[index]}
                                                value={classTitle.ids[index]}
                                            >{each}</Select.Option>
                                        )
                                    })
                                }
                                {
                                    dataSource.map(each=>{
                                        return(
                                            <Select.Option
                                                key={each.key}
                                                value={each.key}
                                            >{each.goods_class}</Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item label="所属分类：">
                    {
                        getFieldDecorator("newName", {
                            initialValue: ""    /* 初始值为空串 */
                        })(
                            <Input type="text" placeholder="请输入新分类的名称" />
                        )
                    }
                </Form.Item>
            </Form>
        )
    }
}

const WrappedAdd = Form.create()(AddForm);
const WrappedUpdate = Form.create()(UpdateForm);
