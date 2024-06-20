"use client";

import imageFunctions  from "./imageColorUtils";
import { elementsFunctions } from "./elementsColorUtils";

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

// const isColorStandard = (rgb: number[]): boolean => {
//     const [r, g, b] = rgb;
//     return !(r === 0 && g === 128 && b === 0);
// };

const correctForDaltonism = (rgb: number[], type: number): number[] => {

    switch (type) {
        case 1:  // Protanopia
            return elementsFunctions().applyProtanopiaCorrection(rgb);
        case 2: // Deuteranopia
            return elementsFunctions().applyDeuteranopiaCorrection(rgb);
        case 3: // Tritanopia
            return elementsFunctions().applyTritanopiaCorrection(rgb);
        default:
            throw new Error("Invalid daltonism type");
    }
};


const originalStylesMapBackground = new Map<HTMLElement, { backgroundColor: string; }>();
const originalStylesMapFont = new Map<HTMLElement, { color: string }>();
const originalImages = new Map<HTMLImageElement, string>();

const correctForDaltonismImage = (rgb: number[], type: number): number[] => {

    switch (type) {
        case 1:  // Protanopia
            return imageFunctions().applyProtanopiaCorrection(rgb);
        case 2: // Deuteranopia
            return imageFunctions().applyDeuteranopiaCorrection(rgb);
        case 3: // Tritanopia
            return imageFunctions().applyTritanopiaCorrection(rgb);
        default:
            throw new Error("Invalid daltonism type");
    }
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

                if (!isWhiteOrBlack(bgRgb) && !isGrayishColor(bgRgb)) {
                    originalStylesMapBackground.set(htmlElement, { backgroundColor });
                }
                
                if (!isWhiteOrBlack(textColorRgb) && !isGrayishColor(textColorRgb)) {
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