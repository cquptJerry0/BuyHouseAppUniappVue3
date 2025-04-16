// 轮播图数据类型
export interface Banner {
  id: number;
  imageUrl: string;
  title: string;
  subtitle: string;
  phone: string;
}

// 导航项数据类型
export interface NavItem {
  id: number;
  title: string;
  count?: string;
  type: string;
  badge?: string;
}

// 房产特性数据类型
export interface PropertyFeature {
  icon: string;
  text: string;
  color: string;
}

// 房产数据类型
export interface Property {
  id: number;
  title: string;
  location: string;
  imageUrl: string;
  price?: string;
  tags: string[];
  features: PropertyFeature[];
}
