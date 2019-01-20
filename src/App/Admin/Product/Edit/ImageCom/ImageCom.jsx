import React, { Component } from 'react';
import { Upload, Icon, Modal, message} from 'antd';

import {requestDeleteImg} from "../../../../../api/requestAPI";

import "./css/ImageCom.css";

/* 管理图片的组件(上传/删除) */
export default class ImageCom extends Component {
    state = {
        previewVisible: false,    // 控制是否机进行 大图预览
        previewImage: '',    // 大图的 url 地址
        
        /****    // 包含所有已上传图片信息对象的数组
            {
                name: 'xxx.png',    // 名称
                // 指定大图预览的地址
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                uid: '-1',    // 文档推荐 唯一的负数字符串 作为标识
                status: 'done',    // 图片的状态： loading/done/remove删除
            }
        ****/
        fileList: [],    // 编辑商品 时，要初始化 fileList
    };
    
    getImgs = ()=>{    // 让父组件调，传递 imgs 数组
        return this.state.fileList.map(file=>file.name);
    };
    
    handleCancel = () => this.setState({ previewVisible: false });
    
    handlePreview = (file) => {
        this.setState({
            // 如果不存在 url (上传失败)，则显示 base64 处理的值
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };
    
    // fileList {
    //     file: "当前操作文件的信息",
    //     fileList: "所有图片文件信息"
    // }
    // 详见 antd 文档： 上传图片以后的回调
    // loading 会出现很多次，会触发多次 onChange 事件
    handleChange = async ({ file, fileList }) =>{
        if(file.status === "done"){
            const {name, url} = file.response.data;
            file = fileList[fileList.length-1];    // file 和 fileList 不是同一个对象
            file.name = name;
            file.url = url;
            message.success("图片上传成功！");    // 上传到了 服务器的 public/upload 中
        }else if(file.status === "removed"){    // 删除图片
            const result = await requestDeleteImg(file.name);    // 请求后台删除已上传的图片
            if(result.status === 0){
                message.success("成功删除后台图片")
            }else{
                message.error("删除后台图片失败")
            }
        }
        this.setState({
            fileList
        });
    };
    
    componentWillMount(){
        const imgs = this.props.imgs;
        if(imgs && imgs.length>0){
            const fileList = imgs.map((img, index)=>({
                uid: -index,
                name: img,
                url: "http://localhost:5000/upload/"+img,
                status: "done",
            }));
            this.setState({
                fileList
            })
        }
    }
    
    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix image_com">
                <Upload    // 内部会进行 ajax 请求
                    action="/manage/img/upload"    /**** 上传图片的请求地址 ****/
                    name="image"    /**** 后台的 文件字段 ****/
                    accept="image/*"    /****  显示任何图片类型的文件****/
                    listType="picture-card"    // 每张图片显示的风格 指定为 卡片
                    fileList={fileList}    // 当前图片列表
                    onPreview={this.handlePreview}    // 点击预览 触发事件
                    onChange={this.handleChange}
                >
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}
