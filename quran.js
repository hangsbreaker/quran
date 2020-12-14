const fs = require("fs");
const { stem } = require("./stem");

const qs = {
  "1": "Al Fatihah",
  "2": "Al Baqarah",
  "3": "Ali Imran",
  "4": "An Nisaa",
  "5": "Al Maidah",
  "6": "Al An'am",
  "7": "Al A'raf",
  "8": "Al Anfaal",
  "9": "At Taubah",
  "10": "Yunus",
  "11": "Huud",
  "12": "Yusuf",
  "13": "Ar Ra'du",
  "14": "Ibrahim",
  "15": "Al Hijr",
  "16": "An Nahl",
  "17": "Al Israa'",
  "18": "Al Kahfi",
  "19": "Maryam",
  "20": "Thaahaa",
  "21": "Al Anbiyaa",
  "22": "Al Hajj",
  "23": "Al Mu'minun",
  "24": "An Nuur",
  "25": "Al Furqaan",
  "26": "Asy Syu'ara",
  "27": "An Naml",
  "28": "Al Qashash",
  "29": "Al 'Ankabut",
  "30": "Ar Ruum",
  "31": "Luqman",
  "32": "As Sajdah",
  "33": "Al Ahzab",
  "34": "Saba'",
  "35": "Faathir",
  "36": "Yaa Siin",
  "37": "Ash Shaaffat",
  "38": "Shaad",
  "39": "Az Zumar",
  "40": "Al Ghaafir",
  "41": "Al Fushilat",
  "42": "Asy Syuura",
  "43": "Az Zukhruf",
  "44": "Ad Dukhaan",
  "45": "Al Jaatsiyah",
  "46": "Al Ahqaaf",
  "47": "Muhammad",
  "48": "Al Fath",
  "49": "Al Hujuraat",
  "50": "Qaaf",
  "51": "Adz Dzaariyaat",
  "52": "Ath Thuur",
  "53": "An Najm",
  "54": "Al Qamar",
  "55": "Ar Rahmaan",
  "56": "Al Waaqi'ah",
  "57": "Al Hadiid",
  "58": "Al Mujaadalah",
  "59": "Al Hasyr",
  "60": "Al mumtahanah",
  "61": "Ash Shaff",
  "62": "Al Jumuah",
  "63": "Al Munafiqun",
  "64": "Ath Taghabun",
  "65": "Ath Thalaaq",
  "66": "At Tahriim",
  "67": "Al Mulk",
  "68": "Al Qalam",
  "69": "Al Haaqqah",
  "70": "Al Ma'aarij",
  "71": "Nuh",
  "72": "Al Jin",
  "73": "Al Muzammil",
  "74": "Al Muddastir",
  "75": "Al Qiyaamah",
  "76": "Al Insaan",
  "77": "Al Mursalaat",
  "78": "An Naba'",
  "79": "An Naazi'at",
  "80": "'Abasa",
  "81": "At Takwiir",
  "82": "Al Infithar",
  "83": "Al Muthaffifin",
  "84": "Al Insyiqaq",
  "85": "Al Buruuj",
  "86": "Ath Thariq",
  "87": "Al A'laa",
  "88": "Al Ghaasyiah",
  "89": "Al Fajr",
  "90": "Al Balad",
  "91": "Asy Syams",
  "92": "Al Lail",
  "93": "Adh Dhuhaa",
  "94": "Asy Syarh",
  "95": "At Tiin",
  "96": "Al 'Alaq",
  "97": "Al Qadr",
  "98": "Al Bayyinah",
  "99": "Az Zalzalah",
  "100": "Al 'Aadiyah",
  "101": "Al Qaari'ah",
  "102": "At Takaatsur",
  "103": "Al 'Ashr",
  "104": "Al Humazah",
  "105": "Al Fiil",
  "106": "Quraisy",
  "107": "Al Maa'uun",
  "108": "Al Kautsar",
  "109": "Al Kafirun",
  "110": "An Nashr",
  "111": "Al Lahab",
  "112": "Al Ikhlash",
  "113": "Al Falaq",
  "114": "An Naas"
};

