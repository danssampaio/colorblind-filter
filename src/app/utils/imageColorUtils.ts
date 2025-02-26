export default function imageFunctions() {
    const calculatePercentages = (rgb: number[]) => {
        const total = rgb.reduce((sum, value) => sum + value, 0);
        return total === 0 ? { r: 0, g: 0, b: 0 } : {
            r: rgb[0] / total,
            g: rgb[1] / total,
            b: rgb[2] / total
        };
    };

    const isGrayishColor = (rgb: number[]): boolean => {
        const [r, g, b] = rgb;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        return (max - min) < 40;
    };

    const isWhiteOrBlack = (rgb: number[]): boolean => {
        const [r, g, b] = rgb;
        const whiteThreshold = 240;
        const blackThreshold = 15;
        return (r > whiteThreshold && g > whiteThreshold && b > whiteThreshold) ||
            (r < blackThreshold && g < blackThreshold && b < blackThreshold);
    };

    const isGreenColor = (rgb: number[], threshold: number = 0): boolean => {
        const { r, g, b } = calculatePercentages(rgb);
        if (isWhiteOrBlack(rgb) || isGrayishColor(rgb)) return false;
        return g >= threshold &&
            g > r && g > b &&
            (g - r > 0.1 || g - b > 0.1 || (r - g < 0.15 && b - g < 0.15 && r + b > 0.4 && r > 0.5 && r < 0.7 && g > 0.2));
    };

    const isYellowColor = (rgb: number[], threshold: number = 0.1): boolean => {
        const { r, g, b } = calculatePercentages(rgb);
        if (isWhiteOrBlack(rgb) || isGrayishColor(rgb)) return false;
        return r >= threshold && g >= threshold && b < threshold &&
            r > b && g > b &&
            Math.abs(r - g) < 0.9 &&
            ((r - b > 0.1 && g - b > 0.1) || (b < 0.15 && r + g > 0.7));
    };

    const isRedColorForYellow = (rgb: number[], threshold: number = 0.7, diff: number = 0): boolean => {
        const { r, g, b } = calculatePercentages(rgb);
        if (isWhiteOrBlack(rgb) || isGrayishColor(rgb)) return false;
        return r >= threshold &&
            r > g && r > b &&
            (r - g > diff || r - b > diff || (g - r < 0.15 && b - r < 0.15 && g + b > 0.4 && g > 0.5 && g < 0.7 && r > 0.2));
    };

    const isRedColor = (rgb: number[], threshold: number = 0.4, diff: number = 0.1): boolean => {
        const { r, g, b } = calculatePercentages(rgb);
        if (isWhiteOrBlack(rgb) || isGrayishColor(rgb)) return false;
        return r >= threshold &&
            r > g && r > b &&
            (r - g > diff || r - b > diff || (g - r < 0.15 && b - r < 0.15 && g + b > 0.4 && g > 0.5 && g < 0.7 && r > 0.2));
    };

    const applyProtanopiaCorrection = (rgb: number[]): number[] => {
        const { r, g, b } = calculatePercentages(rgb);
        if (isRedColor(rgb)) {
            return [Math.floor(255 * r), 0, Math.floor(255 * (1 - r))];
        }
        if (isGreenColor(rgb)) {
            return [Math.floor(255 * g), Math.floor(192 * g), Math.floor(203 * g)];
        }
        return rgb;
    };

    const applyDeuteranopiaCorrection = (rgb: number[]): number[] => {
        const { r, g, b } = calculatePercentages(rgb);
        if (isRedColor(rgb)) {
            return [Math.floor(200 * r), 0, Math.floor(200 * (1 - r))];
        }
        if (isGreenColor(rgb)) {
            return [Math.floor(128 * (1 - g)), Math.floor(128 * (1 - g)), Math.floor(128 * (1 - g))];
        }
        return rgb;
    };

    const applyTritanopiaCorrection = (rgb: number[]): number[] => {
        const { r, g, b } = calculatePercentages(rgb);
        if (isYellowColor(rgb)) {
            return [Math.floor(246 * r), Math.floor(247 * g), Math.floor(190 * b)];
        }
        if (isGreenColor(rgb)) {
            return [Math.floor(128 * (1 - g)), Math.floor(128 * (1 - g)), Math.floor(128 * (1 - g))];
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
