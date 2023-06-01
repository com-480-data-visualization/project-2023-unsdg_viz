# Project of Data Visualization (COM-480) 🖌️

| Student's name | SCIPER |
| -------------- | ------ |
| Julia Wälti | 287004 |
| Lorenzo Rovati| 287476 |
|Sophia Ly | 342530|

[Website](https://com-480-data-visualization.github.io/project-2023-unsdg_viz/website/index.html) 
[Milestone 1](https://github.com/com-480-data-visualization/project-2023-unsdg_viz/blob/master/milestone1/UNSDG_viz_M1.pdf): Project definition 
[Milestone 2](https://github.com/com-480-data-visualization/project-2023-unsdg_viz/blob/master/milestone2/UNSDG_viz-M2.pdf): Design thinking of project
[Milestone 3](#milestone-3): Process book 

## Intended usage 🌍
The website's goal is to explore the intricate relationship betweencountry development and sustainability with environmental focus. It guides the user through the visualizations and highlights what the motivation between each visualization is. 

First, a general introduction to the topic is given. A visualization of the temperature and CO2 emission time series enables the user to inspect the influence of this greenhouse gas and to understand the importance of sustainable development. 
A spatial and temporal visualization of CO2 emissions and other sustainability features invites the user to analyze potential trends and feature-relationship. 
Afterwards, a deep dive into statistical relationships between the features is shown. Lastly, a correlation heatmap give some perspective on how the trends seen can be interpreted.  

The target audience is anyone who is interested in the topic of sustainability. From curious leaders to climate acitvists who are trying to find strategies on how to decouple CO2 emissions from economic growth to scientist analyzing trends to find environmentally friendly policies.

## Technical setup 💻
In order to run the project locally, the 'website' directory should be cloned and the index.html opened in a local server (e.g. development local Server VS extension)

The repository structure is listed below: <br>
├───data                  All the data used for preprocessing <br>
├───figures               !!!!TODO: Code of all individual figures --> Should we delete?<br>
├───milestone 1           Python script for exploratative data analysis and preprocessing <br>
    ├───data generated    Generated pickle files from Python script (EDA and preprocessing)<br>
    └───plots             Plots from exploratative data analysis<br>
├───milestone 2           !!! TODO: cleanup<br>
└───website               Index html, all Javascript and CSS files  <br>
    ├───img              TODO: to move to resources?? Images used for hero image <br>
    └───resources        Data used for plots<br>
     
The visualizations were made with [D3.js](https://d3js.org/). The details about the technical implementations is described in the processbook.

## Dataset 💾
Multiple datasets were used to build the website. A detailed dataset description can be seen in milestone 1. The preprocessing is described in the processbook.

From [Kaggle](https://www.kaggle.com/datasets/vittoriogiatti/unsdg-united-nations-sustainable-development-group): 
- UNSDG indexes: unsdg_2002_2021.csv

From [ourworldindata](https://ourworldindata.org/):
- [CO2 emissions](https://ourworldindata.org/grapher/co-emissions-per-capita?tab=table): annual-co-emissions-by-region.csv
- [Literacy rate](https://ourworldindata.org/grapher/gross-domestic-product?tab=table): literacy-rate-adults.csv
- [GDP](https://ourworldindata.org/grapher/gross-domestic-product?tab=table): gross-domestic-product.csv
- [Education rate](https://ourworldindata.org/grapher/projections-of-the-rate-of-no-education-based-on-current-global-education-trends-1970-2050?tab=table): rate-of-no-education.csv
- [Air pollution](https://ourworldindata.org/grapher/share-above-who-pollution-guidelines?tab=table): share-above-who-pollution-guidelines.csv
- [Renewable_energy](https://ourworldindata.org/grapher/co2-per-capita-vs-renewable-electricity?tab=table): 'co2-per-capita-vs-renewable-electricity.csv

--------- TODO: delete?---------------
## Milestone 1 (7th April, 5pm)

**10% of the final grade**

This is a preliminary milestone to let you set up goals for your final project and assess the feasibility of your ideas.
Please, fill the following sections about your project.

*(max. 2000 characters per section)*

### Dataset

> Find a dataset (or multiple) that you will explore. Assess the quality of the data it contains and how much preprocessing / data-cleaning it will require before tackling visualization. We recommend using a standard dataset as this course is not about scraping nor data processing.
>
> Hint: some good pointers for finding quality publicly available datasets ([Google dataset search](https://datasetsearch.research.google.com/), [Kaggle](https://www.kaggle.com/datasets), [OpenSwissData](https://opendata.swiss/en/), [SNAP](https://snap.stanford.edu/data/) and [FiveThirtyEight](https://data.fivethirtyeight.com/)), you could use also the DataSets proposed by the ENAC (see the Announcements section on Zulip).

### Problematic

> Frame the general topic of your visualization and the main axis that you want to develop.
> - What am I trying to show with my visualization?
> - Think of an overview for the project, your motivation, and the target audience.

### Exploratory Data Analysis

> Pre-processing of the data set you chose
> - Show some basic statistics and get insights about the data

### Related work


> - What others have already done with the data?
> - Why is your approach original?
> - What source of inspiration do you take? Visualizations that you found on other websites or magazines (might be unrelated to your data).
> - In case you are using a dataset that you have already explored in another context (ML or ADA course, semester project...), you are required to share the report of that work to outline the differences with the submission for this class.

## Milestone 2 (7th May, 5pm)

**10% of the final grade**


## Milestone 3 (4th June, 5pm)

**80% of the final grade**


## Late policy

- < 24h: 80% of the grade for the milestone
- < 48h: 70% of the grade for the milestone