const juz = {
  "1": "Al Fatiha [1:1] - Al Baqarah [2:141]",
  "2": "Al Baqarah [2:142] - Al Baqarah [2:252]",
  "3": "Al Baqarah [2:253] - Al Imran [3:92]",
  "4": "Al Imran [3:93] - An Nisaa [4:23]",
  "5": "An Nisaa [4:24] - An Nisaa [4:147]",
  "6": "An Nisaa [4:148] - Al Ma’idah [5:81]",
  "7": "Al Ma’idah [5:82] - Al Am’am [6:110]",
  "8": "Al An’am [6:111] - Al A’raf [7:87]",
  "9": "Al A’raf [7:88] - Al Anfal [8:40]",
  "10": "Al Anfal [8:41] - At Tauba [9:92]",
  "11": "At Tauba [9:93] - Hud [11:5]",
  "12": "Hud [11:6] - Yusuf [12:52]",
  "13": "Yusuf [12:53] - Ibrahim [14:52]",
  "14": "Al Hijr [15:1] - AnNahl [16:128]",
  "15": "Al Isra [17:1] - Al Kahf [18:74]",
  "16": "Al Kahf [18:75] - Ta Ha [20:135]",
  "17": "Al Anbiyaa [21:1] - Al Hajj [22:78]",
  "18": "Al Mu’minun [23:1] - Al Furqan [25:20]",
  "19": "Al Furqan [25:21] - An Naml [27:55]",
  "20": "An Naml [27:56] - Al Ankabut [29:45]",
  "21": "Al Ankabut [29:46] - Al Azhab [33:30]",
  "22": "Al Azhab [33:31] - Ya Sin [36:27]",
  "23": "Ya Sin [36:28] - Az Zumar [39:31]",
  "24": "Az Zumar [39:32] - Fussilat [41:46]",
  "25": "Fussilat [41:47] - Al Jathiya [45:37]",
  "26": "Al Ahqaf [46:1] - Az Zariyat [51:30]",
  "27": "Az Zariyat [51:31] - Al Hadid [57:29]",
  "28": "Al Mujadila [58:1] - At Tahrim [66:12]",
  "29": "Al Mulk [67:1] - Al Mursalat [77:50]",
  "30": "An Nabaa [78:1] - An Nas [114:6]"
};

const qsc = {
  "al fatihah": "1",
  "al-fatihah": "1",
  "al fatiha": "1",
  "al-fatiha": "1",
  yunus: "10",
  "al 'aadiyah": "100",
  "al-'aadiyah": "100",
  "al adiyah": "100",
  "al-adiyah": "100",
  "al adiya": "100",
  "al-adiya": "100",
  "al qaari'ah": "101",
  "al-qaari'ah": "101",
  "al qaariah": "101",
  "al-qaariah": "101",
  "al qariah": "101",
  "al-qariah": "101",
  "al qari'ah": "101",
  "al-qari'ah": "101",
  "at takaatsur": "102",
  "at-takaatsur": "102",
  "at takatsur": "102",
  "at-takatsur": "102",
  "at takasur": "102",
  "at-takasur": "102",
  "al 'ashr": "103",
  "al-'ashr": "103",
  "al ashr": "103",
  "al-ashr": "103",
  "al humazah": "104",
  "al-humazah": "104",
  "al fiil": "105",
  "al-fiil": "105",
  "al fil": "105",
  "al-fil": "105",
  quraisy: "106",
  qurais: "106",
  "al maa'uun": "107",
  "al-maa'uun": "107",
  "al ma'un": "107",
  "al-ma'un": "107",
  "al maun": "107",
  "al-maun": "107",
  "al kautsar": "108",
  "al-kautsar": "108",
  "al kausar": "108",
  "al-kausar": "108",
  "al kafirun": "109",
  "al-kafirun": "109",
  huud: "11",
  hud: "11",
  "an nashr": "110",
  "an-nashr": "110",
  "an nasr": "110",
  "an-nasr": "110",
  "al lahab": "111",
  "al-lahab": "111",
  "al ikhlash": "112",
  "al-ikhlash": "112",
  "al ikhlas": "112",
  "al-ikhlas": "112",
  "al iklas": "112",
  "al-iklas": "112",
  "al falaq": "113",
  "al-falaq": "113",
  "an naas": "114",
  "an-naas": "114",
  "an nas": "114",
  "an-nas": "114",
  yusuf: "12",
  "ar ra'du": "13",
  "ar-ra'du": "13",
  "ar radu": "13",
  "ar-radu": "13",
  ibrahim: "14",
  "al hijr": "15",
  "al-hijr": "15",
  "al hijr": "15",
  "al-hijr": "15",
  "an nahl": "16",
  "an-nahl": "16",
  "al israa'": "17",
  "al-israa'": "17",
  "al israa": "17",
  "al-israa": "17",
  "al isra": "17",
  "al-isra": "17",
  "al kahfi": "18",
  "al-kahfi": "18",
  maryam: "19",
  "al baqarah": "2",
  "al-baqarah": "2",
  "al baqara": "2",
  "al-baqara": "2",
  thaahaa: "20",
  thaha: "20",
  taha: "20",
  "al anbiyaa": "21",
  "al-anbiyaa": "21",
  "al anbiya": "21",
  "al-anbiya": "21",
  "al hajj": "22",
  "al-hajj": "22",
  "al mu'minun": "23",
  "al-mu'minun": "23",
  "al muminun": "23",
  "al-muminun": "23",
  "an nuur": "24",
  "an-nuur": "24",
  "an nur": "24",
  "an-nur": "24",
  "al furqaan": "25",
  "al-furqaan": "25",
  "al furqan": "25",
  "al-furqan": "25",
  "asy syu'ara": "26",
  "asy-syu'ara": "26",
  "asy syuara": "26",
  "asy-syuara": "26",
  "an naml": "27",
  "an-naml": "27",
  "al qashash": "28",
  "al-qashash": "28",
  "al qasash": "28",
  "al-qasash": "28",
  "al qasas": "28",
  "al-qasas": "28",
  "al 'ankabut": "29",
  "al-'ankabut": "29",
  "al ankabut": "29",
  "al-ankabut": "29",
  "ali imran": "3",
  "ar ruum": "30",
  "ar-ruum": "30",
  "ar rum": "30",
  "ar-rum": "30",
  luqman: "31",
  lukman: "31",
  "as sajdah": "32",
  "as-sajdah": "32",
  "al ahzab": "33",
  "al-ahzab": "33",
  "al azab": "33",
  "al-azab": "33",
  "saba'": "34",
  saba: "34",
  faathir: "35",
  fathir: "35",
  faatir: "35",
  fatir: "35",
  "yaa siin": "36",
  "yaa sin": "36",
  "ya siin": "36",
  "ya sin": "36",
  yasin: "36",
  "ash shaaffat": "37",
  "ash-shaaffat": "37",
  "ash shaffat": "37",
  "ash-shaffat": "37",
  "ash saffat": "37",
  "ash-saffat": "37",
  "ash safat": "37",
  "ash-safat": "37",
  "as safat": "37",
  "as-safat": "37",
  shaad: "38",
  shad: "38",
  sad: "38",
  "az zumar": "39",
  "az-zumar": "39",
  "an nisaa": "4",
  "an-nisaa": "4",
  "an nisa": "4",
  "an-nisa": "4",
  "al ghaafir": "40",
  "al-ghaafir": "40",
  "al gaafir": "40",
  "al-gaafir": "40",
  "al ghafir": "40",
  "al-ghafir": "40",
  "al gafir": "40",
  "al-gafir": "40",
  "al fushilat": "41",
  "al-fushilat": "41",
  "al fusilat": "41",
  "al-fusilat": "41",
  "asy syuura": "42",
  "asy-syuura": "42",
  "asy syura": "42",
  "asy-syura": "42",
  "az zukhruf": "43",
  "az-zukhruf": "43",
  "az zukruf": "43",
  "az-zukruf": "43",
  "ad dukhaan": "44",
  "ad-dukhaan": "44",
  "ad dukaan": "44",
  "ad-dukaan": "44",
  "ad dukhan": "44",
  "ad-dukhan": "44",
  "ad dukan": "44",
  "ad-dukan": "44",
  "al jaatsiyah": "45",
  "al-jaatsiyah": "45",
  "al jatsiyah": "45",
  "al-jatsiyah": "45",
  "al jaatsiya": "45",
  "al-jaatsiya": "45",
  "al jatsiya": "45",
  "al-jatsiya": "45",
  "al ahqaaf": "46",
  "al-ahqaaf": "46",
  "al ahqaf": "46",
  "al-ahqaf": "46",
  "al aqaf": "46",
  "al-aqaf": "46",
  "al aqaaf": "46",
  "al-aqaaf": "46",
  muhammad: "47",
  "al fath": "48",
  "al-fath": "48",
  "al fat": "48",
  "al-fat": "48",
  "al hujuraat": "49",
  "al-hujuraat": "49",
  "al hujurat": "49",
  "al-hujurat": "49",
  "al maidah": "5",
  "al-maidah": "5",
  "al maida": "5",
  "al-maida": "5",
  qaaf: "50",
  qaf: "50",
  "adz dzaariyaat": "51",
  "adz-dzaariyaat": "51",
  "adz dzariyaat": "51",
  "adz-dzariyaat": "51",
  "adz dzaariyat": "51",
  "adz-dzaariyat": "51",
  "az dzariyat": "51",
  "az-dzariyat": "51",
  "az zariyat": "51",
  "az-zariyat": "51",
  "ath thuur": "52",
  "ath-thuur": "52",
  "ath thur": "52",
  "ath-thur": "52",
  "at thur": "52",
  "at-thur": "52",
  "at tuur": "52",
  "at-tuur": "52",
  "at tur": "52",
  "at-tur": "52",
  "an najm": "53",
  "an-najm": "53",
  "al qamar": "54",
  "al-qamar": "54",
  "ar rahmaan": "55",
  "ar-rahmaan": "55",
  "ar rahman": "55",
  "ar-rahman": "55",
  "al waaqi'ah": "56",
  "al-waaqi'ah": "56",
  "al waaqiah": "56",
  "al-waaqiah": "56",
  "al waqiah": "56",
  "al-waqiah": "56",
  "al hadiid": "57",
  "al-hadiid": "57",
  "al hadiid": "57",
  "al-hadiid": "57",
  "al hadid": "57",
  "al-hadid": "57",
  "al mujaadalah": "58",
  "al-mujaadalah": "58",
  "al mujaadala": "58",
  "al-mujaadala": "58",
  "al mujadalah": "58",
  "al-mujadalah": "58",
  "al mujadala": "58",
  "al-mujadala": "58",
  "al hasyr": "59",
  "al-hasyr": "59",
  "al an'am": "6",
  "al-an'am": "6",
  "al anam": "6",
  "al-anam": "6",
  "al mumtahanah": "60",
  "al-mumtahanah": "60",
  "ash shaff": "61",
  "ash shaff": "61",
  "as shaff": "61",
  "as-shaff": "61",
  "as shaf": "61",
  "as-shaf": "61",
  "al jumuah": "62",
  "al-jumuah": "62",
  "al munafiqun": "63",
  "al-munafiqun": "63",
  "ath taghabun": "64",
  "ath-taghabun": "64",
  "ath tagabun": "64",
  "ath-tagabun": "64",
  "at tagabun": "64",
  "at-tagabun": "64",
  "ath thalaaq": "65",
  "ath-thalaaq": "65",
  "ath talaaq": "65",
  "ath-talaaq": "65",
  "ath thalaq": "65",
  "ath-thalaq": "65",
  "at thalaaq": "65",
  "at-thalaaq": "65",
  "at talaaq": "65",
  "at-talaaq": "65",
  "at talaq": "65",
  "at-talaq": "65",
  "at tahriim": "66",
  "at-tahriim": "66",
  "at tahrim": "66",
  "at-tahrim": "66",
  "al mulk": "67",
  "al-mulk": "67",
  "al qalam": "68",
  "al-qalam": "68",
  "al haaqqah": "69",
  "al-haaqqah": "69",
  "al haqqah": "69",
  "al-haqqah": "69",
  "al haqah": "69",
  "al-haqah": "69",
  "al a'raf": "7",
  "al-a'raf": "7",
  "al araf": "7",
  "al-araf": "7",
  "al ma'aarij": "70",
  "al-ma'aarij": "70",
  "al maarij": "70",
  "al-maarij": "70",
  nuh: "71",
  "al jin": "72",
  "al muzammil": "73",
  "al-muzammil": "73",
  "al muzamil": "73",
  "al-muzamil": "73",
  "al muzzammil": "73",
  "al-muzzammil": "73",
  "al muzzamil": "73",
  "al-muzzamil": "73",
  "al muddastir": "74",
  "al-muddastir": "74",
  "al muddasir": "74",
  "al-muddasir": "74",
  "al muddassir": "74",
  "al-muddassir": "74",
  "al mudasir": "74",
  "al-mudasir": "74",
  "al qiyaamah": "75",
  "al-qiyaamah": "75",
  "al qiyamah": "75",
  "al-qiyamah": "75",
  "al insaan": "76",
  "al-insaan": "76",
  "al insaan": "76",
  "al-insaan": "76",
  "al mursalaat": "77",
  "al-mursalaat": "77",
  "al mursalat": "77",
  "al-mursalat": "77",
  "an naba'": "78",
  "an-naba'": "78",
  "an naba": "78",
  "an-naba": "78",
  "an naazi'at": "79",
  "an-naazi'at": "79",
  "an naaziat": "79",
  "an-naaziat": "79",
  "an naziat": "79",
  "an-naziat": "79",
  "an nazi'at": "79",
  "an-nazi'at": "79",
  "al anfaal": "8",
  "al-anfaal": "8",
  "al anfal": "8",
  "al-anfal": "8",
  abasa: "80",
  "at takwiir": "81",
  "at-takwiir": "81",
  "at takwir": "81",
  "at-takwir": "81",
  "al infithar": "82",
  "al-infithar": "82",
  "al infitar": "82",
  "al-infitar": "82",
  "al muthaffifin": "83",
  "al-muthaffifin": "83",
  "al mutaffifin": "83",
  "al-mutaffifin": "83",
  "al insyiqaq": "84",
  "al-insyiqaq": "84",
  "al buruuj": "85",
  "al-buruuj": "85",
  "al buruj": "85",
  "al-buruj": "85",
  "ath thariq": "86",
  "ath-thariq": "86",
  "ath tariq": "86",
  "ath-tariq": "86",
  "at tariq": "86",
  "at-tariq": "86",
  "al a'laa": "87",
  "al-a'laa": "87",
  "al a'la": "87",
  "al-a'la": "87",
  "al ala": "87",
  "al-ala": "87",
  "al ghaasyiah": "88",
  "al-ghaasyiah": "88",
  "al gasyiah": "88",
  "al-gasyiah": "88",
  "al gasyiyah": "88",
  "al-gasyiyah": "88",
  "al fajr": "89",
  "al-fajr": "89",
  "at taubah": "9",
  "at-taubah": "9",
  "at taubat": "9",
  "at-taubat": "9",
  "al balad": "90",
  "al-balad": "90",
  "asy syams": "91",
  "asy-syams": "91",
  "asy syam": "91",
  "asy-syam": "91",
  "as syams": "91",
  "as-syams": "91",
  "as syam": "91",
  "as-syam": "91",
  "al lail": "92",
  "al-lail": "92",
  "adh dhuhaa": "93",
  "adh-dhuhaa": "93",
  "adh duhaa": "93",
  "adh-duhaa": "93",
  "adh duha": "93",
  "adh-duha": "93",
  "ad duha": "93",
  "ad-duha": "93",
  "asy syarh": "94",
  "asy-syarh": "94",
  "asy syar": "94",
  "asy-syar": "94",
  "at tiin": "95",
  "at-tiin": "95",
  "at tin": "95",
  "at-tin": "95",
  "al 'alaq": "96",
  "al-'alaq": "96",
  "al alaq": "96",
  "al-alaq": "96",
  "al qadr": "97",
  "al-qadr": "97",
  "al bayyinah": "98",
  "al-bayyinah": "98",
  "al bayinah": "98",
  "al-bayinah": "98",
  "az zalzalah": "99",
  "az-zalzalah": "99",
  "az zalzala": "99",
  "az-zalzala": "99"
};

