import { ref } from "vue";

type loadMoreStatus = "more" | "loading" | "noMore";

interface loadMoreOptions {
  /** 初始页码，默认1 */
  initPage?: number;
  /** 每页数量，默认10 */
  pageSize?: number;
  /** 是否自动加载第一页，默认true */
  autoLoad?: boolean;
  /** 自定义文本 */
  contentText?: {
    contentdown?: string;
    contentrefresh?: string;
    contentnomore?: string;
  };
  /** 获取数据的函数 */
  fetchData: (
    page: number,
    pageSize: number
  ) => Promise<{
    list: any[];
    total: number;
  }>;
}

/**
 * 加载更多Hook
 * @param options 配置选项
 */
export default function useLoadMore(options: loadMoreOptions) {
  const {
    initPage = 1,
    pageSize = 10,
    autoLoad = true, // 自动加载第一页
    contentText = {
      contentdown: "上拉显示更多",
      contentrefresh: "正在加载...",
      contentnomore: "没有更多数据了",
    },
    fetchData,
  } = options;

    // 分页状态
    const pagination = ref({
        page: initPage,
        pageSize,
        total: 0
    });

  // 数据列表
  const list = ref<any[]>([]);
  // 是否初次加载
  const isFirstLoad = ref(true);

  // 是否加载出错
  const loadError = ref(false);

  const loadMoreStatus = ref<loadMoreStatus>('more')

  // 加载更多数据函数
  const loadMore = async () => {
    if (loadMoreStatus.value !== 'more') return
    loadMoreStatus.value = 'loading'
    loadError.value = false
    try {
        const { page, pageSize } = pagination.value
        const result = fetchData(page, pageSize)
        list.value = [...list.value, ...result.]
    }
  }

  

}
