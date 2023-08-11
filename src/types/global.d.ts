// 分页参数
type PageParams = {
  pageNum: number;
  pageSize: number;
  keyword?: string;
};

// 正常响应
type BaseResponse<T> = {
  code: number;
  data: T;
  message: string;
  time: number;
};

// 列表数据
type ListData<T> = {
  list: T[];
  total: number;
};


