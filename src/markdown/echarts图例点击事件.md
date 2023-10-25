```
myChart.on('legendselectchanged',(obj) => {
   if(obj.name == 'Rainfall') {
    if(obj.selected.Rainfall == false) {
        myChart.dispatchAction({
      		type:'legendSelect',
      		name:'Rainfall'
    	})
    }
  }else if(obj.name == 'Evaporation') {
      if(obj.selected.Evaporation == false) {
           myChart.dispatchAction({
      		type:'legendSelect',
      		name:'Evaporation'
      	})
      }
          
  }
})
 
```