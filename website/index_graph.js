document.addEventListener("DOMContentLoaded", function () {
    // 1
    const process1 = d3.select('#id1');
    let click1 = 0;
    var src = "index_imgs/id1.png";
    
    const click_1 = (event, d) => {
        console.log('check', click1);
        click1++;
        if (click1 % 2 === 1) {
            document.getElementById('id1').innerHTML = "<div id='id1', style='position:relative'> <img src='index_imgs/blanks/id1.png' style='width:100%; z-index=1'>  <div style='color:white; position:absolute; bottom: 20px; right: 20px;z-index:2; font-size: 15px;'>   </div> </div>";
        } else {
            document.getElementById('id1').innerHTML = '<div id="id1"><img src="index_imgs/id1.png" alt="Image 2"style="width:100%"></div>';
        }
    };
    process1.on("click", click_1);

    // 2
    const process2 = d3.select('#id2');
    let click2 = 0;
    const click_2 = (event, d) => {
        console.log('check', click2);
        click2++;
        if (click2 % 2 === 1) {
            document.getElementById('id2').innerHTML = "<div id='id2', style='position:relative'> <img src='index_imgs/blanks/id2.png' style='width:100%; z-index=1'>  <div style='color:white; position:absolute; bottom: 20px; right: 20px;z-index:2; font-size: 15px;'>  </div> </div>";
        } else {
            document.getElementById('id2').innerHTML = '<div id="id2"><img src="index_imgs/id2.png" alt="Image 2"style="width:100%"></div>';
        }
    };
    process2.on("click", click_2);

    // 3
    const process3 = d3.select('#id3');
    let click3 = 0;
    const click_3 = (event, d) => {
        console.log('check', click13);
        click3++;
        if (click3 % 2 === 1) {
            document.getElementById('id3').innerHTML = "<div id='id3', style='position:relative'> <img src='index_imgs/blanks/id3.png' style='width:100%; z-index=1'>  <div style='color:white; position:absolute; top: 70px; left: 0px;z-index:2; font-size: 15px;'> Mortality rate, PM2.5 air pollution </div> </div>";
        } else {
            document.getElementById('id3').innerHTML = '<div id="id3"><img src="index_imgs/id3.png" alt="Image 2"style="width:100%"></div>';
        }
    };
    process3.on("click", click_3);

    // 4
    const process4 = d3.select('#id4');
    let click4 = 0;
    const click_4 = (event, d) => {
        console.log('check', click4);
        click4++;
        if (click4 % 2 === 1) {
            document.getElementById('id4').innerHTML = "<div id='id4', style='position:relative'> <img src='index_imgs/blanks/id4.png' style='width:100%; z-index=1'>  <div style='color:white; position:absolute; top: 50px; left: 10px;z-index:2; font-size: 15px;'> IIASA rates of no education projections, Literacy rate </div> </div>";
        } else {
            document.getElementById('id4').innerHTML = '<div id="id4"><img src="index_imgs/id4.png" alt="Image 2"style="width:100%"></div>';
        }
    };
    process4.on("click", click_4);

    // 5
    const process5 = d3.select('#id5');
    let click5 = 0;
    const click_5 = (event, d) => {
        console.log('check', click5);
        click5++;
        if (click5 % 2 === 1) {
            document.getElementById('id5').innerHTML = "<div id='id5', style='position:relative'> <img src='index_imgs/blanks/id5.png' style='width:100%; z-index=1'>  <div style='color:white; position:absolute; bottom: 20px; right: 20px;z-index:2; font-size: 15px;'>   </div> </div>";
        } else {
            document.getElementById('id5').innerHTML = '<div id="id5"><img src="index_imgs/id5.png" alt="Image 2"style="width:100%"></div>';
        }
    };
    process5.on("click", click_5);

    // 6
    const process6 = d3.select('#id6');
    let click6 = 0;
    const click_6 = (event, d) => {
        console.log('check', click6);
        click6++;
        if (click6 % 2 === 1) {
            document.getElementById('id6').innerHTML = "<div id='id6', style='position:relative'> <img src='index_imgs/blanks/id6.png' style='width:100%; z-index=1'>  <div style='color:white; position:absolute; bottom: 20px; right: 20px;z-index:2; font-size: 15px;'>   </div> </div>";
        } else {
            document.getElementById('id6').innerHTML = '<div id="id6"><img src="index_imgs/id6.jpg" alt="Image 2"style="width:100%"></div>';
        }
    };
    process6.on("click", click_6);

    // 7
    const process7 = d3.select('#id7');
    let click7 = 0;
    const click_7 = (event, d) => {
        console.log('check', click7);
        click7++;
        if (click7 % 2 === 1) {
            document.getElementById('id7').innerHTML = "<div id='id7', style='position:relative'> <img src='index_imgs/blanks/id7.png' style='width:100%; z-index=1'>  <div style='color:white; position:absolute; top: 10px; left: 0px; z-index=2; font-size: 15px;'> Greenhousegas emissions, Proportion of population with primary relianceron clean fuels, Renewable energy share, CO2 emissions from fuel combustion, Fossil fuel subsidies consumption and production </div> </div>";
        } else {
            document.getElementById('id7').innerHTML = '<div id="id7"><img src="index_imgs/id7.png" alt="Image 2"style="width:100%"></div>';
        }
    };
    process7.on("click", click_7);

    // 8
    const process8 = d3.select('#id8');
    let click8 = 0;
    const click_8 = (event, d) => {
        console.log('check', click8);
        click8++;
        if (click8 % 2 === 1) {
            document.getElementById('id8').innerHTML = "<div id='id8', style='position:relative'> <img src='index_imgs/blanks/id8.png' style='width:100%; z-index=1'>  <div style='color:white; position:absolute; top: 70px; left: 5px;z-index:2; font-size: 15px;'> Total government revenue proportion of gdp, Annual growth rate </div> </div>";
        } else {
            document.getElementById('id8').innerHTML = '<div id="id8"><img src="index_imgs/id8.png" alt="Image 2"style="width:100%"></div>';
        }
    };
    process8.on("click", click_8);

    // 9
    const process9 = d3.select('#id9');
    let click9 = 0;
    const click_9 = (event, d) => {
        console.log('check', click9);
        click9++;
        if (click9 % 2 === 1) {
            document.getElementById('id9').innerHTML = "<div id='id9', style='position:relative'> <img src='index_imgs/blanks/id9.png' style='width:100%; z-index=1'>  <div style='color:white; position:absolute; top: 80px; left: 0px;z-index:2; font-size: 15px;'> FDI inflows </div> </div>";
        } else {
            document.getElementById('id9').innerHTML = '<div id="id9"><img src="index_imgs/id9.png" alt="Image 2"style="width:100%"></div>';
        }
    };
    process9.on("click", click_9);

    // 10
    const process10 = d3.select('#id10');
    let click10 = 0;
    const click_10 = (event, d) => {
        console.log('check', click10);
        click10++;
        if (click10 % 2 === 1) {
            document.getElementById('id10').innerHTML = "<div id='id10', style='position:relative'> <img src='index_imgs/blanks/id10.png' style='width:100%; z-index=1'>  <div style='color:white; position:absolute; bottom: 20px; right: 20px;z-index:2; font-size: 15px;'>  </div> </div>";
        } else {
            document.getElementById('id10').innerHTML = '<div id="id10"><img src="index_imgs/id10.png" alt="Image 2"style="width:100%"></div>';
        }
    };
    process10.on("click", click_10);

    // 11
    const process11 = d3.select('#id11');
    let click11 = 0;
    const click_11 = (event, d) => {
        console.log('check', click11);
        click11++;
        if (click11 % 2 === 1) {
            document.getElementById('id11').innerHTML = "<div id='id11', style='position:relative'> <img src='index_imgs/blanks/id11.png' style='width:100%; z-index=1'>  <div style='color:white; position:absolute; bottom: 20px; right: 20px;z-index:2; font-size: 15px;'>   </div> </div>";
        } else {
            document.getElementById('id11').innerHTML = '<div id="id11"><img src="index_imgs/id11.jpg" alt="Image 2"style="width:100%"></div>';
        }
    };
    process11.on("click", click_11);

    // 12
    const process12 = d3.select('#id12');
    let click12 = 0;
    const click_12 = (event, d) => {
        console.log('check', click12);
        click12++;
        if (click12 % 2 === 1) {
            document.getElementById('id12').innerHTML = "<div id='id12', style='position:relative'> <img src='index_imgs/blanks/id12.png' style='width:100%; z-index=1'>  <div style='color:white; position:absolute; bottom: 20px; right: 20px;z-index:2; font-size: 15px;'>  </div> </div>";
        } else {
            document.getElementById('id12').innerHTML = '<div id="id12"><img src="index_imgs/id12.png" alt="Image 2"style="width:100%"></div>';
        }
    };
    process12.on("click", click_12);

    // 13
    const process13 = d3.select('#id13');
    let click13 = 0;
    const click_13 = (event, d) => {
        console.log('check', click13);
        click13++;
        if (click13 % 2 === 1) {
            document.getElementById('id13').innerHTML = "<div id='id13', style='position:relative'> <img src='index_imgs/blanks/id13.png' style='width:100%; z-index=1'>  <div style='color:white; position:absolute; top: 5px; left: 0px;z-index:2; font-size: 15px;'> Number of companies publishing sustainability reports, Education for sustainable development, Enhance policy coherence for sustainable development, Land degraded over total land area </div> </div>";
        } else {
            document.getElementById('id13').innerHTML = '<div id="id13"><img src="index_imgs/id13.png" alt="Image 2"style="width:100%"></div>';
        }
    };
    process13.on("click", click_13);

    // 14
    const process14 = d3.select('#id14');
    let click14 = 0;
    const click_14 = (event, d) => {
        console.log('check', click1);
        click14++;
        if (click14 % 2 === 1) {
            document.getElementById('id14').innerHTML = "<div id='id14', style='position:relative'> <img src='index_imgs/blanks/id14.png' style='width:100%; z-index=1'>  <div style='color:white; position:absolute; bottom: 20px; right: 20px;z-index:2; font-size: 15px;'>  </div> </div>";
        } else {
            document.getElementById('id14').innerHTML = '<div id="id14"><img src="index_imgs/id14.png" alt="Image 2"style="width:100%"></div>';
        }
    };
    process14.on("click", click_14);

    // 15
    const process15 = d3.select('#id15');
    let click15 = 0;
    const click_15 = (event, d) => {
        console.log('check', click15);
        click15++;
        if (click15 % 2 === 1) {
            document.getElementById('id15').innerHTML = "<div id='id15', style='position:relative'> <img src='index_imgs/blanks/id15.png' style='width:100%; z-index=1'>  <div style='color:white; position:absolute; bottom: 20px; right: 20px;z-index:2; font-size: 15px;'>  </div> </div>";
        } else {
            document.getElementById('id15').innerHTML = '<div id="id15"><img src="index_imgs/id15.png" alt="Image 2"style="width:100%"></div>';
        }
    };
    process15.on("click", click_15);

    // 16
    const process16 = d3.select('#id16');
    let click16 = 0;
    const click_16 = (event, d) => {
        console.log('check', click1);
        click16++;
        if (click16 % 2 === 1) {
            document.getElementById('id16').innerHTML = "<div id='id16', style='position:relative'> <img src='index_imgs/blanks/id16.png' style='width:100%; z-index=1'>  <div style='color:white; position:absolute; bottom: 20px; right: 20px;z-index:100'>  </div> </div>";
        } else {
            document.getElementById('id16').innerHTML = '<div id="id16"><img src="index_imgs/id16.jpg" alt="Image 2"style="width:100%"></div>';
        }
    };
    process16.on("click", click_16);

    // 17
    const process17 = d3.select('#id17');
    let click17 = 0;
    const click_17 = (event, d) => {
        console.log('check', click17);
        click17++;
        if (click17 % 2 === 1) {
            document.getElementById('id17').innerHTML = "<div id='id17', style='position:relative'> <img src='index_imgs/blanks/id17.png' style='width:100%; z-index=1'>  <div style='color:white; position:absolute; bottom: 20px; right: 20px;z-index:100'>  </div> </div>";
        } else {
            document.getElementById('id17').innerHTML = '<div id="id17"><img src="index_imgs/id17.png" style="width:100%"></div>';
        }
    };
    process17.on("click", click_17);


});