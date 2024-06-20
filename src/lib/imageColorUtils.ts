
export default function imageFunctions() {

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

        const isWhite = r > whiteThreshold && g > whiteThreshold && b > whiteThreshold;

        const isBlack = r < blackThreshold && g < blackThreshold && b < blackThreshold;

        return isWhite || isBlack;
    };

    const isGreenColor = (rgb: number[], threshold: number = 0): boolean => {
        const [r, g, b] = rgb;
        const total = r + g + b;

        if (total === 0 || g === 0) return false;

        const rPercentage = r / total;
        const gPercentage = g / total;
        const bPercentage = b / total;

        if (isWhiteOrBlack(rgb) || isGrayishColor(rgb))
            return false;

        return (
            gPercentage >= threshold &&                          // Percentual de verde suficiente
            gPercentage > rPercentage &&                         // Mais verde que vermelho
            gPercentage > bPercentage &&                         // Mais verde que azul
            (gPercentage - rPercentage > 0.1 ||                  // Mais de 10% de diferença entre verde e vermelho
                gPercentage - bPercentage > 0.1 ||                  // Mais de 10% de diferença entre verde e azul
                (rPercentage - gPercentage < 0.15 &&                // A diferença entre verde e vermelho é menor que 15%
                    bPercentage - gPercentage < 0.15 &&                // A diferença entre verde e azul é menor que 15%
                    rPercentage + bPercentage > 0.4 &&                 // A soma de vermelho e azul é maior que 40%
                    rPercentage > 0.5 &&                               // A porcentagem de vermelho é superior a 50%
                    rPercentage < 0.7 &&                               // A porcentagem de vermelho é menor que 70%
                    gPercentage > 0.2)                                 // A porcentagem de verde é maior que 20%
            ));
    };

    const isYellowColor = (rgb: number[], threshold: number = 0.1): boolean => {
        const [r, g, b] = rgb;
        const total = r + g + b;

        if (total === 0 || r === 0 || g === 0) return false;

        const rPercentage = r / total;
        const gPercentage = g / total;
        const bPercentage = b / total;

        if (isWhiteOrBlack(rgb) || isGrayishColor(rgb) || isRedColorForYellow(rgb)) return false;

        return (
            rPercentage >= threshold &&                          // Percentual de vermelho suficiente
            gPercentage >= threshold &&                          // Percentual de verde suficiente
            bPercentage < threshold &&                           // Percentual de azul insuficiente
            rPercentage > bPercentage &&                         // Mais vermelho que azul
            gPercentage > bPercentage &&                         // Mais verde que azul
            Math.abs(rPercentage - gPercentage) < 0.9 &&         // Diferença entre vermelho e verde não muito grande
            (
                (rPercentage - bPercentage > 0.1 && gPercentage - bPercentage > 0.1) || // Diferença entre vermelho e azul e entre verde e azul é maior que 10%
                (bPercentage < 0.15 && rPercentage + gPercentage > 0.7)  // Baixa porcentagem de azul e alta soma de vermelho e verde
            )
        );
    };

    const isYellowColorForRed = (rgb: number[], threshold: number = 0.1): boolean => {
        const [r, g, b] = rgb;
        const total = r + g + b;

        if (total === 0 || r === 0 || g === 0) return false;

        const rPercentage = r / total;
        const gPercentage = g / total;
        const bPercentage = b / total;

        if (isWhiteOrBlack(rgb) || isGrayishColor(rgb) || isRedColorForYellow(rgb)) return false;

        return (
            rPercentage >= threshold &&                          // Percentual de vermelho suficiente
            gPercentage >= threshold &&                          // Percentual de verde suficiente
            bPercentage < threshold &&                           // Percentual de azul insuficiente
            rPercentage > bPercentage &&                         // Mais vermelho que azul
            gPercentage > bPercentage &&                         // Mais verde que azul
            Math.abs(rPercentage - gPercentage) < 0.9 &&         // Diferença entre vermelho e verde não muito grande
            (
                (rPercentage - bPercentage > 0.1 && gPercentage - bPercentage > 0.1) || // Diferença entre vermelho e azul e entre verde e azul é maior que 10%
                (bPercentage < 0.15 && rPercentage + gPercentage > 0.7)  // Baixa porcentagem de azul e alta soma de vermelho e verde
            )
        );
    };

    const isRedColorForYellow = (rgb: number[], threshold: number = 0.7, diff: number = 0): boolean => {
        const [r, g, b] = rgb;
        const total = r + g + b;
    
        if (total === 0) return false;
    
        const rPercentage = r / total;
        const gPercentage = g / total;
        const bPercentage = b / total;
    
        if (isWhiteOrBlack(rgb) || isGrayishColor(rgb)) return false;
    
        return (
            rPercentage >= threshold &&                          // Percentual de vermelho suficiente
            rPercentage > gPercentage &&                         // Mais vermelho que verde
            rPercentage > bPercentage &&                         // Mais vermelho que azul
            (
                rPercentage - gPercentage > diff ||              // Diferença mínima entre vermelho e verde
                rPercentage - bPercentage > diff ||              // Diferença mínima entre vermelho e azul
                (
                    gPercentage - rPercentage < 0.15 &&          // Diferença entre verde e vermelho menor que 15%
                    bPercentage - rPercentage < 0.15 &&          // Diferença entre azul e vermelho menor que 15%
                    gPercentage + bPercentage > 0.4 &&           // Soma de verde e azul maior que 40%
                    gPercentage > 0.5 &&                         // Porcentagem de verde superior a 50%
                    gPercentage < 0.7 &&                         // Porcentagem de verde inferior a 70%
                    rPercentage > 0.2                            // Porcentagem de vermelho superior a 20%
                )
            )
        );
    };

    const isRedColor = (rgb: number[], threshold: number = 0.4, diff: number = 0.1): boolean => {
        const [r, g, b] = rgb;
        const total = r + g + b;

        if (total === 0) return false;

        const rPercentage = r / total;
        const gPercentage = g / total;
        const bPercentage = b / total;

        if (isWhiteOrBlack(rgb) || isGrayishColor(rgb) || isYellowColorForRed(rgb)) return false;

        return (
            rPercentage >= threshold &&                          // Percentual de vermelho suficiente
            rPercentage > gPercentage &&                         // Mais vermelho que verde
            rPercentage > bPercentage &&                         // Mais vermelho que azul
            (
                rPercentage - gPercentage > diff ||              // Diferença mínima entre vermelho e verde
                rPercentage - bPercentage > diff ||              // Diferença mínima entre vermelho e azul
                (
                    gPercentage - rPercentage < 0.15 &&          // Diferença entre verde e vermelho menor que 15%
                    bPercentage - rPercentage < 0.15 &&          // Diferença entre azul e vermelho menor que 15%
                    gPercentage + bPercentage > 0.4 &&           // Soma de verde e azul maior que 40%
                    gPercentage > 0.5 &&                         // Porcentagem de verde superior a 50%
                    gPercentage < 0.7 &&                         // Porcentagem de verde inferior a 70%
                    rPercentage > 0.2                            // Porcentagem de vermelho superior a 20%
                )
            )
        );
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
            return [Math.floor((128 * (1 - gPercentage))), (128 * (1 - gPercentage)), Math.floor(128 * (1-gPercentage))];
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
            return [Math.floor((128 * (1 - gPercentage))), (128 * (1 - gPercentage)), Math.floor(128 * (1-gPercentage))];
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