import React from 'react';
import {storiesOf} from '@storybook/react';
import BorderOverlap from '../border-overlap';
import CircleBorderOverlap from "../circle-border-overlap";

const Item = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "50px",
        height: "50px"
      }}
    >
      测试数据
    </div>
  )
}

const Row2column2 = () => {
  return (
    <BorderOverlap
      column={2}
      row={2}
      itemBackgroundColor={"white"}
    >
      <Item/>
      <Item/>
      <Item/>
      <Item/>
    </BorderOverlap>
  )
}

const Row2column2Rounded = () => {
  return (
    <CircleBorderOverlap
      borderRadius={"20px"}
      border={{
        width: 1,
        style: "dashed",
        color: "#777777"
      }}
      column={2}
      row={2}
      itemBackgroundColor={"white"}
    >
      <Item/>
      <Item/>
      <Item/>
      <Item/>
    </CircleBorderOverlap>
  )
}

storiesOf("BorderOverlap", module)
  .add("基础展示", () => <Row2column2/>)
  .add("椭圆效果", () => <Row2column2Rounded/>)
