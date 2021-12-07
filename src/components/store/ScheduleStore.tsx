
import axios from 'axios';
import create from 'zustand'
import { message } from 'antd';
import moment, { Moment } from 'moment';

export type EventsRequest = {
    templateIds: string[],
    from: string,
    to: string,
    eventsOnly: boolean
}

type ScheduleStore = {
    templates: [];
    workingDays: [];
    isLoaded: boolean,
    loadTemplates: (user) => void;
    createTemplate(entityId, template);
    getEvents: (data: EventsRequest) => any
    // getWorkingDays: (user, start, end) => any;
    // createWorkingDays: (user) => any;
    // updateWorkingDay: (user, day) => void;
    // deleteWorkingDays: (user, days: []) => void;
    
  };

export const useScheduleWorkshop = create<ScheduleStore>((set, get) => ({
    templates: [],
    workingDays: [],
    isLoaded: false,
    loadTemplates: async (entityid) => {
        const response = await axios.get(`http://ec2-18-192-174-85.eu-central-1.compute.amazonaws.com:9999/user-entities/${entityid}/shift-templates`)
            .catch(
                e => {
                    console.error("Shift templates could not be loaded: " + e, 3)
                    return null
                }
            );
       
        //get().templates = response?.data;
        set({...get(), templates: response?.data})
        
       if (response !== null) {
        console.log(`Shift templates successfully loaded (${get().templates.length})`);
       }
       return get().templates;

    },
    createTemplate: async (entityId, tempalte) => { //todo there will be general and user defined types
        const response = await axios.post(`http://ec2-18-192-174-85.eu-central-1.compute.amazonaws.com:9999/user-entities/${entityId}/shift-templates`, tempalte)
        .catch(
                e => {
                    console.error("Template could not be created: " + e, 3)
                    message.error(`UPS! Something went wrong with entity creation: ${e}`, 3)
                    return null
                }
            );
       
       if (response !== null) {
            console.log(`template succesfully created (${response.data})`);
            message.success(`You have succesffuly created  " ${response.data['name']} "! `, 3)
       }
       
       get().loadTemplates(entityId)

       return response?.data;
        
    },
    getEvents: async (data: EventsRequest) => {

        console.log(`event request dataaaaaa ${JSON.stringify(data)}`);
        
        const response = await axios.post(`http://ec2-18-192-174-85.eu-central-1.compute.amazonaws.com:9999/appos`, {...data})
        .catch(
                e => {
                    console.error("Events could not be retrieved: " + e, 3)
                    message.error(`UPS! Something went wrong, cannot get events: ${e}`, 3)
                    return null
                }
            );
       
       if (response !== null) {
            console.log(`events succesfully fetched (${response.data})`);
            message.success(`There are total ${response.data['events'].length} found for specified period"! `, 5)
       }

       // caching here should not be an option
       return response?.data
    }

  }))

  