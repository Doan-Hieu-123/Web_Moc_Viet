import Database from "better-sqlite3";
import { randomUUID, scryptSync } from "node:crypto";
import path from "node:path";

const db = new Database(path.join(process.cwd(), "dev.db"));
db.pragma("foreign_keys = ON");

const menuItems = [
  ["Khai vị", "Gỏi cuốn tôm thịt", "Tôm sông, thịt ba chỉ, bún và rau thơm cuốn trong bánh tráng mềm.", 65000, 0, 0, 0],
  ["Khai vị", "Nem rán Hà Nội", "Nem giòn nhân thịt, mộc nhĩ, miến và rau củ, dùng cùng nước chấm chua ngọt.", 85000, 0, 1, 0],
  ["Khai vị", "Gỏi ngó sen tôm thịt", "Ngó sen giòn thanh trộn cùng tôm, thịt và rau răm.", 95000, 0, 0, 0],
  ["Món cuốn", "Bánh cuốn Thanh Trì", "Bánh cuốn tráng mỏng, nhân thịt nấm, hành phi và chả quế.", 90000, 0, 0, 0],
  ["Món cuốn", "Bánh xèo tôm thịt", "Bánh xèo vàng giòn với tôm, thịt heo, giá đỗ và rau sống.", 165000, 0, 1, 0],
  ["Món Bắc", "Phở bò Mộc Việt", "Nước dùng trong ninh từ xương bò, quế hồi và thảo mộc Việt.", 145000, 1, 0, 0],
  ["Món Bắc", "Chả cá Hà Nội", "Cá ướp nghệ, thì là, hành lá và mắm tôm truyền thống.", 220000, 1, 1, 0],
  ["Món Bắc", "Bún thang", "Nước dùng thanh, gà xé, trứng thái sợi, giò lụa và nấm hương.", 135000, 0, 0, 0],
  ["Món Trung", "Bún bò Huế Mộc Việt", "Nước dùng ninh từ xương bò, sả, mắm ruốc và ớt Huế.", 145000, 1, 1, 2],
  ["Món Trung", "Mì Quảng gà", "Sợi mì vàng, gà ta, tôm, đậu phộng và rau sống miền Trung.", 125000, 0, 0, 1],
  ["Món Trung", "Bánh bèo chén", "Bánh bèo mềm, tôm cháy, hành phi và nước mắm ngọt.", 75000, 0, 0, 0],
  ["Món Nam", "Cá kho tộ", "Cá basa kho trong nồi đất với nước màu, tiêu xanh và nước mắm.", 185000, 1, 0, 1],
  ["Món Nam", "Lẩu mắm miền Tây", "Nước lẩu đậm đà với cá, tôm, mực và rau đồng theo mùa.", 420000, 1, 1, 2],
  ["Món Nam", "Hủ tiếu Nam Vang", "Nước dùng xương heo, tôm, thịt, trứng cút và hủ tiếu dai.", 125000, 0, 0, 0],
  ["Hải sản", "Tôm sông nướng muối ớt", "Tôm tươi nướng than, phủ muối ớt và rau thơm.", 210000, 1, 1, 2],
  ["Hải sản", "Cua rang me", "Cua biển rang sốt me chua ngọt, dùng cùng bánh mì nướng.", 390000, 1, 1, 1],
  ["Món chay", "Đậu hũ non sốt nấm", "Đậu hũ mềm với nấm hương, nấm đùi gà và sốt tương lên men.", 95000, 0, 0, 0],
  ["Món chay", "Cơm sen chay", "Cơm gạo Việt hấp lá sen cùng hạt sen và rau củ theo mùa.", 125000, 1, 0, 0],
  ["Cơm Việt", "Cơm chiên mắm tỏi", "Cơm Việt rang với nước mắm tỏi, trứng và rau thơm.", 125000, 1, 1, 0],
  ["Cơm Việt", "Cơm niêu ba miền", "Cơm niêu nóng dùng cùng cá kho, rau luộc và canh chua.", 195000, 0, 0, 0],
  ["Canh", "Canh chua cá lóc", "Canh chua miền Nam với cá lóc, me, thơm, cà chua và rau ngổ.", 145000, 0, 0, 1],
  ["Canh", "Canh cua rau đay", "Canh cua đồng nấu rau đay, mồng tơi và mướp hương.", 115000, 0, 0, 0],
  ["Tráng miệng", "Chè sen long nhãn", "Hạt sen Huế và long nhãn nấu thanh nhẹ cùng đường phèn.", 65000, 1, 0, 0],
  ["Tráng miệng", "Bánh chuối nướng nước cốt dừa", "Bánh chuối thơm mềm, dùng ấm cùng nước cốt dừa béo nhẹ.", 70000, 0, 0, 0],
  ["Trà Việt", "Trà sen Huế", "Trà ướp gạo sen, hương thanh và hậu vị dịu.", 75000, 1, 0, 0],
  ["Trà Việt", "Trà gừng mật ong", "Trà nóng với gừng tươi và mật ong hoa rừng.", 65000, 0, 0, 0],
  ["Cà phê", "Cà phê phin Buôn Ma Thuột", "Cà phê rang đậm pha phin, dùng đen hoặc cùng sữa đặc.", 55000, 0, 0, 0],
  ["Đồ uống", "Nước mơ ngâm", "Nước mơ ngâm thủ công, chua ngọt và mát dịu.", 60000, 0, 0, 0],
] as const;

const tables = [
  [1, 2, "Bàn bên cửa sổ"], [2, 2, "Bàn bên cửa sổ"], [3, 4, "Phòng ăn chính"], [4, 4, "Phòng ăn chính"],
  [5, 4, "Phòng ăn chính"], [6, 6, "Phòng ăn chính"], [7, 6, "Sân vườn"], [8, 6, "Sân vườn"],
  [9, 8, "Phòng riêng"], [10, 8, "Phòng riêng"], [11, 10, "Bàn gia đình"], [12, 12, "Bàn gia đình"],
] as const;

const insertMenu = db.prepare("INSERT OR IGNORE INTO MenuItem (id, name, description, price, category, isSignature, spiceLevel, isVegetarian, isAvailable) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)");
const insertTable = db.prepare("INSERT OR IGNORE INTO RestaurantTable (id, tableNumber, capacity, area, status) VALUES (?, ?, ?, ?, 'AVAILABLE')");
const seed = db.transaction(() => {
  for (const [category, name, description, price, isSignature, spiceLevel, isVegetarian] of menuItems) {
    insertMenu.run(`menu-${name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-")}`, name, description, price, category, isSignature, spiceLevel, isVegetarian);
  }
  for (const [tableNumber, capacity, area] of tables) insertTable.run(`table-${tableNumber}`, tableNumber, capacity, area);

  const salt = randomUUID();
  const password = `${salt}:${scryptSync("MocViet@2026", salt, 64).toString("hex")}`;
  db.prepare("INSERT OR IGNORE INTO User (id, email, password, fullName, phone, role) VALUES (?, ?, ?, ?, ?, 'ADMIN')").run("admin-moc-viet", "admin@mocviet.vn", password, "Quản trị viên Mộc Việt", "0900000000");
});

seed();
console.log(`Đã tạo ${menuItems.length} món ăn, ${tables.length} bàn và tài khoản quản trị mẫu.`);
console.log("Tài khoản quản trị: admin@mocviet.vn / MocViet@2026");
db.close();
