import {  Calendar, Badge, Button  } from 'antd';
import {  PlusOutlined } from '@ant-design/icons';
import React, {
  useState,
  useEffect,
} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../utils/paths";
import { getAllRoutes } from "../services/routes";




export default function SEECALENDAR({ authenticate }) {
  const navigate = useNavigate();
  const [routeLists, setRotesList] = useState([]);
const obtainRoutes = async () => {
  getAllRoutes()
    .then((res) => {
    //  console.log(res.data.AllRoutes)
      setRotesList(res.data.AllRoutes);
    })
    .catch((err) => console.log(err));
};
useEffect(() => {
  obtainRoutes();
}, []);


    function getListData(value) {
        let listData;
        let dateValue = value.format("yyyy/MM/DD");

        routeLists.map(item => {
          let formatedDate =item.date.replace(/-/g,'/')
          if(dateValue === formatedDate){
          //  console.log(item.clients)
            let arr =[]
            item.clients.map(client=>{
              arr.push( { type: 'warning', content: client.custumername })
            })
            listData = arr
          }
       })
        return listData || [];
      }
      
      function dateCellRender(value) {
        const listData = getListData(value);
        return (
          <ul className="events">
            {listData.map(item => {
            //  console.log(item)
              return(
              <li key={item.content}>
                <Badge key={item.content} status={item.type} text={item.content} />
              </li>
            )})}
          </ul>
        );
      } 
      function onSelect(s){
        let date = s.format("yyyy/MM/DD").replace(/\//g,'-');
        routeLists.map(item => {
         //console.log(item.date)
         if(item.date===date){
           //console.log()
       navigate(`/route-detail/${item._id}`)
         }
       })
      }
      
          return(
<div>
<Link to={PATHS.NEWROUTE}>Nueva ruta
<PlusOutlined />
</Link>
<Calendar dateCellRender={dateCellRender} onSelect={onSelect}/>,
</div>
          )}