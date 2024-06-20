
export default function imageFunctions()  {

    const isGreenColor = (rgb: number[], threshold: number = 0): boolean => {
        const [r, g, b] = rgb;
        const total = r + g + b;

        if (total === 0 || g === 0) return false;

        const rPercentage = r / total;
        const gPercentage = g / total;
        const bPercentage = b / total;

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

    const isYellowColor = (rgb: number[], threshold: number = 0.6): boolean => {
        const [r, g, b] = rgb;
        const total = r + g + b;

        if (total === 0) return false;

        const rPercentage = r / total;
        const gPercentage = g / total;
        const bPercentage = b / total;

        return (
            rPercentage >= threshold &&                          // Percentual de vermelho suficiente
            gPercentage >= threshold &&                          // Percentual de verde suficiente
            bPercentage < threshold                              // Percentual de azul insuficiente
        );
    };

    const isRedColor = (rgb: number[], threshold: number = 0.6): boolean => {
        const [r, g, b] = rgb;
        const total = r + g + b;

        if (total === 0) return false;

        const rPercentage = r / total;
        const gPercentage = g / total;
        const bPercentage = b / total;

        return (
            rPercentage >= threshold &&                          // Percentual de vermelho suficiente
            rPercentage > gPercentage &&                         // Mais vermelho que verde
            rPercentage > bPercentage &&                         // Mais vermelho que azul
            (rPercentage - gPercentage > 0.1 ||                  // Mais de 10% de diferença entre vermelho e verde
                rPercentage - bPercentage > 0.1 ||                  // Mais de 10% de diferença entre vermelho e azul
                (gPercentage - rPercentage < 0.15 &&                // A diferença entre verde e vermelho é menor que 15%
                    bPercentage - rPercentage < 0.15 &&                // A diferença entre azul e vermelho é menor que 15%
                    gPercentage + bPercentage > 0.4 &&                 // A soma de verde e azul é maior que 40%
                    gPercentage > 0.5 &&                               // A porcentagem de verde é superior a 50%
                    gPercentage < 0.7 &&                               // A porcentagem de verde é menor que 70%
                    rPercentage > 0.2)                                 // A porcentagem de vermelho é maior que 20%
            ));
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
            return [Math.floor(255 * gPercentage), Math.floor(203 * gPercentage), Math.floor(219 * gPercentage)];
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