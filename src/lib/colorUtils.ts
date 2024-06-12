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

const rgbToXyz = (rgb: number[]): number[] => {
    const [r, g, b] = rgb.map((c) => c / 255.0);

    const rLinear = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    const gLinear = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    const bLinear = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

    const x = rLinear * 0.4124 + gLinear * 0.3576 + bLinear * 0.1805;
    const y = rLinear * 0.2126 + gLinear * 0.7152 + bLinear * 0.0722;
    const z = rLinear * 0.0193 + gLinear * 0.1192 + bLinear * 0.9505;

    return [x, y, z];
};

const xyzToRgb = (xyz: number[]): number[] => {
    const [x, y, z] = xyz;

    let r = x * 3.2406 + y * -1.5372 + z * -0.4986;
    let g = x * -0.9689 + y * 1.8758 + z * 0.0415;
    let b = x * 0.0557 + y * -0.204 + z * 1.057;

    const rCorrected = r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r;
    const gCorrected = g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : 12.92 * g;
    const bCorrected = b > 0.0031308 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : 12.92 * b;

    return [rCorrected, gCorrected, bCorrected].map((c) => Math.min(255, Math.max(0, Math.round(c * 255))));
};

const isGrayishColor = (rgb: number[]): boolean => {
    const [r, g, b] = rgb;
    const threshold = 15;

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

const correctForDaltonism = (hexColor: string, type: number): string => {
    const rgb = hexToRgb(hexColor);
    const xyz = rgbToXyz(rgb);

    let correctionMatrix;
    let lowCorrectionMatrix, highCorrectionMatrix;

    switch (type) {
        case 1: // Protanopia
            lowCorrectionMatrix = [
                [0.6, 0.4, 0],
                [0.3, 0.7, 0],
                [0, 0.3, 0.7],
            ];
            highCorrectionMatrix = [
                [0, 0.8, 0.2],
                [0, 0.7, 0.3],
                [0, 0.2, 0.8],
            ];
            break;
        case 2: // Deuteranopia
            lowCorrectionMatrix = [
                [0.7, 0.3, 0],
                [0.4, 0.6, 0],
                [0, 0.2, 0.8],
            ];
            highCorrectionMatrix = [
                [0.6, 0.4, 0],
                [0, 1, 0],
                [0, 0.2, 0.8],
            ];
            break;
        case 3: // Tritanopia
            lowCorrectionMatrix = [
                [0.95, 0.05, 0],
                [0, 0.43, 0.57],
                [0, 0.48, 0.52],
            ];
            highCorrectionMatrix = [
                [0.95, 0.05, 0],
                [0, 0.43, 0.57],
                [0, 1, 0],
            ];
            break;
        default:
            throw new Error("Invalid daltonism type");
    }

    const intensity = rgb.reduce((acc, val) => acc + val, 0) / (255 * 3);
    const intensityThreshold = 0.1;
    correctionMatrix = intensity < intensityThreshold ? lowCorrectionMatrix : highCorrectionMatrix;

    const xyzCorrected = [
        correctionMatrix[0][0] * xyz[0] + correctionMatrix[0][1] * xyz[1] + correctionMatrix[0][2] * xyz[2],
        correctionMatrix[1][0] * xyz[0] + correctionMatrix[1][1] * xyz[1] + correctionMatrix[1][2] * xyz[2],
        correctionMatrix[2][0] * xyz[0] + correctionMatrix[2][1] * xyz[1] + correctionMatrix[2][2] * xyz[2]
    ];

    const rgbCorrected = xyzToRgb(xyzCorrected);
    return rgbToHex(rgbCorrected);
};

const originalStylesMap = new Map<HTMLElement, string>();

export const applyDaltonismCorrection = (type: DaltonismType) => {
    const daltonismType = daltonismTypeMap[type];

    if (originalStylesMap.size === 0) {
        document.querySelectorAll("*").forEach((element) => {
            const htmlElement = element as HTMLElement;
            const style = window.getComputedStyle(htmlElement);
            const backgroundColor = style.backgroundColor;

            if (backgroundColor) {
                const rgb = backgroundColor
                    .replace(/[^\d,]/g, "")
                    .split(",")
                    .map(Number);

                if (!isWhiteOrBlack(rgb) && !isGrayishColor(rgb) && isColorStandard(rgb)) {
                    originalStylesMap.set(htmlElement, backgroundColor);
                }
            }
        });
    }

    originalStylesMap.forEach((originalColor, htmlElement) => {
        const rgb = originalColor
            .replace(/[^\d,]/g, "")
            .split(",")
            .map(Number);

        const hexColor = rgbToHex(rgb);

        if (daltonismType !== 0) {
            const correctedColor = correctForDaltonism(hexColor, daltonismType);
            htmlElement.style.backgroundColor = correctedColor;
        } else {
            htmlElement.style.backgroundColor = originalColor;
        }
    });

    if (daltonismType === 0) {
        originalStylesMap.clear();
    }
};
