/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter, Input, ChangeDetectorRef, } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MdbTableDirective } from '../directives/mdb-table.directive';
/**
 * @record
 */
export function MdbPaginationIndex() { }
if (false) {
    /** @type {?} */
    MdbPaginationIndex.prototype.first;
    /** @type {?} */
    MdbPaginationIndex.prototype.last;
}
var MdbTablePaginationComponent = /** @class */ (function () {
    function MdbTablePaginationComponent(cdRef) {
        this.cdRef = cdRef;
        this.searchPagination = false;
        this.searchDataSource = null;
        this.ofKeyword = 'of';
        this.dashKeyword = '-';
        this.paginationAlign = '';
        this.hideDescription = false;
        this.maxVisibleItems = 10;
        this.firstItemIndex = 0;
        this.lastItemIndex = this.maxVisibleItems;
        this.lastVisibleItemIndex = 5;
        this.activePageNumber = 1;
        this.allItemsLength = 0;
        this.nextShouldBeDisabled = false;
        this.previousShouldBeDisabled = true;
        this.searchText = '';
        this.pagination = new Subject();
        this.nextPageClick = new EventEmitter();
        this.previousPageClick = new EventEmitter();
        this.firstPageClick = new EventEmitter();
        this.lastPageClick = new EventEmitter();
    }
    /**
     * @return {?}
     */
    MdbTablePaginationComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.tableEl) {
            this.allItemsLength = this.tableEl.getDataSource().length;
        }
    };
    /**
     * @return {?}
     */
    MdbTablePaginationComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.tableEl) {
            this.tableEl.dataSourceChange().subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                _this.allItemsLength = data.length;
                _this.lastVisibleItemIndex = data.length;
                _this.calculateFirstItemIndex();
                _this.calculateLastItemIndex();
                _this.disableNextButton(data);
                if (_this.searchDataSource) {
                    setTimeout((/**
                     * @return {?}
                     */
                    function () {
                        if (_this.searchDataSource.length !== data.length) {
                            _this.activePageNumber = 1;
                            _this.firstItemIndex = 1;
                        }
                    }), 0);
                }
            }));
        }
        this.paginationChange().subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            _this.firstItemIndex = data.first;
            _this.lastVisibleItemIndex = data.last;
        }));
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    MdbTablePaginationComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var searchDataSource = changes['searchDataSource'];
        if (searchDataSource.currentValue.length !== 0) {
            this.allItemsLength = searchDataSource.currentValue.length;
        }
        if (this.lastVisibleItemIndex > this.allItemsLength) {
            this.lastVisibleItemIndex = this.allItemsLength;
        }
        if (searchDataSource.currentValue.length === 0) {
            this.firstItemIndex = 0;
            this.lastItemIndex = 0;
            this.lastVisibleItemIndex = 0;
            this.allItemsLength = 0;
        }
        if (!searchDataSource.isFirstChange() &&
            searchDataSource.currentValue.length <= this.maxVisibleItems) {
            this.nextShouldBeDisabled = true;
            this.lastVisibleItemIndex = searchDataSource.currentValue.length;
        }
        else {
            this.nextShouldBeDisabled = false;
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MdbTablePaginationComponent.prototype.setMaxVisibleItemsNumberTo = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.lastItemIndex = value;
        this.lastVisibleItemIndex = value;
        this.maxVisibleItems = value;
        this.cdRef.detectChanges();
    };
    /**
     * @return {?}
     */
    MdbTablePaginationComponent.prototype.searchTextObs = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var observable = new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        function (observer) {
            observer.next(_this.searchText);
        }));
        return observable;
    };
    /**
     * @param {?} data
     * @return {?}
     */
    MdbTablePaginationComponent.prototype.disableNextButton = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        if (data.length <= this.maxVisibleItems) {
            this.nextShouldBeDisabled = true;
        }
        else {
            this.nextShouldBeDisabled = false;
        }
    };
    /**
     * @return {?}
     */
    MdbTablePaginationComponent.prototype.calculateFirstItemIndex = /**
     * @return {?}
     */
    function () {
        this.firstItemIndex = this.activePageNumber * this.maxVisibleItems - this.maxVisibleItems + 1;
        this.pagination.next({ first: this.firstItemIndex, last: this.lastItemIndex });
    };
    /**
     * @return {?}
     */
    MdbTablePaginationComponent.prototype.calculateLastItemIndex = /**
     * @return {?}
     */
    function () {
        this.lastItemIndex = this.activePageNumber * this.maxVisibleItems;
        this.lastVisibleItemIndex = this.lastItemIndex;
        if (this.searchDataSource && this.lastItemIndex > this.searchDataSource.length) {
            this.lastVisibleItemIndex = this.searchDataSource.length;
        }
        else if (!this.searchDataSource) {
            this.lastVisibleItemIndex = this.lastItemIndex;
        }
        if (this.lastItemIndex > this.tableEl.getDataSource().length) {
            this.lastItemIndex = this.tableEl.getDataSource().length;
            this.lastVisibleItemIndex = this.tableEl.getDataSource().length;
        }
        this.pagination.next({ first: this.firstItemIndex, last: this.lastItemIndex });
    };
    /**
     * @return {?}
     */
    MdbTablePaginationComponent.prototype.paginationChange = /**
     * @return {?}
     */
    function () {
        return this.pagination;
    };
    /**
     * @return {?}
     */
    MdbTablePaginationComponent.prototype.calculateHowManyPagesShouldBe = /**
     * @return {?}
     */
    function () {
        return Math.ceil(this.tableEl.getDataSource().length / this.maxVisibleItems);
    };
    /**
     * @return {?}
     */
    MdbTablePaginationComponent.prototype.previousPage = /**
     * @return {?}
     */
    function () {
        this.activePageNumber--;
        this.calculateFirstItemIndex();
        this.calculateLastItemIndex();
        this.previousPageClick.emit({ first: this.firstItemIndex, last: this.lastItemIndex });
    };
    /**
     * @return {?}
     */
    MdbTablePaginationComponent.prototype.nextPage = /**
     * @return {?}
     */
    function () {
        this.activePageNumber++;
        this.calculateFirstItemIndex();
        this.calculateLastItemIndex();
        if (this.lastItemIndex > this.tableEl.getDataSource().length) {
            this.lastItemIndex = this.tableEl.getDataSource().length;
        }
        if (this.lastVisibleItemIndex > this.allItemsLength) {
            this.lastVisibleItemIndex = this.allItemsLength;
        }
        this.nextPageClick.emit({ first: this.firstItemIndex, last: this.lastItemIndex });
    };
    /**
     * @return {?}
     */
    MdbTablePaginationComponent.prototype.firstPage = /**
     * @return {?}
     */
    function () {
        this.activePageNumber = 1;
        this.calculateFirstItemIndex();
        this.calculateLastItemIndex();
        this.firstPageClick.emit({ first: this.firstItemIndex, last: this.lastItemIndex });
    };
    /**
     * @return {?}
     */
    MdbTablePaginationComponent.prototype.lastPage = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var lastPage = Math.ceil(this.allItemsLength / this.maxVisibleItems);
        this.activePageNumber = lastPage;
        this.calculateFirstItemIndex();
        this.calculateLastItemIndex();
        this.lastPageClick.emit({ first: this.firstItemIndex, last: this.lastItemIndex });
    };
    /**
     * @return {?}
     */
    MdbTablePaginationComponent.prototype.nextPageObservable = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var obs = new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        function (observer) {
            observer.next(_this.firstItemIndex);
        }));
        return obs;
    };
    /**
     * @return {?}
     */
    MdbTablePaginationComponent.prototype.previousPageObservable = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var obs = new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        function (observer) {
            observer.next(_this.lastVisibleItemIndex);
        }));
        return obs;
    };
    /**
     * @return {?}
     */
    MdbTablePaginationComponent.prototype.checkIfNextShouldBeDisabled = /**
     * @return {?}
     */
    function () {
        if (this.searchDataSource && this.lastVisibleItemIndex === this.searchDataSource.length) {
            return true;
        }
        if (this.activePageNumber >= this.calculateHowManyPagesShouldBe()) {
            return true;
        }
        if (this.nextShouldBeDisabled) {
            return this.nextShouldBeDisabled;
        }
    };
    /**
     * @return {?}
     */
    MdbTablePaginationComponent.prototype.checkIfPreviousShouldBeDisabled = /**
     * @return {?}
     */
    function () {
        if (this.activePageNumber === 1) {
            return true;
        }
    };
    MdbTablePaginationComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mdb-table-pagination',
                    template: "<!--Pagination -->\n<nav>\n  <ul\n    class=\"pagination pagination-circle pg-blue d-flex flex-center\"\n    [ngClass]=\"{\n      'justify-content-end': paginationAlign == 'end',\n      'justify-content-start': paginationAlign == 'start'\n    }\"\n  >\n    <li *ngIf=\"!hideDescription\">\n      {{ firstItemIndex }} {{ dashKeyword }} {{ lastVisibleItemIndex }} {{ ofKeyword }}\n      {{ allItemsLength }}\n    </li>\n    <!--Arrow left-->\n    <li class=\"page-item\" [ngClass]=\"{ disabled: checkIfPreviousShouldBeDisabled() }\">\n      <a class=\"page-link\" mdbWavesEffect aria-label=\"Previous\" (click)=\"firstPage()\">\n        <span aria-hidden=\"true\">\u00AB</span>\n      </a>\n    </li>\n\n    <li class=\"page-item\" [ngClass]=\"{ disabled: checkIfPreviousShouldBeDisabled() }\">\n      <a class=\"page-link\" mdbWavesEffect aria-label=\"Previous\" (click)=\"previousPage()\">\n        <span aria-hidden=\"true\">&#8249;</span>\n      </a>\n    </li>\n\n    <li class=\"page-item\" [ngClass]=\"{ disabled: checkIfNextShouldBeDisabled() }\">\n      <a class=\"page-link\" mdbWavesEffect aria-label=\"Previous\" (click)=\"nextPage()\">\n        <span aria-hidden=\"true\">&#8250;</span>\n      </a>\n    </li>\n\n    <!--Arrow right-->\n    <li class=\"page-item\" [ngClass]=\"{ disabled: checkIfNextShouldBeDisabled() }\">\n      <a class=\"page-link\" mdbWavesEffect aria-label=\"Next\" (click)=\"lastPage()\">\n        <span aria-hidden=\"true\">\u00BB</span>\n      </a>\n    </li>\n  </ul>\n</nav>\n<!--/Pagination -->\n"
                }] }
    ];
    /** @nocollapse */
    MdbTablePaginationComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    MdbTablePaginationComponent.propDecorators = {
        tableEl: [{ type: Input }],
        searchPagination: [{ type: Input }],
        searchDataSource: [{ type: Input }],
        ofKeyword: [{ type: Input }],
        dashKeyword: [{ type: Input }],
        paginationAlign: [{ type: Input }],
        hideDescription: [{ type: Input }],
        nextPageClick: [{ type: Output }],
        previousPageClick: [{ type: Output }],
        firstPageClick: [{ type: Output }],
        lastPageClick: [{ type: Output }]
    };
    return MdbTablePaginationComponent;
}());
export { MdbTablePaginationComponent };
if (false) {
    /** @type {?} */
    MdbTablePaginationComponent.prototype.tableEl;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.searchPagination;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.searchDataSource;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.ofKeyword;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.dashKeyword;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.paginationAlign;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.hideDescription;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.maxVisibleItems;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.firstItemIndex;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.lastItemIndex;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.lastVisibleItemIndex;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.activePageNumber;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.allItemsLength;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.nextShouldBeDisabled;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.previousShouldBeDisabled;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.searchText;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.pagination;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.nextPageClick;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.previousPageClick;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.firstPageClick;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.lastPageClick;
    /**
     * @type {?}
     * @private
     */
    MdbTablePaginationComponent.prototype.cdRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLXRhYmxlLXBhZ2luYXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1ib290c3RyYXAtbWQvIiwic291cmNlcyI6WyJsaWIvZnJlZS90YWJsZXMvY29tcG9uZW50cy9tZGItdGFibGUtcGFnaW5hdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBRVQsTUFBTSxFQUNOLFlBQVksRUFDWixLQUFLLEVBQ0wsaUJBQWlCLEdBSWxCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7O0FBRXRFLHdDQUdDOzs7SUFGQyxtQ0FBYzs7SUFDZCxrQ0FBYTs7QUFHZjtJQWtDRSxxQ0FBb0IsS0FBd0I7UUFBeEIsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUE1Qm5DLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUN6QixxQkFBZ0IsR0FBUSxJQUFJLENBQUM7UUFDN0IsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixnQkFBVyxHQUFHLEdBQUcsQ0FBQztRQUNsQixvQkFBZSxHQUFHLEVBQUUsQ0FBQztRQUNyQixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUVqQyxvQkFBZSxHQUFHLEVBQUUsQ0FBQztRQUVyQixtQkFBYyxHQUFHLENBQUMsQ0FBQztRQUNuQixrQkFBYSxHQUFXLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDN0MseUJBQW9CLEdBQUcsQ0FBQyxDQUFDO1FBRXpCLHFCQUFnQixHQUFHLENBQUMsQ0FBQztRQUVyQixtQkFBYyxHQUFHLENBQUMsQ0FBQztRQUVuQix5QkFBb0IsR0FBRyxLQUFLLENBQUM7UUFDN0IsNkJBQXdCLEdBQUcsSUFBSSxDQUFDO1FBRWhDLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFFaEIsZUFB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LElBQUksSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyw2QkFBNkIsRUFBRSxFQUFFO1lBQ2pFLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxJQUFJLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUM3QixPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztTQUNsQztJQUNILENBQUM7Ozs7SUFFRCxxRUFBK0I7OztJQUEvQjtRQUNFLElBQUksSUFBSSxDQUFDLGdCQUFnQixLQUFLLENBQUMsRUFBRTtZQUMvQixPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQzs7Z0JBN05GLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyw0Z0RBQW9EO2lCQUNyRDs7OztnQkFoQkMsaUJBQWlCOzs7MEJBa0JoQixLQUFLO21DQUNMLEtBQUs7bUNBQ0wsS0FBSzs0QkFDTCxLQUFLOzhCQUNMLEtBQUs7a0NBQ0wsS0FBSztrQ0FDTCxLQUFLO2dDQW1CTCxNQUFNO29DQUNOLE1BQU07aUNBQ04sTUFBTTtnQ0FDTixNQUFNOztJQTZMVCxrQ0FBQztDQUFBLEFBOU5ELElBOE5DO1NBMU5ZLDJCQUEyQjs7O0lBQ3RDLDhDQUFvQzs7SUFDcEMsdURBQWtDOztJQUNsQyx1REFBc0M7O0lBQ3RDLGdEQUEwQjs7SUFDMUIsa0RBQTJCOztJQUMzQixzREFBOEI7O0lBQzlCLHNEQUFpQzs7SUFFakMsc0RBQXFCOztJQUVyQixxREFBbUI7O0lBQ25CLG9EQUE2Qzs7SUFDN0MsMkRBQXlCOztJQUV6Qix1REFBcUI7O0lBRXJCLHFEQUFtQjs7SUFFbkIsMkRBQTZCOztJQUM3QiwrREFBZ0M7O0lBRWhDLGlEQUFnQjs7SUFFaEIsaURBQTRFOztJQUU1RSxvREFBaUU7O0lBQ2pFLHdEQUFxRTs7SUFDckUscURBQWtFOztJQUNsRSxvREFBaUU7Ozs7O0lBQ3JELDRDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIEFmdGVyVmlld0luaXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTWRiVGFibGVEaXJlY3RpdmUgfSBmcm9tICcuLi9kaXJlY3RpdmVzL21kYi10YWJsZS5kaXJlY3RpdmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1kYlBhZ2luYXRpb25JbmRleCB7XG4gIGZpcnN0OiBudW1iZXI7XG4gIGxhc3Q6IG51bWJlcjtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLXRhYmxlLXBhZ2luYXRpb24nLFxuICB0ZW1wbGF0ZVVybDogJy4vbWRiLXRhYmxlLXBhZ2luYXRpb24uY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJUYWJsZVBhZ2luYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCgpIHRhYmxlRWw6IE1kYlRhYmxlRGlyZWN0aXZlO1xuICBASW5wdXQoKSBzZWFyY2hQYWdpbmF0aW9uID0gZmFsc2U7XG4gIEBJbnB1dCgpIHNlYXJjaERhdGFTb3VyY2U6IGFueSA9IG51bGw7XG4gIEBJbnB1dCgpIG9mS2V5d29yZCA9ICdvZic7XG4gIEBJbnB1dCgpIGRhc2hLZXl3b3JkID0gJy0nO1xuICBASW5wdXQoKSBwYWdpbmF0aW9uQWxpZ24gPSAnJztcbiAgQElucHV0KCkgaGlkZURlc2NyaXB0aW9uID0gZmFsc2U7XG5cbiAgbWF4VmlzaWJsZUl0ZW1zID0gMTA7XG5cbiAgZmlyc3RJdGVtSW5kZXggPSAwO1xuICBsYXN0SXRlbUluZGV4OiBudW1iZXIgPSB0aGlzLm1heFZpc2libGVJdGVtcztcbiAgbGFzdFZpc2libGVJdGVtSW5kZXggPSA1O1xuXG4gIGFjdGl2ZVBhZ2VOdW1iZXIgPSAxO1xuXG4gIGFsbEl0ZW1zTGVuZ3RoID0gMDtcblxuICBuZXh0U2hvdWxkQmVEaXNhYmxlZCA9IGZhbHNlO1xuICBwcmV2aW91c1Nob3VsZEJlRGlzYWJsZWQgPSB0cnVlO1xuXG4gIHNlYXJjaFRleHQgPSAnJztcblxuICBwYWdpbmF0aW9uOiBTdWJqZWN0PE1kYlBhZ2luYXRpb25JbmRleD4gPSBuZXcgU3ViamVjdDxNZGJQYWdpbmF0aW9uSW5kZXg+KCk7XG5cbiAgQE91dHB1dCgpIG5leHRQYWdlQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE1kYlBhZ2luYXRpb25JbmRleD4oKTtcbiAgQE91dHB1dCgpIHByZXZpb3VzUGFnZUNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxNZGJQYWdpbmF0aW9uSW5kZXg+KCk7XG4gIEBPdXRwdXQoKSBmaXJzdFBhZ2VDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8TWRiUGFnaW5hdGlvbkluZGV4PigpO1xuICBAT3V0cHV0KCkgbGFzdFBhZ2VDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8TWRiUGFnaW5hdGlvbkluZGV4PigpO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy50YWJsZUVsKSB7XG4gICAgICB0aGlzLmFsbEl0ZW1zTGVuZ3RoID0gdGhpcy50YWJsZUVsLmdldERhdGFTb3VyY2UoKS5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmICh0aGlzLnRhYmxlRWwpIHtcbiAgICAgIHRoaXMudGFibGVFbC5kYXRhU291cmNlQ2hhbmdlKCkuc3Vic2NyaWJlKChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5hbGxJdGVtc0xlbmd0aCA9IGRhdGEubGVuZ3RoO1xuICAgICAgICB0aGlzLmxhc3RWaXNpYmxlSXRlbUluZGV4ID0gZGF0YS5sZW5ndGg7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlRmlyc3RJdGVtSW5kZXgoKTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVMYXN0SXRlbUluZGV4KCk7XG4gICAgICAgIHRoaXMuZGlzYWJsZU5leHRCdXR0b24oZGF0YSk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoRGF0YVNvdXJjZSkge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VhcmNoRGF0YVNvdXJjZS5sZW5ndGggIT09IGRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHRoaXMuYWN0aXZlUGFnZU51bWJlciA9IDE7XG4gICAgICAgICAgICAgIHRoaXMuZmlyc3RJdGVtSW5kZXggPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIDApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnBhZ2luYXRpb25DaGFuZ2UoKS5zdWJzY3JpYmUoKGRhdGE6IGFueSkgPT4ge1xuICAgICAgdGhpcy5maXJzdEl0ZW1JbmRleCA9IGRhdGEuZmlyc3Q7XG4gICAgICB0aGlzLmxhc3RWaXNpYmxlSXRlbUluZGV4ID0gZGF0YS5sYXN0O1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGNvbnN0IHNlYXJjaERhdGFTb3VyY2UgPSBjaGFuZ2VzWydzZWFyY2hEYXRhU291cmNlJ107XG4gICAgaWYgKHNlYXJjaERhdGFTb3VyY2UuY3VycmVudFZhbHVlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgdGhpcy5hbGxJdGVtc0xlbmd0aCA9IHNlYXJjaERhdGFTb3VyY2UuY3VycmVudFZhbHVlLmxlbmd0aDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5sYXN0VmlzaWJsZUl0ZW1JbmRleCA+IHRoaXMuYWxsSXRlbXNMZW5ndGgpIHtcbiAgICAgIHRoaXMubGFzdFZpc2libGVJdGVtSW5kZXggPSB0aGlzLmFsbEl0ZW1zTGVuZ3RoO1xuICAgIH1cblxuICAgIGlmIChzZWFyY2hEYXRhU291cmNlLmN1cnJlbnRWYWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuZmlyc3RJdGVtSW5kZXggPSAwO1xuICAgICAgdGhpcy5sYXN0SXRlbUluZGV4ID0gMDtcbiAgICAgIHRoaXMubGFzdFZpc2libGVJdGVtSW5kZXggPSAwO1xuICAgICAgdGhpcy5hbGxJdGVtc0xlbmd0aCA9IDA7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgIXNlYXJjaERhdGFTb3VyY2UuaXNGaXJzdENoYW5nZSgpICYmXG4gICAgICBzZWFyY2hEYXRhU291cmNlLmN1cnJlbnRWYWx1ZS5sZW5ndGggPD0gdGhpcy5tYXhWaXNpYmxlSXRlbXNcbiAgICApIHtcbiAgICAgIHRoaXMubmV4dFNob3VsZEJlRGlzYWJsZWQgPSB0cnVlO1xuICAgICAgdGhpcy5sYXN0VmlzaWJsZUl0ZW1JbmRleCA9IHNlYXJjaERhdGFTb3VyY2UuY3VycmVudFZhbHVlLmxlbmd0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5uZXh0U2hvdWxkQmVEaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHNldE1heFZpc2libGVJdGVtc051bWJlclRvKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLmxhc3RJdGVtSW5kZXggPSB2YWx1ZTtcbiAgICB0aGlzLmxhc3RWaXNpYmxlSXRlbUluZGV4ID0gdmFsdWU7XG4gICAgdGhpcy5tYXhWaXNpYmxlSXRlbXMgPSB2YWx1ZTtcbiAgICB0aGlzLmNkUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHNlYXJjaFRleHRPYnMoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCBvYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBhbnkpID0+IHtcbiAgICAgIG9ic2VydmVyLm5leHQodGhpcy5zZWFyY2hUZXh0KTtcbiAgICB9KTtcbiAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgfVxuXG4gIGRpc2FibGVOZXh0QnV0dG9uKGRhdGE6IGFueSkge1xuICAgIGlmIChkYXRhLmxlbmd0aCA8PSB0aGlzLm1heFZpc2libGVJdGVtcykge1xuICAgICAgdGhpcy5uZXh0U2hvdWxkQmVEaXNhYmxlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubmV4dFNob3VsZEJlRGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBjYWxjdWxhdGVGaXJzdEl0ZW1JbmRleCgpIHtcbiAgICB0aGlzLmZpcnN0SXRlbUluZGV4ID0gdGhpcy5hY3RpdmVQYWdlTnVtYmVyICogdGhpcy5tYXhWaXNpYmxlSXRlbXMgLSB0aGlzLm1heFZpc2libGVJdGVtcyArIDE7XG4gICAgdGhpcy5wYWdpbmF0aW9uLm5leHQoeyBmaXJzdDogdGhpcy5maXJzdEl0ZW1JbmRleCwgbGFzdDogdGhpcy5sYXN0SXRlbUluZGV4IH0pO1xuICB9XG5cbiAgY2FsY3VsYXRlTGFzdEl0ZW1JbmRleCgpIHtcbiAgICB0aGlzLmxhc3RJdGVtSW5kZXggPSB0aGlzLmFjdGl2ZVBhZ2VOdW1iZXIgKiB0aGlzLm1heFZpc2libGVJdGVtcztcbiAgICB0aGlzLmxhc3RWaXNpYmxlSXRlbUluZGV4ID0gdGhpcy5sYXN0SXRlbUluZGV4O1xuXG4gICAgaWYgKHRoaXMuc2VhcmNoRGF0YVNvdXJjZSAmJiB0aGlzLmxhc3RJdGVtSW5kZXggPiB0aGlzLnNlYXJjaERhdGFTb3VyY2UubGVuZ3RoKSB7XG4gICAgICB0aGlzLmxhc3RWaXNpYmxlSXRlbUluZGV4ID0gdGhpcy5zZWFyY2hEYXRhU291cmNlLmxlbmd0aDtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLnNlYXJjaERhdGFTb3VyY2UpIHtcbiAgICAgIHRoaXMubGFzdFZpc2libGVJdGVtSW5kZXggPSB0aGlzLmxhc3RJdGVtSW5kZXg7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubGFzdEl0ZW1JbmRleCA+IHRoaXMudGFibGVFbC5nZXREYXRhU291cmNlKCkubGVuZ3RoKSB7XG4gICAgICB0aGlzLmxhc3RJdGVtSW5kZXggPSB0aGlzLnRhYmxlRWwuZ2V0RGF0YVNvdXJjZSgpLmxlbmd0aDtcbiAgICAgIHRoaXMubGFzdFZpc2libGVJdGVtSW5kZXggPSB0aGlzLnRhYmxlRWwuZ2V0RGF0YVNvdXJjZSgpLmxlbmd0aDtcbiAgICB9XG5cbiAgICB0aGlzLnBhZ2luYXRpb24ubmV4dCh7IGZpcnN0OiB0aGlzLmZpcnN0SXRlbUluZGV4LCBsYXN0OiB0aGlzLmxhc3RJdGVtSW5kZXggfSk7XG4gIH1cblxuICBwYWdpbmF0aW9uQ2hhbmdlKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMucGFnaW5hdGlvbjtcbiAgfVxuXG4gIGNhbGN1bGF0ZUhvd01hbnlQYWdlc1Nob3VsZEJlKCkge1xuICAgIHJldHVybiBNYXRoLmNlaWwodGhpcy50YWJsZUVsLmdldERhdGFTb3VyY2UoKS5sZW5ndGggLyB0aGlzLm1heFZpc2libGVJdGVtcyk7XG4gIH1cblxuICBwcmV2aW91c1BhZ2UoKSB7XG4gICAgdGhpcy5hY3RpdmVQYWdlTnVtYmVyLS07XG4gICAgdGhpcy5jYWxjdWxhdGVGaXJzdEl0ZW1JbmRleCgpO1xuICAgIHRoaXMuY2FsY3VsYXRlTGFzdEl0ZW1JbmRleCgpO1xuICAgIHRoaXMucHJldmlvdXNQYWdlQ2xpY2suZW1pdCh7IGZpcnN0OiB0aGlzLmZpcnN0SXRlbUluZGV4LCBsYXN0OiB0aGlzLmxhc3RJdGVtSW5kZXggfSk7XG4gIH1cblxuICBuZXh0UGFnZSgpIHtcbiAgICB0aGlzLmFjdGl2ZVBhZ2VOdW1iZXIrKztcbiAgICB0aGlzLmNhbGN1bGF0ZUZpcnN0SXRlbUluZGV4KCk7XG4gICAgdGhpcy5jYWxjdWxhdGVMYXN0SXRlbUluZGV4KCk7XG5cbiAgICBpZiAodGhpcy5sYXN0SXRlbUluZGV4ID4gdGhpcy50YWJsZUVsLmdldERhdGFTb3VyY2UoKS5sZW5ndGgpIHtcbiAgICAgIHRoaXMubGFzdEl0ZW1JbmRleCA9IHRoaXMudGFibGVFbC5nZXREYXRhU291cmNlKCkubGVuZ3RoO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmxhc3RWaXNpYmxlSXRlbUluZGV4ID4gdGhpcy5hbGxJdGVtc0xlbmd0aCkge1xuICAgICAgdGhpcy5sYXN0VmlzaWJsZUl0ZW1JbmRleCA9IHRoaXMuYWxsSXRlbXNMZW5ndGg7XG4gICAgfVxuXG4gICAgdGhpcy5uZXh0UGFnZUNsaWNrLmVtaXQoeyBmaXJzdDogdGhpcy5maXJzdEl0ZW1JbmRleCwgbGFzdDogdGhpcy5sYXN0SXRlbUluZGV4IH0pO1xuICB9XG5cbiAgZmlyc3RQYWdlKCkge1xuICAgIHRoaXMuYWN0aXZlUGFnZU51bWJlciA9IDE7XG4gICAgdGhpcy5jYWxjdWxhdGVGaXJzdEl0ZW1JbmRleCgpO1xuICAgIHRoaXMuY2FsY3VsYXRlTGFzdEl0ZW1JbmRleCgpO1xuXG4gICAgdGhpcy5maXJzdFBhZ2VDbGljay5lbWl0KHsgZmlyc3Q6IHRoaXMuZmlyc3RJdGVtSW5kZXgsIGxhc3Q6IHRoaXMubGFzdEl0ZW1JbmRleCB9KTtcbiAgfVxuXG4gIGxhc3RQYWdlKCkge1xuICAgIGNvbnN0IGxhc3RQYWdlID0gTWF0aC5jZWlsKHRoaXMuYWxsSXRlbXNMZW5ndGggLyB0aGlzLm1heFZpc2libGVJdGVtcyk7XG4gICAgdGhpcy5hY3RpdmVQYWdlTnVtYmVyID0gbGFzdFBhZ2U7XG4gICAgdGhpcy5jYWxjdWxhdGVGaXJzdEl0ZW1JbmRleCgpO1xuICAgIHRoaXMuY2FsY3VsYXRlTGFzdEl0ZW1JbmRleCgpO1xuXG4gICAgdGhpcy5sYXN0UGFnZUNsaWNrLmVtaXQoeyBmaXJzdDogdGhpcy5maXJzdEl0ZW1JbmRleCwgbGFzdDogdGhpcy5sYXN0SXRlbUluZGV4IH0pO1xuICB9XG5cbiAgbmV4dFBhZ2VPYnNlcnZhYmxlKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgY29uc3Qgb2JzID0gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBhbnkpID0+IHtcbiAgICAgIG9ic2VydmVyLm5leHQodGhpcy5maXJzdEl0ZW1JbmRleCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG9icztcbiAgfVxuXG4gIHByZXZpb3VzUGFnZU9ic2VydmFibGUoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCBvYnMgPSBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IGFueSkgPT4ge1xuICAgICAgb2JzZXJ2ZXIubmV4dCh0aGlzLmxhc3RWaXNpYmxlSXRlbUluZGV4KTtcbiAgICB9KTtcbiAgICByZXR1cm4gb2JzO1xuICB9XG5cbiAgY2hlY2tJZk5leHRTaG91bGRCZURpc2FibGVkKCkge1xuICAgIGlmICh0aGlzLnNlYXJjaERhdGFTb3VyY2UgJiYgdGhpcy5sYXN0VmlzaWJsZUl0ZW1JbmRleCA9PT0gdGhpcy5zZWFyY2hEYXRhU291cmNlLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWN0aXZlUGFnZU51bWJlciA+PSB0aGlzLmNhbGN1bGF0ZUhvd01hbnlQYWdlc1Nob3VsZEJlKCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm5leHRTaG91bGRCZURpc2FibGVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5uZXh0U2hvdWxkQmVEaXNhYmxlZDtcbiAgICB9XG4gIH1cblxuICBjaGVja0lmUHJldmlvdXNTaG91bGRCZURpc2FibGVkKCkge1xuICAgIGlmICh0aGlzLmFjdGl2ZVBhZ2VOdW1iZXIgPT09IDEpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxufVxuIl19