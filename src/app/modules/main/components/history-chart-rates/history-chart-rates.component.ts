import {Component, OnInit} from '@angular/core';
import {ChartOptions, ChartType, ChartDataSets} from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {Label} from 'ng2-charts';
import {GeneralService} from '../../../../shared/services/general.service';
import {ActivatedRoute} from '@angular/router';
import * as moment from 'moment';

export interface LatestRatesItem {
    rates: any;
    base: string;
    start_at: string;
    end_at: string;
}

@Component({
    selector: 'app-history-chart-rates',
    templateUrl: './history-chart-rates.component.html',
    styleUrls: ['./history-chart-rates.component.css']
})

export class HistoryChartRatesComponent implements OnInit {
    base: any;
    starDate: string;
    endDate: string;
    public barChartOptions: ChartOptions = {
        responsive: true,
        scales: {xAxes: [{}], yAxes: [{}]},
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'end',
            }
        }
    };
    public barChartLabels: Label[] = [];
    public barChartType: ChartType = 'bar';
    public barChartLegend = false;
    public barChartPlugins = [pluginDataLabels];

    public barChartData: ChartDataSets[] = [{data: []}]
    ;

    constructor(private service: GeneralService,
                public activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.starDate = moment().subtract(30, 'day').format('Y-MM-DD');
        this.endDate = moment().format('Y-MM-DD');
        if (this.activatedRoute.snapshot.params.rowBase !== undefined) {
            this.base = this.activatedRoute.snapshot.params.rowBase;
        } else {
            this.base = this.activatedRoute.snapshot.params.base;
        }
        if (this.base === 'EUR') {
        } else {
            this.getBasedRates();
        }

    }

    public getBasedRates() {
        const self = this;
        const selectedBase = this.base;
        const dataRates = [];
        const tempDates = [];
        this.service.getLatestRatesHistoryByBaseForCurrency(selectedBase, this.starDate, this.endDate).subscribe((data: LatestRatesItem) => {
            Object.keys(data.rates).forEach(function (key) {
                tempDates.push(key);
                dataRates.push(data.rates[key][self.base]);
            });
            this.barChartLabels = tempDates;
            this.barChartData = [
                {data: dataRates},
            ];
        });

    }

}
