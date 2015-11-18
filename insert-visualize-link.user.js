// ==UserScript==
// @name         Insert Visualize link
// @namespace    http://sachachua.com
// @version      0.3
// @description  Add a visualize link to the branch search filter for http://www.torontopubliclibrary.ca
// @author       Sacha Chua
// @grant        unsafeWindow
// @match        http://www.torontopubliclibrary.ca/search.jsp*
// ==/UserScript==
/* jshint -W097 */
'use strict';

// You need to have the server from
// https://github.com/sachac/explore-neighbourhood-libraries running
// in development mode on your local computer. Someday we'll change
// this so that the mapping happens entirely in the browser, with no
// server required. =)

// Hardcoded to avoid geocoder lookup. Regenerate using library.js as needed


function getBranches() {
var branchInfo = {"type":"FeatureCollection","features":[
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.29342962962961,43.78516666666665]},"properties":{"key":"agincourt","name":"Agincourt","address":"155 Bonis Ave., Toronto, ON, M1T 3W6","phone":"416-396-8943","id":"LIB02"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.26925185185183,43.708018518518514]},"properties":{"key":"albertcampbell","name":"Albert Campbell","address":"496 Birchmount Road, Toronto, ON, M1K 1N8","phone":"416-396-8890","id":"LIB03"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.58409629629628,43.7398259259259]},"properties":{"key":"albion","name":"Albion","address":"1515 Albion Road, Toronto, ON, M9V 1B2","phone":"416-394-5170","id":"LIB04"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.54725185185184,43.60194444444441]},"properties":{"key":"alderwood","name":"Alderwood","address":"2 Orianna Drive, Toronto, ON, M8W 4Y1","phone":"416-394-5310","id":"LIB020"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.4857259259259,43.706455555555536]},"properties":{"key":"amesburypark","name":"Amesbury Park","address":"1565 Lawrence Ave. W., Toronto, ON, M6L 1A8","phone":"416-395-5420","id":"LIB021"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.46634814814814,43.66335925925924]},"properties":{"key":"annettestreet","name":"Annette Street","address":"145 Annette Street, Toronto, ON, M6P 1P3","phone":"416-393-7692","id":"LIB022"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.42188888888889,43.73933703703702]},"properties":{"key":"armourheights","name":"Armour Heights","address":"2140 Avenue Road, Toronto, ON, M5M 4M7","phone":"416-395-5430","id":"LIB023"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.43221481481477,43.72075185185185]},"properties":{"key":"barbarafrum","name":"Barbara Frum","address":"20 Covington Road, Toronto, ON, M6A 3C1","phone":"416-395-5440","id":"LIB05"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.38499999999999,43.76885555555552]},"properties":{"key":"bayview","name":"Bayview","address":"2901 Bayview Ave., Bayview Village Shopping Centre, Toronto, ON, M2K 1E6","phone":"416-395-5460","id":"LIB024"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.29852592592593,43.670129629629606]},"properties":{"key":"beaches","name":"Beaches","address":"2161 Queen Street East, Toronto, ON, M4L 1J1","phone":"416-393-7703","id":"LIB025"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.24405185185185,43.75106296296295]},"properties":{"key":"bendale","name":"Bendale","address":"1515 Danforth Road, Toronto, ON, M1J 1H5","phone":"416-396-8910","id":"LIB026"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.51046666666666,43.72121851851851]},"properties":{"key":"blackcreek","name":"Black Creek","address":"1700 Wilson Ave., North York Sheridan Mall, Toronto, ON, M3L 1B2","phone":"416-395-5470","id":"LIB027"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.43402222222223,43.659877777777766]},"properties":{"key":"bloorgladstone","name":"Bloor/Gladstone","address":"1101 Bloor Street West, Toronto, ON, M6H 1M7","phone":"416-393-7674","id":"LIB06"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.51425925925925,43.64744814814814]},"properties":{"key":"brentwood","name":"Brentwood","address":"36 Brentwood Road North, Toronto, ON, M8X 2B5","phone":"416-394-5240","id":"LIB07"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.31777037037037,43.79714444444444]},"properties":{"key":"bridlewood","name":"Bridlewood","address":"2900 Warden Ave., Bridlewood Mall, Toronto, ON, M1W 2S8","phone":"416-396-8960","id":"LIB028"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.32590370370369,43.7595074074074]},"properties":{"key":"brookbanks","name":"Brookbanks","address":"210 Brookbanks Dr., Toronto, ON, M3A 2T8","phone":"416-395-5480","id":"LIB029"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.23422962962961,43.79388518518518]},"properties":{"key":"burrowshall","name":"Burrows Hall","address":"1081 Progress Ave., Toronto, ON, M1B 5Z6","phone":"416-396-8740","id":"LIB030"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.22396296296296,43.75752962962963]},"properties":{"key":"cedarbrae","name":"Cedarbrae","address":"545 Markham Road, Toronto, ON, M1H 2A1","phone":"416-396-8850","id":"LIB08"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.44957777777775,43.77298888888886]},"properties":{"key":"centennial","name":"Centennial","address":"578 Finch Ave. West, Toronto, ON, M2R 1N7","phone":"416-395-5490","id":"LIB031"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.38399259259258,43.65336666666666]},"properties":{"key":"cityhall","name":"City Hall","address":"100 Queen Street West, Nathan Phillips Square, Toronto, ON, M5H 2N3","phone":"416-393-7650","id":"LIB032"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.23077,43.72517]},"properties":{"key":"cliffcrest","name":"Cliffcrest","address":"3017 Kingston Road, Toronto, ON, M1M 1P1","phone":"416-396-8916","id":"LIB033"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.4201111111111,43.65515925925925]},"properties":{"key":"collegeshaw","name":"College/Shaw","address":"766 College Street, Toronto, ON, M6G 1C4","phone":"416-393-7668","id":"LIB034"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.32139999999998,43.683574074074066]},"properties":{"key":"danforthcoxwell","name":"Danforth/Coxwell","address":"1675 Danforth Ave., Toronto, ON, M4C 5P2","phone":"416-393-7783","id":"LIB035"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.42845185185185,43.67452962962962]},"properties":{"key":"davenport","name":"Davenport","address":"1246 Shaw Street, Toronto, ON, M6G 3P1","phone":"416-393-7732","id":"LIB036"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.29732592592592,43.70117407407407]},"properties":{"key":"dawesroad","name":"Dawes Road","address":"416 Dawes Road, Toronto, ON, M4B 2E8","phone":"416-396-3820","id":"LIB037"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.39248148148147,43.68858148148147]},"properties":{"key":"deerpark","name":"Deer Park","address":"40 St. Clair Ave. E., Toronto, ON, M4T 1M9","phone":"416-393-7657","id":"LIB038"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.34734074074075,43.73664074074071]},"properties":{"key":"donmills","name":"Don Mills","address":"888 Lawrence Ave. East, Toronto, ON, M3C 1P6","phone":"416-395-5710","id":"LIB09"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.48205185185185,43.72887037037032]},"properties":{"key":"downsview","name":"Downsview","address":"2793 Keele Street, Toronto, ON, M3M 2G3","phone":"416-395-5720","id":"LIB039"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.4424074074074,43.67692962962961]},"properties":{"key":"dufferinstclair","name":"Dufferin/St. Clair","address":"1625 Dufferin Street, Toronto, ON, M6H 3L9","phone":"416-393-7712","id":"LIB040"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.55916296296293,43.6461222222222]},"properties":{"key":"eatonville","name":"Eatonville","address":"430 Burnhamthorpe Road, Toronto, ON, M9B 2B1","phone":"416-394-5270","id":"LIB041"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.30033333333333,43.723685185185175]},"properties":{"key":"eglintonsquare","name":"Eglinton Square","address":"1 Eglinton Square, Unit 126, Eglinton Square Shopping Centre, Toronto, ON, M1L 2K1","phone":"416-396-8920","id":"LIB042"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.58384444444444,43.6601222222222]},"properties":{"key":"elmbrookpark","name":"Elmbrook Park","address":"2 Elmbrook Cres., Toronto, ON, M9C 5B4","phone":"416-394-5290","id":"LIB043"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.47234814814814,43.68618888888887]},"properties":{"key":"evelyngregory","name":"Evelyn Gregory","address":"120 Trowell Ave., Toronto, ON, M6M 1L7","phone":"416-394-1006","id":"LIB044"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.34664444444444,43.77902592592591]},"properties":{"key":"fairview","name":"Fairview","address":"35 Fairview Mall Dr., Toronto, ON, M2J 4S4","phone":"416-395-5750","id":"LIB010"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.33175555555552,43.717811111111104]},"properties":{"key":"flemingdonpark","name":"Flemingdon Park","address":"29 St. Dennis Dr., Toronto, ON, M3C 3J3","phone":"416-395-5820","id":"LIB045"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.42057037037036,43.702366666666634]},"properties":{"key":"foresthill","name":"Forest Hill","address":"700 Eglinton Ave. West, Toronto, ON, M5N 1B9","phone":"416-393-7706","id":"LIB046"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.4003296,43.6393204]},"properties":{"key":"fortyork","name":"Fort York","address":"190 Fort York Boulevard, Toronto, ON M5V 0E7","phone":"416-393-6240","id":"LIB140"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.3221259259259,43.67246296296294]},"properties":{"key":"gerrardashdale","name":"Gerrard/Ashdale","address":"1432 Gerrard Street East, Toronto, ON, M4L 1Z6","phone":"416-393-7717","id":"LIB047"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.27799259259261,43.82397407407406]},"properties":{"key":"goldhawkpark","name":"Goldhawk Park","address":"295 Alton Towers Circle, Toronto, ON, M1V 4P1","phone":"416-396-8964","id":"LIB048"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.1998888888889,43.74667037037035]},"properties":{"key":"guildwood","name":"Guildwood","address":"123 Guildwood Parkway, Guildwood Plaza, Toronto, ON, M1E 4V2","phone":"416-396-8872","id":"LIB139"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.44898518518518,43.645203703703686]},"properties":{"key":"highpark","name":"High Park","address":"228 Roncesvalles Ave., Toronto, ON, M6R 2L7","phone":"416-393-7671","id":"LIB049"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.17520740740741,43.789959259259255]},"properties":{"key":"highlandcreek","name":"Highland Creek","address":"3550 Ellesmere Road, Toronto, ON, M1C 3Z2","phone":"416-396-8876","id":"LIB050"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.36904444444444,43.797025925925915]},"properties":{"key":"hillcrest","name":"Hillcrest","address":"5801 Leslie Street, Toronto, ON, M2H 1J8","phone":"416-395-5830","id":"LIB051"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.4911925925926,43.62995925925924]},"properties":{"key":"humberbay","name":"Humber Bay","address":"200 Park Lawn Road, Toronto, ON, M8Y 3J1","phone":"416-394-5300","id":"LIB052"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.57151851851852,43.75898148148147]},"properties":{"key":"humbersummit","name":"Humber Summit","address":"2990 Islington Ave., Toronto, ON, M9L 2K6","phone":"416-395-5840","id":"LIB053"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.61916296296296,43.72899629629626]},"properties":{"key":"humberwood","name":"Humberwood","address":"850 Humberwood Blvd., Toronto, ON, M9W 7A6","phone":"416-394-5210","id":"LIB054"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.49141481481482,43.66547037037034]},"properties":{"key":"janedundas","name":"Jane/Dundas","address":"620 Jane Street, Toronto, ON, M6S 4A6","phone":"416-394-1014","id":"LIB055"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.51005,43.73988]},"properties":{"key":"janesheppard","name":"Jane/Sheppard","address":"1906 Sheppard Ave West, Toronto, ON, M3L 1Y7","phone":"416-395-5966","id":"LIB056"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.3344962962963,43.66595185185183]},"properties":{"key":"jones","name":"Jones","address":"118 Jones Ave., Toronto, ON, M4M 2Z9","phone":"416-393-7715","id":"LIB057"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.27049629629629,43.73215925925921]},"properties":{"key":"kennedyeglinton","name":"Kennedy/Eglinton","address":"2380 Eglinton Ave. East, Liberty Square Plaza, Toronto, ON, M1K 2P3","phone":"416-396-8924","id":"LIB138"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.36756296296295,43.70649259259256]},"properties":{"key":"leaside","name":"Leaside","address":"165 McRae Dr., Toronto, ON, M4G 1S8","phone":"416-396-3835","id":"LIB059"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.3984,43.6581]},"properties":{"key":"lillianhsmith","name":"Lillian H. Smith","address":"239 College Street, Toronto, ON, M5T 1R5","phone":"416-393-7746","id":"LIB011"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.40181481481483,43.72487777777776]},"properties":{"key":"locke","name":"Locke","address":"3083 Yonge Street, Toronto, ON, M4N 2K7","phone":"416-393-7730","id":"LIB060"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.5315037037037,43.59526296296294]},"properties":{"key":"longbranch","name":"Long Branch","address":"3500 Lake Shore Blvd. West, Toronto, ON, M8W 1N6","phone":"416-394-5320","id":"LIB061"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.29957777777776,43.68335925925925]},"properties":{"key":"mainstreet","name":"Main Street","address":"137 Main Street, Toronto, ON, M4E 2V9","phone":"416-393-7700","id":"LIB062"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.21606666666663,43.808314814814814]},"properties":{"key":"malvern","name":"Malvern","address":"30 Sewells Road, Toronto, ON, M1B 3G5","phone":"416-396-8969","id":"LIB012"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.44719259259259,43.69612962962959]},"properties":{"key":"mariaashchuka","name":"Maria A. Shchuka","address":"1745 Eglinton Avenue W, Toronto, ON, M6E 2H4","phone":"416-394-1000","id":"LIB013"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.3117111111111,43.757262962962955]},"properties":{"key":"maryvale","name":"Maryvale","address":"85 Ellesmere Road, Unit 16, Parkway Mall, Toronto, ON, M1R 4B9","phone":"416-396-8931","id":"LIB063"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.28071851851853,43.747707407407404]},"properties":{"key":"mcgregorpark","name":"McGregor Park","address":"2219 Lawrence Ave. East, Toronto, ON, M1P 2P5","phone":"416-396-8935","id":"LIB064"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.49390370370371,43.61490740740739]},"properties":{"key":"mimicocentennial","name":"Mimico Centennial","address":"47 Station Road, Toronto, ON, M8V 2R1","phone":"416-394-5330","id":"LIB065"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.17854074074076,43.76988518518516]},"properties":{"key":"morningside","name":"Morningside","address":"4279 Lawrence Ave. East, Toronto, ON, M1E 2S8","phone":"416-396-8881","id":"LIB066"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.48825925925925,43.686581481481475]},"properties":{"key":"mountdennis","name":"Mount Dennis","address":"1123 Weston Road, Toronto, ON, M6N 3S3","phone":"416-394-1008","id":"LIB067"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.38812592592595,43.703899999999976]},"properties":{"key":"mountpleasant","name":"Mount Pleasant","address":"599 Mt. Pleasant Road, Toronto, ON, M4S 2M5","phone":"416-393-7737","id":"LIB068"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.50974074074074,43.599085185185174]},"properties":{"key":"newtoronto","name":"New Toronto","address":"110 Eleventh Street, Toronto, ON, M8V 3G5","phone":"416-394-5350","id":"LIB069"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.41424444,43.76807778]},"properties":{"key":"northyorkcentrallibrary","name":"North York Central Library","address":"5120 Yonge Street, Toronto, ON, M2N 5N9","phone":"416-395-5535","id":"LIB01"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.39987407407408,43.708240740740706]},"properties":{"key":"northerndistrict","name":"Northern District","address":"40 Orchard View Blvd., Toronto, ON, M4R 1B9","phone":"416-393-7610","id":"LIB014"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.56554814814814,43.71132962962962]},"properties":{"key":"northernelms","name":"Northern Elms","address":"123B Rexdale Blvd., Unit 5, Toronto, ON, M9W 1P1","phone":"416-394-5230","id":"LIB070"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.4381111111111,43.68654444444444]},"properties":{"key":"oakwoodvillagelibraryandartscentre","name":"Oakwood Village Library and Arts Centre","address":"341 Oakwood Ave., Toronto, ON, M6E 2W1","phone":"416-394-1040","id":"LIB071"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.41405185185185,43.66509259259255]},"properties":{"key":"palmerston","name":"Palmerston","address":"560 Palmerston Ave., Toronto, ON, M6G 2P7","phone":"416-393-7680","id":"LIB072"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.34457037037036,43.67855925925923]},"properties":{"key":"papedanforth","name":"Pape/Danforth","address":"701 Pape Ave., Toronto, ON, M4K 3S6","phone":"416-393-7727","id":"LIB015"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.43265925925925,43.64117407407406]},"properties":{"key":"parkdale","name":"Parkdale","address":"1303 Queen Street West, Toronto, ON, M6K 1L6","phone":"416-393-7686","id":"LIB073"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.36779999999999,43.66180370370367]},"properties":{"key":"parliamentstreet","name":"Parliament Street","address":"269 Gerrard Street East, Toronto, ON, M5A 2G3","phone":"416-393-7663","id":"LIB074"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.45382962962962,43.6650333333333]},"properties":{"key":"perthdupont","name":"Perth/Dupont","address":"1589 Dupont Street, Toronto, ON, M6P 3S5","phone":"416-393-7677","id":"LIB075"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.33542962962962,43.787559259259254]},"properties":{"key":"pleasantview","name":"Pleasant View","address":"575 Van Horne Ave., Toronto, ON, M2J 4S8","phone":"416-395-5940","id":"LIB076"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.14028888888889,43.77947777777776]},"properties":{"key":"portunion","name":"Port Union","address":"5450 Lawrence Ave. East, Toronto, ON, M1C 3B2","phone":"416-396-8885","id":"LIB077"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.34759259259259,43.65914444444443]},"properties":{"key":"queensaulter","name":"Queen/Saulter","address":"765 Queen Street East, Toronto, ON, M4M 1H3","phone":"416-393-7723","id":"LIB078"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.57320740740741,43.72612962962962]},"properties":{"key":"rexdale","name":"Rexdale","address":"2243 Kipling Avenue, Toronto, ON, M9W 4L5","phone":"416-394-5200","id":"LIB079"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.5411185185185,43.68340370370369]},"properties":{"key":"richview","name":"Richview","address":"1806 Islington Ave., Toronto, ON, M9P 3N3","phone":"416-394-5120","id":"LIB016"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.35316296296295,43.66575925925923]},"properties":{"key":"riverdale","name":"Riverdale","address":"370 Broadview Ave., Toronto, ON, M4K 2M8","phone":"416-393-7720","id":"LIB080"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.47384444444442,43.65185555555554]},"properties":{"key":"runnymede","name":"Runnymede","address":"2178 Bloor Street West, Toronto, ON, M6S 1M8","phone":"416-393-7697","id":"LIB081"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.256764,43.772096]},"properties":{"key":"scarboroughciviccentre","name":"Scarborough Civic Centre","address":"156 Borough Dr., Toronto, ON, M1P 4N7","phone":"416-396-3599","id":"LIB144"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.32969629629628,43.6921148148148]},"properties":{"key":"swalterstewart","name":"S. Walter Stewart","address":"170 Memorial Park Ave., Toronto, ON, M4J 2K5","phone":"416-396-3975","id":"LIB017"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.40551851851849,43.65208518518517]},"properties":{"key":"sanderson","name":"Sanderson","address":"327 Bathurst Street, Toronto, ON, M5T 1J1","phone":"416-393-7653","id":"LIB085"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.40437777777778,43.66715925925923]},"properties":{"key":"spadinaroad","name":"Spadina Road","address":"10 Spadina Road, Toronto, ON, M5R 2S7","phone":"416-393-7666","id":"LIB086"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.4605851851852,43.674262962962956]},"properties":{"key":"stclairsilverthorn","name":"St. Clair/Silverthorn","address":"1748 St. Clair Ave. West, Toronto, ON, M6N 1J3","phone":"416-393-7709","id":"LIB082"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.37446666666666,43.667262962962944]},"properties":{"key":"stjamestown","name":"St. James Town","address":"495 Sherbourne Street, Toronto, ON, M4X 1K7","phone":"416-393-7744","id":"LIB083"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.36849629629629,43.64998148148147]},"properties":{"key":"stlawrence","name":"St. Lawrence","address":"171 Front Street East, Toronto, ON, M5A 4H3","phone":"416-393-7655","id":"LIB084"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.32230370370368,43.81538148148147]},"properties":{"key":"steeles","name":"Steeles","address":"Bamburgh Gardens Shopping Plaza, C107-375 Bamburgh Circle, Toronto, ON, M1W 3Y1","phone":"416-396-8975","id":"LIB087"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.47802222222221,43.64792962962962]},"properties":{"key":"swanseamemorial","name":"Swansea Memorial","address":"95 Lavinia Ave., Toronto, ON, M6S 3H9","phone":"416-393-7695","id":"LIB088"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.27125185185186,43.68778148148149]},"properties":{"key":"taylormemorial","name":"Taylor Memorial","address":"1440 Kingston Road, Toronto, ON, M1N 1R3","phone":"416-396-8939","id":"LIB089"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.34264444444442,43.70290740740739]},"properties":{"key":"thorncliffe","name":"Thorncliffe","address":"48 Thorncliffe Park Dr., Toronto, ON, M4H 1J7","phone":"416-396-3865","id":"LIB090"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.34932592592591,43.691625925925905]},"properties":{"key":"todmordenroom","name":"Todmorden Room","address":"1081 1/2 Pape Ave (at Torrens), Toronto, ON, M4K 3W6","phone":"416-396-3875","id":"LIB091"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.38676296296298,43.671737037037005]},"properties":{"key":"torontoreferencelibrary","name":"Toronto Reference Library","address":"789 Yonge Street, Toronto, ON, M4W 2G8","phone":"416-395-5577","id":"LIB018"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.3129111111111,43.736011111111075]},"properties":{"key":"victoriavillage","name":"Victoria Village","address":"184 Sloane Ave., Toronto, ON, M4A 2C4","phone":"416-395-5950","id":"LIB092"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.52058518518517,43.701796296296266]},"properties":{"key":"weston","name":"Weston","address":"2 King Street, Toronto, ON, M9N 1K9","phone":"416-394-1016","id":"LIB093"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.26954814814812,43.809462962962954]},"properties":{"key":"woodsidesquare","name":"Woodside Square","address":"Woodside Square Mall, 1571 Sandhurst Circle, Toronto, ON, M1V 1V2","phone":"416-396-8979","id":"LIB094"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.53894074074073,43.7397222222222]},"properties":{"key":"woodviewpark","name":"Woodview Park","address":"16 Bradstock Road, Toronto, ON, M9M 1M8","phone":"416-395-5960","id":"LIB095"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.41754814814814,43.682181481481464]},"properties":{"key":"wychwood","name":"Wychwood","address":"1431 Bathurst Street, Toronto, ON, M5R 3J2","phone":"416-393-7683","id":"LIB096"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.50726666666665,43.758892592592574]},"properties":{"key":"yorkwoods","name":"York Woods","address":"1785 Finch Ave. West, Toronto, ON, M3N 1M6","phone":"416-395-5980","id":"LIB019"}},
{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.38864444444445,43.6718259259259]},"properties":{"key":"yorkville","name":"Yorkville","address":"22 Yorkville Ave., Toronto, ON, M4W 1L4","phone":"416-393-7660","id":"LIB097"}}]};
  return branchInfo;
}

