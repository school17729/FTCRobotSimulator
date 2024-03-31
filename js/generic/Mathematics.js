class Mathematics {
    static mapNumber(input, inputStart, inputEnd, outputStart, outputEnd) {
        return outputStart + (outputEnd - outputStart) / (inputEnd - inputStart) * (input - inputStart);
    }
}
export { Mathematics };
