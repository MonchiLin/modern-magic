const MenuIndicator = () => {


  return <div
    className={"absolute cursor-pointer animate-bounce overflow-hidden top-[20px] right-[20px] rounded-tl-[2px] rounded-bl-[2px] flex flex-row"}>
    <div className={"bg-[#68686730] px-[8px] py-[0px]"}>
      <span className={"text-[#d6b627]"}>M</span>
      <span className={'text-[#d5d3de]'}>enu</span>
    </div>
    <div className={"px-[10px] bg-[#9ba87f59]"}>➕</div>

    <div className={"rounded-tr-[5px] rounded-br-[2px] overflow-hidden"}>
      <div
        style={{
          width: "0",
          height: "0",
          borderWidth: "0px 0 24px 24px",
          borderStyle: "solid",
          borderColor: "transparent transparent transparent #b1a265",
        }}
      />
    </div>
  </div>
}

export default MenuIndicator