exports.quran = (qry = "") => {
  var howto =
    "Contoh\n*Quran 1:1*\n*Quran 1:2-7*\n*Quran acak / random*\n*Quran Kata Kunci*\n*Quran Juz (daftar jus 1-30)*\n*Quran List (daftar surah)*";
  let keyword = qry.trim();
  qry = keyword;

  var keysrt = qry.replace(/[0-9]/g, "").trim();
  if (qry.includes(":")) {
    qry = qry.split(":");
    try {
      if (qry === "") {
        return howto;
      } else {
        let rawdata = fs.readFileSync("quran/" + qry[0] + ".json", "utf8");
        let d = JSON.parse(rawdata);
        let tilqs = 0;
        let str = "";

        if (qry[1] != "") {
          if (qry[1].includes("-")) {
            let qsp = qry[1].split("-");
            tilqs = qsp[1] - qsp[0];
            if (tilqs > 4 && qry[0] != 1) {
              tilqs = 4;
            } else if (tilqs < 0) {
              tilqs = 0;
            }
            str =
              d.nama +
              " - " +
              d.asma +
              "\n" +
              d.arti +
              " [" +
              d.ayat +
              " Ayat]";

            for (let q = 0; q <= tilqs; q++) {
              let ayah = parseInt(qry[1]) + q;
              if (ayah > parseInt(d.ayat) && qry[1].includes("-")) {
                break;
              }
              if (qry.length > 1 && ayah <= parseInt(d.ayat) && ayah > 0) {
                str =
                  str +
                  "\n\n" +
                  d.surah[ayah]["ar"] +
                  "\n(" +
                  ayah +
                  ") _" +
                  d.surah[ayah]["tr"] +
                  "_\n\n" +
                  d.surah[ayah]["id"];
              } else {
                str = "Quran ayat " + qry[0] + ":" + ayah + " tidak ditemukan";
              }
            }
            return str;
          } else {
            str =
              d.nama +
              " - " +
              d.asma +
              "\n" +
              d.arti +
              " [" +
              qry[0] +
              ":" +
              qry[1] +
              "] (" +
              d.ayat +
              " Ayat)\n";
            if (qry.length > 1 && qry[1] <= parseInt(d.ayat) && qry[1] > 0) {
              str =
                str +
                "\n" +
                d.surah[qry[1]]["ar"] +
                "\n\n_" +
                d.surah[qry[1]]["tr"] +
                "_\n\n" +
                d.surah[qry[1]]["id"];
            } else {
              str = "Quran ayat " + qry[0] + ":" + qry[1] + " tidak ditemukan";
            }
            return str;
          }
        } else {
          return howto;
        }
      }
    } catch (err) {
      if (qry == "") {
        return howto;
      } else {
        return "Maaf surat " + keyword + " tidak ditemukan";
      }
    }
  } else {
    // search keyword
    if (qry == "random" || qry == "acak") {
      let surah = Math.floor(Math.random() * 114 + 1);
      //console.log(surah);
      let rawdata = fs.readFileSync("quran/" + surah + ".json", "utf8");
      let d = JSON.parse(rawdata);
      let ayah = Math.floor(Math.random() * parseInt(d.ayat) + 1);
      //console.log(ayah);

      str =
        d.nama +
        " - " +
        d.asma +
        "\n" +
        d.arti +
        " [" +
        surah +
        ":" +
        ayah +
        "] (" +
        d.ayat +
        " Ayat)\n";

      str =
        str +
        "\n" +
        d.surah[ayah]["ar"] +
        "\n\n_" +
        d.surah[ayah]["tr"] +
        "_\n\n" +
        d.surah[ayah]["id"];

      return str;
    } else if (qry.substr(0, 3).toLowerCase() == "juz") {
      var j = qry.split(" ");
      if (j.length > 1) {
        var str = "*Juz " + j[1] + "*\n" + juz[j[1]];
        return str;
      } else {
        var str = "*Juz Pada Quran:*";
        for (n in juz) {
          str = str + "\n" + n + ". " + juz[n];
        }
        return str;
      }
    } else if (qry.substr(0, 4).toLowerCase() == "list") {
      var str = "*Surah Al Quran:*";
      for (s in qs) {
        str = str + "\n" + s + ") " + qs[s];
      }
      return str;
    } else if (qsc[keysrt] != undefined) {
      var numb = qry.split(" ");
      let surah = qsc[keysrt];
      //console.log(surah);
      let rawdata = fs.readFileSync("quran/" + surah + ".json", "utf8");
      let d = JSON.parse(rawdata);
      let ayah = numb[numb.length - 1];
      //console.log(ayah);

      if (isNaN(ayah)) {
        ayah = 1;
      }

      str =
        d.nama +
        " - " +
        d.asma +
        "\n" +
        d.arti +
        " [" +
        surah +
        ":" +
        ayah +
        "] (" +
        d.ayat +
        " Ayat)\n";

      if (parseInt(ayah) <= parseInt(d.ayat)) {
        str =
          str +
          "\n" +
          d.surah[ayah]["ar"] +
          "\n\n_" +
          d.surah[ayah]["tr"] +
          "_\n\n" +
          d.surah[ayah]["id"];
      } else {
        str = str + "\nAyat " + ayah + " tidak ditemukan";
      }

      return str;
    } else if (qry !== "") {
      let list = [];
      qry = stem(qry);
      var kw = qry.split(" ");
      //console.log(qry);
      //console.log("kw" + kw.length);
      if (qry != "") {
        for (let q = 1; q <= 114; q++) {
          var rawdata = fs.readFileSync("quran/" + q + ".json", "utf8");
          var d = JSON.parse(rawdata);

          var arr = d.surah;
          // for (k in src) {
          //   console.log(parseInt(k) + 1 + " : " + src[k]);
          for (r in arr) {
            var ayat = " " + arr[r]["id"] + " ";
            ayat = " " + stem(ayat) + " ";
            var ada = 0;
            for (w in kw) {
              if (ayat.includes(" " + kw[w] + " ")) {
                ada = ada + 1;
                //console.log(ada);
              }
            }
            if (ada == kw.length) {
              //console.log(ada + " = " + kw.length);
              list.push(d.nama + " [" + q + ":" + r + "]");
            }
          }
          // }
        }
      }
      let jmlayah = list.length;
      var str =
        "Tidak ditemukan Ayat yang mengandung *" +
        (keyword.charAt(0).toUpperCase() + keyword.slice(1)) +
        "*";
      if (jmlayah !== 0) {
        str =
          "Ditemukan " +
          jmlayah +
          " Ayat yang mengandung *" +
          (keyword.charAt(0).toUpperCase() + keyword.slice(1)) +
          "*";
        str = str + "\nBerikut daftar Ayat:";
        for (l in list) {
          str = str + "\n" + list[l];
        }
      }
      return str;
    } else {
      return howto;
    }
  }
};
