# Score Dashboard Application

A dynamic dashboard built with **Next.js**, , **Recharts**, and **Tailwind CSS** that allows users to update scores via a modal. The application dynamically reflects score changes in both a pie chart and a line chart, and provides detailed analysis for the score used.

## Overview

This project was developed as part of an interview task. It demonstrates the ability to:

- Update a score via a modal interface.
- Dynamically reflect the updated score on both a pie chart and a line chart.
- Display an analysis section based on the user score, which shows insights and trends.

The charts are built using **Recharts**, and the application state is managed using the **React Context API** to ensure seamless updates across components.

## Features

- **Score Update Modal**: Users can input a new score which is then immediately reflected across all charts and analysis.
- **Dynamic Pie Chart**: Displays the ratio of the "actual" score to the remaining value (e.g., out of a total of 15).
- **Dynamic Line Chart**: Plots the number of students for various score percentiles. The chart updates if the user's score is added to the dataset.
- **Score Analysis**: Provides a detailed analysis and insights based on the score entered by the user.
- **Responsive Design**: Built with Tailwind CSS to ensure a mobile-friendly and responsive UI.

## Tech Stack

- **Framework:** Next.js (React)
- **State Management:** React Context API
- **Charts:** Recharts
- **Styling:** Tailwind CSS
- **Other:** TypeScript
