export interface BoardActivitiesJson {
	content: BoardActivitiesJsonContent[];
	pageable: BoardActivitiesJsonPageable;
	last: boolean;
	totalPages: number;
	totalElements: number;
	first: boolean;
	size: number;
	number: number;
	sort: BoardActivitiesJsonSort;
	numberOfElements: number;
	empty: boolean;
}
export interface BoardActivitiesJsonContent {
	createdAt: string;
	createdBy: string;
	modifiedAt: string;
	modifiedBy: string;
	id: number;
	boardType: string;
	boardTitle: string;
	boardContent: string;
	deleted: boolean;
	boardViewCount: number;
	boardLikeCount: number;
	commentCount: string;
	character?: any;
	hashtagExists: boolean;
}
export interface BoardActivitiesJsonPageableSort {
	empty: boolean;
	sorted: boolean;
	unsorted: boolean;
}
export interface BoardActivitiesJsonPageable {
	sort: BoardActivitiesJsonPageableSort;
	offset: number;
	pageNumber: number;
	pageSize: number;
	paged: boolean;
	unpaged: boolean;
}
export interface BoardActivitiesJsonSort {
	empty: boolean;
	sorted: boolean;
	unsorted: boolean;
}