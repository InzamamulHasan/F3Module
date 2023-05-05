
var ip;
fetch("https://api.ipify.org?format=json").then((res)=>{
    // console.log(res);
    return res.json();
}).then((data)=>{
    console.log(data);
    console.log(data.ip);
    ip=data.ip;
    document.getElementById("ip").innerText=`My Public IP ADDRESS : ${ip}`
}).catch((err)=>{
    console.log(err);
})


let getData=document.getElementById("getdata");
getData.addEventListener("click",()=>{
    console.log("inza")
    fetch(`https://ipinfo.io/${ip}/json?token=e9fca1a2c0aef8`).then((res)=>{
       return res.json();
   }).then((data)=>{
       console.log(data);
      display(data)
      getData.style.display="none";
   }).catch((err)=>{
       console.log(err);
   })
})

function display(data){
    let arr=data.loc.split(",");
    let lat=arr[0];
    let lon=arr[1];
    console.log(lat,lon)
    displayfun(data);
    let locat=document.getElementById("loc");
    //console.log(locat)
    locat.src=`https://maps.google.com/maps?q=${lat}, ${lon}&output=embed`
    let zonea=data.timezone;
    let ind= new Date().toLocaleString(undefined, { timeZone: `${zonea}` });
    console.log(ind);
    let pincode=data.postal;
    displaypostal(pincode)
    let z=document.getElementById("timezone");
    z.innerHTML=`Timezone : <span>${zonea}</span>`
    let dat=document.getElementById("date");
    dat.innerHTML=`Date And Time : <span>${ind}</span>`
    let pin=document.getElementById("pin");
    pin.innerHTML=`Pincode : <span>${pincode}</span>`
   
    
}
function displayfun(data){
    let host=document.getElementById("host");
    host.innerHTML=null;

   
    let latit=document.createElement("h1");
    let longi=document.createElement("h1");
    let div1=document.createElement("div")
    let narr=data.loc.split(",");
    let lat=narr[0];
    let lon=narr[1];
    latit.innerHTML=`Lat: <span>${lat}</span>`;
    longi.innerHTML=`Long: <span>${lon}</spna>`;
    div1.append(latit,longi);

    let div2=document.createElement("div")
    let city=document.createElement("h1");
    let reg=document.createElement("h1");
    city.innerHTML=`City: <span>${data.city}</span>`;
    reg.innerHTML=`Region: <span>${data.region}</span>`;
    div2.append(city,reg);

    let div3=document.createElement("div")
    let orga=document.createElement("h1");
    let hostname=document.createElement("h1");
    orga.innerHTML=`Organisation: <span>${data.asn.asn} ${data.asn.name}</span>`;
    hostname.innerHTML=`Hostname: <span>${data.company.domain}</span>`;
    div3.append(orga,hostname);
    host.append(div1,div2,div3);

}
function displaypostal(pincode){
    console.log("hiii")
    fetch(`https://api.postalpincode.in/pincode/${pincode}`).then((res)=>{
        return res.json();
    }).then((data)=>{
        console.log(data[0]);
        let postdata=data[0];
        let mes=document.getElementById("mess");
        mes.innerHTML=`Message : <span>${postdata.Message}</span>`
        postOfficeDisplay(postdata.PostOffice)
    }).catch((err)=>{
        console.log("ERROR",err);
    })
}

function postOfficeDisplay(data){
    console.log(data);
   officedata(data);
    let filter=document.getElementById("filter");
    filter.style.display="block";
    let ser=document.getElementById("fil");
    ser.addEventListener("input",(event)=>{
        event.preventDefault();
        console.log(ser.value)
        if(ser.value==""){
            officedata(data);
            return;
        }
        let ans=[];
        for(let i=0;i<data.length;i++){
            if(data[i].BranchType.toLowerCase().includes(ser.value.toLowerCase())|| data[i].Name.toLowerCase().includes(ser.value.toLowerCase())){
                ans.push(data[i]);
            }
        }
        console.log(ans)
        officedata(ans);
    })

}
function officedata(arr){
    let postoffice=document.getElementById("office_container");
    postoffice.innerHTML=null;
    arr.forEach((elem,index)=>{
        let name=document.createElement("p");
        name.innerText=`Name : ${elem.Name}`;
        let branch=document.createElement("p");
        branch.innerText=`Branch Type : ${elem.BranchType}`
        let del=document.createElement("p");
        del.innerText=`Delivery Status : ${elem.DeliveryStatus}`;
        let District=document.createElement("p");
        District.innerText=`District : ${elem.District}`
        let div=document.createElement("p");
        div.innerText=`Division : ${elem.Division}`
        let cont=document.createElement("div");
        cont.setAttribute("class","postdata")
        cont.append(name,branch,del,District,div);
        postoffice.append(cont);
    })
}