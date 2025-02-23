export default function selectCubes(arr,type,number){
    let posOfName={arrPos:null,pos:null}
    const isNumber = (element) => element == number;
    arr.map((obj,i)=>{
        if(-1<obj.findIndex(isNumber)){
          posOfName={arrPos:i,pos:obj.findIndex(isNumber)}
        }
    })
    
    let result=[]
    let repos
    switch(type){
        case 'array':
            result=arr[posOfName.arrPos]
        break
        case 'row':
          switch(posOfName.pos){
            case 0:
            case 1:
            case 2:
              repos=0
            break
            case 3:
            case 4:
            case 5:
              repos=3
            break
            case 6:
            case 7:
            case 8:
              repos=6
          }
          arr.map((obj,i)=>{
            obj.map((aObj,ii)=>{
              if(ii==0+repos||ii==1+repos||ii==2+repos){
                result.push(aObj)
              }
            })
          })
        break
        case 'col':
          switch(posOfName.pos){
            case 0:
            case 3:
            case 6:
              repos=0
            break
            case 1:
            case 4:
            case 7:
              repos=1
            break
            case 2:
            case 5:
            case 8:
              repos=2
          }
          arr.map((obj,i)=>{
            obj.map((aObj,ii)=>{
              if(ii==0+repos||ii==3+repos||ii==6+repos){
                result.push(aObj)
              }
            })
          })
        break
    }
    return result

}