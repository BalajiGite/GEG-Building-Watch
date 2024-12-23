import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "https://3m40b277z5.execute-api.ap-southeast-2.amazonaws.com/default"
const demoAPI = "https://day4cmh9h6.execute-api.ap-southeast-2.amazonaws.com/test"


export const getApiDataFromAws = async (item) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Request-Method': 'GET', // If a preflight request is required
            'Access-Control-Request-Headers': '*', // Custom headers
        };
        const response = await axios.get(API_URL+"/verdeosSkysparkApiTest?" + item);
        const data = response.data;
        return data;
    } catch (error) {
        return console.error('Error fetching data:', error);
    }
  }

  export const getDates = (dateSpan) => {
    try {
        const data = {"start":"2023-01-01", "end":"2023-08-01" }
        const today = new Date();
        if(dateSpan == "Today"){
            const formattedDate = today.toISOString().split('T')[0];
            data = {"start":formattedDate, "end":formattedDate }
        }else if(dateSpan == "This Week"){
            
            const currentDay = today.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday

            const startDate = new Date(today);
            startDate.setDate(today.getDate() - currentDay); // Move to the first day of the week (Sunday)

            const endDate = new Date(today);
            endDate.setDate(today.getDate() + (6 - currentDay)); // Move to the last day of the week (Saturday)

            // Format the dates as "YYYY-MM-DD"
            const formattedStartDate = startDate.toISOString().split('T')[0];
            const formattedEndDate = endDate.toISOString().split('T')[0];
            data = {"start":formattedStartDate, "end":formattedEndDate }

        }else if(dateSpan == "This Month"){
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

            // Format the dates as "YYYY-MM-DD"
            const formattedFirstDayOfMonth = firstDayOfMonth.toISOString().split('T')[0];
            const formattedLastDayOfMonth = lastDayOfMonth.toISOString().split('T')[0];

            data = {"start":formattedFirstDayOfMonth, "end":formattedLastDayOfMonth }

        }else if(dateSpan == "This Year"){
            const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
            const lastDayOfYear = new Date(today.getFullYear() + 1, 0, 0);

            // Format the dates as "YYYY-MM-DD"
            const formattedFirstDayOfYear = firstDayOfYear.toISOString().split('T')[0];
            const formattedLastDayOfYear = lastDayOfYear.toISOString().split('T')[0];
            data = {"start":formattedFirstDayOfYear, "end":formattedLastDayOfYear }

        }else if(dateSpan == "Past Month"){
            const thirtyDaysAgo = new Date(today);
            thirtyDaysAgo.setDate(today.getDate() - 29); // Subtract 29 days to include the current day

            // Format the dates as "YYYY-MM-DD"
            const formattedThirtyDaysAgo = thirtyDaysAgo.toISOString().split('T')[0];
            const formattedToday = today.toISOString().split('T')[0];

            data = {"start":formattedThirtyDaysAgo, "end":formattedToday }

        }else if(dateSpan == "Past Year"){

            const oneYearAgo = new Date(today);
            oneYearAgo.setDate(today.getDate() - 365);

            // Format the dates as "YYYY-MM-DD"
            const formattedOneYearAgo = oneYearAgo.toISOString().split('T')[0];
            const formattedToday = today.toISOString().split('T')[0];
            data = {"start":formattedOneYearAgo, "end":formattedToday }

        }else if(dateSpan == "Last Month"){
            const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth()-1, 1);
            const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

            // Format the dates as "YYYY-MM-DD"
            const formattedFirstDayOfLastMonth = firstDayOfLastMonth.toISOString().split('T')[0];
            const formattedLastDayOfLastMonth = lastDayOfLastMonth.toISOString().split('T')[0];
            data = {"start":formattedFirstDayOfLastMonth, "end":formattedLastDayOfLastMonth }

        }else if(dateSpan == "Last Year"){
            const firstDayOfLastYear = new Date(today.getFullYear() - 1, 0, 1);
            const lastDayOfLastYear = new Date(today.getFullYear(), 0, 0);

            // Format the dates as "YYYY-MM-DD"
            const formattedFirstDayOfLastYear = firstDayOfLastYear.toISOString().split('T')[0];
            const formattedLastDayOfLastYear = lastDayOfLastYear.toISOString().split('T')[0];
            data = {"start":formattedFirstDayOfLastYear, "end":formattedLastDayOfLastYear }
        }
        
        return data;
    } catch (error) {
        return console.error('Error fetching data:', error);
    }
  }

  export const getApiDataFromAwsDemo = async (item) => {
    try {
        const response = await axios.get(demoAPI+"/jsonData/" + item);
        const data = response.data;
        return data;
    } catch (error) {
        return console.error('Error fetching data:', error);
    }
  }


export const getConnectedBuilding = async () => {
    try {
        const response = await axios.get(API_URL+"/verdeosSkysparkApiTest");
        
        const data = response.data;
        return data;
    } catch (error) {
        return console.error('Error fetching data:', error);
    }
}

export const getConnectedBuildingDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getDataSourcesDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getTeamDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getImprvRecomondationDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getComplianceRepotingDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getDataSetsDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getGlobalPortfolioDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getPortfolioComplianceDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getPortfolioComplianceDataDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getEnergyUsageBySiteDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getWaterUsageBySiteDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getTotalAlarmsBySiteDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getTotalBreakdownBySiteDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getTotalovveridesBySiteDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getPortfolioCertificationDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getTotalPropertiesByNABERSRatingDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getTotalPropertiesByGreenStarRatingDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getTotalPropertiesByStateRatingDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getCarbonEmmisionBySiteDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

