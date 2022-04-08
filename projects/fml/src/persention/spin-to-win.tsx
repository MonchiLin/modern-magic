import React, { useEffect, useRef } from "react";
import CentralImage from './spin-to-win/central.png';

type Pie = {
  // 显示名称
  label: string
  // 大小(在圆饼中所占的比例)
  ratio: number
  // 图片资源
  image: string
  //
  color: string
}

type PanConfig = {
  // 饼图配置
  pies: Pie[]
  // 中心图
  centralImage: string
  // 大小
  size: number
  // 边框线粗细
  border: {
    width: number,
    color: string
  }
}


abstract class Pan {

  constructor(protected config: PanConfig) {

  }

  timer!: number | undefined;

  protected _ref!: HTMLElement;
  protected centralImage = {
    width: null as number | null,
    height: null as number | null,
    uri: null as string | null,
    image: null as HTMLImageElement | null
  };

  setRef(ref: HTMLElement) {
    this._ref = ref;
  }

  getRef() {
    return this._ref;
  }

  async measure() {
    const imageOnLoad = () => {
      const image = new Image();

      return new Promise(resolve => {
        image.src = this.config.centralImage;
        image.addEventListener("load", () => {
          this.centralImage.width = image.width;
          this.centralImage.height = image.height;
          this.centralImage.uri = this.config.centralImage;
          this.centralImage.image = image;
          resolve();
        });
      });
    };

    await imageOnLoad();

  }

  // 获取 pie 的数量
  get piesOfCount() {
    return this.config.pies.length;
  }

  // 绘制转盘
  abstract draw(radian?: number): void

  // 执行转盘, 如果传入 pieIndex 则固定转到指定的 pie
  abstract execute(pieIndex?: number): void

  // 强制停止
  abstract forcedStop(): void

  // 绘制转盘块
  abstract drawPie(pie: Pie, startAngle: number, endAngle: number): void

  // 绘制转盘块
  abstract drawPies(angle: number): void

  // 绘制指针
  abstract drawPoint(angle: number): void

  // 绘制中心点
  abstract drawCentral(angle: number): void

  // 绘制边框
  abstract drawBorder(): void

  // 点击中心点
  abstract onCentralPress(): void


}


class PanForCanvas extends Pan {
  TwoPI = Math.PI * 2;

  constructor(config: PanConfig) {
    super(config);
  }

  declare _ref: HTMLCanvasElement;

  protected ctx!: CanvasRenderingContext2D | null;

  drawCentral(radian: number): void {
    const { size } = this.config;
    const center = size / 2;

    const scaleRatio = 0.5;

    const dx = center - this.centralImage.width! / 2 * scaleRatio;
    const dy = center - this.centralImage.height! / 2 * scaleRatio;

    this.ctx!.drawImage(
      this.centralImage.image!,
      dx,
      dy,
      this.centralImage.width! * scaleRatio,
      this.centralImage.height! * scaleRatio,
    );
  }

  drawPie(pie: Pie, startAngle: number, endAngle: number): void {
    console.log(startAngle, endAngle)

    const { size } = this.config;
    const center = size / 2;

    this.ctx!.strokeStyle = pie.color;
    this.ctx!.lineWidth = 2;
    this.ctx!.arc(center, center, center - this.config.border.width, startAngle, endAngle);
    this.ctx!.stroke();
  }

  drawPies(angle: number): void {
    const pies = this.config.pies;
    // 每块的所占的弧度 2PI / (i + 1)
    //
    const perSize = this.TwoPI / pies.length;

    for (let i = 0; i < pies.length; i++) {
      const pie = pies[i];
      this.drawPie(pie, perSize * i + angle, perSize * (i + 1) + angle);
    }
  }

  drawPoint(radian: number): void {
  }

  drawBorder(): void {
    const { size } = this.config;
    const center = size / 2;
    if (!this.ctx) {
      throw new Error("未正确初始化 CanvasRenderingContext2D");
    }
    this.ctx.strokeStyle = this.config.border.color;
    this.ctx.lineWidth = this.config.border.width;
    this.ctx.arc(center, center, center - this.config.border.width, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

  forcedStop(): void {
    clearTimeout(this.timer);
    this.draw(0);
  }

  onCentralPress(): void {
    const image = new Image();
    image.onload;
  }

  execute(pieIndex?: number): void {

  }

  // 绘制转盘
  draw(radian: number = 0) {
    this.ctx!.clearRect(0, 0, this.config.size, this.config.size);
    this.drawBorder();
    this.drawCentral(radian);
    this.drawPies(radian);
    this.drawPoint(radian);
  }

  async measure(): Promise<void> {
    await super.measure();
    this._ref.width = this.config.size;
    this._ref.height = this.config.size;
    this.ctx = this._ref.getContext("2d");
  }
}

const SpinToWinDom = () => {

};

const SpinToWinCanvas = ({ pan }: { pan: Pan }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    (async () => {
      pan.setRef(canvasRef.current as HTMLElement);
      await pan.measure();
      pan.draw();
    })();
  }, []);

  return <canvas onClick={() => pan.execute()} ref={canvasRef}/>;
};


export const SpinToWin = () => {
  const pan = useRef(new PanForCanvas({
    pies: [
      {
        label: "Enemy",
        ratio: 0,
        image: "",
        color: "#da905e"
      },
      {
        label: "KDA",
        ratio: 0,
        image: "",
        color: "#a58cf2",
      },
      {
        label: "登封造极境",
        ratio: 0,
        image: "",
        color: "#050807",
      },
      {
        label: "涅槃",
        ratio: 0,
        image: "",
        color: "#fb1101",
      },
    ],
    centralImage: CentralImage,
    size: 400,
    border: {
      width: 4,
      color: "red"
    }
  }));

  return <SpinToWinCanvas pan={pan.current}/>;
};
