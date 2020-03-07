import {Component, OnInit, ViewChild} from '@angular/core';
import {GeneralService} from '../../../../shared/services/general.service';
import {RatesModel} from '../../../../shared/models/rates.model';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';

export interface BaseRates {
    currency: string;
    spot: string;
    increaseDecrease: string;
    chart: string;
}

export interface LatestRatesItem {
    rates: [];
    base: string;
    start_at: string;
    end_at: string;
}

@Component({
    selector: 'app-latest-rates',
    templateUrl: './latest-rates.component.html',
    styleUrls: ['./latest-rates.component.css']
})
export class LatestRatesComponent implements OnInit {
    base: any;
    dataSource: BaseRates[] = [];

    constructor(
        private service: GeneralService,
        private router: Router
    ) {

    }

    ngOnInit() {

        this.base = this.router.url.split('/')[2];
        if (this.base === undefined) {
            console.log(this.base);
            this.base = 'EUR';
            this.router.navigate([this.router.url.split('/')[1], this.base]);
        }

        this.getBasedRates();
    }

    public getBasedRates() {
        const self = this;
        const selectedBase = this.base;
        const starDate = moment().subtract(4, 'day').format('Y-MM-DD');
        const endDate = moment().format('Y-MM-DD');
        let startDatesRates: any;
        let endDatesRates: any;
        const dateRates: any = [];
        let startDateFinal: any;
        let endDateFinal: any;

        this.service.getLatestRatesHistoryByBase(selectedBase, starDate, endDate).subscribe((data: LatestRatesItem) => {
            const item = Object.keys(data.rates);
            item.forEach(function (key, index) {
                dateRates.push({date: new Date(key)});
            });
            const sortedDates = dateRates.sort((a, b) => b.date - a.date);
            endDateFinal = moment(new Date(sortedDates[0].date)).format('Y-MM-DD');
            startDateFinal = moment(new Date(sortedDates[1].date)).format('Y-MM-DD');
            endDatesRates = data.rates[endDateFinal];
            startDatesRates = data.rates[startDateFinal];

            Object.keys(endDatesRates).forEach(function (keyCurrency) {
                const baseRate = new RatesModel();
                baseRate.currency = keyCurrency;
                baseRate.spot = endDatesRates[keyCurrency];
                baseRate.increaseDecrease = self.comparisonBetwenDatesOfRates(startDatesRates[keyCurrency], endDatesRates[keyCurrency]);
                self.dataSource.push(baseRate);
            });
        });

    }

    comparisonBetwenDatesOfRates(startDateRate, endDateRate) {
        if (endDateRate < startDateRate) {
            return 'fa fa-arrow-down';
        } else if (endDateRate === startDateRate) {
            return 'fa fa-bars';
        } else {
            return 'fa fa-arrow-up';
        }
    }
}
