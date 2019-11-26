/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, HostBinding, Input, Renderer2, ViewEncapsulation, } from '@angular/core';
import { Observable, Subject } from 'rxjs';
// tslint:disable-next-line:component-class-suffix
export class MdbTableDirective {
    /**
     * @param {?} el
     * @param {?} renderer
     */
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.stickyHeader = false;
        this.stickyHeaderBgColor = '';
        this.stickyHeaderTextColor = '';
        this._dataSource = [];
        this._dataSourceChanged = new Subject();
    }
    /**
     * @param {?} newRow
     * @return {?}
     */
    addRow(newRow) {
        this.getDataSource().push(newRow);
    }
    /**
     * @param {?} index
     * @param {?} row
     * @return {?}
     */
    addRowAfter(index, row) {
        this.getDataSource().splice(index, 0, row);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    removeRow(index) {
        this.getDataSource().splice(index, 1);
    }
    /**
     * @return {?}
     */
    rowRemoved() {
        /** @type {?} */
        const rowRemoved = new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        (observer) => {
            observer.next(true);
        }));
        return rowRemoved;
    }
    /**
     * @return {?}
     */
    removeLastRow() {
        this.getDataSource().pop();
    }
    /**
     * @return {?}
     */
    getDataSource() {
        return this._dataSource;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    setDataSource(data) {
        this._dataSource = data;
        this._dataSourceChanged.next(this.getDataSource());
    }
    /**
     * @return {?}
     */
    dataSourceChange() {
        return this._dataSourceChanged;
    }
    /**
     * @param {?} searchKey
     * @return {?}
     */
    filterLocalDataBy(searchKey) {
        return this.getDataSource().filter((/**
         * @param {?} obj
         * @return {?}
         */
        (obj) => {
            return Object.keys(obj).some((/**
             * @param {?} key
             * @return {?}
             */
            (key) => {
                if (obj[key]) {
                    // Fix(tableSearch): table search will now able to filter through nested data
                    return (/** @type {?} */ (JSON.stringify(obj)
                        .toLowerCase()
                        .includes(searchKey)));
                }
            }));
        }));
    }
    /**
     * @param {?} searchKey
     * @param {?} keys
     * @return {?}
     */
    filterLocalDataByFields(searchKey, keys) {
        return this.getDataSource().filter((/**
         * @param {?} obj
         * @return {?}
         */
        (obj) => {
            return Object.keys(obj).some((/**
             * @param {?} key
             * @return {?}
             */
            (key) => {
                if (keys.includes(key)) {
                    if (obj[key].toLowerCase().includes(searchKey)) {
                        return obj[key];
                    }
                }
            }));
        }));
    }
    /**
     * @param {?} searchKey
     * @param {?=} keys
     * @return {?}
     */
    filterLocalDataByMultipleFields(searchKey, keys) {
        /** @type {?} */
        const items = searchKey.split(' ').map((/**
         * @param {?} x
         * @return {?}
         */
        (x) => x.toLowerCase()));
        return this.getDataSource().filter((/**
         * @param {?} x
         * @return {?}
         */
        (x) => {
            for (const item of items) {
                /** @type {?} */
                let flag = false;
                if (keys !== undefined) {
                    for (const prop in x) {
                        if (keys.includes(prop)) {
                            if (x[prop].toLowerCase().indexOf(item) !== -1) {
                                flag = true;
                                break;
                            }
                        }
                    }
                }
                if (keys === undefined) {
                    for (const prop in x) {
                        if (x[prop].toLowerCase().indexOf(item) !== -1) {
                            flag = true;
                            break;
                        }
                    }
                }
                if (!flag) {
                    return false;
                }
            }
            return true;
        }));
    }
    /**
     * @param {?} searchKey
     * @return {?}
     */
    searchLocalDataBy(searchKey) {
        if (!searchKey) {
            return this.getDataSource();
        }
        if (searchKey) {
            return this.filterLocalDataBy(searchKey.toLowerCase());
        }
    }
    /**
     * @param {?} searchKey
     * @param {?} keys
     * @return {?}
     */
    searchLocalDataByFields(searchKey, keys) {
        if (!searchKey) {
            return this.getDataSource();
        }
        if (searchKey && keys.length > 0) {
            return this.filterLocalDataByFields(searchKey.toLowerCase(), keys);
        }
        if (!keys || keys.length === 0) {
            return this.filterLocalDataBy(searchKey.toLowerCase());
        }
    }
    /**
     * @param {?} searchKey
     * @param {?=} keys
     * @return {?}
     */
    searchLocalDataByMultipleFields(searchKey, keys) {
        if (!searchKey) {
            return this.getDataSource();
        }
        if (searchKey && keys !== undefined) {
            return this.filterLocalDataByMultipleFields(searchKey.toLowerCase(), keys);
        }
    }
    /**
     * @param {?} searchKey
     * @return {?}
     */
    searchDataObservable(searchKey) {
        /** @type {?} */
        const observable = new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        (observer) => {
            observer.next(this.searchLocalDataBy(searchKey));
        }));
        return observable;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.renderer.addClass(this.el.nativeElement, 'table');
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // Fix(stickyHeader): resolved problem with not working stickyHeader="true" on Chrome
        if (this.stickyHeader) {
            /** @type {?} */
            const tableHead = this.el.nativeElement.querySelector('thead');
            Array.from(tableHead.firstElementChild.children).forEach((/**
             * @param {?} child
             * @return {?}
             */
            (child) => {
                this.renderer.addClass(child, 'sticky-top');
                if (this.stickyHeaderBgColor) {
                    this.renderer.setStyle(child, 'background-color', this.stickyHeaderBgColor);
                }
                else {
                    this.renderer.setStyle(child, 'background-color', '#f2f2f2');
                }
                if (this.stickyHeaderTextColor) {
                    this.renderer.setStyle(child, 'color', this.stickyHeaderTextColor);
                }
                else {
                    this.renderer.setStyle(child, 'color', '#000000');
                }
            }));
        }
    }
}
MdbTableDirective.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: '[mdbTable]',
                exportAs: 'mdbTable',
                template: '<ng-content></ng-content>',
                encapsulation: ViewEncapsulation.None,
                styles: ["table th{font-size:.9rem;font-weight:400}table td{font-size:.9rem;font-weight:300}table.table thead th{border-top:none}table.table td,table.table th{padding-top:1.1rem;padding-bottom:1rem}table.table a{margin:0;color:#212529}table.table .label-table{margin:0;padding:0;line-height:.94rem;height:.94rem}table.table.btn-table td{vertical-align:middle}table.table-hover tbody tr:hover{transition:.5s;background-color:rgba(0,0,0,.075)}table .th-lg{min-width:9rem}table .th-sm{min-width:6rem}table.table-sm td,table.table-sm th{padding-top:.6rem;padding-bottom:.6rem}.table-scroll-vertical{max-height:300px;overflow-y:auto}.table-fixed{table-layout:fixed}.table-responsive-lg>.table-bordered,.table-responsive-md>.table-bordered,.table-responsive-sm>.table-bordered,.table-responsive-xl>.table-bordered,.table-responsive>.table-bordered{border-top:1px solid #dee2e6}"]
            }] }
];
/** @nocollapse */
MdbTableDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
MdbTableDirective.propDecorators = {
    striped: [{ type: Input }, { type: HostBinding, args: ['class.table-striped',] }],
    bordered: [{ type: Input }, { type: HostBinding, args: ['class.table-bordered',] }],
    borderless: [{ type: Input }, { type: HostBinding, args: ['class.table-borderless',] }],
    hover: [{ type: Input }, { type: HostBinding, args: ['class.table-hover',] }],
    small: [{ type: Input }, { type: HostBinding, args: ['class.table-sm',] }],
    responsive: [{ type: Input }, { type: HostBinding, args: ['class.table-responsive',] }],
    stickyHeader: [{ type: Input }],
    stickyHeaderBgColor: [{ type: Input }],
    stickyHeaderTextColor: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    MdbTableDirective.prototype.striped;
    /** @type {?} */
    MdbTableDirective.prototype.bordered;
    /** @type {?} */
    MdbTableDirective.prototype.borderless;
    /** @type {?} */
    MdbTableDirective.prototype.hover;
    /** @type {?} */
    MdbTableDirective.prototype.small;
    /** @type {?} */
    MdbTableDirective.prototype.responsive;
    /** @type {?} */
    MdbTableDirective.prototype.stickyHeader;
    /** @type {?} */
    MdbTableDirective.prototype.stickyHeaderBgColor;
    /** @type {?} */
    MdbTableDirective.prototype.stickyHeaderTextColor;
    /**
     * @type {?}
     * @private
     */
    MdbTableDirective.prototype._dataSource;
    /**
     * @type {?}
     * @private
     */
    MdbTableDirective.prototype._dataSourceChanged;
    /**
     * @type {?}
     * @private
     */
    MdbTableDirective.prototype.el;
    /**
     * @type {?}
     * @private
     */
    MdbTableDirective.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLXRhYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItYm9vdHN0cmFwLW1kLyIsInNvdXJjZXMiOlsibGliL2ZyZWUvdGFibGVzL2RpcmVjdGl2ZXMvbWRiLXRhYmxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsV0FBVyxFQUNYLEtBQUssRUFFTCxTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBVTNDLGtEQUFrRDtBQUNsRCxNQUFNLE9BQU8saUJBQWlCOzs7OztJQTZCNUIsWUFBb0IsRUFBYyxFQUFVLFFBQW1CO1FBQTNDLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBSnRELGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLHdCQUFtQixHQUFHLEVBQUUsQ0FBQztRQUN6QiwwQkFBcUIsR0FBRyxFQUFFLENBQUM7UUFJNUIsZ0JBQVcsR0FBUSxFQUFFLENBQUM7UUFDdEIsdUJBQWtCLEdBQWlCLElBQUksT0FBTyxFQUFPLENBQUM7SUFISSxDQUFDOzs7OztJQUtuRSxNQUFNLENBQUMsTUFBVztRQUNoQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7OztJQUVELFdBQVcsQ0FBQyxLQUFhLEVBQUUsR0FBUTtRQUNqQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7Ozs7SUFFRCxTQUFTLENBQUMsS0FBYTtRQUNyQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMs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REFBb0M7Ozs7O0lBSXBDLHdDQUE4Qjs7Ozs7SUFDOUIsK0NBQThEOzs7OztJQUhsRCwrQkFBc0I7Ozs7O0lBQUUscUNBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgUmVuZGVyZXIyLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnW21kYlRhYmxlXScsXG4gIGV4cG9ydEFzOiAnbWRiVGFibGUnLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICBzdHlsZVVybHM6IFsnLi8uLi90YWJsZXMtbW9kdWxlLnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGNsYXNzIE1kYlRhYmxlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KClcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50YWJsZS1zdHJpcGVkJylcbiAgc3RyaXBlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRhYmxlLWJvcmRlcmVkJylcbiAgYm9yZGVyZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50YWJsZS1ib3JkZXJsZXNzJylcbiAgYm9yZGVybGVzczogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRhYmxlLWhvdmVyJylcbiAgaG92ZXI6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50YWJsZS1zbScpXG4gIHNtYWxsOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGFibGUtcmVzcG9uc2l2ZScpXG4gIHJlc3BvbnNpdmU6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgc3RpY2t5SGVhZGVyID0gZmFsc2U7XG4gIEBJbnB1dCgpIHN0aWNreUhlYWRlckJnQ29sb3IgPSAnJztcbiAgQElucHV0KCkgc3RpY2t5SGVhZGVyVGV4dENvbG9yID0gJyc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxuXG4gIHByaXZhdGUgX2RhdGFTb3VyY2U6IGFueSA9IFtdO1xuICBwcml2YXRlIF9kYXRhU291cmNlQ2hhbmdlZDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIGFkZFJvdyhuZXdSb3c6IGFueSkge1xuICAgIHRoaXMuZ2V0RGF0YVNvdXJjZSgpLnB1c2gobmV3Um93KTtcbiAgfVxuXG4gIGFkZFJvd0FmdGVyKGluZGV4OiBudW1iZXIsIHJvdzogYW55KSB7XG4gICAgdGhpcy5nZXREYXRhU291cmNlKCkuc3BsaWNlKGluZGV4LCAwLCByb3cpO1xuICB9XG5cbiAgcmVtb3ZlUm93KGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLmdldERhdGFTb3VyY2UoKS5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgcm93UmVtb3ZlZCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICBjb25zdCByb3dSZW1vdmVkID0gbmV3IE9ic2VydmFibGU8Ym9vbGVhbj4oKG9ic2VydmVyOiBhbnkpID0+IHtcbiAgICAgIG9ic2VydmVyLm5leHQodHJ1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJvd1JlbW92ZWQ7XG4gIH1cblxuICByZW1vdmVMYXN0Um93KCkge1xuICAgIHRoaXMuZ2V0RGF0YVNvdXJjZSgpLnBvcCgpO1xuICB9XG5cbiAgZ2V0RGF0YVNvdXJjZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZTtcbiAgfVxuXG4gIHNldERhdGFTb3VyY2UoZGF0YTogYW55KSB7XG4gICAgdGhpcy5fZGF0YVNvdXJjZSA9IGRhdGE7XG4gICAgdGhpcy5fZGF0YVNvdXJjZUNoYW5nZWQubmV4dCh0aGlzLmdldERhdGFTb3VyY2UoKSk7XG4gIH1cblxuICBkYXRhU291cmNlQ2hhbmdlKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2VDaGFuZ2VkO1xuICB9XG5cbiAgZmlsdGVyTG9jYWxEYXRhQnkoc2VhcmNoS2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5nZXREYXRhU291cmNlKCkuZmlsdGVyKChvYmo6IEFycmF5PGFueT4pID0+IHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLnNvbWUoKGtleTogYW55KSA9PiB7XG4gICAgICAgIGlmIChvYmpba2V5XSkge1xuICAgICAgICAgIC8vIEZpeCh0YWJsZVNlYXJjaCk6IHRhYmxlIHNlYXJjaCB3aWxsIG5vdyBhYmxlIHRvIGZpbHRlciB0aHJvdWdoIG5lc3RlZCBkYXRhXG5cbiAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqKVxuICAgICAgICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgIC5pbmNsdWRlcyhzZWFyY2hLZXkpIGFzIGFueTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmaWx0ZXJMb2NhbERhdGFCeUZpZWxkcyhzZWFyY2hLZXk6IHN0cmluZywga2V5czogc3RyaW5nW10pIHtcbiAgICByZXR1cm4gdGhpcy5nZXREYXRhU291cmNlKCkuZmlsdGVyKChvYmo6IEFycmF5PGFueT4pID0+IHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLnNvbWUoKGtleTogYW55KSA9PiB7XG4gICAgICAgIGlmIChrZXlzLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAgICBpZiAob2JqW2tleV0udG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hLZXkpKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBmaWx0ZXJMb2NhbERhdGFCeU11bHRpcGxlRmllbGRzKHNlYXJjaEtleTogc3RyaW5nLCBrZXlzPzogc3RyaW5nW10pIHtcbiAgICBjb25zdCBpdGVtcyA9IHNlYXJjaEtleS5zcGxpdCgnICcpLm1hcCgoeDogeyB0b0xvd2VyQ2FzZTogKCkgPT4gdm9pZCB9KSA9PiB4LnRvTG93ZXJDYXNlKCkpO1xuICAgIHJldHVybiB0aGlzLmdldERhdGFTb3VyY2UoKS5maWx0ZXIoKHg6IEFycmF5PGFueT4pID0+IHtcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgICBsZXQgZmxhZyA9IGZhbHNlO1xuICAgICAgICBpZiAoa2V5cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBwcm9wIGluIHgpIHtcbiAgICAgICAgICAgIGlmIChrZXlzLmluY2x1ZGVzKHByb3ApKSB7XG4gICAgICAgICAgICAgIGlmICh4W3Byb3BdLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihpdGVtKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBmbGFnID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoa2V5cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBwcm9wIGluIHgpIHtcbiAgICAgICAgICAgIGlmICh4W3Byb3BdLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihpdGVtKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgZmxhZyA9IHRydWU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZsYWcpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICB9XG4gIHNlYXJjaExvY2FsRGF0YUJ5KHNlYXJjaEtleTogc3RyaW5nKSB7XG4gICAgaWYgKCFzZWFyY2hLZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldERhdGFTb3VyY2UoKTtcbiAgICB9XG5cbiAgICBpZiAoc2VhcmNoS2V5KSB7XG4gICAgICByZXR1cm4gdGhpcy5maWx0ZXJMb2NhbERhdGFCeShzZWFyY2hLZXkudG9Mb3dlckNhc2UoKSk7XG4gICAgfVxuICB9XG5cbiAgc2VhcmNoTG9jYWxEYXRhQnlGaWVsZHMoc2VhcmNoS2V5OiBzdHJpbmcsIGtleXM6IHN0cmluZ1tdKSB7XG4gICAgaWYgKCFzZWFyY2hLZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldERhdGFTb3VyY2UoKTtcbiAgICB9XG5cbiAgICBpZiAoc2VhcmNoS2V5ICYmIGtleXMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyTG9jYWxEYXRhQnlGaWVsZHMoc2VhcmNoS2V5LnRvTG93ZXJDYXNlKCksIGtleXMpO1xuICAgIH1cbiAgICBpZiAoIWtleXMgfHwga2V5cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzLmZpbHRlckxvY2FsRGF0YUJ5KHNlYXJjaEtleS50b0xvd2VyQ2FzZSgpKTtcbiAgICB9XG4gIH1cbiAgc2VhcmNoTG9jYWxEYXRhQnlNdWx0aXBsZUZpZWxkcyhzZWFyY2hLZXk6IHN0cmluZywga2V5cz86IHN0cmluZ1tdKSB7XG4gICAgaWYgKCFzZWFyY2hLZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldERhdGFTb3VyY2UoKTtcbiAgICB9XG4gICAgaWYgKHNlYXJjaEtleSAmJiBrZXlzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmZpbHRlckxvY2FsRGF0YUJ5TXVsdGlwbGVGaWVsZHMoc2VhcmNoS2V5LnRvTG93ZXJDYXNlKCksIGtleXMpO1xuICAgIH1cbiAgfVxuICBzZWFyY2hEYXRhT2JzZXJ2YWJsZShzZWFyY2hLZXk6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgY29uc3Qgb2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogYW55KSA9PiB7XG4gICAgICBvYnNlcnZlci5uZXh0KHRoaXMuc2VhcmNoTG9jYWxEYXRhQnkoc2VhcmNoS2V5KSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG9ic2VydmFibGU7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3RhYmxlJyk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgLy8gRml4KHN0aWNreUhlYWRlcik6IHJlc29sdmVkIHByb2JsZW0gd2l0aCBub3Qgd29ya2luZyBzdGlja3lIZWFkZXI9XCJ0cnVlXCIgb24gQ2hyb21lXG4gICAgaWYgKHRoaXMuc3RpY2t5SGVhZGVyKSB7XG4gICAgICBjb25zdCB0YWJsZUhlYWQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcigndGhlYWQnKTtcblxuICAgICAgQXJyYXkuZnJvbSh0YWJsZUhlYWQuZmlyc3RFbGVtZW50Q2hpbGQuY2hpbGRyZW4pLmZvckVhY2goKGNoaWxkOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhjaGlsZCwgJ3N0aWNreS10b3AnKTtcbiAgICAgICAgaWYgKHRoaXMuc3RpY2t5SGVhZGVyQmdDb2xvcikge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoY2hpbGQsICdiYWNrZ3JvdW5kLWNvbG9yJywgdGhpcy5zdGlja3lIZWFkZXJCZ0NvbG9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGNoaWxkLCAnYmFja2dyb3VuZC1jb2xvcicsICcjZjJmMmYyJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RpY2t5SGVhZGVyVGV4dENvbG9yKSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShjaGlsZCwgJ2NvbG9yJywgdGhpcy5zdGlja3lIZWFkZXJUZXh0Q29sb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoY2hpbGQsICdjb2xvcicsICcjMDAwMDAwJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19