function makeBranchID(name) {
  return name.toLowerCase().replace(/[^A-Za-z]/g, '');
}

function getBranchInfo(name, geoJSON) {
  var key = makeBranchID(name);
  for (var i = 0; i < geoJSON.features.length; i++) {
    if (geoJSON.features[i].properties.key == key) {
      return geoJSON.features[i];
    }
  }
  return null;
}

function addVisualizeLink(document) {
  var branchSelector = document.querySelector('#refinements-library_branch');
  if (!branchSelector) { return null; }
  branchSelector.parentNode.querySelector('h3').innerHTML =
    'Library Branch <a href="#" style="color: white; text-decoration: underline" id="visualize-action">(Visualize)</a>';
  document.querySelector('#visualize-action').addEventListener('click', addMap, true);
  waitForGoogleMaps();
  return true;
}

function waitForGoogleMaps() {
  var w = typeof unsafeWindow == 'undefined' ? window : unsafeWindow;
  if (typeof w.google == 'undefined' || typeof w.google.maps == 'undefined') {
    window.setTimeout(waitForGoogleMaps, 100);
  } else {
    window.setTimeout(initialize, 200);
  }
}

function extractBranchResults() {
  var branchSelector = document.querySelector('#refinements-library_branch');
  if (!branchSelector) { return null; }
  var elements = branchSelector.parentNode.querySelectorAll('.refinement');
  var branchInfo = getBranches();
  var countMax = 0;
  
  Array.prototype.forEach.call(elements, function(el, i) {
    var branch = ((el.querySelector('.notranslate') && el.querySelector('.notranslate').textContent) || '').replace(/^[ \t\r\n\u00a0]+|[ \t\r\n\u00a0]+$/g, '');
    var count = parseInt(((el.querySelector('.ref-count') && el.querySelector('.ref-count').textContent) || '0').replace(/^[ \t\r\n\u00a0]+|[ \t\r\n\u00a0]+$/g, '').replace(/[,\(\)]/g, ''));
    var href = el.querySelector('a') && el.querySelector('a').href;
    var info = getBranchInfo(branch, branchInfo);
    if (info) {
      info.properties.count = count;
      info.properties.href = href;
    }
    if (count > countMax) { countMax = count; }
  });

  for (var i = 0; i < branchInfo.features.length; i++) {
    if (branchInfo.features[i].properties.count > 0) {
      branchInfo.features[i].properties.scaledCount = branchInfo.features[i].properties.count * 1.0 / countMax;
    }
  }
  return branchInfo;
}

