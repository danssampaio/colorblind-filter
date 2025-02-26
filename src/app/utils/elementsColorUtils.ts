export function elementsFunctions() {
    // Função para calcular a porcentagem das cores
    const calculateColorPercentage = (rgb: number[]): { r: number; g: number; b: number } => {
        const total = rgb.reduce((sum, val) => sum + val, 0);
        if (total === 0) return { r: 0, g: 0, b: 0 };

        return {
            r: rgb[0] / total,
            g: rgb[1] / total,
            b: rgb[2] / total,
        };
    };

    const isRedColor = (rgb: number[], threshold: number = 0.3): boolean => {
        const { r, g, b } = calculateColorPercentage(rgb);
        return r >= threshold && r > g && r > b;
    };

    const isGreenColor = (rgb: number[], threshold: number = 0.3): boolean => {
        const { r, g, b } = calculateColorPercentage(rgb);
        return g >= threshold && g > r && g > b;
    };

    const isYellowColor = (rgb: number[], threshold: number = 0.3): boolean => {
        const { r, g, b } = calculateColorPercentage(rgb);
        return r >= threshold && g >= threshold && b < threshold;
    };

    const applyProtanopiaCorrection = (rgb: number[]): number[] => {
        const { r, g, b } = calculateColorPercentage(rgb);
        if (isRedColor(rgb)) {
            return [Math.floor(255 * r), 0, Math.floor(255 * (1 - r))];
        }
        if (isGreenColor(rgb)) {
            return [Math.floor(255 * g), Math.floor(192 * g), Math.floor(203 * g)];
        }
        return rgb;
    };

    const applyDeuteranopiaCorrection = (rgb: number[]): number[] => {
        const { r, g, b } = calculateColorPercentage(rgb);
        if (isRedColor(rgb)) {
            return [Math.floor(200 * r), 0, Math.floor(200 * (1 - r))];
        }
        if (isGreenColor(rgb)) {
            return [
                Math.floor(128 * (1 - g)),
                Math.floor(128 * (1 - g)),
                Math.floor(128 * (1 - g)),
            ];
        }
        return rgb;
    };

    const applyTritanopiaCorrection = (rgb: number[]): number[] => {
        const { r, g, b } = calculateColorPercentage(rgb);
        if (isYellowColor(rgb)) {
            return [Math.floor(246 * r), Math.floor(247 * g), Math.floor(190 * b)];
        }
        if (isGreenColor(rgb)) {
            return [
                Math.floor(128 * (1 - g)),
                Math.floor(128 * (1 - g)),
                Math.floor(128 * (1 - g)),
            ];
        }
        return rgb;
    };

    return {
        isGreenColor,
        isYellowColor,
        isRedColor,
        applyProtanopiaCorrection,
        applyDeuteranopiaCorrection,
        applyTritanopiaCorrection,
    };
}
