type DaltonismType = "Protanopia" | "Deuteranopia" | "Tritanopia" | "Padrao";

const daltonismTypeMap: { [key in DaltonismType]: number } = {
    Padrao: 0,
    Protanopia: 1,
    Deuteranopia: 2,
    Tritanopia: 3
};

const hexToRgb = (hex: string): number[] => {
    hex = hex.replace(/^#/, '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
};

const rgbToHex = (rgb: number[]): string => {
    return `#${((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1)}`;
};

const rgbToLms = (rgb: number[]): number[] => {
    const [r, g, b] = rgb.map(c => c / 255.0);

    const l = 0.31399022 * r + 0.63951294 * g + 0.04649755 * b;
    const m = 0.15537241 * r + 0.75789446 * g + 0.08670142 * b;
    const s = 0.01775239 * r + 0.10944209 * g + 0.87256922 * b;

    return [l, m, s];
};

const lmsToRgb = (lms: number[]): number[] => {
    const [l, m, s] = lms;

    const r = 5.47221206 * l - 4.6419601 * m + 0.16963708 * s;
    const g = -1.1252419 * l + 2.29317094 * m - 0.1678952 * s;
    const b = 0.02980165 * l - 0.19318073 * m + 1.16364789 * s;

    return [r, g, b].map(c => Math.round(Math.max(0, Math.min(1, c)) * 255));
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

function correctForDaltonism(rgb: number[], type: number): number[] {
    let correctionMatrix: number[][];

    switch (type) {
        case 1:  // Protanopia
            correctionMatrix = [
                [0.0, 0.2, 1.0], 
                [1.0, 0.0, 0.2], 
                [0.2, 1.0, 1.0], 
            ];
            break;
        case 2: // Deuteranopia
            correctionMatrix = [
                [0.2, 1.0, 0.2], 
                [0.2, 0.0, 1.0],
                [1.0, 1.0, 0.2],
            ];
            break;
        case 3: // Tritanopia
            correctionMatrix = [
                [0.2, 1.0, 1.0],
                [0.2, 0.2, 1.0], 
                [1.0, 0.2, 1.0],
            ];

            break;
        default:
            throw new Error("Invalid daltonism type");
    }

    return applyColorCorrection(rgb, correctionMatrix);
}

function applyColorCorrection(rgb: number[], correctionMatrix: number[][]): number[] {
    const correctedColor = [
        rgb[0] * correctionMatrix[0][0] + rgb[1] * correctionMatrix[0][1] + rgb[2] * correctionMatrix[0][2],
        rgb[0] * correctionMatrix[1][0] + rgb[1] * correctionMatrix[1][1] + rgb[2] * correctionMatrix[1][2],
        rgb[0] * correctionMatrix[2][0] + rgb[1] * correctionMatrix[2][1] + rgb[2] * correctionMatrix[2][2]
    ];

    const correctedColorClamped = correctedColor.map(value => Math.max(0, Math.min(255, value)));

    return correctedColorClamped;
}

const originalStylesMapBackground = new Map<HTMLElement, { backgroundColor: string; }>();
const originalStylesMapFont = new Map<HTMLElement, { color: string }>();

export const applyDaltonismCorrection = (type: DaltonismType) => {
    const daltonismType = daltonismTypeMap[type];

    if (originalStylesMapBackground.size === 0 && originalStylesMapFont.size === 0) {
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

    if (daltonismType === 0) {
        originalStylesMapBackground.clear();
        originalStylesMapFont.clear();
    }
};