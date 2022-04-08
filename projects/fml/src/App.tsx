import React from "react";
import { Arrow, Like } from '@react-vant/icons';
import { Card, Image, Button, Toast, Space, Typography, Tag, Divider } from 'react-vant';
import classNames from "classnames";
import { SpinToWin } from "./persention/spin-to-win";

const VantPlayground = () => {
  return <Space
    direction="vertical"
    style={{ padding: 20, width: '100%', backgroundColor: '#f2f2f2', boxSizing: 'border-box' }}
  >
    <Typography.Title level={1}>
      Hello React Vant <Tag type="primary">next</Tag>
    </Typography.Title>
    <Typography.Text>
      参照 Vant 打造的 React 框架移动端组件库。
    </Typography.Text>
    <Card round>
      <Card.Cover onClick={() => Toast.info('点击了Cover区域')}>
        <Image src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/baa20698931623.5ee79b6a8ec2b.jpg"/>
      </Card.Cover>
      <Card.Header
        extra={<Arrow/>}
        onClick={() => Toast.info('点击了Header区域')}
      >
        封面展示
      </Card.Header>
      <Card.Body onClick={() => Toast.info('点击了Body区域')}>
        卡片内容区域
      </Card.Body>
      <Card.Footer>
        <Space>
          <Button round size="small">
            更多
          </Button>
          <Button
            icon={<Like/>}
            round
            color="linear-gradient(to right, #ff6034, #ee0a24)"
            size="small"
          >
            Like
          </Button>
        </Space>
      </Card.Footer>
    </Card>
    <Card round>
      <Card.Header
        extra={<Arrow/>}
        onClick={() => Toast.info('点击了Header区域')}
      >
        封面展示
      </Card.Header>
      <Card.Body onClick={() => Toast.info('点击了Body区域')}>
        卡片内容区域
      </Card.Body>
      <Card.Cover onClick={() => Toast.info('点击了Cover区域')}>
        <Image src="https://mir-s3-cdn-cf.behance.net/project_modules/max_632/274faa127009547.61390144590a7.png"/>
      </Card.Cover>
    </Card>
  </Space>;
};

const ViewPortPlayground = () => {
  const Header = () => {
    return <div className={"flex items-center justify-center bg-[#1D2046]"}>
      <span className={"text-white text-[17px]"}>卡牌</span>
    </div>;
  };

  const Label = (props: { text: string } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>) => {
    return <span
      {...props}
      className={classNames(props.className, "text-white")}
    >
      {props.text}</span>;
  };

  const Data = (props: { text: string } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>) => {
    return <span
      {...props}
      className={classNames(props.className, "text-white text-[14px]")}
    >
      {props.text}</span>;
  };

  const Item = (props: { label: string, data: string, placement: "left" | "right" | "center" }) => {
    return <div className={classNames([
      "flex flex-col",
      props.placement === "left"
        ? "items-start"
        : props.placement === "right"
          ? "items-end" : "items-center"
    ])}>
      <Label text={props.label}/>
      <Data text={props.data}/>
    </div>;
  };

  const Body = () => {
    return <div className={"pt-[12px] pb-[28px]"}>
      <div className={"flex flex-row justify-between"}>
        <Item label={"卡牌额度"} data={"1000.00000 TiB"} placement={"left"}/>
        <Item label={"IDO额度"} data={"1000.00000 TiB"} placement={"center"}/>
        <Item label={"锁仓额度"} data={"1000.00000 TiB"} placement={"right"}/>
      </div>
      <Divider/>
      <Divider/>
    </div>;
  };


  return <div className={"mx-[20px] bg-[#23265ACC]"}>
    <Header/>
    <Body/>
  </div>;
};

export default function App() {
  return <div style={{ backgroundColor: '#f2f2f2' }}>
    {/*<ViewPortPlayground/>*/}
    {/*<VantPlayground/>*/}
    <SpinToWin/>
  </div>;
}
