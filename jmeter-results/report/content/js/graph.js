/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 38.0, "minX": 0.0, "maxY": 618.0, "series": [{"data": [[0.0, 38.0], [0.1, 43.0], [0.2, 46.0], [0.3, 47.0], [0.4, 49.0], [0.5, 51.0], [0.6, 51.0], [0.7, 53.0], [0.8, 54.0], [0.9, 54.0], [1.0, 55.0], [1.1, 56.0], [1.2, 57.0], [1.3, 58.0], [1.4, 58.0], [1.5, 59.0], [1.6, 60.0], [1.7, 61.0], [1.8, 61.0], [1.9, 62.0], [2.0, 64.0], [2.1, 65.0], [2.2, 66.0], [2.3, 67.0], [2.4, 68.0], [2.5, 69.0], [2.6, 70.0], [2.7, 71.0], [2.8, 73.0], [2.9, 73.0], [3.0, 75.0], [3.1, 76.0], [3.2, 77.0], [3.3, 80.0], [3.4, 82.0], [3.5, 83.0], [3.6, 85.0], [3.7, 87.0], [3.8, 88.0], [3.9, 89.0], [4.0, 91.0], [4.1, 92.0], [4.2, 93.0], [4.3, 94.0], [4.4, 96.0], [4.5, 97.0], [4.6, 97.0], [4.7, 98.0], [4.8, 100.0], [4.9, 101.0], [5.0, 102.0], [5.1, 103.0], [5.2, 104.0], [5.3, 105.0], [5.4, 105.0], [5.5, 106.0], [5.6, 107.0], [5.7, 108.0], [5.8, 109.0], [5.9, 110.0], [6.0, 111.0], [6.1, 112.0], [6.2, 113.0], [6.3, 113.0], [6.4, 114.0], [6.5, 115.0], [6.6, 116.0], [6.7, 116.0], [6.8, 117.0], [6.9, 118.0], [7.0, 118.0], [7.1, 119.0], [7.2, 121.0], [7.3, 122.0], [7.4, 123.0], [7.5, 124.0], [7.6, 125.0], [7.7, 126.0], [7.8, 126.0], [7.9, 127.0], [8.0, 129.0], [8.1, 129.0], [8.2, 131.0], [8.3, 132.0], [8.4, 133.0], [8.5, 134.0], [8.6, 135.0], [8.7, 136.0], [8.8, 138.0], [8.9, 139.0], [9.0, 140.0], [9.1, 141.0], [9.2, 142.0], [9.3, 143.0], [9.4, 144.0], [9.5, 144.0], [9.6, 145.0], [9.7, 145.0], [9.8, 146.0], [9.9, 147.0], [10.0, 148.0], [10.1, 148.0], [10.2, 149.0], [10.3, 150.0], [10.4, 151.0], [10.5, 152.0], [10.6, 152.0], [10.7, 153.0], [10.8, 153.0], [10.9, 154.0], [11.0, 156.0], [11.1, 157.0], [11.2, 158.0], [11.3, 159.0], [11.4, 159.0], [11.5, 159.0], [11.6, 160.0], [11.7, 160.0], [11.8, 161.0], [11.9, 161.0], [12.0, 162.0], [12.1, 163.0], [12.2, 164.0], [12.3, 165.0], [12.4, 165.0], [12.5, 166.0], [12.6, 167.0], [12.7, 168.0], [12.8, 168.0], [12.9, 170.0], [13.0, 171.0], [13.1, 172.0], [13.2, 173.0], [13.3, 174.0], [13.4, 175.0], [13.5, 175.0], [13.6, 176.0], [13.7, 177.0], [13.8, 178.0], [13.9, 180.0], [14.0, 181.0], [14.1, 183.0], [14.2, 185.0], [14.3, 186.0], [14.4, 188.0], [14.5, 189.0], [14.6, 190.0], [14.7, 191.0], [14.8, 192.0], [14.9, 193.0], [15.0, 194.0], [15.1, 194.0], [15.2, 195.0], [15.3, 197.0], [15.4, 198.0], [15.5, 199.0], [15.6, 199.0], [15.7, 201.0], [15.8, 202.0], [15.9, 203.0], [16.0, 205.0], [16.1, 205.0], [16.2, 206.0], [16.3, 206.0], [16.4, 207.0], [16.5, 208.0], [16.6, 209.0], [16.7, 210.0], [16.8, 210.0], [16.9, 211.0], [17.0, 212.0], [17.1, 213.0], [17.2, 214.0], [17.3, 215.0], [17.4, 215.0], [17.5, 216.0], [17.6, 216.0], [17.7, 217.0], [17.8, 217.0], [17.9, 218.0], [18.0, 218.0], [18.1, 219.0], [18.2, 220.0], [18.3, 220.0], [18.4, 221.0], [18.5, 222.0], [18.6, 223.0], [18.7, 223.0], [18.8, 223.0], [18.9, 224.0], [19.0, 225.0], [19.1, 225.0], [19.2, 225.0], [19.3, 226.0], [19.4, 226.0], [19.5, 227.0], [19.6, 228.0], [19.7, 228.0], [19.8, 229.0], [19.9, 229.0], [20.0, 230.0], [20.1, 231.0], [20.2, 231.0], [20.3, 232.0], [20.4, 232.0], [20.5, 233.0], [20.6, 233.0], [20.7, 234.0], [20.8, 235.0], [20.9, 236.0], [21.0, 236.0], [21.1, 236.0], [21.2, 237.0], [21.3, 237.0], [21.4, 238.0], [21.5, 238.0], [21.6, 240.0], [21.7, 240.0], [21.8, 241.0], [21.9, 242.0], [22.0, 243.0], [22.1, 243.0], [22.2, 244.0], [22.3, 244.0], [22.4, 245.0], [22.5, 245.0], [22.6, 246.0], [22.7, 247.0], [22.8, 247.0], [22.9, 247.0], [23.0, 248.0], [23.1, 249.0], [23.2, 249.0], [23.3, 250.0], [23.4, 250.0], [23.5, 251.0], [23.6, 251.0], [23.7, 251.0], [23.8, 252.0], [23.9, 253.0], [24.0, 253.0], [24.1, 253.0], [24.2, 254.0], [24.3, 254.0], [24.4, 255.0], [24.5, 255.0], [24.6, 256.0], [24.7, 256.0], [24.8, 257.0], [24.9, 257.0], [25.0, 258.0], [25.1, 259.0], [25.2, 259.0], [25.3, 260.0], [25.4, 260.0], [25.5, 261.0], [25.6, 261.0], [25.7, 261.0], [25.8, 262.0], [25.9, 262.0], [26.0, 263.0], [26.1, 263.0], [26.2, 264.0], [26.3, 264.0], [26.4, 265.0], [26.5, 265.0], [26.6, 266.0], [26.7, 266.0], [26.8, 267.0], [26.9, 267.0], [27.0, 267.0], [27.1, 268.0], [27.2, 268.0], [27.3, 269.0], [27.4, 270.0], [27.5, 270.0], [27.6, 270.0], [27.7, 271.0], [27.8, 271.0], [27.9, 272.0], [28.0, 272.0], [28.1, 272.0], [28.2, 272.0], [28.3, 273.0], [28.4, 273.0], [28.5, 273.0], [28.6, 274.0], [28.7, 274.0], [28.8, 275.0], [28.9, 275.0], [29.0, 275.0], [29.1, 276.0], [29.2, 276.0], [29.3, 276.0], [29.4, 277.0], [29.5, 277.0], [29.6, 278.0], [29.7, 278.0], [29.8, 278.0], [29.9, 279.0], [30.0, 279.0], [30.1, 279.0], [30.2, 280.0], [30.3, 280.0], [30.4, 281.0], [30.5, 281.0], [30.6, 281.0], [30.7, 282.0], [30.8, 282.0], [30.9, 282.0], [31.0, 283.0], [31.1, 283.0], [31.2, 283.0], [31.3, 283.0], [31.4, 284.0], [31.5, 284.0], [31.6, 284.0], [31.7, 285.0], [31.8, 285.0], [31.9, 285.0], [32.0, 286.0], [32.1, 286.0], [32.2, 287.0], [32.3, 287.0], [32.4, 288.0], [32.5, 288.0], [32.6, 288.0], [32.7, 289.0], [32.8, 289.0], [32.9, 290.0], [33.0, 290.0], [33.1, 290.0], [33.2, 291.0], [33.3, 291.0], [33.4, 291.0], [33.5, 292.0], [33.6, 292.0], [33.7, 292.0], [33.8, 293.0], [33.9, 293.0], [34.0, 294.0], [34.1, 294.0], [34.2, 294.0], [34.3, 295.0], [34.4, 295.0], [34.5, 295.0], [34.6, 296.0], [34.7, 296.0], [34.8, 297.0], [34.9, 297.0], [35.0, 298.0], [35.1, 298.0], [35.2, 299.0], [35.3, 299.0], [35.4, 300.0], [35.5, 300.0], [35.6, 300.0], [35.7, 301.0], [35.8, 301.0], [35.9, 302.0], [36.0, 302.0], [36.1, 303.0], [36.2, 303.0], [36.3, 304.0], [36.4, 304.0], [36.5, 304.0], [36.6, 305.0], [36.7, 305.0], [36.8, 306.0], [36.9, 306.0], [37.0, 306.0], [37.1, 307.0], [37.2, 307.0], [37.3, 307.0], [37.4, 307.0], [37.5, 308.0], [37.6, 308.0], [37.7, 308.0], [37.8, 309.0], [37.9, 310.0], [38.0, 310.0], [38.1, 310.0], [38.2, 311.0], [38.3, 311.0], [38.4, 311.0], [38.5, 312.0], [38.6, 312.0], [38.7, 313.0], [38.8, 313.0], [38.9, 314.0], [39.0, 314.0], [39.1, 315.0], [39.2, 315.0], [39.3, 315.0], [39.4, 316.0], [39.5, 316.0], [39.6, 316.0], [39.7, 316.0], [39.8, 317.0], [39.9, 317.0], [40.0, 317.0], [40.1, 318.0], [40.2, 318.0], [40.3, 318.0], [40.4, 319.0], [40.5, 320.0], [40.6, 320.0], [40.7, 320.0], [40.8, 321.0], [40.9, 321.0], [41.0, 322.0], [41.1, 322.0], [41.2, 322.0], [41.3, 323.0], [41.4, 323.0], [41.5, 324.0], [41.6, 324.0], [41.7, 324.0], [41.8, 325.0], [41.9, 325.0], [42.0, 326.0], [42.1, 326.0], [42.2, 326.0], [42.3, 327.0], [42.4, 327.0], [42.5, 328.0], [42.6, 328.0], [42.7, 328.0], [42.8, 329.0], [42.9, 329.0], [43.0, 330.0], [43.1, 330.0], [43.2, 331.0], [43.3, 331.0], [43.4, 332.0], [43.5, 332.0], [43.6, 333.0], [43.7, 333.0], [43.8, 333.0], [43.9, 334.0], [44.0, 334.0], [44.1, 335.0], [44.2, 335.0], [44.3, 335.0], [44.4, 336.0], [44.5, 336.0], [44.6, 336.0], [44.7, 337.0], [44.8, 338.0], [44.9, 338.0], [45.0, 339.0], [45.1, 339.0], [45.2, 340.0], [45.3, 341.0], [45.4, 341.0], [45.5, 341.0], [45.6, 342.0], [45.7, 342.0], [45.8, 343.0], [45.9, 343.0], [46.0, 343.0], [46.1, 344.0], [46.2, 344.0], [46.3, 345.0], [46.4, 345.0], [46.5, 345.0], [46.6, 346.0], [46.7, 346.0], [46.8, 347.0], [46.9, 347.0], [47.0, 347.0], [47.1, 348.0], [47.2, 348.0], [47.3, 349.0], [47.4, 349.0], [47.5, 349.0], [47.6, 350.0], [47.7, 350.0], [47.8, 350.0], [47.9, 351.0], [48.0, 351.0], [48.1, 351.0], [48.2, 352.0], [48.3, 352.0], [48.4, 352.0], [48.5, 352.0], [48.6, 353.0], [48.7, 353.0], [48.8, 353.0], [48.9, 354.0], [49.0, 354.0], [49.1, 354.0], [49.2, 354.0], [49.3, 355.0], [49.4, 355.0], [49.5, 355.0], [49.6, 355.0], [49.7, 355.0], [49.8, 356.0], [49.9, 356.0], [50.0, 356.0], [50.1, 356.0], [50.2, 356.0], [50.3, 356.0], [50.4, 357.0], [50.5, 357.0], [50.6, 357.0], [50.7, 357.0], [50.8, 358.0], [50.9, 358.0], [51.0, 358.0], [51.1, 358.0], [51.2, 358.0], [51.3, 359.0], [51.4, 359.0], [51.5, 359.0], [51.6, 359.0], [51.7, 359.0], [51.8, 359.0], [51.9, 360.0], [52.0, 360.0], [52.1, 360.0], [52.2, 360.0], [52.3, 360.0], [52.4, 360.0], [52.5, 360.0], [52.6, 360.0], [52.7, 360.0], [52.8, 361.0], [52.9, 361.0], [53.0, 361.0], [53.1, 361.0], [53.2, 362.0], [53.3, 362.0], [53.4, 362.0], [53.5, 362.0], [53.6, 362.0], [53.7, 362.0], [53.8, 363.0], [53.9, 363.0], [54.0, 363.0], [54.1, 363.0], [54.2, 363.0], [54.3, 363.0], [54.4, 363.0], [54.5, 364.0], [54.6, 364.0], [54.7, 364.0], [54.8, 364.0], [54.9, 364.0], [55.0, 364.0], [55.1, 365.0], [55.2, 365.0], [55.3, 365.0], [55.4, 365.0], [55.5, 365.0], [55.6, 365.0], [55.7, 365.0], [55.8, 365.0], [55.9, 366.0], [56.0, 366.0], [56.1, 366.0], [56.2, 366.0], [56.3, 366.0], [56.4, 366.0], [56.5, 366.0], [56.6, 366.0], [56.7, 366.0], [56.8, 366.0], [56.9, 367.0], [57.0, 367.0], [57.1, 367.0], [57.2, 367.0], [57.3, 367.0], [57.4, 367.0], [57.5, 367.0], [57.6, 367.0], [57.7, 368.0], [57.8, 368.0], [57.9, 368.0], [58.0, 368.0], [58.1, 368.0], [58.2, 368.0], [58.3, 368.0], [58.4, 369.0], [58.5, 369.0], [58.6, 369.0], [58.7, 369.0], [58.8, 369.0], [58.9, 369.0], [59.0, 369.0], [59.1, 369.0], [59.2, 369.0], [59.3, 370.0], [59.4, 370.0], [59.5, 370.0], [59.6, 370.0], [59.7, 370.0], [59.8, 370.0], [59.9, 370.0], [60.0, 370.0], [60.1, 371.0], [60.2, 371.0], [60.3, 371.0], [60.4, 371.0], [60.5, 371.0], [60.6, 371.0], [60.7, 371.0], [60.8, 371.0], [60.9, 372.0], [61.0, 372.0], [61.1, 372.0], [61.2, 372.0], [61.3, 372.0], [61.4, 372.0], [61.5, 373.0], [61.6, 373.0], [61.7, 373.0], [61.8, 373.0], [61.9, 373.0], [62.0, 373.0], [62.1, 373.0], [62.2, 373.0], [62.3, 373.0], [62.4, 373.0], [62.5, 373.0], [62.6, 374.0], [62.7, 374.0], [62.8, 374.0], [62.9, 374.0], [63.0, 374.0], [63.1, 374.0], [63.2, 374.0], [63.3, 374.0], [63.4, 374.0], [63.5, 374.0], [63.6, 374.0], [63.7, 375.0], [63.8, 375.0], [63.9, 375.0], [64.0, 375.0], [64.1, 375.0], [64.2, 375.0], [64.3, 375.0], [64.4, 375.0], [64.5, 375.0], [64.6, 376.0], [64.7, 376.0], [64.8, 376.0], [64.9, 376.0], [65.0, 376.0], [65.1, 376.0], [65.2, 376.0], [65.3, 376.0], [65.4, 376.0], [65.5, 376.0], [65.6, 377.0], [65.7, 377.0], [65.8, 377.0], [65.9, 377.0], [66.0, 377.0], [66.1, 377.0], [66.2, 377.0], [66.3, 377.0], [66.4, 377.0], [66.5, 378.0], [66.6, 378.0], [66.7, 378.0], [66.8, 378.0], [66.9, 378.0], [67.0, 378.0], [67.1, 378.0], [67.2, 378.0], [67.3, 378.0], [67.4, 378.0], [67.5, 379.0], [67.6, 379.0], [67.7, 379.0], [67.8, 379.0], [67.9, 379.0], [68.0, 379.0], [68.1, 379.0], [68.2, 379.0], [68.3, 379.0], [68.4, 379.0], [68.5, 380.0], [68.6, 380.0], [68.7, 380.0], [68.8, 380.0], [68.9, 380.0], [69.0, 380.0], [69.1, 380.0], [69.2, 380.0], [69.3, 380.0], [69.4, 381.0], [69.5, 381.0], [69.6, 381.0], [69.7, 381.0], [69.8, 381.0], [69.9, 381.0], [70.0, 381.0], [70.1, 381.0], [70.2, 382.0], [70.3, 382.0], [70.4, 382.0], [70.5, 382.0], [70.6, 382.0], [70.7, 382.0], [70.8, 382.0], [70.9, 383.0], [71.0, 383.0], [71.1, 383.0], [71.2, 383.0], [71.3, 383.0], [71.4, 383.0], [71.5, 383.0], [71.6, 383.0], [71.7, 384.0], [71.8, 384.0], [71.9, 384.0], [72.0, 384.0], [72.1, 384.0], [72.2, 384.0], [72.3, 384.0], [72.4, 384.0], [72.5, 384.0], [72.6, 384.0], [72.7, 385.0], [72.8, 385.0], [72.9, 385.0], [73.0, 385.0], [73.1, 385.0], [73.2, 385.0], [73.3, 385.0], [73.4, 385.0], [73.5, 386.0], [73.6, 386.0], [73.7, 386.0], [73.8, 386.0], [73.9, 386.0], [74.0, 386.0], [74.1, 387.0], [74.2, 387.0], [74.3, 387.0], [74.4, 387.0], [74.5, 387.0], [74.6, 387.0], [74.7, 387.0], [74.8, 387.0], [74.9, 387.0], [75.0, 388.0], [75.1, 388.0], [75.2, 388.0], [75.3, 388.0], [75.4, 388.0], [75.5, 389.0], [75.6, 389.0], [75.7, 389.0], [75.8, 389.0], [75.9, 389.0], [76.0, 389.0], [76.1, 390.0], [76.2, 390.0], [76.3, 390.0], [76.4, 390.0], [76.5, 390.0], [76.6, 390.0], [76.7, 390.0], [76.8, 390.0], [76.9, 391.0], [77.0, 391.0], [77.1, 391.0], [77.2, 391.0], [77.3, 391.0], [77.4, 391.0], [77.5, 392.0], [77.6, 392.0], [77.7, 392.0], [77.8, 392.0], [77.9, 392.0], [78.0, 393.0], [78.1, 393.0], [78.2, 393.0], [78.3, 393.0], [78.4, 393.0], [78.5, 394.0], [78.6, 394.0], [78.7, 394.0], [78.8, 394.0], [78.9, 395.0], [79.0, 395.0], [79.1, 395.0], [79.2, 395.0], [79.3, 395.0], [79.4, 396.0], [79.5, 396.0], [79.6, 396.0], [79.7, 396.0], [79.8, 397.0], [79.9, 397.0], [80.0, 397.0], [80.1, 397.0], [80.2, 397.0], [80.3, 398.0], [80.4, 398.0], [80.5, 398.0], [80.6, 398.0], [80.7, 398.0], [80.8, 399.0], [80.9, 399.0], [81.0, 399.0], [81.1, 399.0], [81.2, 400.0], [81.3, 400.0], [81.4, 400.0], [81.5, 400.0], [81.6, 401.0], [81.7, 401.0], [81.8, 401.0], [81.9, 401.0], [82.0, 402.0], [82.1, 402.0], [82.2, 402.0], [82.3, 402.0], [82.4, 403.0], [82.5, 403.0], [82.6, 403.0], [82.7, 404.0], [82.8, 404.0], [82.9, 404.0], [83.0, 405.0], [83.1, 405.0], [83.2, 406.0], [83.3, 406.0], [83.4, 407.0], [83.5, 407.0], [83.6, 407.0], [83.7, 408.0], [83.8, 408.0], [83.9, 408.0], [84.0, 408.0], [84.1, 409.0], [84.2, 410.0], [84.3, 410.0], [84.4, 411.0], [84.5, 411.0], [84.6, 411.0], [84.7, 412.0], [84.8, 412.0], [84.9, 412.0], [85.0, 413.0], [85.1, 414.0], [85.2, 414.0], [85.3, 414.0], [85.4, 414.0], [85.5, 414.0], [85.6, 415.0], [85.7, 415.0], [85.8, 415.0], [85.9, 415.0], [86.0, 416.0], [86.1, 416.0], [86.2, 416.0], [86.3, 417.0], [86.4, 417.0], [86.5, 418.0], [86.6, 418.0], [86.7, 419.0], [86.8, 419.0], [86.9, 420.0], [87.0, 421.0], [87.1, 421.0], [87.2, 422.0], [87.3, 423.0], [87.4, 423.0], [87.5, 424.0], [87.6, 425.0], [87.7, 425.0], [87.8, 425.0], [87.9, 426.0], [88.0, 426.0], [88.1, 427.0], [88.2, 427.0], [88.3, 427.0], [88.4, 428.0], [88.5, 429.0], [88.6, 429.0], [88.7, 430.0], [88.8, 430.0], [88.9, 431.0], [89.0, 432.0], [89.1, 432.0], [89.2, 433.0], [89.3, 433.0], [89.4, 434.0], [89.5, 434.0], [89.6, 434.0], [89.7, 435.0], [89.8, 435.0], [89.9, 435.0], [90.0, 436.0], [90.1, 436.0], [90.2, 437.0], [90.3, 437.0], [90.4, 438.0], [90.5, 439.0], [90.6, 439.0], [90.7, 439.0], [90.8, 439.0], [90.9, 440.0], [91.0, 440.0], [91.1, 441.0], [91.2, 441.0], [91.3, 442.0], [91.4, 442.0], [91.5, 443.0], [91.6, 444.0], [91.7, 444.0], [91.8, 445.0], [91.9, 445.0], [92.0, 446.0], [92.1, 446.0], [92.2, 447.0], [92.3, 448.0], [92.4, 448.0], [92.5, 449.0], [92.6, 449.0], [92.7, 450.0], [92.8, 450.0], [92.9, 451.0], [93.0, 451.0], [93.1, 452.0], [93.2, 452.0], [93.3, 453.0], [93.4, 453.0], [93.5, 454.0], [93.6, 455.0], [93.7, 455.0], [93.8, 456.0], [93.9, 456.0], [94.0, 457.0], [94.1, 458.0], [94.2, 459.0], [94.3, 460.0], [94.4, 460.0], [94.5, 461.0], [94.6, 462.0], [94.7, 463.0], [94.8, 464.0], [94.9, 465.0], [95.0, 466.0], [95.1, 466.0], [95.2, 467.0], [95.3, 469.0], [95.4, 469.0], [95.5, 470.0], [95.6, 471.0], [95.7, 472.0], [95.8, 474.0], [95.9, 477.0], [96.0, 480.0], [96.1, 482.0], [96.2, 483.0], [96.3, 485.0], [96.4, 486.0], [96.5, 488.0], [96.6, 490.0], [96.7, 490.0], [96.8, 491.0], [96.9, 492.0], [97.0, 494.0], [97.1, 496.0], [97.2, 500.0], [97.3, 501.0], [97.4, 505.0], [97.5, 507.0], [97.6, 509.0], [97.7, 511.0], [97.8, 513.0], [97.9, 515.0], [98.0, 517.0], [98.1, 520.0], [98.2, 521.0], [98.3, 522.0], [98.4, 524.0], [98.5, 526.0], [98.6, 529.0], [98.7, 532.0], [98.8, 535.0], [98.9, 539.0], [99.0, 542.0], [99.1, 544.0], [99.2, 548.0], [99.3, 549.0], [99.4, 553.0], [99.5, 557.0], [99.6, 560.0], [99.7, 563.0], [99.8, 572.0], [99.9, 582.0]], "isOverall": false, "label": "Get Top Rated Animes", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 3.0, "minX": 0.0, "maxY": 2289.0, "series": [{"data": [[0.0, 237.0], [300.0, 2289.0], [600.0, 3.0], [100.0, 544.0], [200.0, 987.0], [400.0, 803.0], [500.0, 137.0]], "isOverall": false, "label": "Get Top Rated Animes", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 600.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 137.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 4863.0, "series": [{"data": [[0.0, 4863.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 137.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 1.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 36.38042880703687, "minX": 1.747341E12, "maxY": 41.81766740018854, "series": [{"data": [[1.747341E12, 36.38042880703687], [1.74734106E12, 41.81766740018854]], "isOverall": false, "label": "Anime API Tests", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74734106E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 69.5, "minX": 1.0, "maxY": 428.68333333333334, "series": [{"data": [[2.0, 107.28571428571429], [3.0, 97.16666666666666], [4.0, 110.71428571428571], [5.0, 142.33333333333331], [6.0, 98.59999999999998], [7.0, 97.8235294117647], [8.0, 92.05263157894736], [9.0, 83.00000000000001], [10.0, 80.78571428571429], [11.0, 85.20689655172417], [12.0, 91.74603174603178], [13.0, 95.97560975609755], [14.0, 99.5], [15.0, 108.25806451612905], [16.0, 120.70689655172414], [17.0, 186.20000000000002], [18.0, 151.56666666666666], [19.0, 141.75438596491227], [20.0, 144.88372093023256], [21.0, 146.54285714285714], [22.0, 173.0857142857143], [23.0, 172.44444444444443], [24.0, 180.30000000000004], [25.0, 184.07692307692312], [26.0, 201.16981132075472], [27.0, 212.98333333333332], [28.0, 223.32758620689646], [29.0, 231.17142857142858], [30.0, 245.39534883720933], [31.0, 251.51162790697674], [32.0, 263.2173913043476], [33.0, 259.8148148148148], [34.0, 268.6153846153844], [35.0, 280.1320754716982], [36.0, 275.595744680851], [37.0, 287.3076923076923], [38.0, 302.9577464788732], [39.0, 307.760683760684], [40.0, 311.73809523809524], [41.0, 319.10256410256414], [42.0, 338.19313304721055], [43.0, 341.5289855072463], [44.0, 342.98214285714295], [45.0, 355.2300884955754], [46.0, 374.1666666666666], [47.0, 408.8499999999999], [48.0, 428.68333333333334], [49.0, 403.36723163841793], [50.0, 400.4283567134267], [1.0, 69.5]], "isOverall": false, "label": "Get Top Rated Animes", "isController": false}, {"data": [[39.839599999999976, 320.37119999999896]], "isOverall": false, "label": "Get Top Rated Animes-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 50.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 5942.066666666667, "minX": 1.747341E12, "maxY": 114516.0, "series": [{"data": [[1.747341E12, 65484.0], [1.74734106E12, 114516.0]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.747341E12, 5942.066666666667], [1.74734106E12, 10391.266666666666]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74734106E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 291.69323804288086, "minX": 1.747341E12, "maxY": 336.77019805092704, "series": [{"data": [[1.747341E12, 291.69323804288086], [1.74734106E12, 336.77019805092704]], "isOverall": false, "label": "Get Top Rated Animes", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74734106E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 291.6679494227599, "minX": 1.747341E12, "maxY": 336.75605155611476, "series": [{"data": [[1.747341E12, 291.6679494227599], [1.74734106E12, 336.75605155611476]], "isOverall": false, "label": "Get Top Rated Animes", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74734106E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.747341E12, "maxY": 0.04123144584936768, "series": [{"data": [[1.747341E12, 0.04123144584936768], [1.74734106E12, 0.0]], "isOverall": false, "label": "Get Top Rated Animes", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74734106E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 38.0, "minX": 1.747341E12, "maxY": 618.0, "series": [{"data": [[1.747341E12, 618.0], [1.74734106E12, 582.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.747341E12, 38.0], [1.74734106E12, 49.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.747341E12, 439.0], [1.74734106E12, 434.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.747341E12, 549.8], [1.74734106E12, 535.7199999999993]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.747341E12, 318.0], [1.74734106E12, 360.0]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.747341E12, 484.0], [1.74734106E12, 459.89999999999964]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74734106E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 68.0, "minX": 11.0, "maxY": 418.5, "series": [{"data": [[132.0, 68.0], [129.0, 366.0], [128.0, 355.0], [130.0, 324.0], [140.0, 142.0], [11.0, 93.0], [47.0, 75.0], [63.0, 100.0], [103.0, 418.0], [118.0, 418.5], [123.0, 378.0], [121.0, 396.0], [120.0, 400.0], [122.0, 284.0], [124.0, 332.0], [125.0, 374.5], [126.0, 367.5], [127.0, 294.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 140.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 68.0, "minX": 11.0, "maxY": 418.5, "series": [{"data": [[132.0, 68.0], [129.0, 366.0], [128.0, 355.0], [130.0, 324.0], [140.0, 142.0], [11.0, 93.0], [47.0, 75.0], [63.0, 100.0], [103.0, 418.0], [118.0, 418.5], [123.0, 378.0], [121.0, 396.0], [120.0, 400.0], [122.0, 284.0], [124.0, 332.0], [125.0, 374.0], [126.0, 367.5], [127.0, 294.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 140.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 31.15, "minX": 1.747341E12, "maxY": 52.18333333333333, "series": [{"data": [[1.747341E12, 31.15], [1.74734106E12, 52.18333333333333]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74734106E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 30.316666666666666, "minX": 1.747341E12, "maxY": 53.016666666666666, "series": [{"data": [[1.747341E12, 30.316666666666666], [1.74734106E12, 53.016666666666666]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74734106E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 30.316666666666666, "minX": 1.747341E12, "maxY": 53.016666666666666, "series": [{"data": [[1.747341E12, 30.316666666666666], [1.74734106E12, 53.016666666666666]], "isOverall": false, "label": "Get Top Rated Animes-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74734106E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 30.316666666666666, "minX": 1.747341E12, "maxY": 53.016666666666666, "series": [{"data": [[1.747341E12, 30.316666666666666], [1.74734106E12, 53.016666666666666]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74734106E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

