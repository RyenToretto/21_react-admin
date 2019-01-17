import React, { Component } from 'react';

import {Card, Button, Icon, Table, message, Modal} from "antd";
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
                        <a href="javascript:" onClick={()=>{this.handleUpdateClass(thisId)}}>修改名称</a>
                        <a href="javascript:" onClick={()=>{this.handleQueryClass(thisId)}}>查看其子品类</a>
                    </div>
                )
            }],
            dataSource: [],
            classTitle: {
                ids: [0],
                path: ["一级品类"]
            }
        }
    }
    
    addClass = async (parentId, categoryName)=>{
        try{
            const result = await requestAddClass(parentId, categoryName);
            if(result.status === 0){
                console.log(result.data);
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
                message.error("Ajax updateClass 错误: "+result)
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
    
    componentDidMount(){
        this.queryClass(0);
    }
    
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
    
    handleUpdateClass = (thisId)=>{    /**************************************************************************/
        const newName = "娃哈哈";
        Modal.confirm({
            content: <input type="text"/>
        });
        this.updateClass(thisId, newName);
        
        const {dataSource} = this.state;
        dataSource.find((obj, index)=>{
            if(obj.key === thisId){
                dataSource[index].goods_class = newName;
                return true;
            }
            return false;
        });
        
        this.setState({
            dataSource
        })
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
    
    render(){
        const {dataSource, columns, classTitle} = this.state;
        const header = (
            <div className="category_title">
                <div className="c_title">{this.showTitle(classTitle)}</div>
                <Button className="add_class_btn">
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
                        defaultPageSize: 3,
                        pageSizeOptions: ["2", "3", "4", "5"],
                        showQuickJumper: true,
                        showSizeChanger: true
                    }}
                />
            </Card>
        )
    }
}
