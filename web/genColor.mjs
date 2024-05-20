import jsonData from "../migration/tag.json" assert { type: "json" };
import fs from "fs";
// 创建颜色映射表，这里使用随机颜色但排除过于深或浅的颜色，并确保不生成灰色
function getRandomColor() {
  let r, g, b;

  do {
    r = Math.floor(Math.random() * 192) + 64; // 64-255
    g = Math.floor(Math.random() * 192) + 64; // 64-255
    b = Math.floor(Math.random() * 192) + 64; // 64-255

    if (Math.abs(r - g) > 16 && Math.abs(r - b) > 16 && Math.abs(g - b) > 16) {
      break;
    }
  } while (true);

  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// 转换数据
const result = {};
jsonData.forEach((item) => {
  result[item.name] = getRandomColor();
});

// 输出结果
fs.writeFile(
  "./src/assets/tagMapColor.json",
  JSON.stringify(result, null, 2),
  (err) => {
    console.log(err);
  }
);
