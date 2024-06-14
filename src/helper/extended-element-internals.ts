interface ElementInternalsExtended extends ElementInternals {
    readonly states: Pick<Set<string>, "size" | "add" | "clear" | "delete" | "entries" | "forEach" | "has" | "keys" | "values">
} // TS issue, solution based on https://github.com/microsoft/TypeScript/issues/33218