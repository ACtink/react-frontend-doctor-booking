export async function getData(url="" , )
{
    

    const response = await fetch(url , {
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


    console.log(url)
    console.log(data)

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
    console.log(sessionStorage.getItem("access-token"))

    return response
    
}