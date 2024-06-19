type DaltonismType = "Protanopia" | "Deuteranopia" | "Tritanopia" | "Padrao";

const daltonismTypeMap: { [key in DaltonismType]: number } = {
    Padrao: 0,
    Protanopia: 1,
    Deuteranopia: 2,
    Tritanopia: 3
};

const rgbToHex = (rgb: number[]): string => {
    return `#${((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1)}`;
};

const isGrayishColor = (rgb: number[]): boolean => {
    const [r, g, b] = rgb;
    const threshold = 30;

    return Math.abs(r - g) < threshold && Math.abs(r - b) < threshold && Math.abs(g - b) < threshold;
};

const isWhiteOrBlack = (rgb: number[]): boolean => {
    const [r, g, b] = rgb;
    return (r > 250 && g > 250 && b > 250) || (r < 5 && g < 5 && b < 5);
};

const isColorStandard = (rgb: number[]): boolean => {
    const [r, g, b] = rgb;
    return !(r === 0 && g === 128 && b === 0);
};

const isRedColor = (rgb: number[], threshold: number = 0.5): boolean => {
    const [r, g, b] = rgb;
    const total = r + g + b;
    if (total === 0) return false;

    const rPercentage = r / total;
    const gPercentage = g / total;
    const bPercentage = b / total;

    return rPercentage >= threshold && rPercentage > gPercentage && rPercentage > bPercentage;
};

const isGreenColor = (rgb: number[], threshold: number = 0.5): boolean => {
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

const correctForDaltonism = (rgb: number[], type: number): number[] => {
    let correctionMatrix: number[][];

    switch (type) {
        case 1:  // Protanopia
            return applyProtanopiaCorrection(rgb);
        case 2: // Deuteranopia
            return applyDeuteranopiaCorrection(rgb);
        case 3: // Tritanopia
            return applyTritanopiaCorrection(rgb);
            break;
        default:
            throw new Error("Invalid daltonism type");
    }
};


const originalStylesMapBackground = new Map<HTMLElement, { backgroundColor: string; }>();
const originalStylesMapFont = new Map<HTMLElement, { color: string }>();
const originalImages = new Map<HTMLImageElement, string>();

const correctForDaltonismImage = (rgb: number[], type: number): number[] => {
    let correctionMatrix: number[][];

    switch (type) {
        case 1: // Protanopia
            correctionMatrix = [
                [0.0, 0.2, 1.0], // Red to Cyan
                [1.0, 0.0, 0.2], // Green to Magenta
                [0.2, 1.0, 1.0], // Blue, Cyan and Yellow contrast
            ];
            break;
        case 2: // Deuteranopia
            correctionMatrix = [
                [0.2, 1.0, 0.2], // Green to Magenta
                [0.2, 0.0, 1.0], // Blue, Cyan, Red and Yellow contrast
                [1.0, 1.0, 0.2],
            ];
            break;
        case 3: // Tritanopia
            correctionMatrix = [
                [0.2, 1.0, 1.0], // Blue, Cyan and Yellow contrast
                [0.2, 0.2, 1.0], // Yellow to Cyan
                [1.0, 0.2, 1.0], // Red to Magenta
            ];
            break;
        default:
            throw new Error("Invalid daltonism type");
    }

    const [r, g, b] = rgb;
    const correctedR = Math.min(r * correctionMatrix[0][0] + g * correctionMatrix[0][1] + b * correctionMatrix[0][2]);
    const correctedG = Math.min(r * correctionMatrix[1][0] + g * correctionMatrix[1][1] + b * correctionMatrix[1][2]);
    const correctedB = Math.min(r * correctionMatrix[2][0] + g * correctionMatrix[2][1] + b * correctionMatrix[2][2]);

    return [correctedR, correctedG, correctedB];
};

export const applyDaltonismCorrection = (type: DaltonismType) => {
    const daltonismType = daltonismTypeMap[type];

    if (originalStylesMapBackground.size === 0 && originalStylesMapFont.size === 0 && originalImages.size === 0) {
        document.querySelectorAll("*").forEach((element) => {
            const htmlElement = element as HTMLElement;
            const style = window.getComputedStyle(htmlElement);
            const backgroundColor = style.backgroundColor;
            const color = style.color;

            if (backgroundColor && color) {
                const bgRgb = backgroundColor
                    .replace(/[^\d,]/g, "")
                    .split(",")
                    .map(Number);

                const textColorRgb = color
                    .replace(/[^\d,]/g, "")
                    .split(",")
                    .map(Number);

                if (!isWhiteOrBlack(bgRgb) && !isGrayishColor(bgRgb) && isColorStandard(bgRgb)) {
                    originalStylesMapBackground.set(htmlElement, { backgroundColor });
                }
                if (!isWhiteOrBlack(textColorRgb) && !isGrayishColor(textColorRgb) && isColorStandard(textColorRgb)) {
                    originalStylesMapFont.set(htmlElement, { color });
                }
            }
        });

        document.querySelectorAll("img").forEach((imgElement) => {
            const img = imgElement as HTMLImageElement;
            if (img.src) {
                originalImages.set(img, img.src);
            }
        });
    }

    originalStylesMapBackground.forEach((originalColors, htmlElement) => {
        const originalBgRgb = originalColors.backgroundColor
            .replace(/[^\d,]/g, "")
            .split(",")
            .map(Number);

        if (daltonismType !== 0) {
            const correctedBgRgb = correctForDaltonism(originalBgRgb, daltonismType);

            const correctedBgColor = rgbToHex(correctedBgRgb);

            htmlElement.style.backgroundColor = correctedBgColor;
        } else {
            htmlElement.style.backgroundColor = originalColors.backgroundColor;
        }
    });

    originalStylesMapFont.forEach((originalColors, htmlElement) => {
        const originalColorRgb = originalColors.color
            .replace(/[^\d,]/g, "")
            .split(",")
            .map(Number);

        if (daltonismType !== 0) {
            const correctedColorRgb = correctForDaltonism(originalColorRgb, daltonismType);

            const correctedBgFont = rgbToHex(correctedColorRgb);

            htmlElement.style.color = correctedBgFont;
        } else {
            htmlElement.style.color = originalColors.color;
        }
    });

    originalImages.forEach((src, imgElement) => {
        if (daltonismType !== 0) {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = src;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                if (ctx) {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0, img.width, img.height);

                    const imageData = ctx.getImageData(0, 0, img.width, img.height);
                    const data = imageData.data;

                    for (let i = 0; i < data.length; i += 4) {
                        const rgb = [data[i], data[i + 1], data[i + 2]];
                        const correctedRgb = correctForDaltonismImage(rgb, daltonismType);

                        data[i] = correctedRgb[0];
                        data[i + 1] = correctedRgb[1];
                        data[i + 2] = correctedRgb[2];
                    }

                    ctx.putImageData(imageData, 0, 0);
                    imgElement.src = canvas.toDataURL();
                }
            };
        } else {
            imgElement.src = src;
        }
    });

    if (daltonismType === 0) {
        originalStylesMapBackground.clear();
        originalStylesMapFont.clear();
        originalImages.clear();
    }
};