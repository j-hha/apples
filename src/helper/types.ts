enum Unit {
    percent = 'percent',
    tons = 'tons',
    kilo = 'kilo',
}

export type StatsData = {
    name: string,
    value: number,
    unit: Unit,
}

export type DataJson = {
    data:Array<StatsData>
};