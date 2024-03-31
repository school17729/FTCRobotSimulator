class Mathematics {
    public static mapNumber(input: number, inputStart: number, inputEnd: number, outputStart: number, outputEnd: number): number {
        return outputStart + (outputEnd - outputStart) / (inputEnd - inputStart) * (input - inputStart);
    }
}

export { Mathematics };