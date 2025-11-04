import React from "react"; 
import { useState } from "react"; 


import { CardDataEffects, trackInfo, CardFunctions, TyreDeg } from './game_data.js';
import { randomInt, randomUniform } from "d3";


const CN = 0, EN = 1;
const weather_name_en = ['Clear(0)','Cloudy(0)','Overcast(0)','Light Rain(1-2)','Mild Rain(3-4)','Moderate Rain(5-7)','Heavy Rain(8-10)','Rain Storm(>10)']
const weather_rainflow = [-0.5, -0.3, -0.1, 0.4, 0.7, 1.2, 1.8, 2.4];
const weather_threshold = [1000, 1000, 1000, 2.5, 4.5, 7.5, 11, 20];
const weather_rand = Math.random();
const card_list = ['Ovt','Dfd','Rls','Flw','DRS','Lit','Csv','Brn']
const card_name_cn = {
  'Ovt': '超',
  'Dfd': '防',
  'Rls': '释放',
  'Flw': '跟车',
  'DRS': 'DRS',
  'Lit': '轻油',
  'Csv': '保胎',
  'Brn': '烧胎'
}
const card_name_en = {
  'Ovt': 'Overtake',
  'Dfd': 'Defend',
  'Rls': 'Release',
  'Flw': 'Follow',
  'DRS': 'DRS',
  'Lit': 'Light',
  'Csv': 'Conserve',
  'Brn': 'Burn'
}


function GraphicPageTitle({ onClickLangFuncs, lang }) {
    const title_en = "Formula Champion: Lap Blitz Testrun 2025.1";
    const title_cn = "争冠方程式：刷圈机制测试 2025.1";
    const title = (lang === CN) ? title_cn : title_en;

    return (
        <div>

        <tr class='tr1'>
            <td width='940px'> <h1b>  {title} </h1b> </td>
            <td width='60px' align="right"><lang> <div class="highlight_shift" onClick={onClickLangFuncs[0]}>简体中文</div>
                                                <div class="highlight_shift" onClick={onClickLangFuncs[1]}>English</div></lang></td>
        </tr>


        </div>
    )

}

function FootNote({ lang }) {

    const footnote_cn = 'Copyright © 2025 FC制作组 杭贝赛车-育华桌游联合开发';
    const footnote_en = "Copyright © 2025 by FormulaChampion Developers, BCR & GYB Union";

    const declare_cn = '本应用程序作为测试工具，未经制作组授权不得用于商业用途';
    const declare_en = 'Using this test tool for profitable usage without permission is not allowed';

    const footnote = (lang === CN) ? footnote_cn : footnote_en;
    const declare = (lang === CN) ? declare_cn : declare_en;

    return (
        <tr>
            {declare}
            <br />
            {footnote}
        </tr>

    )

}

function round10(num){
  return Math.round(num*10)/10;
}


