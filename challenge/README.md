# Bootcamp: UCB-VIRT-DATA-PT-03-2020-U-B-TTH

### Bootcamp Challenge #12 - 5/31/2020
Bootcamp Challenge 12: Module Plotly

### Challenge Hosted on GitHub Pages
- [GitHub Pages: Plotly Challenge](https://pbryzek.github.io/plotly/challenge/)

### Links Used
- [samples.json](https://courses.bootcampspot.com/courses/140/files/37550/download?wrap=1)

### Challenge Description
**Objectives**
The goals of this challenge are for you to:
- Create a bar chart of the top ten bacterial species in a volunteer’s navel. 
- Use JavaScript to select only the most populous species.
- Create a bubble chart to visualize the relative frequency of all the bacterial species found in a volunteer’s navel.
- Complete the demographic information panel, if you have not done so.

## Technologies Used
- HTML
- Bootstrap
- JavaScript
- CSS
- GIT
- d3.js

## Methodology, Summary, Purpose 
The goal of this challenge was to first download the samples.json file and use HTML, D3, and JavaScript technologies to build out an interactive webpage displaying various characteristics on the bacteria that grows within the Belly Button. Features included:
- Build out a select dropdown in HTML to allow the user to pick any sample in the list
- Build out a demographics panel with datapoints related to that person including id, ethnicity, gender, age, location, bbtype, and wfreq. 
- For a given sample ID, I reversed the order of the sample values to get the OTU sample data in descending order, then took the top 10 data points and plotted them on a horizontal bar chart.
- Created a bubble plot to identify the bacteria species found in each individual and used the marker sizes in order to represent proportional bubbles.
- Created a Gauge Plot which effectively shows as a speedometer how many times an individual washes their belly button per week. For the gauge, as our scale was only from 0-9 and we wanted to represent 9 as 180 degrees, I multiplied the wash frequency by 20.

I utilized d3 to read the samples.json file and populate the dropdown menu with all the values found in the samples.json file. I took the first value in the select to populate the page with the 1st sample ID listed in the dropdown. At the bottom of the plots.js file, I called an init function to initialize the page. 

Finally once the app was completed, I enabled GitHub pages by selecting the master branch and provided the URL above.
