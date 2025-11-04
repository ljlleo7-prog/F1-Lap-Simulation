import R1Map from './assets/R1Bahrain.png';
import R2Map from './assets/R2Saudi.png';
import R3Map from './assets/R3Australia.avif';
import R4Map from './assets/R4Japan.avif';
import R5Map from './assets/R5China.avif';
import R6Map from './assets/R6Miami.avif';
import R7Map from './assets/R7Emilia.avif';
import R8Map from './assets/R8Monaco.avif';
import R9Map from './assets/R9Canada.avif';
import R10Map from './assets/R10Spain.avif';
import R11Map from './assets/R11Austria.avif';
import R12Map from './assets/R12GB.avif';
import R13Map from './assets/R13Hungary.avif';
import R14Map from './assets/R14Belgium.avif';
import R15Map from './assets/R15Netherlands.avif';
import R16Map from './assets/R16Italy.avif';
import R17Map from './assets/R17Azerbaijan.avif';
import R18Map from './assets/R18Singapore.avif';
import R19Map from './assets/R19USA.avif';
import R20Map from './assets/R20Mexico.avif';
import R21Map from './assets/R21Brazil.avif';
import R22Map from './assets/R22LasVegas.avif';
import R23Map from './assets/R23Qatar.avif';
import R24Map from './assets/R24AbuDhabi.avif';


//Feature Races: Bahrain, Australia, China, Monaco, Canada, Austria, GB, Belgium, Italy, Azerbaijan, Singapore, Brazil, LasVegas, AbuDhabi



export const trackInfo = {
    'R1': {
        name_cn: "巴林-萨基尔GP",
        name_en: "Bahrain Grand Prix",
        abbr_cn: "R1-巴林站",
        abbr_en: "R1-Bahrain",
        mapImg: R1Map,
        lap_race: 57,
        lap_sprint: 19,
        std_lap_time: 97,
        rain_prob: 0.05,
    },
    'R2': {
        name_cn: "沙特-吉达GP",
        name_en: "Saudi Grand Prix",
        abbr_cn: "R2-沙特站",
        abbr_en: "R2-Saudi",
        mapImg: R2Map,
        lap_race: 50,
        lap_sprint: 17,
        std_lap_time: 93,
        rain_prob: 0.05,
    },
    'R3': {
        name_cn: "澳洲-墨尔本GP",
        name_en: "Australia Grand Prix",
        abbr_cn: "R3-澳洲站",
        abbr_en: "R3-Australia",
        mapImg: R3Map,
        lap_race: 58,
        lap_sprint: 19,
        std_lap_time: 85,
        rain_prob: 0.30,
    },
    'R4': {
        name_cn: "日本-铃鹿GP",
        name_en: "Japan Grand Prix",
        abbr_cn: "R4-日本站",
        abbr_en: "R4-Japan",
        mapImg: R4Map,
        lap_race: 53,
        lap_sprint: 18,
        std_lap_time: 95,
        rain_prob: 0.40,
    },
    'R5': {
        name_cn: "中国-上海GP",
        name_en: "China Grand Prix",
        abbr_cn: "R5-上海站",
        abbr_en: "R5-China",
        mapImg: R5Map,
        lap_race: 56,
        lap_sprint: 19,
        std_lap_time: 96,
        rain_prob: 0.30,
    },
    'R6': {
        name_cn: "美国-迈阿密GP",
        name_en: "Miami Grand Prix",
        abbr_cn: "R6-迈阿密站",
        abbr_en: "R6-Miami",
        mapImg: R6Map,
        lap_race: 57,
        lap_sprint: 19,
        std_lap_time: 91,
        rain_prob: 0.20,
    },
    'R7': {
        name_cn: "意大利-伊莫拉GP",
        name_en: "Emilia-Romagna Grand Prix",
        abbr_cn: "R7-伊莫拉站",
        abbr_en: "R7-Imola",
        mapImg: R7Map,
        lap_race: 63,
        lap_sprint: 21,
        std_lap_time: 80,
        rain_prob: 0.25,
    },
    'R8': {
        name_cn: "摩纳哥-蒙特卡洛GP",
        name_en: "Monaco Grand Prix",
        abbr_cn: "R8-摩纳哥站",
        abbr_en: "R8-Monaco",
        mapImg: R8Map,
        lap_race: 78,
        lap_sprint: 26,
        std_lap_time: 75,
        rain_prob: 0.40,
    },
    'R9': {
        name_cn: "加拿大-蒙特利尔GP",
        name_en: "Canada Grand Prix",
        abbr_cn: "R9-加拿大站",
        abbr_en: "R9-Canada",
        mapImg: R9Map,
        lap_race: 70,
        lap_sprint: 23,
        std_lap_time: 76,
        rain_prob: 0.30,
    },
    'R10': {
        name_cn: "西班牙-巴塞罗那GP",
        name_en: "Spainish Grand Prix",
        abbr_cn: "R10-西班牙站",
        abbr_en: "R10-Spain",
        mapImg: R10Map,
        lap_race: 66,
        lap_sprint: 22,
        std_lap_time: 78,
        rain_prob: 0.25,
    },
    'R11': {
        name_cn: "奥地利-红牛环GP",
        name_en: "Austria Grand Prix",
        abbr_cn: "R11-奥地利站",
        abbr_en: "R11-Austria",
        mapImg: R11Map,
        lap_race: 71,
        lap_sprint: 24,
        std_lap_time: 69,
        rain_prob: 0.25,
    },
    'R12': {
        name_cn: "美国-迈阿密GP",
        name_en: "Miami Grand Prix",
        mapImg: R6Map,
        lap_race: 56,
        lap_sprint: 19,
        std_lap_time: 96,
        rain_prob: 0.30,
    },
};

function DoNothing(positionInp,nDriver){
    return positionInp;
}

function Overtake(positionInp,nDriver){
    return positionInp;
}

function Default(positionInp,nDriver){
    return positionInp;
}

export const CardDataEffects = {
    //every card has effect [delta, tydur, fudlt, con]
    'Ovt': [0,1,-1,-2],
    'Dfd': [0,1.5,0,-2],
    'Rls': [-1.5,1,-1,-1],
    'Flw': [0,1,0,-1],
    'DRS': [-0.5,1,0,0],
    'Lit': [1.5,1,1,0],
    'Csv': [1.5,0.5,0,0],
    'Brn': [-1.5,2,0,0],
    'Def': [0,0,0,1],
}

export const CardFunctions = {
    //some cards have their functions
    'Ovt': Overtake,
    'Dfd': DoNothing,
    'Rls': DoNothing,
    'Flw': DoNothing,
    'DRS': DoNothing,
    'Lit': DoNothing,
    'Csv': DoNothing,
    'Brn': DoNothing,

}

export const TyreDeg = {
    's':7,
    'm':10,
    'h':13,
}