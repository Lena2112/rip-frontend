import { Subject } from "rxjs/internal/Subject";

export interface IPaginationProps {
    quantityArticles: number;
    onUpdate$: Subject<void>;
    currentPage: number;
}
