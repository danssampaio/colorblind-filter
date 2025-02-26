import imageFunctions from "./imageColorUtils";
import { elementsFunctions } from "./elementsColorUtils";

type DaltonismType = "Protanopia" | "Deuteranopia" | "Tritanopia" | "Padrao";

const daltonismTypeMap: Record<DaltonismType, number> = {
    Padrao: 0,
    Protanopia: 1,
    Deuteranopia: 2,
    Tritanopia: 3
};

const rgbToHex = ([r, g, b]: number[]): string => `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;

const isGrayishOrWhiteBlack = ([r, g, b]: number[]): boolean => {
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    return (max - min) < 30 || r > 240 && g > 240 && b > 240 || r < 15 && g < 15 && b < 15;
};

const correctForDaltonism = (rgb: number[], type: number): number[] => {
    const functions = elementsFunctions();
    return [
        functions.applyProtanopiaCorrection,
        functions.applyDeuteranopiaCorrection,
        functions.applyTritanopiaCorrection
    ][type - 1]?.(rgb) ?? rgb;
};

const correctForDaltonismImage = (rgb: number[], type: number): number[] => {
    const functions = imageFunctions();
    return [
        functions.applyProtanopiaCorrection,
        functions.applyDeuteranopiaCorrection,
        functions.applyTritanopiaCorrection
    ][type - 1]?.(rgb) ?? rgb;
};

const originalStylesMapBackground = new Map<HTMLElement, { backgroundColor: string }>();
const originalStylesMapBorder = new Map<HTMLElement, { borderColor: string }>();
const originalStylesMapFont = new Map<HTMLElement, { color: string }>();
const originalImages = new Map<HTMLImageElement, string>();

export const applyDaltonismCorrection = (type: DaltonismType) => {
    const daltonismType = daltonismTypeMap[type];

    if (!originalStylesMapBackground.size && !originalStylesMapFont.size && !originalImages.size) {
        document.querySelectorAll("*").forEach((element) => {
            const htmlElement = element as HTMLElement;
            const { backgroundColor, color, borderColor } = window.getComputedStyle(htmlElement);

            const parseRgb = (color: string) => color.match(/\d+/g)?.map(Number) ?? [];
            const bgRgb = parseRgb(backgroundColor);
            const borderRgb = parseRgb(borderColor);
            const textColorRgb = parseRgb(color);

            if (bgRgb.length === 3 && !isGrayishOrWhiteBlack(bgRgb)) {
                originalStylesMapBackground.set(htmlElement, { backgroundColor });
            }
            if (borderRgb.length === 3 && !isGrayishOrWhiteBlack(borderRgb)) {
                originalStylesMapBorder.set(htmlElement, { borderColor });
            }
            if (textColorRgb.length === 3 && !isGrayishOrWhiteBlack(textColorRgb)) {
                originalStylesMapFont.set(htmlElement, { color });
            }
        });

        document.querySelectorAll("img").forEach((imgElement) => {
            const img = imgElement as HTMLImageElement;
            const src = img.getAttribute("src") || img.dataset.src;

            if (src) {
                originalImages.set(img, src);
            }
        });
    }

    originalStylesMapBackground.forEach(({ backgroundColor }, element) => {
        const bgRgb = backgroundColor.match(/\d+/g)?.map(Number) ?? [];
        element.style.backgroundColor = daltonismType ? rgbToHex(correctForDaltonism(bgRgb, daltonismType)) : backgroundColor;
    });

    originalStylesMapBorder.forEach(({ borderColor }, element) => {
        const borderRgb = borderColor.match(/\d+/g)?.map(Number) ?? [];
        element.style.borderColor = daltonismType ? rgbToHex(correctForDaltonism(borderRgb, daltonismType)) : borderColor;
    });

    originalStylesMapFont.forEach(({ color }, element) => {
        const colorRgb = color.match(/\d+/g)?.map(Number) ?? [];
        element.style.color = daltonismType ? rgbToHex(correctForDaltonism(colorRgb, daltonismType)) : color;
    });

    originalImages.forEach((src, img) => {
        if (!daltonismType) return (img.src = src);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.crossOrigin = "Anonymous";
        image.src = src;
        image.onload = () => {
            if (!ctx) return;
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
            const imageData = ctx.getImageData(0, 0, image.width, image.height);
            const { data } = imageData;
            for (let i = 0; i < data.length; i += 4) {
                const corrected = correctForDaltonismImage([data[i], data[i + 1], data[i + 2]], daltonismType);
                [data[i], data[i + 1], data[i + 2]] = corrected;
            }
            ctx.putImageData(imageData, 0, 0);
            img.src = canvas.toDataURL();
        };
    });

    if (!daltonismType) {
        originalStylesMapBackground.clear();
        originalStylesMapFont.clear();
        originalStylesMapBorder.clear();
        originalImages.clear();
    }
};