function Main({ lang }) {

  const totalDriver = 3;

  var [curDriver, setCurDriver] = useState(0);
  var [track_id, setSelectedTrack] = useState("R1");
  var [track_info, setTrackDetails] = useState(trackInfo['R1']);
  var [lap, setLap] = useState(0);
  var [weather, setWeather]=useState(0);
  var [rainDepth, setRainDepth]=useState(0);
  var [positions, setPosition] = useState([
    { name: 'NOR', leader: 0.9, tyre: 's', tydur: 100, fudlt: 0, con: 10},
    { name: 'VER', leader: 0, tyre: 's', tydur: 100, fudlt: 0, con: 10},
    { name: 'ZHO', leader: 1.7, tyre: 's', tydur: 100, fudlt: 0, con: 10},
  ])
  var [cards, setCards] = useState([])

  const handleChange = (event) => {
    track_id=(event.target.value)
    setSelectedTrack(track_id);
    setTrackDetails(trackInfo[track_id]);
    setLap(0);
    setWeather((weather_rand<track_info.rain_prob ? Math.round(Math.random()*7) : 0));
    setRainDepth((weather_rand<track_info.rain_prob ? Math.round(Math.pow(Math.random(),5)*10) : 0));
  };

  function Update(doUpdateWeather){
    setLap(lap+1);
    if(doUpdateWeather){
      const ran=Math.random();
      if(ran<=0.15 && weather!=0){
        setWeather(weather-1);
      }
      if(ran>=0.85){
        setWeather(weather+1);
      }
    }
    setRainDepth(Math.max(0,Math.min(weather_threshold[weather],round10(rainDepth+weather_rainflow[weather]))))
  }


  function InsertCard(type){
    setCards([...cards,type]);
  }

  function NextDriver(){
    var tydurtime = 1;
    function ExecuteCard(type,exeDriver){
      const carddataeffect = CardDataEffects[type];
      positions[exeDriver].leader+=carddataeffect[0];
      tydurtime *= carddataeffect[1];
      positions[exeDriver].fudlt+=CardDataEffects[type][2];
      positions[exeDriver].con+=carddataeffect[3];
    }
    function ExecuteDefault(isEmpty,exeDriver){
      if(isEmpty){
        ExecuteCard('Def',exeDriver);
      }
      positions[exeDriver].tydur-=tydurtime*TyreDeg[positions[exeDriver].tyre];
    }
    for (const item of cards) {
      ExecuteCard(item,curDriver);
    }
    ExecuteDefault((cards.length==0),curDriver);
    setCards([]);
    setCurDriver(curDriver+1);
    if(curDriver>=totalDriver-1){
      Update(weather_rand<track_info.rain_prob);
      setCurDriver(0);
    }
  }

  function MyCards(){
    return(
      <div>
        <ul>
          {
            card_list.map(function(card_){
              
              return <button onClick={() => InsertCard(card_)}>{lang===CN ? card_name_cn[card_]:card_name_en[card_]}</button>
            })
          }
        </ul>
        <td width="100px"><button onClick={NextDriver}>Next</button></td>
        
      </div>
    )
  }

  function CurrentCards(){
    return(
      <table>
        {
          cards.map(function(card_){
            return <td>{lang===CN ? card_name_cn[card_]:card_name_en[card_]}</td>;
            
          })
        }
      </table>
    )
  }


  function PositionCalc(){
    const sortedPosition = [...positions].sort((a, b) => a.leader-b.leader);
    const leadPos = sortedPosition[0].leader;
    return(
      <table>
        <tr>
          <td width="100px">Driver </td>
          <td width="100px">Leader ∆</td>
          <td width="100px">Gap ∆</td>
          <td width="100px">Tyre</td>
        </tr>
        
        {
          sortedPosition.map(function(driver,index){
            return <tr> 
              <td width="100px"> {driver.name} </td>
              <td width="100px">+{driver.leader-leadPos}s</td>
              <td width="100px">+{index>0 ? round10(driver.leader-sortedPosition[index-1].leader) : 0}s</td>
              <td width="100px">{driver.tyre}</td>
              </tr>
          })
        }
        
      </table>
    )
  }



  function MyData(){
    const driver=positions[curDriver];
    return(
      <table> 
        <td width="100px"> {driver.name} </td>
        <td width="100px">{driver.tyre}</td>
        <td width="100px">{driver.tydur}%</td>
        <td width="100px">∆ {driver.fudlt}</td>
        <td width="100px">C {driver.con}</td>
      </table>
    )
  }

  function switchRace(){

  }
  

  
  return (
    <div>
  
    <table>
      <td width='150px'>
        <select id="Track" value={track_id} onChange={handleChange}>
            {Object.entries(trackInfo).map(([trackidx, track_], index) => (
              <option key={index} value={trackidx}>
                {lang === CN ? track_.abbr_cn : track_.abbr_en}
              </option>
            ))}
            
        </select>
        
      </td>
      <td width='150px'>Lap {lap}/{track_info.lap_race}</td>
      
      <td width='400px'>Weather: {weather_name_en[weather]} - {rainDepth}mm, {weather_rand}</td>
      <td width='200px' align='right'>
        <a href='https://www.wjx.cn/vm/OVLZ2lT.aspx'>Feedback</a>
      </td>


    </table>
    <br></br>
    <table>
      <tr height="400px">  
      <td width="700px"> 
        <img src={track_info.mapImg} alt={trackInfo[track_id].CN} height="400px"></img>
        
        
      </td>
      <td width="500px"> <PositionCalc /> </td>
    </tr>
    </table>
    <br></br>
  
    <table>  
      <tr>
        <td width="400px"> <CurrentCards /></td>
      </tr>
      <tr>
        <td width="400px"> <MyData /></td>
        <td width="800px"> <MyCards /></td>
      </tr>

    </table>
    </div>
  )

}

export default function FCTest() {

    const [lang, setLang] = useState(CN);

    const onClickLangFuncs = [() => { setLang(CN) }, () => { setLang(EN) }];

    return (
        <div>
            <table width="1200px">
            <tr><GraphicPageTitle onClickLangFuncs={onClickLangFuncs} lang={lang} /></tr>
            <br />
            <tr><Main lang={lang} />        </tr>
            <br />
            <tr><FootNote lang={lang} /></tr>
            </table>
            
        </div>
    )
    
}