const img = (seed, w = 600, h = 400) => `https://picsum.photos/seed/${seed}/${w}/${h}`

export const CITIES = ['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Nha Trang', 'Đà Lạt', 'Phú Quốc']
export const ROOM_TYPES = ['Standard', 'Deluxe', 'Suite', 'Family']

const mkRooms = (base) => [
  { id: 1, type: 'Standard', price: base, bed: '1 giường đôi', view: 'Hướng phố', bathtub: false, amenities: ['Wifi', 'Điều hòa', 'TV'] },
  { id: 2, type: 'Deluxe', price: Math.round(base * 1.5), bed: '1 giường King', view: 'Hướng thành phố', bathtub: true, amenities: ['Wifi', 'Điều hòa', 'TV', 'Minibar'] },
  { id: 3, type: 'Suite', price: Math.round(base * 2.4), bed: '1 giường King + sofa', view: 'Hướng biển/hồ', bathtub: true, amenities: ['Wifi', 'Điều hòa', 'Bồn tắm', 'Ban công', 'Minibar'] },
  { id: 4, type: 'Family', price: Math.round(base * 2), bed: '2 giường đôi', view: 'Hướng vườn', bathtub: false, amenities: ['Wifi', 'Điều hòa', 'Bếp nhỏ', 'TV'] },
]

const raw = [
  ['Hanoi Old Quarter Hotel', 'Hà Nội', 4.5, 600000, 'Nằm giữa phố cổ, gần Hồ Hoàn Kiếm và chợ đêm.'],
  ['Lotus West Lake', 'Hà Nội', 4.7, 1200000, 'Khách sạn view Hồ Tây yên tĩnh, bể bơi trên cao.'],
  ['Saigon Central Hotel', 'Hồ Chí Minh', 4.3, 700000, 'Trung tâm Quận 1, đi bộ đến Nhà thờ Đức Bà.'],
  ['Riverside Saigon Suites', 'Hồ Chí Minh', 4.8, 1800000, 'Căn hộ khách sạn cao cấp bên sông Sài Gòn.'],
  ['Dragon Bridge Hotel', 'Đà Nẵng', 4.4, 800000, 'Gần cầu Rồng, cách biển Mỹ Khê 10 phút.'],
  ['Ocean Pearl Nha Trang', 'Nha Trang', 4.6, 1000000, 'Sát biển, có bãi biển riêng và spa.'],
  ['Pine Hill Dalat', 'Đà Lạt', 4.2, 500000, 'Homestay phong cách châu Âu giữa đồi thông.'],
  ['Sunset Phu Quoc Resort', 'Phú Quốc', 4.9, 2500000, 'Resort 5 sao bên bãi Sao, hoàng hôn tuyệt đẹp.'],
  ['Budget Stay Da Nang', 'Đà Nẵng', 3.9, 350000, 'Lựa chọn tiết kiệm cho du khách ba lô.'],
]

export const hotels = raw.map(([name, city, rating, base, description], i) => ({
  id: i + 1,
  name,
  city,
  rating,
  description,
  image: img(`hotel${i + 1}`),
  gallery: [img(`hotel${i + 1}a`, 800, 500), img(`hotel${i + 1}b`, 800, 500), img(`hotel${i + 1}c`, 800, 500)],
  rooms: mkRooms(base),
  minPrice: base,
}))

export const getHotel = (id) => hotels.find((h) => h.id === Number(id))
export const formatPrice = (n) => n.toLocaleString('vi-VN') + '₫'
