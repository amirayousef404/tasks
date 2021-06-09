
const getData = async(callback) =>{
    try{
    let x = await fetch('https://api.covid19api.com/summary')
    let y = await(x.json())
    callback(y, false)
    }
    catch(e){
        callback(false, e)
    }
}


const createMyElement =(parent,element,text)=>{
    myElement= document.createElement(element)
    parent.appendChild(myElement)
    if(text!='')myElement.textContent = text
    return myElement
}
const thead = document.querySelector('#apiData')
const dataHead =['Country','CountryCode','Slug','NewConfirmed','TotalConfirmed','NewDeaths','TotalDeaths','NewRecovered','TotalRecovered','Date']

getData( (data, error)=> {
    if(error){
        console.log(error)
    }
    else{
        console.log(data)
    data["Countries"].forEach(d=>{
        tr  = createMyElement(thead,'tr','')
        dataHead.forEach(h=>{
            td  = createMyElement(tr ,'td',d[h])
        })
        
    })
}
})