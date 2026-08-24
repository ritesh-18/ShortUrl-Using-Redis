

const Base_Char='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'


export function convertbase62(num:number){
     if(num==0)return '0';
     let temp=num;
     let result=''
     while(temp>0){
        result=Base_Char[temp%62]+result;
        temp=Math.floor(temp/62);
     }
     return result;
}