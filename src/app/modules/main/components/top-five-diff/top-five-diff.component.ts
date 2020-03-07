import {Component, OnInit} from '@angular/core';
import {LatestRatesItem} from '../latest-rates/latest-rates.component';
import {GeneralService} from '../../../../shared/services/general.service';
import {Router} from '@angular/router';
import * as moment from 'moment';

export class CurrencyDifference {
    constructor(
        public currency: string,
        public difference: number,
        public percentage: number
    ) {
    }

}

@Component({
    selector: 'app-top-five-diff',
    templateUrl: './top-five-diff.component.html',
    styleUrls: ['./top-five-diff.component.css']
})


export class TopFiveDiffComponent implements OnInit {

    constructor(private service: GeneralService,
                private router: Router) {
    }

    base: any;
    currencyDiff: CurrencyDifference[] = [];
    diffType: number;

    ngOnInit(): void {
        this.base = this.router.url.split('/')[2];
        if (this.base === undefined) {
            this.base = 'EUR';
            this.router.navigate([this.router.url.split('/')[1], this.base]);
        }
        this.getBasedRates();
    }

    public getBasedRates(diffType: number = 1) {
        this.diffType = diffType;
        const starDate = moment().subtract(4, 'day').format('Y-MM-DD');
        const endDate = moment().format('Y-MM-DD');
        let startDatesRates: any;
        let endDatesRates: any;
        const dateRates: any = [];
        let startDateFinal: any;
        let endDateFinal: any;
        const self = this;
        this.service.getLatestRatesHistoryByBase(this.base, starDate, endDate).subscribe((data: LatestRatesItem) => {

            self.currencyDiff = [];
            const item = Object.keys(data.rates);
            item.forEach(function (key, index) {
                dateRates.push({date: new Date(key)});
            });
            const sortedDates = dateRates.sort((a, b) => b.date - a.date);
            endDateFinal = moment(new Date(sortedDates[0].date)).format('Y-MM-DD');
            startDateFinal = moment(new Date(sortedDates[1].date)).format('Y-MM-DD');
            endDatesRates = data.rates[endDateFinal];
            startDatesRates = data.rates[startDateFinal];

            item.forEach(function (key) {
                Object.keys(endDatesRates).forEach(function (keyCurrency) {
                    const getYesterDayCurrencyValue = startDatesRates[keyCurrency];
                    let newValue = 0;

                    if (diffType === 1) {
                        if (endDatesRates[keyCurrency] > getYesterDayCurrencyValue) {
                            newValue = parseFloat(((endDatesRates[keyCurrency] - getYesterDayCurrencyValue)).toFixed(4));
                            const items = new CurrencyDifference(keyCurrency,
                                newValue,
                                parseFloat(((newValue / getYesterDayCurrencyValue) * 100).toFixed(2)));
                            self.currencyDiff.push(items);
                        }
                    } else {
                        if (endDatesRates[keyCurrency] < getYesterDayCurrencyValue) {
                            newValue = parseFloat(((endDatesRates[keyCurrency] - getYesterDayCurrencyValue) * -1).toFixed(4));
                            const items = new CurrencyDifference(keyCurrency,
                                newValue,
                                parseFloat(((newValue / getYesterDayCurrencyValue) * 100).toFixed(2)));
                            self.currencyDiff.push(items);
                        }
                    }
                });
                return;
            });

            self.currencyDiff.sort(function (a, b) {
                return b.difference - a.difference;
            });

            if (self.currencyDiff.length > 5) {
                self.currencyDiff = self.currencyDiff.slice(0, 5);
            }

            self.currencyDiff.sort(function (a, b) {
                return a.difference - b.difference;
            });

        });
    }
}
