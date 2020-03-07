export class RatesModel {
    constructor(
        public currency: string = null,
        public spot: string = null,
        public increaseDecrease: string = null,
        public chart: string = null,
    ) {
    }
}
