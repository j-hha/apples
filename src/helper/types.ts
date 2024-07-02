enum Unit {
    percent = 'percent',
    tons = 'tons',
    kilo = 'kilo',
}

export type StatsData = {
    name: string,
    value: number,
    color?: string
}

export type DataJson = {
    unit: Unit|'',
    data: Array<StatsData>,
};