var map;

function getCircle(item) {
  if (item.getProperty('count') > 0) {
    var circle = {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: 'orange',
      fillOpacity: Math.log10(item.getProperty('count')) / 6,
      // scale: item.getProperty('scaledCount') * 5,
      scale: item.getProperty('scaledCount') * 15 + 2,
      // scale: Math.log(item.getProperty('count')) + 1
      strokeColor: 'red',
      strokeWeight: 1
    };
    return circle;
  }
  return null;
}

function addMap() {
  var API_js_callback = "https://maps.google.com/maps/api/js";
  var script = document.createElement('script');
  script.src = API_js_callback;
  var head = document.getElementsByTagName("head")[0];
  (head || document.body).appendChild(script);
  document.querySelector('#search-bar-top').insertAdjacentHTML('beforebegin', '<div id="map" style="width: 100%; height: 400px"></div>');
}

function initialize() {
  var data = extractBranchResults();
  var w = typeof unsafeWindow == 'undefined' ? window : unsafeWindow;
  var google = w.google;
  var mapOptions = {
    zoom: 12,
    center: {lng: -79.38676296296297, lat: 43.671737037037005},
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };
  map = new google.maps.Map(document.getElementById('map'),
                            mapOptions);
  map.data.setStyle(function(feature) {
    return {
      icon: getCircle(feature)
    };
  });
  var infowindow = new google.maps.InfoWindow({
    content: ''
  });
  data.features = data.features.filter(function(x) {
    return x.properties.count > 0;
  });
  map.data.addGeoJson(data);
  map.data.addListener('mouseover', function(event) {
    var branch = event.feature.getProperty('name');
    var count = event.feature.getProperty('count');
    var address = event.feature.getProperty('address');
    var href = event.feature.getProperty('href');
    infowindow.setPosition(event.latLng);
    infowindow.setContent(
      '<strong>' + count + (count == 1 ? ' item' : ' items')
        + '</strong> at ' + branch + '<br />' + address + '<br/>'
        + '<a href="' + href + '">View search results</a>');
    infowindow.open(map);
  });
  map.data.addListener('click', function(event) {
    var branch = event.feature.getProperty('name');
    var count = event.feature.getProperty('count');
    var address = event.feature.getProperty('address');
    var href = event.feature.getProperty('href');
    window.location.href = href;
  });
}
addVisualizeLink(document);

