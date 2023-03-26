export async function getData(url="" , )
{
    

    const response = await fetch(`http://localhost:8080${url}` , {
        method :"GET",
        mode:"cors",
        cache:"no-cache",
        credentials:"same-origin",
        headers:{
            "Content-Type":"application/json", 
            Authorization: "Bearer " +sessionStorage.getItem("access-token"),
        }, 
        redirect:"follow",
        referrerPolicy: "no-referrer",

        

    })

    return response;
   
   
}



export async function postData(url="" , data={}, header={}) {

    const response = await fetch(url ,{
        method :"POST",
        mode:"cors",
        cache:"no-cache",
        credentials:"same-origin",
        headers:{
            "Content-Type":"application/json", 
            Authorization: "Bearer " +sessionStorage.getItem("access-token"),
            ...header,
        }, 
        redirect:"follow",
        referrerPolicy: "no-referrer",
        body:JSON.stringify(data),
    })
    return response
    
}