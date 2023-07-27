export interface CommentActivitiesJson {
  content: CommentActivitiesJsonContent[];
  pageable: CommentActivitiesJsonPageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: CommentActivitiesJsonSort;
  numberOfElements: number;
  empty: boolean;
}
export interface CommentActivitiesJsonContent {
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  id: number;
  commentContent: string;
  boardId: string;
  commentLikeCount: number;
  deleted: boolean;
  isParent: boolean;
  childrenCommentsSize: string;
  boardType: string;
}
export interface CommentActivitiesJsonPageableSort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
export interface CommentActivitiesJsonPageable {
  sort: CommentActivitiesJsonPageableSort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}
export interface CommentActivitiesJsonSort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
