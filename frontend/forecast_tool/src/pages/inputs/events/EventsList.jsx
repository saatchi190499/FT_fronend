import React, { useState, useEffect } from 'react';
import 'handsontable/dist/handsontable.full.min.css';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';


registerAllModules();

export const EventsList = () => {
    const [showEventSet, setShowEventSet] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:8000/api/events_set_list/');
            
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setShowEventSet(data.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
    

    const initialData = Array.isArray(showEventSet) ? showEventSet.map(item => [
        item.events_set_id,
        item.events_set_name,
        item.created_date,
        item.description     
    ]) : [];

    const settings = {
        data: initialData,
        rowHeaders: true,
        autoColumnSize: true,
        // height: 'auto',
        width: 'auto',
        stretchH:'all',
        colHeaders: [ "EventsSet ID", "EventsSet name", "Created Date", "Comments",],
        columns: [
          { 
            data: 0, 
            type: "text",
            readOnly: true,
            // width: () => document.documentElement.clientWidth * 0.2 
          },
          { 
            data: 1, 
            type: "text",
            readOnly: true,
            // width: () => document.documentElement.clientWidth * 0.2 
          },
          { 
            data: 2, 
            type: "date",
            allowInvalid: false,
            readOnly: true,
            // width: () => document.documentElement.clientWidth * 0.2 
        },
        { 
            data: 3, 
            type: "text",
            readOnly: true,
            // width: () => document.documentElement.clientWidth * 0.2 
        },
        ],
        colWidths: 'auto',
        licenseKey: "non-commercial-and-evaluation",
        dropdownMenu: true,
        filters: true,
        macCols: 4,
    };
    return (
        <div className='tabs'>
          <div className='hotTableContainer' lg={12}>
            <HotTable settings={settings} />
          </div>
        </div>
    );
};

export default EventsList;
