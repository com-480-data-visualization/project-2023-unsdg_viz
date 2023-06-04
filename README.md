# Project of Data Visualization (COM-480) 🖌️

| Student's name | SCIPER |
| -------------- | ------ |
| Julia Wälti | 287004 |
| Lorenzo Rovati| 287476 |
|Sophia Ly | 342530|

[Website](https://com-480-data-visualization.github.io/project-2023-unsdg_viz/website/index.html) <br>
[Screencast](https://youtu.be/8pCqiJxD370) <br>
[Milestone 1](https://github.com/com-480-data-visualization/project-2023-unsdg_viz/blob/master/milestone1/UNSDG_viz_M1.pdf): Project definition <br>
[Milestone 2](https://github.com/com-480-data-visualization/project-2023-unsdg_viz/blob/master/milestone2/UNSDG_viz-M2.pdf): Design thinking of project <br>
[Milestone 3](https://github.com/com-480-data-visualization/project-2023-unsdg_viz/blob/master/milestone3/UNSDGViz_process-book.pdf): Process book 

## Intended usage 🌍
The website's goal is to explore the intricate relationship between country development and sustainability with environmental focus. It guides the user through the visualizations and highlights what the motivation between each visualization is. 

First, a general introduction to the topic is given. A visualization of the temperature and CO2 emission time series enables the user to inspect the influence of this greenhouse gas and to understand the importance of sustainable development.
An interactive introduction to the carbon cycle is also given to better contextualize the subject, followed by a visualization and explanation of UN Sustainable Development Goals linked to dataset features used in the project.
Correlation between some of the datasets features is shown through an interactive heatmap, giving some perspective on trends that will be further analysed throughtout the rest of the website.
A spatial and temporal visualization of CO2 emissions and other sustainability features invites the user to analyze potential trends and feature-relationship. 
Lastly, a deep dive into statistical relationships between the features is shown.

The target audience is anyone who is interested in the topic of sustainability. From curious leaders to climate acitvists who are trying to find strategies on how to decouple CO2 emissions from economic growth to scientist analyzing trends to find environmentally friendly policies.

## Technical setup 💻
In order to run the project locally, the 'website' directory should be cloned and the index.html opened in a local server (e.g. development local Server VS extension)

The repository structure is listed below: <br />
```
├───data                  All the data used for preprocessing 
├───figures               !!!!TODO: Code of all individual figures --> Should we delete?
├───milestone 1           Python script for exploratative data analysis and preprocessing 
    ├───data generated    Generated pickle files from Python script (EDA and preprocessing)
    └───plots             Plots from exploratative data analysis
├───milestone 2           
    └─── plot stats       Preprocessing notebook and result csv for the spearmanR plot
    └─── worldmap         Data and preprocessing notebook for the maps visualizations
├───milestone 3           !!! TODO: add processbook and video
└───website               Index html, all Javascript and CSS files  
    └───resources         Data used for plots, images and icons
    
```
     
The visualizations were made with [D3.js](https://d3js.org/). Details on the technical implementations are described in the processbook.

The website is also accessible online thorugh [this link](https://com-480-data-visualization.github.io/project-2023-unsdg_viz/website/index.html).

## Dataset 💾
Multiple datasets were used to build the website. A detailed dataset description can be found in milestone 1. The preprocessing is described in the processbook.

From [Kaggle](https://www.kaggle.com/datasets/vittoriogiatti/unsdg-united-nations-sustainable-development-group): 
- UNSDG indexes: unsdg_2002_2021.csv

From [ourworldindata](https://ourworldindata.org/):
- [CO2 emissions](https://ourworldindata.org/grapher/co-emissions-per-capita?tab=table): annual-co-emissions-by-region.csv
- [Literacy rate](https://ourworldindata.org/grapher/gross-domestic-product?tab=table): literacy-rate-adults.csv
- [GDP](https://ourworldindata.org/grapher/gross-domestic-product?tab=table): gross-domestic-product.csv
- [Education rate](https://ourworldindata.org/grapher/projections-of-the-rate-of-no-education-based-on-current-global-education-trends-1970-2050?tab=table): rate-of-no-education.csv
- [Air pollution](https://ourworldindata.org/grapher/share-above-who-pollution-guidelines?tab=table): share-above-who-pollution-guidelines.csv
- [Renewable_energy](https://ourworldindata.org/grapher/co2-per-capita-vs-renewable-electricity?tab=table): 'co2-per-capita-vs-renewable-electricity.csv

## Screencast 🎬
Check out our 2min screencast to get to know about our main contributions.
[Screen cast link](https://youtu.be/8pCqiJxD370)
[![Alt text](https://img.youtube.com/vi/8pCqiJxD370/0.jpg)](https://www.youtube.com/watch?v=8pCqiJxD370)


