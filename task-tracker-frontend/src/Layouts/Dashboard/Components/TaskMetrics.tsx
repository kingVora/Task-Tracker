import { useEffect, useState } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "../../../icons";
import Badge from "../../../Utils/Badge/Badge";
import axios from "axios";
  
  export default function TaskMetrics() {

    const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;

    const [totalTasks, setTotalTasks] = useState(0);
    const [completedTasks, setCompletedTasks] = useState(0);
    const [dueTasks, setdueTasks] = useState(0);
    const [overdueTasks, setOverdueTasks] = useState(0);

    useEffect(() => {
      const fetchTasks = async () => {
        try {
          console.log("Here we go");
          const response = await axios.get(`${baseURL}/totaltasks`);
          setTotalTasks(response.data);
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      }

      fetchTasks();
    },[]);

    useEffect(() =>{
      const fetchCompletedTasks = async () => {
        try{
          const response = await axios.get(`${baseURL}/completedTasksCount`);
          setCompletedTasks(response.data);
        } catch (error) {
          console.error("Error fetching completed tasks:", error);
        }
      }
      fetchCompletedTasks();
    },[]);

    useEffect(() => {
      const fetchDueTasks = async () => {
        try {
          const response = await axios.get(`${baseURL}/dueTasksCount`);
          setdueTasks(response.data);
        } catch (error) {
          console.error("Error fetching overdue tasks:", error);
        }
      }
      fetchDueTasks();
    },[]);

    useEffect(() => {
      const fetchOverdueTasks = async () => {
        try {
          const response = await axios.get(`${baseURL}/overdueTasksCount`);
          setOverdueTasks(response.data);
        } catch (error) {
          console.error("Error fetching overdue tasks:",error);
        }
      }
      fetchOverdueTasks();
    },[]);

    return (
      <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-4 md:gap-6">
        {/* <!-- Metric Item Start --> */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
          </div>
  
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Total Tasks
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {totalTasks}
              </h4>
            </div>
          </div>
        </div>
        {/* <!-- Metric Item End --> */}
  
        {/* <!-- Metric Item Start --> */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Completed
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {completedTasks}
              </h4>
            </div>
  
            <Badge color="success">
              {/* <ArrowDownIcon /> */}
              {completedTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(2) : 0}%
            </Badge>
          </div>
        </div>
        {/* <!-- Metric Item End --> */}

        {/* <!-- Metric Item Start --> */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Due
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {dueTasks}
              </h4>
            </div>
  
            <Badge color="error">
              {/* <ArrowDownIcon /> */}
              {dueTasks > 0 ? ((dueTasks/totalTasks)*100).toFixed(2) : 0}%
            </Badge>
          </div>
        </div>
        {/* <!-- Metric Item End --> */}
        {/* <!-- Metric Item Start --> */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Overdue
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {completedTasks}
              </h4>
            </div>
  
            <Badge color="error">
              {/* <ArrowDownIcon /> */}
              {overdueTasks > 0 ? ((overdueTasks / totalTasks) * 100).toFixed(2) : 0}%
            </Badge>
          </div>
        </div>
        {/* <!-- Metric Item End --> */}
      </div>
    );
  }
  