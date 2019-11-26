/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ElementRef, HostBinding, Input, Renderer2, ViewEncapsulation, } from '@angular/core';
import { Observable, Subject } from 'rxjs';
var MdbTableDirective = /** @class */ (function () {
    function MdbTableDirective(el, renderer) {
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
    MdbTableDirective.prototype.addRow = /**
     * @param {?} newRow
     * @return {?}
     */
    function (newRow) {
        this.getDataSource().push(newRow);
    };
    /**
     * @param {?} index
     * @param {?} row
     * @return {?}
     */
    MdbTableDirective.prototype.addRowAfter = /**
     * @param {?} index
     * @param {?} row
     * @return {?}
     */
    function (index, row) {
        this.getDataSource().splice(index, 0, row);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    MdbTableDirective.prototype.removeRow = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.getDataSource().splice(index, 1);
    };
    /**
     * @return {?}
     */
    MdbTableDirective.prototype.rowRemoved = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var rowRemoved = new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        function (observer) {
            observer.next(true);
        }));
        return rowRemoved;
    };
    /**
     * @return {?}
     */
    MdbTableDirective.prototype.removeLastRow = /**
     * @return {?}
     */
    function () {
        this.getDataSource().pop();
    };
    /**
     * @return {?}
     */
    MdbTableDirective.prototype.getDataSource = /**
     * @return {?}
     */
    function () {
        return this._dataSource;
    };
    /**
     * @param {?} data
     * @return {?}
     */
    MdbTableDirective.prototype.setDataSource = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this._dataSource = data;
        this._dataSourceChanged.next(this.getDataSource());
    };
    /**
     * @return {?}
     */
    MdbTableDirective.prototype.dataSourceChange = /**
     * @return {?}
     */
    function () {
        return this._dataSourceChanged;
    };
    /**
     * @param {?} searchKey
     * @return {?}
     */
    MdbTableDirective.prototype.filterLocalDataBy = /**
     * @param {?} searchKey
     * @return {?}
     */
    function (searchKey) {
        return this.getDataSource().filter((/**
         * @param {?} obj
         * @return {?}
         */
        function (obj) {
            return Object.keys(obj).some((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                if (obj[key]) {
                    // Fix(tableSearch): table search will now able to filter through nested data
                    return (/** @type {?} */ (JSON.stringify(obj)
                        .toLowerCase()
                        .includes(searchKey)));
                }
            }));
        }));
    };
    /**
     * @param {?} searchKey
     * @param {?} keys
     * @return {?}
     */
    MdbTableDirective.prototype.filterLocalDataByFields = /**
     * @param {?} searchKey
     * @param {?} keys
     * @return {?}
     */
    function (searchKey, keys) {
        return this.getDataSource().filter((/**
         * @param {?} obj
         * @return {?}
         */
        function (obj) {
            return Object.keys(obj).some((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                if (keys.includes(key)) {
                    if (obj[key].toLowerCase().includes(searchKey)) {
                        return obj[key];
                    }
                }
            }));
        }));
    };
    /**
     * @param {?} searchKey
     * @param {?=} keys
     * @return {?}
     */
    MdbTableDirective.prototype.filterLocalDataByMultipleFields = /**
     * @param {?} searchKey
     * @param {?=} keys
     * @return {?}
     */
    function (searchKey, keys) {
        /** @type {?} */
        var items = searchKey.split(' ').map((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return x.toLowerCase(); }));
        return this.getDataSource().filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
            var e_1, _a;
            try {
                for (var items_1 = tslib_1.__values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                    var item = items_1_1.value;
                    /** @type {?} */
                    var flag = false;
                    if (keys !== undefined) {
                        for (var prop in x) {
                            if (keys.includes(prop)) {
                                if (x[prop].toLowerCase().indexOf(item) !== -1) {
                                    flag = true;
                                    break;
                                }
                            }
                        }
                    }
                    if (keys === undefined) {
                        for (var prop in x) {
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
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return true;
        }));
    };
    /**
     * @param {?} searchKey
     * @return {?}
     */
    MdbTableDirective.prototype.searchLocalDataBy = /**
     * @param {?} searchKey
     * @return {?}
     */
    function (searchKey) {
        if (!searchKey) {
            return this.getDataSource();
        }
        if (searchKey) {
            return this.filterLocalDataBy(searchKey.toLowerCase());
        }
    };
    /**
     * @param {?} searchKey
     * @param {?} keys
     * @return {?}
     */
    MdbTableDirective.prototype.searchLocalDataByFields = /**
     * @param {?} searchKey
     * @param {?} keys
     * @return {?}
     */
    function (searchKey, keys) {
        if (!searchKey) {
            return this.getDataSource();
        }
        if (searchKey && keys.length > 0) {
            return this.filterLocalDataByFields(searchKey.toLowerCase(), keys);
        }
        if (!keys || keys.length === 0) {
            return this.filterLocalDataBy(searchKey.toLowerCase());
        }
    };
    /**
     * @param {?} searchKey
     * @param {?=} keys
     * @return {?}
     */
    MdbTableDirective.prototype.searchLocalDataByMultipleFields = /**
     * @param {?} searchKey
     * @param {?=} keys
     * @return {?}
     */
    function (searchKey, keys) {
        if (!searchKey) {
            return this.getDataSource();
        }
        if (searchKey && keys !== undefined) {
            return this.filterLocalDataByMultipleFields(searchKey.toLowerCase(), keys);
        }
    };
    /**
     * @param {?} searchKey
     * @return {?}
     */
    MdbTableDirective.prototype.searchDataObservable = /**
     * @param {?} searchKey
     * @return {?}
     */
    function (searchKey) {
        var _this = this;
        /** @type {?} */
        var observable = new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        function (observer) {
            observer.next(_this.searchLocalDataBy(searchKey));
        }));
        return observable;
    };
    /**
     * @return {?}
     */
    MdbTableDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.renderer.addClass(this.el.nativeElement, 'table');
    };
    /**
     * @return {?}
     */
    MdbTableDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Fix(stickyHeader): resolved problem with not working stickyHeader="true" on Chrome
        if (this.stickyHeader) {
            /** @type {?} */
            var tableHead = this.el.nativeElement.querySelector('thead');
            Array.from(tableHead.firstElementChild.children).forEach((/**
             * @param {?} child
             * @return {?}
             */
            function (child) {
                _this.renderer.addClass(child, 'sticky-top');
                if (_this.stickyHeaderBgColor) {
                    _this.renderer.setStyle(child, 'background-color', _this.stickyHeaderBgColor);
                }
                else {
                    _this.renderer.setStyle(child, 'background-color', '#f2f2f2');
                }
                if (_this.stickyHeaderTextColor) {
                    _this.renderer.setStyle(child, 'color', _this.stickyHeaderTextColor);
                }
                else {
                    _this.renderer.setStyle(child, 'color', '#000000');
                }
            }));
        }
    };
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
    MdbTableDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
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
    return MdbTableDirective;
}());
export { MdbTableDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLXRhYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItYm9vdHN0cmFwLW1kLyIsInNvdXJjZXMiOlsibGliL2ZyZWUvdGFibGVzL2RpcmVjdGl2ZXMvbWRiLXRhYmxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFFTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFdBQVcsRUFDWCxLQUFLLEVBRUwsU0FBUyxFQUNULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUzQztJQXNDRSwyQkFBb0IsRUFBYyxFQUFVLFFBQW1CO1FBQTNDLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBSnRELGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLHdCQUFtQixHQUFHLEVBQUUsQ0FBQztRQUN6QiwwQkFBcUIsR0FBRyxFQUFFLENBQUM7UUFJNUIsZ0JBQVcsR0FBUSxFQUFFLENBQUM7UUFDdEIsdUJBQWtCLEdBQWlCLElBQUksT0FBTyxFQUFPLENBQUM7SUFISSxDQUFDOzs7OztJQUtuRSxrQ0FBTTs7OztJQUFOLFVBQU8sTUFBVztRQUNoQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7OztJQUVELHVDQUFXOzs7OztJQUFYLFVBQVksS0FBYSxFQUFFLEdBQVE7UUFDakMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzdDLENBQUM7Ozs7O0lBRUQscUNBQVM7Ozs7SUFBVCxVQUFVLEtBQWE7UUFDckIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7OztJQUVELHNDQUFVOzs7SUFBVjs7WUFDUSxVQUFVLEdBQUcsSUFBSSxVQUFVOzs7O1FBQVUsVUFBQyxRQUFhO1lBQ3ZELFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsQ0FBQyxFQUFDO1FBQ0YsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQzs7OztJQUVELHlDQUFhOzs7SUFBYjtRQUNFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7O0lBRUQseUNBQWE7OztJQUFiO1FBQ0UsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7Ozs7O0lBRUQseUNBQWE7Ozs7SUFBYixVQUFjLElBQVM7UUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztJQUNyRCxDQUFDOzs7O0lBRUQsNENBQWdCOzs7SUFBaEI7UUFDRSxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztJQUNqQyxDQUFDOzs7OztJQUVELDZDQUFpQjs7OztJQUFqQixVQUFrQixTQUFpQjtRQUNqQyxPQUFPLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxNQUFNOzs7O1FBQUMsVUFBQyxHQUFlO1lBQ2pELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJOzs7O1lBQUMsVUFBQyxHQUFRO2dCQUNwQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDWiw2RUFBNkU7b0JBRTdFLE9BQU8sbUJBQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7eUJBQ3ZCLFdBQVcsRUFBRTt5QkFDYixRQUFRLENBQUMsU0FBUyxDQUFDLEVBQU8sQ0FBQztpQkFDL0I7WUFDSCxDQUFDLEVBQUMsQ0FBQztRQUNMLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBRUQsbURBQXVCOzs7OztJQUF2QixVQUF3QixTQUFpQixFQUFFLElBQWM7UUFDdkQsT0FBTyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsTUFBTTs7OztRQUFDLFVBQUMsR0FBZTtZQUNqRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSTs7OztZQUFDLFVBQUMsR0FBUTtnQkFDcEMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUN0QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7d0JBQzlDLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUNqQjtpQkFDRjtZQUNILENBQUMsRUFBQyxDQUFDO1FBQ0wsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7SUFDRCwyREFBK0I7Ozs7O0lBQS9CLFVBQWdDLFNBQWlCLEVBQUUsSUFBZTs7WUFDMUQsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRzs7OztRQUFDLFVBQUMsQ0FBOEIsSUFBSyxPQUFBLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBZixDQUFlLEVBQUM7UUFDM0YsT0FBTyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsTUFBTTs7OztRQUFDLFVBQUMsQ0FBYTs7O2dCQUMvQyxLQUFtQixJQUFBLFVBQUEsaUJBQUEsS0FBSyxDQUFBLDRCQUFBLCtDQUFFO29CQUFyQixJQUFNLElBQUksa0JBQUE7O3dCQUNULElBQUksR0FBRyxLQUFLO29CQUNoQixJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7d0JBQ3RCLEtBQUssSUFBTSxJQUFJLElBQUksQ0FBQyxFQUFFOzRCQUNwQixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0NBQ3ZCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtvQ0FDOUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQ0FDWixNQUFNO2lDQUNQOzZCQUNGO3lCQUNGO3FCQUNGO29CQUNELElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTt3QkFDdEIsS0FBSyxJQUFNLElBQUksSUFBSSxDQUFDLEVBQUU7NEJBQ3BCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQ0FDOUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQ0FDWixNQUFNOzZCQUNQO3lCQUNGO3FCQUNGO29CQUNELElBQUksQ0FBQyxJQUFJLEVBQUU7d0JBQ1QsT0FBTyxLQUFLLENBQUM7cUJBQ2Q7aUJBQ0Y7Ozs7Ozs7OztZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUNELDZDQUFpQjs7OztJQUFqQixVQUFrQixTQUFpQjtRQUNqQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2QsT0FBTyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDN0I7UUFFRCxJQUFJLFNBQVMsRUFBRTtZQUNiLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1NBQ3hEO0lBQ0gsQ0FBQzs7Ozs7O0lBRUQsbURBQXVCOzs7OztJQUF2QixVQUF3QixTQUFpQixFQUFFLElBQWM7UUFDdkQsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNkLE9BQU8sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQzdCO1FBRUQsSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDaEMsT0FBTyxJQUFJLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3BFO1FBQ0QsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUM5QixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztTQUN4RDtJQUNILENBQUM7Ozs7OztJQUNELDJEQUErQjs7Ozs7SUFBL0IsVUFBZ0MsU0FBaUIsRUFBRSxJQUFlO1FBQ2hFLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDZCxPQUFPLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUM3QjtRQUNELElBQUksU0FBUyxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7WUFDbkMsT0FBTyxJQUFJLENBQUMsK0JBQStCLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzVFO0lBQ0gsQ0FBQzs7Ozs7SUFDRCxnREFBb0I7Ozs7SUFBcEIsVUFBcUIsU0FBaUI7UUFBdEMsaUJBS0M7O1lBSk8sVUFBVSxHQUFHLElBQUksVUFBVTs7OztRQUFDLFVBQUMsUUFBYTtZQUM5QyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ25ELENBQUMsRUFBQztRQUNGLE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Ozs7SUFFRCxvQ0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN6RCxDQUFDOzs7O0lBRUQsMkNBQWU7OztJQUFmO1FBQUEsaUJBbUJDO1FBbEJDLHFGQUFxRjtRQUNyRixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7O2dCQUNmLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO1lBRTlELEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU87Ozs7WUFBQyxVQUFDLEtBQVU7Z0JBQ2xFLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDNUMsSUFBSSxLQUFJLENBQUMsbUJBQW1CLEVBQUU7b0JBQzVCLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxLQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztpQkFDN0U7cUJBQU07b0JBQ0wsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLGtCQUFrQixFQUFFLFNBQVMsQ0FBQyxDQUFDO2lCQUM5RDtnQkFDRCxJQUFJLEtBQUksQ0FBQyxxQkFBcUIsRUFBRTtvQkFDOUIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztpQkFDcEU7cUJBQU07b0JBQ0wsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztpQkFDbkQ7WUFDSCxDQUFDLEVBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7Z0JBbE1GLFNBQVMsU0FBQzs7b0JBRVQsUUFBUSxFQUFFLFlBQVk7b0JBQ3RCLFFBQVEsRUFBRSxVQUFVO29CQUNwQixRQUFRLEVBQUUsMkJBQTJCO29CQUVyQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7aUJBQ3RDOzs7O2dCQWhCQyxVQUFVO2dCQUlWLFNBQVM7OzswQkFlUixLQUFLLFlBQ0wsV0FBVyxTQUFDLHFCQUFxQjsyQkFHakMsS0FBSyxZQUNMLFdBQVcsU0FBQyxzQkFBc0I7NkJBR2xDLEtBQUssWUFDTCxXQUFXLFNBQUMsd0JBQXdCO3dCQUdwQyxLQUFLLFlBQ0wsV0FBVyxTQUFDLG1CQUFtQjt3QkFHL0IsS0FBSyxZQUNMLFdBQVcsU0FBQyxnQkFBZ0I7NkJBRzVCLEtBQUssWUFDTCxXQUFXLFNBQUMsd0JBQXdCOytCQUdwQyxLQUFLO3NDQUNMLEtBQUs7d0NBQ0wsS0FBSzs7SUErSlIsd0JBQUM7Q0FBQSxBQW5NRCxJQW1NQztTQTFMWSxpQkFBaUI7OztJQUM1QixvQ0FFaUI7O0lBRWpCLHFDQUVrQjs7SUFFbEIsdUNBRW9COztJQUVwQixrQ0FFZTs7SUFFZixrQ0FFZTs7SUFFZix1Q0FFb0I7O0lBRXBCLHlDQUE4Qjs7SUFDOUIsZ0RBQWtDOztJQUNsQyxrREFBb0M7Ozs7O0lBSXBDLHdDQUE4Qjs7Ozs7SUFDOUIsK0NBQThEOzs7OztJQUhsRCwrQkFBc0I7Ozs7O0lBQUUscUNBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgUmVuZGVyZXIyLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnW21kYlRhYmxlXScsXG4gIGV4cG9ydEFzOiAnbWRiVGFibGUnLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICBzdHlsZVVybHM6IFsnLi8uLi90YWJsZXMtbW9kdWxlLnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGNsYXNzIE1kYlRhYmxlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KClcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50YWJsZS1zdHJpcGVkJylcbiAgc3RyaXBlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRhYmxlLWJvcmRlcmVkJylcbiAgYm9yZGVyZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50YWJsZS1ib3JkZXJsZXNzJylcbiAgYm9yZGVybGVzczogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRhYmxlLWhvdmVyJylcbiAgaG92ZXI6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50YWJsZS1zbScpXG4gIHNtYWxsOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGFibGUtcmVzcG9uc2l2ZScpXG4gIHJlc3BvbnNpdmU6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgc3RpY2t5SGVhZGVyID0gZmFsc2U7XG4gIEBJbnB1dCgpIHN0aWNreUhlYWRlckJnQ29sb3IgPSAnJztcbiAgQElucHV0KCkgc3RpY2t5SGVhZGVyVGV4dENvbG9yID0gJyc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxuXG4gIHByaXZhdGUgX2RhdGFTb3VyY2U6IGFueSA9IFtdO1xuICBwcml2YXRlIF9kYXRhU291cmNlQ2hhbmdlZDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIGFkZFJvdyhuZXdSb3c6IGFueSkge1xuICAgIHRoaXMuZ2V0RGF0YVNvdXJjZSgpLnB1c2gobmV3Um93KTtcbiAgfVxuXG4gIGFkZFJvd0FmdGVyKGluZGV4OiBudW1iZXIsIHJvdzogYW55KSB7XG4gICAgdGhpcy5nZXREYXRhU291cmNlKCkuc3BsaWNlKGluZGV4LCAwLCByb3cpO1xuICB9XG5cbiAgcmVtb3ZlUm93KGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLmdldERhdGFTb3VyY2UoKS5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgcm93UmVtb3ZlZCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICBjb25zdCByb3dSZW1vdmVkID0gbmV3IE9ic2VydmFibGU8Ym9vbGVhbj4oKG9ic2VydmVyOiBhbnkpID0+IHtcbiAgICAgIG9ic2VydmVyLm5leHQodHJ1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJvd1JlbW92ZWQ7XG4gIH1cblxuICByZW1vdmVMYXN0Um93KCkge1xuICAgIHRoaXMuZ2V0RGF0YVNvdXJjZSgpLnBvcCgpO1xuICB9XG5cbiAgZ2V0RGF0YVNvdXJjZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZTtcbiAgfVxuXG4gIHNldERhdGFTb3VyY2UoZGF0YTogYW55KSB7XG4gICAgdGhpcy5fZGF0YVNvdXJjZSA9IGRhdGE7XG4gICAgdGhpcy5fZGF0YVNvdXJjZUNoYW5nZWQubmV4dCh0aGlzLmdldERhdGFTb3VyY2UoKSk7XG4gIH1cblxuICBkYXRhU291cmNlQ2hhbmdlKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2VDaGFuZ2VkO1xuICB9XG5cbiAgZmlsdGVyTG9jYWxEYXRhQnkoc2VhcmNoS2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5nZXREYXRhU291cmNlKCkuZmlsdGVyKChvYmo6IEFycmF5PGFueT4pID0+IHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLnNvbWUoKGtleTogYW55KSA9PiB7XG4gICAgICAgIGlmIChvYmpba2V5XSkge1xuICAgICAgICAgIC8vIEZpeCh0YWJsZVNlYXJjaCk6IHRhYmxlIHNlYXJjaCB3aWxsIG5vdyBhYmxlIHRvIGZpbHRlciB0aHJvdWdoIG5lc3RlZCBkYXRhXG5cbiAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqKVxuICAgICAgICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgIC5pbmNsdWRlcyhzZWFyY2hLZXkpIGFzIGFueTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmaWx0ZXJMb2NhbERhdGFCeUZpZWxkcyhzZWFyY2hLZXk6IHN0cmluZywga2V5czogc3RyaW5nW10pIHtcbiAgICByZXR1cm4gdGhpcy5nZXREYXRhU291cmNlKCkuZmlsdGVyKChvYmo6IEFycmF5PGFueT4pID0+IHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLnNvbWUoKGtleTogYW55KSA9PiB7XG4gICAgICAgIGlmIChrZXlzLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAgICBpZiAob2JqW2tleV0udG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hLZXkpKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBmaWx0ZXJMb2NhbERhdGFCeU11bHRpcGxlRmllbGRzKHNlYXJjaEtleTogc3RyaW5nLCBrZXlzPzogc3RyaW5nW10pIHtcbiAgICBjb25zdCBpdGVtcyA9IHNlYXJjaEtleS5zcGxpdCgnICcpLm1hcCgoeDogeyB0b0xvd2VyQ2FzZTogKCkgPT4gdm9pZCB9KSA9PiB4LnRvTG93ZXJDYXNlKCkpO1xuICAgIHJldHVybiB0aGlzLmdldERhdGFTb3VyY2UoKS5maWx0ZXIoKHg6IEFycmF5PGFueT4pID0+IHtcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgICBsZXQgZmxhZyA9IGZhbHNlO1xuICAgICAgICBpZiAoa2V5cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBwcm9wIGluIHgpIHtcbiAgICAgICAgICAgIGlmIChrZXlzLmluY2x1ZGVzKHByb3ApKSB7XG4gICAgICAgICAgICAgIGlmICh4W3Byb3BdLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihpdGVtKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBmbGFnID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoa2V5cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBwcm9wIGluIHgpIHtcbiAgICAgICAgICAgIGlmICh4W3Byb3BdLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihpdGVtKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgZmxhZyA9IHRydWU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZsYWcpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICB9XG4gIHNlYXJjaExvY2FsRGF0YUJ5KHNlYXJjaEtleTogc3RyaW5nKSB7XG4gICAgaWYgKCFzZWFyY2hLZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldERhdGFTb3VyY2UoKTtcbiAgICB9XG5cbiAgICBpZiAoc2VhcmNoS2V5KSB7XG4gICAgICByZXR1cm4gdGhpcy5maWx0ZXJMb2NhbERhdGFCeShzZWFyY2hLZXkudG9Mb3dlckNhc2UoKSk7XG4gICAgfVxuICB9XG5cbiAgc2VhcmNoTG9jYWxEYXRhQnlGaWVsZHMoc2VhcmNoS2V5OiBzdHJpbmcsIGtleXM6IHN0cmluZ1tdKSB7XG4gICAgaWYgKCFzZWFyY2hLZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldERhdGFTb3VyY2UoKTtcbiAgICB9XG5cbiAgICBpZiAoc2VhcmNoS2V5ICYmIGtleXMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyTG9jYWxEYXRhQnlGaWVsZHMoc2VhcmNoS2V5LnRvTG93ZXJDYXNlKCksIGtleXMpO1xuICAgIH1cbiAgICBpZiAoIWtleXMgfHwga2V5cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzLmZpbHRlckxvY2FsRGF0YUJ5KHNlYXJjaEtleS50b0xvd2VyQ2FzZSgpKTtcbiAgICB9XG4gIH1cbiAgc2VhcmNoTG9jYWxEYXRhQnlNdWx0aXBsZUZpZWxkcyhzZWFyY2hLZXk6IHN0cmluZywga2V5cz86IHN0cmluZ1tdKSB7XG4gICAgaWYgKCFzZWFyY2hLZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldERhdGFTb3VyY2UoKTtcbiAgICB9XG4gICAgaWYgKHNlYXJjaEtleSAmJiBrZXlzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmZpbHRlckxvY2FsRGF0YUJ5TXVsdGlwbGVGaWVsZHMoc2VhcmNoS2V5LnRvTG93ZXJDYXNlKCksIGtleXMpO1xuICAgIH1cbiAgfVxuICBzZWFyY2hEYXRhT2JzZXJ2YWJsZShzZWFyY2hLZXk6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgY29uc3Qgb2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogYW55KSA9PiB7XG4gICAgICBvYnNlcnZlci5uZXh0KHRoaXMuc2VhcmNoTG9jYWxEYXRhQnkoc2VhcmNoS2V5KSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG9ic2VydmFibGU7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3RhYmxlJyk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgLy8gRml4KHN0aWNreUhlYWRlcik6IHJlc29sdmVkIHByb2JsZW0gd2l0aCBub3Qgd29ya2luZyBzdGlja3lIZWFkZXI9XCJ0cnVlXCIgb24gQ2hyb21lXG4gICAgaWYgKHRoaXMuc3RpY2t5SGVhZGVyKSB7XG4gICAgICBjb25zdCB0YWJsZUhlYWQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcigndGhlYWQnKTtcblxuICAgICAgQXJyYXkuZnJvbSh0YWJsZUhlYWQuZmlyc3RFbGVtZW50Q2hpbGQuY2hpbGRyZW4pLmZvckVhY2goKGNoaWxkOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhjaGlsZCwgJ3N0aWNreS10b3AnKTtcbiAgICAgICAgaWYgKHRoaXMuc3RpY2t5SGVhZGVyQmdDb2xvcikge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoY2hpbGQsICdiYWNrZ3JvdW5kLWNvbG9yJywgdGhpcy5zdGlja3lIZWFkZXJCZ0NvbG9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGNoaWxkLCAnYmFja2dyb3VuZC1jb2xvcicsICcjZjJmMmYyJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RpY2t5SGVhZGVyVGV4dENvbG9yKSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShjaGlsZCwgJ2NvbG9yJywgdGhpcy5zdGlja3lIZWFkZXJUZXh0Q29sb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoY2hpbGQsICdjb2xvcicsICcjMDAwMDAwJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19