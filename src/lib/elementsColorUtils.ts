
export function elementsFunctions() {
    const isRedColor = (rgb: number[], threshold: number = 0.3): boolean => {
        const [r, g, b] = rgb;
        const total = r + g + b;
        if (total === 0) return false;

        const rPercentage = r / total;
        const gPercentage = g / total;
        const bPercentage = b / total;

        return rPercentage >= threshold && rPercentage > gPercentage && rPercentage > bPercentage;
    };

    const isGreenColor = (rgb: number[], threshold: number = 0.3): boolean => {
        const [r, g, b] = rgb;
        const total = r + g + b;
        if (total === 0) return false;

        const rPercentage = r / total;
        const gPercentage = g / total;
        const bPercentage = b / total;

        return gPercentage >= threshold && gPercentage > rPercentage && gPercentage > bPercentage;
    };

    const isYellowColor = (rgb: number[], threshold: number = 0.3): boolean => {
        const [r, g, b] = rgb;
        const total = r + g + b;
        if (total === 0) return false;

        const rPercentage = r / total;
        const gPercentage = g / total;
        const bPercentage = b / total;

        return rPercentage >= threshold && gPercentage >= threshold && bPercentage < threshold;
    };

    const applyProtanopiaCorrection = (rgb: number[]): number[] => {
        const [r, g, b] = rgb;
        const total = r + g + b;
        const rPercentage = r / total;
        const gPercentage = g / total;

        if (isRedColor(rgb)) {
            return [Math.floor(255 * rPercentage), 0, Math.floor(255 * (1 - rPercentage))];
        }
        if (isGreenColor(rgb)) {
            return [Math.floor(255 * gPercentage), Math.floor(192 * gPercentage), Math.floor(203 * gPercentage)];
        }
        return rgb;
    };

    const applyDeuteranopiaCorrection = (rgb: number[]): number[] => {
        const [r, g, b] = rgb;
        const total = r + g + b;
        const rPercentage = r / total;
        const gPercentage = g / total;

        if (isRedColor(rgb)) {
            return [Math.floor(200 * rPercentage), 0, Math.floor(200 * (1 - rPercentage))];
        }
        if (isGreenColor(rgb)) {
            return [Math.floor(200 * gPercentage), Math.floor(137 * gPercentage), Math.floor(153 * gPercentage)];
        }
        return rgb;
    };

    const applyTritanopiaCorrection = (rgb: number[]): number[] => {
        const [r, g, b] = rgb;
        const total = r + g + b;
        const rPercentage = r / total;
        const gPercentage = g / total;
        const bPercentage = b / total;

        if (isYellowColor(rgb)) {
            return [Math.floor(246 * rPercentage), Math.floor(247 * gPercentage), Math.floor(190 * bPercentage)];
        }
        if (isGreenColor(rgb)) {
            return [Math.floor(219 * gPercentage), Math.floor(112 * gPercentage), Math.floor(147 * gPercentage)];
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