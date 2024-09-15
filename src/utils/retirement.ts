export type GenderType = 'male' | 'female';

export interface Result {
    retirementYear: number;
    retirementMonth: number;
    retirementAgeYear: number;
    retirementAgeMonth: number;
    delayMonths: number;
}


export function calculateRetirement(birthYear: number, birthMonth: number, gender: GenderType, isWorker = true): Result {
    let baseRetirementAge;
    let startYear; // 改革开始的年份
    let delayFactor = 4; // 每延迟多少个月

    if (gender === 'male') {

        // 男性1976年12月及以后出生统一63岁退休
        if (birthYear > 1976) {
            return {
                retirementYear: birthYear + 63,
                retirementMonth: birthMonth,
                retirementAgeYear: 63,
                retirementAgeMonth: 0,
                delayMonths: 36,
            };
        }

        baseRetirementAge = 60; // 男性的基础退休年龄
        startYear = 1965; // 男性延迟退休从1965年开始
    } else {
        if (isWorker) {

            // 女职工（55岁退休）1981年以后出生统一58岁退休
            if (birthYear > 1981) {
                return {
                    retirementYear: birthYear + 58,
                    retirementMonth: birthMonth,
                    retirementAgeYear: 58,
                    retirementAgeMonth: 0,
                    delayMonths: 36,
                };
            }
            baseRetirementAge = 55; // 女职工（原55岁退休）
            startYear = 1970; // 女职工（55岁）延迟退休从1970年1月出生开始
        } else {
            // 女职工（50岁退休）1984年以后出生统一55岁退休
            if (birthYear > 1984) {
                return {
                    retirementYear: birthYear + 55,
                    retirementMonth: birthMonth,
                    retirementAgeYear: 55,
                    retirementAgeMonth: 0,
                    delayMonths: 60,
                };
            }

            baseRetirementAge = 50; // 女职工（原50岁退休）
            startYear = 1975; // 女职工（50岁）延迟退休从1975年1月出生开始
            delayFactor = 2; // 每2个月延迟1个月
        }
    }

    // 如果出生年份早于改革开始年份，则没有延迟退休
    if (birthYear < startYear) {
        const retirementYear = birthYear + baseRetirementAge;
        return {
            retirementYear: retirementYear,
            retirementMonth: birthMonth,
            retirementAgeYear: baseRetirementAge,
            retirementAgeMonth: 0,
            delayMonths: 0,
        };
    }

    // 计算从改革开始年份起的总延迟月份
    const totalMonthsSinceBase = (birthYear - startYear) * 12 + (birthMonth - 1); // 出生月份从1月起，调整为0基准
    let delayMonths = Math.floor(totalMonthsSinceBase / delayFactor); // 每4个月延迟1个月

    // 计算退休年龄
    let finalRetirementYears = baseRetirementAge + Math.floor(delayMonths / 12);
    let finalRetirementMonths = delayMonths % 12;

    // 计算退休时间（年月）
    let retirementYear = birthYear + finalRetirementYears;
    let retirementMonth = birthMonth + finalRetirementMonths;

    // 处理月份溢出问题（比如13月应该变成下一年的1月）
    if (retirementMonth > 12) {
        retirementYear += Math.floor(retirementMonth / 12);
        retirementMonth = retirementMonth % 12;
    }

    finalRetirementMonths += 1;
    retirementMonth += 1
    delayMonths += 1
    // 处理当月份达到12时，增加1年，月份变为0
    if (finalRetirementMonths === 12) {
        finalRetirementYears += 1;
        finalRetirementMonths = 0;
    }

    // 返回结果，包括退休年龄，退休年月和延迟的总月份数

    return {
        retirementYear: retirementYear,
        retirementMonth: retirementMonth,
        retirementAgeYear: finalRetirementYears,
        retirementAgeMonth: finalRetirementMonths,
        delayMonths,
    }
}
