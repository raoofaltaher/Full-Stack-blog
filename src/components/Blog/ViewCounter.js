"use client";
import React, { useEffect, useState } from "react";

const ViewCounter = ({ slug, noCount = false, showCount = true }) => {
  const [views, setViews] = useState(0);
  const [error, setError] = useState(null); // State to hold potential errors

  useEffect(() => {
    const incrementView = async () => {
      try {
        const response = await fetch(`/api/views/${slug}`, {
          method: 'POST',
        });
        if (!response.ok) {
          // Throw an error if response status is not OK
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        // Optionally update views state immediately based on POST response
        // const data = await response.json();
        // setViews(data.count);
      } catch (err) {
        console.error("Error incrementing view count:", err.message);
        setError(err.message); // Set error state
      }
    };

    if (!noCount) {
      incrementView();
    }
  }, [slug, noCount]);

  useEffect(() => {
    const getViews = async () => {
      try {
        const response = await fetch(`/api/views/${slug}`);
        if (!response.ok) {
           // Throw an error if response status is not OK
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setViews(data.count);
      } catch (err) {
        console.error("Error fetching view count:", err.message);
        setError(err.message); // Set error state
      }
    };

    getViews();
  }, [slug]); // Rerun if slug changes

  if (error) {
    // Optionally display an error message to the user
    // return <div className="text-red-500">Error loading views.</div>;
    console.error("ViewCounter Error:", error); // Log error for debugging
    // Fallback to showing 0 or null if error occurs
    return showCount ? <div>0 views</div> : null;
  }

  if (showCount) {
    return <div>{views} views</div>;
  } else {
    return null;
  }
};

export default ViewCounter;
