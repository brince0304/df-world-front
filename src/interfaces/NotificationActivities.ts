export interface NotificationActivities {
  content: NotificationActivitiesContent[];
  pageable: NotificationActivitiesPageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: NotificationActivitiesSort;
  numberOfElements: number;
  empty: boolean;
}
export interface NotificationActivitiesContent {
  id: number;
  boardId: number;
  notificationType: string;
  checked: boolean;
  createdDate: string;
  notificationContent: string;
}
export interface NotificationActivitiesPageableSort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
export interface NotificationActivitiesPageable {
  sort: NotificationActivitiesPageableSort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}
export interface NotificationActivitiesSort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
