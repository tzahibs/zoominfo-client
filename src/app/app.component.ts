import { Component } from '@angular/core';
import { FetchdataService } from './fetchdata-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : [FetchdataService]
})

export class AppComponent {
  title = 'zoominfo';
  url = "http://localhost:5000"
  users = []
  fields = [
              {"id":"#"},
              {"name":"Name"},
              {"title":"Title"},
              {"location":"Location"},
              {"hq_phone":"HQ Phone"},      
              {"email":"Email"},      
              {"update":"Update"},      
            ]

  sortBy = ""
  sortValue = ""
  searchText = ""
  
  
  constructor(private srv : FetchdataService){
    this.sortBy = "asc"
    this.sortValue = "id"
    this.searchText = ""
    this.profileRequest()
  }

  fieldKey = (item : Object)=>{
      return Object.keys(item)[0]
  }

  fieldValue = (item : Object)=>{
     return item[Object.keys(item)[0]]
  }
  
  userValue = (user : Object , key : string) => {
      var value = user[key]
      
      if (key == "update"){
        var pad = (num : any) => {return ('00'+num).slice(-2) } , date = new Date(value);
        value = pad(date.getUTCDate())+'/'+pad(date.getUTCMonth() + 1)+'/'+date.getUTCFullYear()
      }

      return value;
  }

  profileRequest = ()=>{
    this.srv.getData(this.url+"/profiles?value="+this.sortValue+"&by="+this.sortBy+"&search="+this.searchText).subscribe((data) => {
      this.users = data
    })
  }

  onFreeSearchClick = (event : any)=>{
    var elem =  event.toElement.offsetParent.getElementsByClassName("search")[0]
    this.searchText = elem.value
    this.profileRequest()
  }
 
  onSortClick = (event : any ,value : string)=>{
    var elem = event.toElement
    var allElems = elem.offsetParent.offsetParent.getElementsByClassName("sort")
    
    for (const key in allElems) {
      if (allElems.hasOwnProperty(key) && allElems[key] != elem) {
        allElems[key].className = allElems[key].className.replace("desc","both").replace("asc","both")
      }
    }

    if (elem.classList.contains("both")){
      elem.className = elem.className.replace("both","asc")
      this.sortBy = "asc"
    }else if (elem.classList.contains("asc")){
      elem.className = elem.className.replace("asc","desc")
      this.sortBy = "desc" 
    }else{
      elem.className = elem.className.replace("desc","both")
      value = "id"
      this.sortBy = "asc"
    }

    this.sortValue = value
    this.profileRequest()
  }

 

}
