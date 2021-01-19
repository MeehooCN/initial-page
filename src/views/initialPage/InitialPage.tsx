/**
 * @description: 初始化页面（增删查改，排序）
 * @author: cnn
 * @createTime: 2021/1/18 17:31
 **/
import React, { useState } from 'react';
import { Row, Card, Button, Table, Input, Select, Radio, InputNumber } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { default as CommonForm, IFormColumns } from '@components/form/CommonForm';
import { FormItemType } from '@components/form/SearchForm';

const { Option } = Select;

interface Field {
  key: string,
  fieldName: string, // 字段名称
  fieldType: string, // 字段类型
  fieldChineseName?: string, // 字段显示的中文名
  isShowInTable: boolean, // 是否显示在表格中
  fieldWidth?: number, // 显示在表格中的宽度
  canEdit: boolean, // 是否可编辑
  isSearch: boolean, // 是否为查询条件
  searchType?: FormItemType, // 查询方式，如果有 options 的查询方式需要接口(考虑是不是使用 CommonInterface 比较好)
  searchOptionsUrl?: string
}

const InitialPage = () => {
  const [fieldList, setFieldList] = useState<Array<Field>>([]);
  const [count, setCount] = useState<number>(0);
  // 通过接口获取字段列表
  const getFieldList = () => {
    const fieldList: Array<Field> = [{
      key: '0',
      fieldName: 'name',
      fieldType: 'string',
      fieldChineseName: '名称',
      isShowInTable: true,
      fieldWidth: 200,
      canEdit: true,
      isSearch: true,
      searchType: 'text'
    }];
    setCount(fieldList.length);
    setFieldList(fieldList);
  };
  // 改变表格中数据内容
  const changeFieldValue = (index: number, field: string, value: string) => {
    const tempFieldList: Array<Field> = [...fieldList];
    // @ts-ignore
    tempFieldList[index][field] = value;
    setFieldList(tempFieldList);
  };
  // 添加字段
  const addField = () => {
    const tempFieldList: Array<Field> = [...fieldList];
    const tempCount: number = count + 1;
    const field: Field = {
      key: tempCount.toString(),
      fieldName: '',
      fieldType: 'string',
      fieldChineseName: '',
      isShowInTable: true,
      fieldWidth: 200,
      canEdit: true,
      isSearch: false
    };
    tempFieldList.push(field);
    setFieldList(tempFieldList);
    setCount(tempCount);
  };
  // 删除字段
  const deleteField = (key: string) => {
    const tempFieldList = fieldList.filter((field: Field) => field.key !== key);
    setFieldList(tempFieldList);
  };
  // 表单字段
  const formColumns: Array<IFormColumns> = [{
    label: '文件名称',
    name: 'fileName',
    type: 'text',
    rules: [{ required: true, message: '请输入文件名称' }]
  }, {
    label: '作者',
    name: 'author',
    type: 'text',
    rules: [{ required: true, message: '请输入作者' }]
  }, {
    label: '文件描述',
    name: 'description',
    type: 'text',
    rules: [{ required: true, message: '请输入文件描述' }]
  }, {
    label: '实体名称',
    name: 'domainName',
    type: 'text',
    rules: [{ required: true, message: '请输入实体名称' }]
  }, {
    label: '新增、编辑、查看接口路径',
    name: 'createUrl',
    type: 'text',
    rules: [{ required: true, message: '请输入新增（编辑）接口' }]
  }, {
    label: '删除接口路径',
    name: 'domainName',
    type: 'text',
    rules: [{ required: true, message: '请输入删除接口路径' }]
  }];
  // 表格字段
  const columns: any = [{
    title: '字段名称',
    dataIndex: 'fieldName',
    render: (value: string, row: Field, index: number) => <Input value={value} onChange={(e: any) => changeFieldValue(index, 'fieldName', e.target.value)} />
  }, {
    title: '字段类型',
    dataIndex: 'fieldType',
    render: (value: string, row: Field, index: number) => (
      <Select style={{ width: 120 }} value={value} onChange={(value: any) => changeFieldValue(index, 'fieldType', value)}>
        <Option key="string" value="string">字符串</Option>
        <Option key="number" value="number">数字</Option>
        <Option key="boolean" value="boolean">布尔值</Option>
      </Select>
    )
  }, {
    title: '字段中文名',
    dataIndex: 'fieldChineseName',
    render: (value: string, row: Field, index: number) => <Input value={value} onChange={(e: any) => changeFieldValue(index, 'fieldChineseName', e.target.value)} />
  }, {
    title: '是否显示在表格中',
    dataIndex: 'isShowInTable',
    render: (value: boolean, row: Field, index: number) => (
      <Radio.Group buttonStyle="solid" value={value} onChange={(e: any) => changeFieldValue(index, 'isShowInTable', e.target.value)}>
        <Radio.Button value={true}>是</Radio.Button>
        <Radio.Button value={false}>否</Radio.Button>
      </Radio.Group>
    )
  }, {
    title: '表格中显示宽度',
    dataIndex: 'fieldWidth',
    render: (value: number, row: Field, index: number) => (
      <InputNumber min={0} max={1000} value={value} onChange={(number: any) => changeFieldValue(index, 'fieldWidth', number)} />
    )
  }, {
    title: '是否可编辑',
    dataIndex: 'canEdit',
    render: (value: boolean, row: Field, index: number) => (
      <Radio.Group buttonStyle="solid" value={value} onChange={(e: any) => changeFieldValue(index, 'canEdit', e.target.value)}>
        <Radio.Button value={true}>是</Radio.Button>
        <Radio.Button value={false}>否</Radio.Button>
      </Radio.Group>
    )
  }, {
    title: '是否是查询条件',
    dataIndex: 'isSearch',
    render: (value: boolean, row: Field, index: number) => (
      <Radio.Group buttonStyle="solid" value={value} onChange={(e: any) => changeFieldValue(index, 'isSearch', e.target.value)}>
        <Radio.Button value={true}>是</Radio.Button>
        <Radio.Button value={false}>否</Radio.Button>
      </Radio.Group>
    )
  }, {
    title: '查询类型',
    dataIndex: 'searchType',
    render: (value: string, row: Field, index: number) => (
      <Select style={{ width: 150 }} value={value} onChange={(value: any) => changeFieldValue(index, 'searchType', value)}>
        <Option key="text" value="text">文本</Option>
        <Option key="inputNumber" value="inputNumber">数字</Option>
        <Option key="select" value="select">选择框</Option>
        <Option key="treeSelect" value="treeSelect">树形选择框</Option>
        <Option key="date" value="date">日期时间</Option>
        <Option key="rangeDate" value="rangeDate">时间日期区间</Option>
        <Option key="rangeDateNoTime" value="rangeDateNoTime">日期区间</Option>
        <Option key="dateNoTime" value="dateNoTime">日期</Option>
        <Option key="radio" value="radio">单选</Option>
        <Option key="cascader" value="cascader">级联选择</Option>
      </Select>
    )
  }, {
    title: '查询获取路径',
    dataIndex: 'searchOptionsUrl',
    render: (value: string, row: Field, index: number) => <Input value={value} onChange={(e: any) => changeFieldValue(index, 'searchOptionsUrl', e.target.value)} />
  }, {
    title: '操作',
    dataIndex: 'opt',
    render: (value: string, row: Field, index: number) => <Button type="primary" shape="circle" icon={<DeleteOutlined />} danger onClick={() => deleteField(row.key)} />
  }];
  return (
    <Row style={{ width: '100%' }}>
      <Card
        title="生成前端页面"
        style={{ width: '100%', marginBottom: 10 }}
        extra={<Button type="primary">确认生成</Button>}
      >
        <CommonForm formColumns={formColumns} formValue={{}} inlineSpan={12} />
      </Card>
      <Card style={{ width: '100%' }}>
        <Row justify="space-between" style={{ marginBottom: 10 }}>
          <Row>
            <Input style={{ marginRight: 5, width: 300 }} placeholder="请输入获取字段的后台接口地址" />
            <Button onClick={getFieldList}>获取字段</Button>
          </Row>
          <Button onClick={addField}>添加字段</Button>
        </Row>
        <Table
          columns={columns}
          dataSource={fieldList}
          bordered
          pagination={false}
          style={{ width: '100%' }}
        />
      </Card>
    </Row>
  );
};
export default InitialPage;
