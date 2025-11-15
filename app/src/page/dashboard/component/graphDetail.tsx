const dataRoomType = [
  ["room_a", 1000, 12],
  ["room_b", 2000, 19],
  ["room_c", 3000, 23],
  ["room_d", 4000, 10],
];
const totalIncomeMouth = [
    "รายได้โดยรวม", 2000
]

export const GraphDetail = () => {
  return (
    <div style={{ height: "100%", width: "100%", padding: "10px" }}>
      <h3>สรุปข้อมูล เดือนนี้</h3>

      {/* Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          padding: "10px 0",
          fontWeight: "bold",
          borderBottom: "2px solid #ddd",
        }}
      >
        <div>รายได้แต่ละห้อง</div>
        <div style={{width:'100%',display:'flex',justifyContent:'flex-end'}}>
            จำนวนการถูกจอง
        </div>
      </div>

      {/* Data rows */}
      <div>
        {dataRoomType.map(([key, total, amount]) => (
          <div
            key={key}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <div>
              <b>{key}</b> : {total} baht
            </div>
            <div style={{width:'100%',display:'flex',justifyContent:'flex-end'}}>
                {amount} ครั้ง
            </div>
          </div>
        ))}
      </div>
      <div>
        <h3>จำนวนการปรับปรุ่ง</h3>
      </div>
    </div>
  );
};
