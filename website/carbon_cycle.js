document.addEventListener("DOMContentLoaded", function () {
    // Dissolution
    const process1 = d3.select('#process1');
    const process1_text = d3.select('#process1_text');
    let click1 = 0;
    const click_1 = (event, d) => {
        console.log('check', click1);
        click1++;
        if (click1 % 2 === 1) {
            process1.node().style.opacity = '0';
            process1_text.node().style.opacity = '1';
        } else {
            process1.node().style.opacity = '1';
            process1_text.node().style.opacity = '0';
        }
    };
    process1.on("click", click_1);
    process1_text.on("click", click_1);

    // Biomass production
    const process2 = d3.select('#process2');
    const process2_text = d3.select('#process2_text');
    let click2 = 0;
    const click_2 = (event, d) => {
        console.log('check', click2);
        click2++;
        if (click2 % 2 === 1) {
            process2.node().style.opacity = '0';
            process2_text.node().style.opacity = '1';
        } else {
            process2.node().style.opacity = '1';
            process2_text.node().style.opacity = '0';
        }
    };
    process2.on("click", click_2);
    process2_text.on("click", click_2);

    // Decomposition
    const process3 = d3.select('#process3');
    const process3_text = d3.select('#process3_text');
    let click3 = 0;
    const click_3 = (event, d) => {
        console.log('check', click3);
        click3++;
        if (click3 % 2 === 1) {
            process3.node().style.opacity = '0';
            process3_text.node().style.opacity = '1';
        } else {
            process3.node().style.opacity = '1';
            process3_text.node().style.opacity = '0';
        }
    };
    process3.on("click", click_3);
    process3_text.on("click", click_3);

    // Fossil fuel
    const process4 = d3.select('#process4');
    const process4_text = d3.select('#process4_text');
    let click4 = 0;
    const click_4 = (event, d) => {
        console.log('check', click4);
        click4++;
        if (click4 % 2 === 1) {
            process4.node().style.opacity = '0';
            process4_text.node().style.opacity = '1';
        } else {
            process4.node().style.opacity = '1';
            process4_text.node().style.opacity = '0';
        }
    };
    process4.on("click", click_4);
    process4_text.on("click", click_4);

    // Combustion
    const process5 = d3.select('#process5');
    const process5_text = d3.select('#process5_text');
    let click5 = 0;
    const click_5 = (event, d) => {
        console.log('check', click5);
        click5++;
        if (click5 % 2 === 1) {
            process5.node().style.opacity = '0';
            process5_text.node().style.opacity = '1';
        } else {
            process5.node().style.opacity = '1';
            process5_text.node().style.opacity = '0';
        }
    };
    process5.on("click", click_5);
    process5_text.on("click", click_5);

    // Photosynthesis
    const process6 = d3.select('#process6');
    const process6_text = d3.select('#process6_text');
    let click6 = 0;
    const click_6 = (event, d) => {
        console.log('check', click6);
        click6++;
        if (click6 % 2 === 1) {
            process6.node().style.opacity = '0';
            process6_text.node().style.opacity = '1';
        } else {
            process6.node().style.opacity = '1';
            process6_text.node().style.opacity = '0';
        }
    };
    process6.on("click", click_6);
    process6_text.on("click", click_6);

    // Sedimentation
    const process7 = d3.select('#process7');
    const process7_text = d3.select('#process7_text');
    let click7 = 0;
    const click_7 = (event, d) => {
        console.log('check', click7);
        click7++;
        if (click7 % 2 === 1) {
            process7.node().style.opacity = '0';
            process7_text.node().style.opacity = '1';
        } else {
            process7.node().style.opacity = '1';
            process7_text.node().style.opacity = '0';
        }
    };
    process7.on("click", click_7);
    process7_text.on("click", click_7);

    // Ground release
    const process8 = d3.select('#process8');
    const process8_text = d3.select('#process8_text');
    let click8 = 0;
    const click_8 = (event, d) => {
        console.log('check', click8);
        click8++;
        if (click8 % 2 === 1) {
            process8.node().style.opacity = '0';
            process8_text.node().style.opacity = '1';
        } else {
            process8.node().style.opacity = '1';
            process8_text.node().style.opacity = '0';
        }
    };
    process8.on("click", click_8);
    process8_text.on("click", click_8);
});
